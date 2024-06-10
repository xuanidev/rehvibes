import {  createUserWithEmailAndPassword, signInWithEmailAndPassword  } from 'firebase/auth';
import { signInWithGooglePopup } from '../firebaseConfig';
import { auth } from '../firebaseConfig';
import { getFirestore, collection, where, query, getDocs } from "firebase/firestore";
import {createUser } from './users.js';
import { handleErrorMessageSignup,handleErrorMessageLogin, errorsLoginGoogle } from './errors.js';
import { User } from '../models/index.js';
import { saveOnCookies } from '../utils/helpers.js';
const db = getFirestore();

const chekcIfExists = async (id:string): Promise<boolean> =>{
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where("google_id", "==", id));
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot);
    if(querySnapshot.size > 0){
        return true
    }
    return false;
}
const checkIfEmailExists = async (email:string): Promise<boolean> =>{
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot);
    if(querySnapshot.size > 0){
        return true
    }
    return false;
}
const checkIfGoogle = async (email:string): Promise<boolean> =>{
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where("google_id", "==", true), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot.size);
    if(querySnapshot.size > 0){
        return true
    }
    return false;
}

export const signup = async (email: string, password: string, name:string)=> {
    try {
      const exists = await checkIfEmailExists(email);
      if(exists){
        throw new Error('auth/correo-usado');  
      }
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user.uid;

      const newUser: User = {
          name: name,
          email: email,
          uid: user,
          google_id: false,
          programs: [],
          cualidades: [],
          horas: 0,
          logros: 0,
          sesiones: 0
      };
      await createUser(newUser);
      saveOnCookies('uid', user);
      saveOnCookies('email', email);
      saveOnCookies('username', name);
    } catch (error) {
        const errorCode = (error as any).code ?? (error as any).message;
      throw new Error(handleErrorMessageSignup(errorCode));     
    }
};

interface LoginProps {
    uid?: string,
    imgUrl?: string,
}

export const login = async (email: string, password: string ): Promise<LoginProps> =>{
    let uidAux = "";
    try {
        const exists = await checkIfGoogle(email);
        if(exists){
          throw new Error('auth/correo-usado');  
        }
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log(userCredential);
        const userLogged = userCredential.user;
        uidAux = userLogged.uid;
        saveOnCookies('uid', uidAux);
        return {imgUrl: '', uid: uidAux}
    } catch (error) {
        console.log(error);
        const errorCode = (error as any).code ?? (error as any).message;
        throw new Error(handleErrorMessageLogin(errorCode))
    }
}

export const loginGoogle = async () => {
    try{
        const response = await signInWithGooglePopup();
        const { displayName, email, uid, photoURL } = response.user;

        if (email === undefined || displayName === undefined) {
            throw new Error(errorsLoginGoogle.generalMsg);
        }
        
        const exists = await chekcIfExists(uid);

        if (exists) {
            saveOnCookies('uid', uid);
            saveOnCookies('email', email ?? '');
            saveOnCookies('username', displayName ?? '');
            return;
        }

        const newUser = await createUser({
            uid,
            name: displayName ?? '',
            email: email ?? '',
            google_id: true,
            programs: [],
            cualidades: [],
            horas: 0,
            logros: 0,
            sesiones: 0
        });

        if (newUser) {
            if(photoURL){
                saveOnCookies('imgUser', photoURL);
            }
            saveOnCookies('uid', uid);
            saveOnCookies('email', email ?? '');
            saveOnCookies('username', displayName ?? '');
            return;
        }
        throw new Error(errorsLoginGoogle.errorCrearUsuarioMsg);
    } catch (error) {
        const errorCode = (error as any).code;
        console.log(errorCode);
        throw new Error(handleErrorMessageLogin(errorCode))
    }
}

