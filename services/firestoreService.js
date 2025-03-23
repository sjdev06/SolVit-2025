import { db } from "../config/firestoreConfig.js";
import {
    collection, addDoc, getDocs,
    doc, updateDoc, deleteDoc, serverTimestamp
} from "firebase/firestore";

// 🔹 Add Item (Create)
const addItem = async (type, itemData) => {
    try {
        const docRef = await addDoc(collection(db, type), {
            ...itemData,
            createdAt: serverTimestamp(),
        });
        console.log(`✅ Added Document (${type}): ID -> ${docRef.id}`);
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error(`❌ Error Adding Document: ${error.code} - ${error.message}`);
        return { success: false, error: error.message };
    }
};

// 🔹 Get Items (Read)
const getItems = async (type) => {
    try {
        const querySnapshot = await getDocs(collection(db, type));
        const items = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        console.log(`📄 Fetched ${items.length} Items from (${type})`);
        return { success: true, data: items };
    } catch (error) {
        console.error(`❌ Error Fetching Documents: ${error.code} - ${error.message}`);
        return { success: false, error: error.message };
    }
};

// 🔹 Update Item (Edit)
const updateItem = async (type, itemId, updatedData) => {
    try {
        const itemRef = doc(db, type, itemId);
        await updateDoc(itemRef, updatedData);
        console.log(`✅ Updated Document (${type}): ID -> ${itemId}`);
        return { success: true };
    } catch (error) {
        console.error(`❌ Error Updating Document: ${error.code} - ${error.message}`);
        return { success: false, error: error.message };
    }
};

// 🔹 Delete Item (Remove)
const deleteItem = async (type, itemId) => {
    try {
        await deleteDoc(doc(db, type, itemId));
        console.log(`🗑 Deleted Document (${type}): ID -> ${itemId}`);
        return { success: true };
    } catch (error) {
        console.error(`❌ Error Deleting Document: ${error.code} - ${error.message}`);
        return { success: false, error: error.message };
    }
};

export { addItem, getItems, updateItem, deleteItem };
