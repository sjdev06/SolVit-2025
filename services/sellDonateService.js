import { db } from "../config/firestoreConfig.js";
import { collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc, serverTimestamp } from "firebase/firestore";

// 🔹 Create a sell item
const createSellItem = async (itemData) => {
    try {
        const newItem = {
            ...itemData,
            datePosted: serverTimestamp(),
            status: itemData.status || 'available'
        };
        const docRef = await addDoc(collection(db, 'sell_donate'), newItem);
        return { id: docRef.id, ...newItem };
    } catch (error) {
        throw new Error("Error adding sell item: " + error.message);
    }
};

// 🔹 Get all sell items
const getAllSellItems = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'sell_donate'));
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        throw new Error("Error fetching sell items: " + error.message);
    }
};

// 🔹 Mark an item as sold
const markAsSold = async (itemId) => {
    try {
        const docRef = doc(db, 'sell_donate', itemId);
        await updateDoc(docRef, { status: 'sold' });
        return { message: "Item marked as sold" };
    } catch (error) {
        throw new Error("Error updating item: " + error.message);
    }
};

// 🔹 Delete a sell item
const deleteSellItem = async (itemId) => {
    try {
        await deleteDoc(doc(db, 'sell_donate', itemId));
        return { message: "Item deleted successfully" };
    } catch (error) {
        throw new Error("Error deleting item: " + error.message);
    }
};

export { createSellItem, getAllSellItems, markAsSold, deleteSellItem };
