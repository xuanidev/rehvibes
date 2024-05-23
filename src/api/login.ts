import {  createUserWithEmailAndPassword, signInWithEmailAndPassword  } from 'firebase/auth';
import {auth, signInWithGooglePopup} from '../firebaseConfig.js'
import { getFirestore, doc, getDoc } from "firebase/firestore";
import {createUser } from './users.js';
import { handleErrorMessageSignup,errorsSignup, handleErrorMessageLogin, errorsLogin, errorsLoginGoogle } from './errors.js';
import { User } from '../models/index.js';
const db = getFirestore();

const chekcIfExists = async (id:string): Promise<boolean> =>{
    const docRef = doc(db, "users", id);
    const exists = await getDoc(docRef).then(docSnap => {
        return docSnap.exists()
    });
    return exists;
}

export const signup = async (email: string, password: string, name:string):Promise<string>=> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user.uid;
      console.log(user);
      const newUser: User = {
        name: name,
        email: email,
      };
      await createUser(newUser);
      return user;
    } catch (error) {
      const errorCode = (error as any).code;
      throw new Error(handleErrorMessageSignup(errorCode));     
    }
};

/*export const signup = async (email: string, password: string ): Promise<signupProps> =>{
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
}*/

interface LoginProps {
    uid?: string,
    imgUrl?: string,
}

export const login = async (email: string, password: string ): Promise<LoginProps> =>{
    let uidAux = "";
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        const userLogged = userCredential.user;
        uidAux = userLogged.uid;
        return {imgUrl: '', uid: uidAux}
    } catch (error) {
        const errorCode = (error as any).code;
        throw new Error(handleErrorMessageLogin(errorCode))
    }
}

export const loginGoogle = async (): Promise<{ uid?: string; imgUrl?: string }> => {
    try{
        const response = await signInWithGooglePopup();
        const { displayName, email, uid, photoURL } = response.user;

        if (email === undefined || displayName === undefined) {
            throw new Error(errorsLoginGoogle.generalMsg);
        }
        
        const exists = await chekcIfExists(uid);

        if (exists) {
            return { uid, imgUrl: photoURL ?? ''};
        }
        console.log("entra");
        const isCreated = await createUser({
            uid,
            name: displayName,
            email
        });

        if (isCreated) {
            return { uid, imgUrl: photoURL ?? '' };
        }

        throw new Error(errorsLoginGoogle.errorCrearUsuarioMsg);
    } catch (error) {
        const errorCode = (error as any).code;
        console.log(errorCode);
        throw new Error(handleErrorMessageLogin(errorCode))
    }
}

