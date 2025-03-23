import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase configuration (keep this secret in production)
const firebaseConfig = {
    apiKey: "AIzaSyDlLCx4HiPSnLsDRNd9LkznnHwTNzRhZgs",
    authDomain: "traceit-2fb70.firebaseapp.com",
    projectId: "traceit-2fb70",
    storageBucket: "traceit-2fb70.appspot.com",  // Fixed incorrect URL
    messagingSenderId: "579731167386",
    appId: "1:579731167386:web:6e257a14dc67c38820e723",
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
