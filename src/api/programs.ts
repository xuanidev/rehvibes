import '../firebaseConfig.js'
import { getFirestore, collection, doc, addDoc, setDoc, deleteDoc, getDocs, query, where } from "firebase/firestore"
import { Program, ProgramFromApi } from '../models/programs.js';
import { GenerateProgramProps,RehabilitationProgramProps, SurveyData } from '../models/surveys.js';
import { getUser, updateUser } from './users.js';
import { getFromCookies, removeFromCookies } from '../utils/helpers.js';
import { openAiToFirebase } from './programs.mapper.js';
import uuid4 from 'uuid4';
const db = getFirestore();


export const postPogram = async (program: RehabilitationProgramProps) =>{
    try {
        const uid = program.uid ?? uuid4()
        const usersRef = collection(db, "programs");
        await setDoc(doc(usersRef, uid), program);
        //const docRef = await addDoc(collection(db, 'programs'), program);
        console.log('posted');
        return uid;
    } catch (error) {
        console.error('Error adding user: ', error);
        return undefined;
    }
}

export const getProgramByUserID = async (userID: string): Promise<RehabilitationProgramProps[]> => {
    try {
        console.log(userID);
        const user = await getUser(userID);
        
        const programsCollection = collection(db, 'programs');
        console.log(user);
        const q = query(programsCollection, where('uid', 'in', user.programs));
        const querySnapshot = await getDocs(q);

        const programs: RehabilitationProgramProps[] = [];
        querySnapshot.forEach((doc) => {
            const programData = doc.data() as RehabilitationProgramProps;
            programs.push(programData);
        });
        console.log(programs);
        return programs;
    } catch (error) {
        console.error('Error fetching program by userID:', error);
        throw error; // Re-throw the error to propagate it further if necessary
    }
}

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
        const rehabilatationProgram = openAiToFirebase({rehabilitation_program: rehabilitation_program},groups );
        let updatedUser = {
            uid: uid,
            name: username,
            email: email,
            google_id:false,
            patient_profile: patient_profile,
            programs: [] as string[],
        }
        if(username !== ''){
            const user = await getUser(uid);
            updatedUser.programs = user.programs;
            if(rehabilatationProgram.uid){
                updatedUser.programs.push(rehabilatationProgram.uid)
            }
        }
        await updateUser(uid, updatedUser);
        await postPogram(rehabilatationProgram);
        removeFromCookies(['username','email']);
    }catch{
        throw new Error('Function not implemented.');
    }
}
  
/*
export const getProgramByID = async (userID: string): Promise<ProgramFromApi | null> => {
    try {
        const programsCollection = collection(db, 'programs');
        const q = query(programsCollection, where('id', '==', userID));
        const querySnapshot = await getDocs(q);

        let program: ProgramFromApi | null = null;
        
        querySnapshot.forEach((doc) => {
            program = doc.data() as ProgramFromApi;
        });

        return program;
    } catch (error) {
        console.error('Error fetching program by userID:', error);
        throw error; // Re-throw the error to propagate it further if necessary
    }
};

export const updateProgram = async (programId: string, updatedProgramData: Program): Promise<boolean> => {
    try {
        const programDocRef = doc(db, 'programs', programId);
        await setDoc(programDocRef, updatedProgramData);
        console.log('Program updated successfully');
        return true;
    } catch (error) {
        console.error('Error updating program: ', error);
        return false;
    }
};


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
