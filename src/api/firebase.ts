import '../firebaseConfig.js'
import { getFirestore, collection, doc, addDoc, setDoc, deleteDoc, getDocs, query, where } from "firebase/firestore"
import { User, UserFromApi } from '../models'
const db = getFirestore();

const undefinedUser = {
    id: "",
    name: "",
    surname: "",
    username: "",
    mail: ""
}

export const postUser = async (userData:User ) =>{
    try {
        const docRef = await addDoc(collection(db, 'users'), {
            id: userData.id,
            name: userData.name,
            surname: userData.surname,
            username: userData.username,
            mail: userData.mail
        });
        return docRef.id;
    } catch (error) {
        console.error('Error adding user: ', error);
        return undefined;
    }
}
export const getUser = async (userId:string) => {
    try {
        const usersCollection = collection(db, 'users');
        const querySnapshot = await getDocs(query(usersCollection, where('id', '==', userId)));

        let userData: UserFromApi | null = undefinedUser;

        querySnapshot.forEach((doc) => {
            userData = doc.data() as UserFromApi;
        });
        
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