import { db } from "../config/firestoreConfig.js";
import { collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc, serverTimestamp } from "firebase/firestore";

// 🔹 Create a second-hand item
const createItem = async (itemData) => {
    try {
        const newItem = {
            ...itemData,
            price: itemData.donate ? 0 : itemData.price, // Set price to 0 if donated
            datePosted: serverTimestamp(),
            status: itemData.status || "available"
        };
        const docRef = await addDoc(collection(db, "second_hand"), newItem);
        return { id: docRef.id, ...newItem };
    } catch (error) {
        throw new Error("Error adding second-hand item: " + error.message);
    }
};

// 🔹 Get all second-hand items
const getAllItems = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "second_hand"));
        return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        throw new Error("Error fetching items: " + error.message);
    }
};

// 🔹 Get a specific item by ID
const getItemById = async (itemId) => {
    try {
        const docRef = doc(db, "second_hand", itemId);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
            throw new Error("Item not found");
        }
        return { id: docSnap.id, ...docSnap.data() };
    } catch (error) {
        throw new Error("Error fetching item: " + error.message);
    }
};

// 🔹 Mark an item as sold
const markAsSold = async (itemId) => {
    try {
        const docRef = doc(db, "second_hand", itemId);
        await updateDoc(docRef, { status: "sold" });
        return { message: "Item marked as sold" };
    } catch (error) {
        throw new Error("Error updating item: " + error.message);
    }
};

// 🔹 Delete an item
const deleteItem = async (itemId) => {
    try {
        await deleteDoc(doc(db, "second_hand", itemId));
        return { message: "Item deleted successfully" };
    } catch (error) {
        throw new Error("Error deleting item: " + error.message);
    }
};

export { createItem, getAllItems, getItemById, markAsSold, deleteItem };
