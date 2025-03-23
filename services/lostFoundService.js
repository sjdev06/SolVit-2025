import { db } from "../config/firestoreConfig.js";
import {
    collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc, serverTimestamp, query, where,
    orderBy, limit
} from "firebase/firestore";

// 🔹 Create a lost or found item
const createItem = async (itemData) => {
    console.log("DEBUG: Received itemData =", itemData); // Add this line
    if (!itemData || typeof itemData !== 'object') {
        throw new Error("Invalid item data provided");
    }
    if (!itemData.category || !itemData.location) {
        throw new Error("Missing required fields: category, location");
    }

    try {
        const newItem = {
            ...itemData,
            datePosted: serverTimestamp(),
            status: itemData.status || 'active'
        };
        const docRef = await addDoc(collection(db, 'lost_found'), newItem);
        return { id: docRef.id, ...newItem };
    } catch (error) {
        throw new Error("Error adding lost/found item: " + error.message);
    }
};


// 🔹 Get filtered lost & found items with pagination
const getAllItems = async (options = {}) => {
    const {
        category,
        location,
        fromDate,
        toDate,
        lastVisible,
        pageSize = 10
    } = options;

    try {
        // console.log("Here for item ********************111111");
        let q = collection(db, 'lost_found');
        let conditions = [];

        if (category) conditions.push(where("category", "==", category));
        if (location) conditions.push(where("location", "==", location));
        if (fromDate && toDate) conditions.push(
            where("datePosted", ">=", fromDate),
            where("datePosted", "<=", toDate)
        );

        // console.log("Here for item ********************");

        // Combine conditions, orderBy and limit in one query
        q = query(q, ...conditions, orderBy("datePosted", "desc"), limit(pageSize));

        if (lastVisible) {
            q = query(q, startAfter(lastVisible), orderBy("datePosted", "desc"), limit(pageSize));
        }

        const querySnapshot = await getDocs(q);
        console.log(querySnapshot.docs);

        const items = querySnapshot.docs.map(doc => {
            const data = doc.data();
            if (!data) return null;  // Handle missing data gracefully
            return { id: doc.id, ...data };
        }).filter(item => item !== null);  // Filter out null values if any

        return {
            items,
            lastVisible: querySnapshot.docs[querySnapshot.docs.length - 1] || null
        };
    } catch (error) {
        throw new Error("Error fetching items: " + error.message);
    }
};

// 🔹 Search for items by keyword
const searchItems = async (keyword) => {
    try {
        const querySnapshot = await getDocs(collection(db, 'lost_found'));
        const filteredItems = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            .filter(item => item.title.toLowerCase().includes(keyword.toLowerCase()) ||
                item.description.toLowerCase().includes(keyword.toLowerCase()));
        return filteredItems;
    } catch (error) {
        throw new Error("Error searching items: " + error.message);
    }
};

// 🔹 Get a specific item by ID
const getItemById = async (itemId) => {
    try {
        const docRef = doc(db, 'lost_found', itemId);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
            throw new Error("Item not found");
        }
        return { id: docSnap.id, ...docSnap.data() };
    } catch (error) {
        throw new Error("Error fetching item: " + error.message);
    }
};

// 🔹 Mark an item as resolved
const resolveItem = async (itemId) => {
    try {
        const docRef = doc(db, 'lost_found', itemId);
        await updateDoc(docRef, { status: 'resolved' });
        return { message: "Item marked as resolved" };
    } catch (error) {
        throw new Error("Error updating item: " + error.message);
    }
};

// 🔹 Delete an item (if needed)
const deleteItem = async (itemId) => {
    try {
        await deleteDoc(doc(db, 'lost_found', itemId));
        return { message: "Item deleted successfully" };
    } catch (error) {
        throw new Error("Error deleting item: " + error.message);
    }
};

export { createItem, getAllItems, searchItems, getItemById, resolveItem, deleteItem };
