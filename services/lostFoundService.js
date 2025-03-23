import db from "../config/firestoreConfig.js";
import { collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc, serverTimestamp, query, where } from "firebase/firestore";

const createItem = async (itemData) => {
    if (!itemData.title || !itemData.description || !itemData.category || !itemData.location || !itemData.type) {
        throw new Error("Missing required fields");
    }
    if (!['lost', 'found'].includes(itemData.type)) {
        throw new Error("Invalid type: must be 'lost' or 'found'");
    }
    const newItem = {
        ...itemData,
        datePosted: serverTimestamp(),
        status: itemData.status || 'active'
    };
    const docRef = await addDoc(collection(db, 'lost_found'), newItem);
    return { id: docRef.id, ...newItem };
};

const getAllItems = async (options = {}) => {
    const { category, location } = options;
    let q = collection(db, 'lost_found');
    const conditions = [];
    if (category) conditions.push(where("category", "==", category));
    if (location) conditions.push(where("location", "==", location));
    q = query(q, ...conditions);
    const querySnapshot = await getDocs(q);
    const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return { items, lastVisible: null };
};

const getItemById = async (itemId) => {
    const docRef = doc(db, 'lost_found', itemId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) throw new Error("Item not found");
    return { id: docSnap.id, ...docSnap.data() };
};

const resolveItem = async (itemId) => {
    const docRef = doc(db, 'lost_found', itemId);
    await updateDoc(docRef, { status: 'resolved' });
    return { message: "Item marked as resolved" };
};

const deleteItem = async (itemId) => {
    await deleteDoc(doc(db, 'lost_found', itemId));
    return { message: "Item deleted successfully" };
};

export { createItem, getAllItems, getItemById, resolveItem, deleteItem };