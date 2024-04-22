import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
//import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAsJ3gyX-vderc8xyzNpy5b54ifkL548Do",
  authDomain: "revibes-8b57a.firebaseapp.com",
  projectId: "revibes-8b57a",
  storageBucket: "revibes-8b57a.appspot.com",
  messagingSenderId: "815179249512",
  appId: "1:815179249512:web:8c91f540f5c00564d608dd",
  measurementId: "G-HHT5X5GHC5"
};


// Initialize Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({   
  prompt : "select_account "
});
const auth = getAuth(app);
const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export { auth, app, signInWithGooglePopup };