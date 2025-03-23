import { db } from "../config/firestoreConfig.js";
import {
    collection, getDocs, getDoc, doc, updateDoc, deleteDoc, query, where
} from "firebase/firestore";

// 🔹 Get all listings for a user
const getUserListings = async (userId) => {
    try {
        const lostFoundQuery = query(collection(db, "lost_found"), where("userId", "==", userId));
        const sellDonateQuery = query(collection(db, "sell_donate"), where("userId", "==", userId));

        const [lostFoundSnap, sellDonateSnap] = await Promise.all([
            getDocs(lostFoundQuery),
            getDocs(sellDonateQuery)
        ]);

        return {
            lostFound: lostFoundSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })),
            sellDonate: sellDonateSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        };
    } catch (error) {
        throw new Error("Error fetching user listings: " + error.message);
    }
};

// 🔹 Update a listing
const updateListing = async (collectionName, itemId, updateData) => {
    try {
        const itemRef = doc(db, collectionName, itemId);
        const docSnap = await getDoc(itemRef);

        if (!docSnap.exists()) {
            throw new Error("Item not found");
        }

        await updateDoc(itemRef, updateData);
        return { message: "Item updated successfully" };
    } catch (error) {
        throw new Error("Error updating item: " + error.message);
    }
};

// 🔹 Delete a listing
const deleteListing = async (collectionName, itemId) => {
    try {
        await deleteDoc(doc(db, collectionName, itemId));
        return { message: "Item deleted successfully" };
    } catch (error) {
        throw new Error("Error deleting item: " + error.message);
    }
};

// 🔹 Mark as Resolved/Sold
const markAsResolvedOrSold = async (collectionName, itemId, status) => {
    try {
        const itemRef = doc(db, collectionName, itemId);
        await updateDoc(itemRef, { status });
        return { message: `Item marked as ${status}` };
    } catch (error) {
        throw new Error(`Error updating item status: ${error.message}`);
    }
};

export { getUserListings, updateListing, deleteListing, markAsResolvedOrSold };
