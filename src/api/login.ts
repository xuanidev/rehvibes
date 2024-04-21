import {  createUserWithEmailAndPassword, signInWithEmailAndPassword  } from 'firebase/auth';
import {auth, signInWithGooglePopup} from '../firebaseConfig.js'
import { getFirestore, doc, getDoc } from "firebase/firestore";
import {createUser } from './users.js';
import { handleErrorMessage,errors } from './errors.js';
const db = getFirestore();

const chekcIfExists = async (id:string): Promise<boolean> =>{
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);
    console.log(docSnap);
    if (docSnap.exists()) {
        return true
    } else {
        return false;
    }
}

interface signupProps {
    succesfull: boolean,
    errorMsg:string
}

export const signup = async (email: string, password: string ): Promise<signupProps> =>{
    try {
        const created = await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            return {succesfull: true, errorMsg: ''};
        })
        .catch((error) => {
            const errorCode = error.code;
            console.log(errorCode);
            const errorMsg = handleErrorMessage(errorCode)
            console.log(errorMsg);
            return {succesfull: false, error: errorMsg};
        });
        if(!created.succesfull){
            return {succesfull: false, errorMsg: errors.generalMsg};   
        }
    } catch (error) {
        return {succesfull: false, errorMsg: errors.generalMsg};
    }
}
interface loginProps {
    isLogged: boolean,
    uid: string,
    message: string,
    imgUrl?: string
}

export const login = async (email: string, password: string ): Promise<loginProps> =>{
    let uidAux = "";
    try {
        const isLogged = await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const userLogged = userCredential.user;
            uidAux = userLogged.uid;
            return true;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
            //implement messages to show state
            return false;
        });
        return {isLogged:isLogged, uid:uidAux, message: isLogged ?'Succesfull Login' : 'The service can not be reached rigth now'};
    } catch (error) {
       return {isLogged:false, uid:uidAux, message: (error as Error).message};
    }
}

export const loginGoogle = async (): Promise<loginProps> =>{
    try {
            const response = await signInWithGooglePopup();
            if(response){
                console.log(response);
                const {displayName, email, uid} = response.user;
                if(email === undefined || displayName === undefined){
                    return {isLogged:false, uid:"", message: 'Something went wrong with Google'};
                }

                const exists = await chekcIfExists(uid);
                console.log(exists);
                if(exists){
                    return {isLogged:true, uid: response.user.uid, message:'Succesfull Login', imgUrl: response.user.photoURL};
                }else{
                    const isCreated = createUser({
                        uid: response.user.uid,
                        username: response.user.displayName,
                        mail: response.user.email
                    })
                    if(isCreated !== undefined){
                        return {isLogged:true, uid: response.user.uid, message:'User created succesfully', imgUrl: response.user.photoURL};
                    }else{
                        return {isLogged:false, uid:"", message: "User not created"};
                    }
                }
            }else{
                return {isLogged:false, uid:"", message: 'Something went wrong with Google'};
            }
    } catch (error) {
        return {isLogged:false, uid:'', message: (error as Error).message};
    }
}


