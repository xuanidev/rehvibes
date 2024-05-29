import '../firebaseConfig.js'
import { getFirestore, collection, doc, addDoc, setDoc, deleteDoc, getDocs, query, where } from "firebase/firestore"
import uuid4 from "uuid4";

import { User, UserFromApi } from '../models/index.js'
const db = getFirestore();

const undefinedUser = {
    id: '',
    name: '',
    surname: '',
    username: '',
    mail: '',
    programs: [] as string[]
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
        const querySnapshot = await getDocs(query(usersCollection, where('id', '==', userId)));

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
        console.log('User updated successfully');
        return true
    } catch (error) {
        console.error('Error updating user: ', error);
        return false;
    }
};

export const removeUser = async (userId: string): Promise<boolean> => {
    try {
        const userDocRef = doc(db, 'users', userId);
        await deleteDoc(userDocRef);
        console.log('User deleted successfully');
        return true
    } catch (error) {
        console.error('Error deleting user: ', error);
        return false;
    }
};