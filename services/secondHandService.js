import db from "../config/firestoreConfig.js";
import { collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc, serverTimestamp, query, where } from "firebase/firestore";

const createItem = async (itemData) => {
    if (!itemData.title || !itemData.description || !itemData.price || !itemData.condition) {
        throw new Error("Missing required fields");
    }
    const newItem = {
        ...itemData,
        datePosted: serverTimestamp(),
        status: itemData.status || 'available'
    };
    const docRef = await addDoc(collection(db, 'second_hand'), newItem);
    return { id: docRef.id, ...newItem };
};

const getAllItems = async (options = {}) => {
    const { category, condition } = options;
    let q = collection(db, 'second_hand');
    const conditions = [];
    if (category) conditions.push(where("category", "==", category));
    if (condition) conditions.push(where("condition", "==", condition));
    q = query(q, ...conditions);
    const querySnapshot = await getDocs(q);
    const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return { items, lastVisible: null };
};

const getItemById = async (itemId) => {
    const docRef = doc(db, 'second_hand', itemId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) throw new Error("Item not found");
    return { id: docSnap.id, ...docSnap.data() };
};

const markAsSold = async (itemId) => {
    const docRef = doc(db, 'second_hand', itemId);
    await updateDoc(docRef, { status: 'sold' });
    return { message: "Item marked as sold" };
};

const deleteItem = async (itemId) => {
    await deleteDoc(doc(db, 'second_hand', itemId));
    return { message: "Item deleted successfully" };
};

export { createItem, getAllItems, getItemById, markAsSold, deleteItem };