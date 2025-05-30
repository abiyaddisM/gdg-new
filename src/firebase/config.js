import { initializeApp,getApp,getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyCGKGsS_qjx9UtvFe1I3bOEpKt8C-UDUkA",
    authDomain: "gdg-hackathon-6a79b.firebaseapp.com",
    projectId: "gdg-hackathon-6a79b",
    storageBucket: "gdg-hackathon-6a79b.firebasestorage.app",
    messagingSenderId: "659274898331",
    appId: "1:659274898331:web:1c253cee2a48692931df3e",
    measurementId: "G-J8C9S61MZS"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);

