import '../firebaseConfig.js'
import { getFirestore, collection, doc, setDoc, deleteDoc, getDocs, query, where, updateDoc } from "firebase/firestore"
import uuid4 from "uuid4";

import { User, UserFromApi } from '../models/index.js'
import { cualidadesDefault } from '../constants.js';
const db = getFirestore();

const undefinedUser = {
    id: '',
    name: '',
    surname: '',
    username: '',
    mail: '',
    programs: [] as string[],
    cualidades: cualidadesDefault,
    horas: 0,
    logros:0,
    sesiones: 0,
    ejerciciosFavoritos: [] as number[],
}

const usersRef = collection(db, "users");
export const createUser = async (userData:User ): Promise<boolean> =>{
    const {name, email, uid} = userData;
    try {
        const created = await setDoc(doc(usersRef, uid ?? uuid4()), {
            uid: uid ?? uuid4(),
            name: name ?? '',
            email: email,
            createdAt: new Date().getTime().toString(),
            verified: false
        }).then(docSnap => {
            return docSnap !== null
        });
        return created;
    } catch (error) {
        throw new Error("Error adding user in database");     
    }
}

export const getUser = async (userId:string): Promise<UserFromApi> => {
    try {
        const usersCollection = collection(db, 'users');
        const querySnapshot = await getDocs(query(usersCollection, where('uid', '==', userId)));

        let userData: UserFromApi | null = undefinedUser;

        querySnapshot.forEach((doc) => {
            userData = doc.data() as UserFromApi;
        });
        console.log(userData);
        return userData;
    } catch (error) {
        console.error('Error fetching user: ', error);
        return undefinedUser
    }
};


export const getUsers = async () => {
    const usersCollection = collection(db, "users");
    const usersSnapshot = await getDocs(usersCollection);

    const usersData: UserFromApi[] = [];

    usersSnapshot.forEach((doc) => {
        const userData = doc.data() as UserFromApi;
        usersData.push(userData);
    });

    return usersData;
};

export const updateUser = async (userId: string, updatedUserData: User): Promise<boolean> => {
    try {
        const userDocRef = doc(db, 'users', userId);
        await setDoc(userDocRef, updatedUserData);
        return true
    } catch (error) {
        return false;
    }
};

export const removeUser = async (userId: string): Promise<boolean> => {
    try {
        const userDocRef = doc(db, 'users', userId);
        await deleteDoc(userDocRef);
        return true
    } catch (error) {
        return false;
    }
};

export const getFavorites = async (userId: string): Promise<number[]> => {
    try {
        const usersCollection = collection(db, 'users');
        const querySnapshot = await getDocs(query(usersCollection, where('uid', '==', userId)));
        let userData: UserFromApi | null = undefinedUser;

        querySnapshot.forEach((doc) => {
            userData = doc.data() as UserFromApi;
        });
        return userData.ejerciciosFavoritos ?? [];
    } catch (error) {
        throw (error as Error).message;
    }
};

export const addExerciseToFavorites = async (userId: string, exerciseId: number): Promise<void> => {
    try {
        const usersCollection = collection(db, 'users');
        const querySnapshot = await getDocs(query(usersCollection, where('uid', '==', userId)));
        let userData: UserFromApi | null = undefinedUser;

        querySnapshot.forEach((doc) => {
            userData = doc.data() as UserFromApi;
        });

        const ejercicios = userData.ejerciciosFavoritos ?? [] as number[];
        if(ejercicios.indexOf(exerciseId) === -1){
            ejercicios.push(exerciseId);
            const data = {
                ejerciciosFavoritos: ejercicios
            };
            
            const docRef = doc(db, 'users', userId);
            await updateDoc(docRef, data);
        }
    } catch (error) {
        throw (error as Error).message;
    }
};

export const removeExerciseFromFavorites = async (userId: string, exerciseId: number): Promise<void> => {
    try {
        const usersCollection = collection(db, 'users');
        const querySnapshot = await getDocs(query(usersCollection, where('uid', '==', userId)));
        let userData: UserFromApi | null = undefinedUser;

        querySnapshot.forEach((doc) => {
            userData = doc.data() as UserFromApi;
        });
        const ejercicios = userData.ejerciciosFavoritos ?? [] as number[];
        ejercicios.filter((exercise: number) => {
            return exercise !== exerciseId
        })
        const updatedEjercicios = ejercicios.filter((exercise: number) => {
            return exercise !== exerciseId;
        });
        const data = {
            ejerciciosFavoritos: updatedEjercicios
        };
        const docRef = doc(db, 'users', userId);
        await updateDoc(docRef, data);
    } catch (error) {
        throw (error as Error).message;
    }
};