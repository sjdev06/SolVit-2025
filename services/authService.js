import { auth } from "../config/firebaseConfig.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

// 🔹 User Signup
const signup = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log(`✅ Signup Success: UID -> ${userCredential.user.uid}`);
        return { success: true, user: userCredential.user };
    } catch (error) {
        console.error(`❌ Signup Error: ${error.code} - ${error.message}`);
        return { success: false, error: error.message };
    }
};

// 🔹 User Login
const login = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log(`✅ Login Success: UID -> ${userCredential.user.uid}`);
        return { success: true, user: userCredential.user };
    } catch (error) {
        console.error(`❌ Login Error: ${error.code} - ${error.message}`);
        return { success: false, error: error.message };
    }
};

export { signup, login };
