import '../firebaseConfig.js'
import { getFirestore, collection, doc, setDoc, getDocs, query, where, updateDoc } from "firebase/firestore"
import { GenerateProgramProps,RehabilitationProgramProps} from '../models/surveys.js';
import { getUser, updateUser } from './users.js';
import { getFromCookies, removeFromCookies } from '../utils/helpers.js';
import { openAiToFirebase } from './programs.mapper.js';
import uuid4 from 'uuid4';
import { cualidadesDefault } from '../constants.js';
import { Program} from '../models/index.js';
const db = getFirestore();


export const postPogram = async (program: RehabilitationProgramProps) =>{
    try {
        const uid = program.uid ?? uuid4();
        const usersRef = collection(db, "programs");
        await setDoc(doc(usersRef, uid), program);
        //const docRef = await addDoc(collection(db, 'programs'), program).the;
        return uid;
    } catch (error) {
        throw (error as Error).message;
    }
}

export const getProgramByUserID = async (userID: string): Promise<RehabilitationProgramProps[]> => {
    try {
        const user = await getUser(userID);
        const programsCollection = collection(db, 'programs');
        const q = query(programsCollection, where('uid', 'in', user.programs));
        const querySnapshot = await getDocs(q);

        const programs: RehabilitationProgramProps[] = [];
        querySnapshot.forEach((doc) => {
            const programData = doc.data() as RehabilitationProgramProps;
            programs.push(programData);
        });
        return programs;
    } catch (error) {
        throw (error as Error).message;
    }
}


export const getProgramByID = async (programId: string): Promise<RehabilitationProgramProps> => {
    try {
        const programsCollection = collection(db, 'programs');
        const q = query(programsCollection, where('uid', '==', programId));
        const querySnapshot = await getDocs(q);

        let program = {} as RehabilitationProgramProps;
        
        querySnapshot.forEach((doc) => {
            program = doc.data() as RehabilitationProgramProps;
        });
        console.log(program);
        return program;
    } catch (error) {
        console.error('Error fetching program by userID:', error);
        throw error;
    }
};

export const generateProgram = async (props: GenerateProgramProps)  => {
    const { rehabilitation_program, patient_profile} = props;
    const uid = getFromCookies('uid');
    const username = getFromCookies('username');
    const email = getFromCookies('email');
    try{
        let groups = [] as string[];
        if(patient_profile){
            groups = patient_profile?.zonas_con_molestias?.split(',') ?? groups;
        }
        const rehabilatationProgram = openAiToFirebase({rehabilitation_program: rehabilitation_program},groups, patient_profile?.nivel_entrenamiento );
        let updatedUser = {
            uid: uid,
            name: username,
            email: email,
            google_id:false,
            patient_profile: patient_profile,
            programs: [] as string[],
            cualidades: cualidadesDefault,
            horas: 0,
            logros:0,
            sesiones: 0,
            ejerciciosFavoritos: [] as number[]
        }
        if(username !== ''){
            const user = await getUser(uid);
            updatedUser.programs = user.programs ?? [];
            if(rehabilatationProgram.uid){
                updatedUser.programs.push(rehabilatationProgram.uid)
            }
        }
        await updateUser(uid, updatedUser);
        await postPogram(rehabilatationProgram);
        removeFromCookies(['email']);
    }catch(error){
        throw (error as Error).message;
    }
}


export const updateAfterExercise = async (programId: string): Promise<boolean> => {
    try {
        const programDocRef = doc(db, 'programs', programId);
        let program = {} as RehabilitationProgramProps;
        program = await getProgramByID(programId);
        const completedDays = program.completedDays ?? 0;
        const days = program.days ?? 0;
        const newCompletedDays = completedDays +1 < days ? completedDays +1 : completedDays;
        const data = {
            completedDays: newCompletedDays,
            finished: newCompletedDays === days
        }
        console.log(data);
        await updateDoc(programDocRef, data);
        return true;
    } catch (error) {
        return false;
    }
};


/*
export const removeProgram = async (programId: string): Promise<boolean> => {
    try {
        const programDocRef = doc(db, 'programs', programId);
        await deleteDoc(programDocRef);
        console.log('Program deleted successfully');
        return true;
    } catch (error) {
        console.error('Error deleting program: ', error);
        return false;
    }
};*/
