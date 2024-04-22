import {  createUserWithEmailAndPassword, signInWithEmailAndPassword  } from 'firebase/auth';
import {auth, signInWithGooglePopup} from '../firebaseConfig.js'
import { getFirestore, doc, getDoc } from "firebase/firestore";
import {createUser } from './users.js';
import { handleErrorMessageSignup,errorsSignup, handleErrorMessageLogin, errorsLogin, errorsLoginGoogle } from './errors.js';
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
    errorMsg:string,
    uid?: string,
}

export const signup = async (email: string, password: string ): Promise<signupProps> =>{
    try {
        let created = {succesfull: false, errorMsg: errorsSignup.generalMsg};
        created = await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user.uid;
            console.log(user);
            return {succesfull: true, errorMsg: '', uid: user};
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMsg = handleErrorMessageSignup(errorCode);
            return {succesfull: false, errorMsg: errorMsg};
        });
        return created;
    } catch (error) {
        return {succesfull: false, errorMsg: errorsSignup.generalMsg};
    }
}

interface loginProps {
    isLogged: boolean,
    uid?: string,
    imgUrl?: string,
    errorMsg: string
}

export const login = async (email: string, password: string ): Promise<loginProps> =>{
    let uidAux = "";
    try {
        const isLogged = await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const userLogged = userCredential.user;
            uidAux = userLogged.uid;
            return {logged: true, errorMsg: ''}
        })
        .catch((error) => {
            const errorCode = error.code;
            console.log(errorCode);
            const errorMessage = handleErrorMessageLogin(errorCode);
            return {logged: false, errorMsg: errorMessage}
        });
        return {isLogged: isLogged.logged, uid:uidAux, errorMsg: isLogged.errorMsg};
    } catch (error) {
       return {isLogged:false, errorMsg: (error as Error).message};
    }
}

export const loginGoogle = async (): Promise<loginProps> =>{
    try {
            const response = await signInWithGooglePopup();
            if(response){
                console.log(response);
                const {displayName, email, uid} = response.user;
                if(email === undefined || displayName === undefined){
                    return {isLogged:false, uid:"", errorMsg: errorsLoginGoogle.generalMsg};
                }

                const exists = await chekcIfExists(uid);
                console.log(exists);
                if(exists){
                    return {isLogged:true, uid: response.user.uid, errorMsg:'', imgUrl: response.user.photoURL};
                }else{
                    const isCreated = createUser({
                        uid: response.user.uid,
                        name: response.user.displayName,
                        email: response.user.email
                    })
                    if(isCreated !== undefined){
                        return {isLogged:true, uid: response.user.uid, errorMsg:'', imgUrl: response.user.photoURL};
                    }else{
                        return {isLogged:false, uid:"", errorMsg: errorsLoginGoogle.errorCrearUsuarioMsg};
                    }
                }
            }else{
                return {isLogged:false, uid:"", errorMsg: errorsLoginGoogle.generalMsg};
            }
    } catch (error) {
        return {isLogged:false, uid:'', errorMsg: (error as Error).message};
    }
}


