import { db } from "../config/firestoreConfig.js";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

const createUser = async (uid, userData) => {
    try {
        const { email, username } = userData;
        await setDoc(doc(db, "users", uid), {
            email,
            username,
            createdAt: serverTimestamp(),
        });
        return { uid, email, username };
    } catch (error) {
        throw new Error("Error creating user: " + error.message);
    }
};

const getUserById = async (uid) => {
    try {
        const userDoc = await getDoc(doc(db, "users", uid));
        if (!userDoc.exists()) {
            throw new Error("User not found");
        }
        return { uid: userDoc.id, ...userDoc.data() };
    } catch (error) {
        throw new Error("Error fetching user: " + error.message);
    }
};

export { createUser, getUserById };