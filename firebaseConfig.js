// Import Firebase core functions
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase configuration (keep this secret in production)
const firebaseConfig = {
  apiKey: "AIzaSyDlLCx4HiPSnLsDRNd9LkznnHwTNzRhZgs",
  authDomain: "traceit-2fb70.firebaseapp.com",
  projectId: "traceit-2fb70",
  storageBucket: "traceit-2fb70.appspot.com",  // Fixed incorrect URL
  messagingSenderId: "579731167386",
  appId: "1:579731167386:web:6e257a14dc67c38820e723",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);  // 🔹 Add this line

// Export for use in other files
export { auth };
