import '../firebaseConfig.js'
import { getFirestore, collection, doc, addDoc, setDoc, deleteDoc, getDocs, query, where } from "firebase/firestore"
import { Program, ProgramFromApi } from '../models/programs.js';
const db = getFirestore();

export const postPogram= async (program: Program) =>{
    try {
        const docRef = await addDoc(collection(db, 'programs'), program);
        return docRef.id;
    } catch (error) {
        console.error('Error adding user: ', error);
        return undefined;
    }
}
export const getProgramByUserID = async (userID: string): Promise<Program[]> => {
    try {
        const programsCollection = collection(db, 'programs');
        const q = query(programsCollection, where('user_id', '==', userID));
        const querySnapshot = await getDocs(q);

        const programs: ProgramFromApi[] = [];
        querySnapshot.forEach((doc) => {
            const programData = doc.data() as ProgramFromApi;
            programs.push(programData);
        });
        console.log(programs);
        return programs;
    } catch (error) {
        console.error('Error fetching program by userID:', error);
        throw error; // Re-throw the error to propagate it further if necessary
    }
};
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
