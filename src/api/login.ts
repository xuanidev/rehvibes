import {  createUserWithEmailAndPassword, signInWithEmailAndPassword  } from 'firebase/auth';
import {auth} from '../firebaseConfig.js'

export const signup = async (email: string, password: string ): Promise<boolean> =>{
    try {
        const isCreated = await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            return true;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            return false;
        });
        return isCreated;
    } catch (error) {
        return false
    }
}

export const login = async (email: string, password: string ): Promise<boolean> =>{
    try {
        const isLogged = await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            return true;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
            //implement messages to show state
            return true;
        });
        return isLogged;
    } catch (error) {
       return true;
    }
}

