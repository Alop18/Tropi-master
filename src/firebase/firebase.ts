// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAB1fz6cNXAOne3VbXb7FZAHqEuq5ZyxPU",
    authDomain: "tropiland-11cb9.firebaseapp.com",
    projectId: "tropiland-11cb9",
    storageBucket: "tropiland-11cb9.appspot.com",
    messagingSenderId: "801659852767",
    appId: "1:801659852767:web:b87198f76532ed84ebd66a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app)
export const onChangeUser = (setUsuario: Function) => {
    onAuthStateChanged(auth, (user) => {
        const usuario = user ? user.email : null
        setUsuario(usuario)
    })
}