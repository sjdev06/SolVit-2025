import express from 'express';
import { db } from '../config/firestoreConfig.js';
import { collection, addDoc, getDocs, getDoc, doc, updateDoc, serverTimestamp, query, where } from 'firebase/firestore';

const router = express.Router();

// Create a lost or found item
router.post('/create', async (req, res) => {
    try {
        const { userId, title, description, category, image, location, status } = req.body;
        const newItem = {
            userId,
            title,
            description,
            category,
            image,
            location,
            datePosted: serverTimestamp(), // Firestore timestamp
            status: status || 'active'
        };
        const docRef = await addDoc(collection(db, 'lost_found'), newItem);
        console.log(`New item created with ID: ${docRef.id}`);
        res.status(201).json({ id: docRef.id, ...newItem });
    } catch (error) {
        console.error("Error adding lost/found item:", error);
        res.status(500).json({ error: 'Error adding lost/found item', details: error.message });
    }
});

// Get all active lost & found items
router.get('/', async (req, res) => {
    try {
        const q = query(collection(db, 'lost_found'), where('status', '==', 'active'));
        const querySnapshot = await getDocs(q);
        const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log(`Fetched ${items.length} active items`);
        res.status(200).json(items);
    } catch (error) {
        console.error("Error fetching items:", error);
        res.status(500).json({ error: 'Error fetching items', details: error.message });
    }
});

// Get specific lost/found item by ID
router.get('/:itemId', async (req, res) => {
    try {
        console.log(`Fetching item with ID: ${req.params.itemId}`);
        const docRef = doc(db, 'lost_found', req.params.itemId);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.status(200).json({ id: docSnap.id, ...docSnap.data() });
    } catch (error) {
        console.error("Error fetching item:", error);
        res.status(500).json({ error: 'Error fetching item', details: error.message });
    }
});

// Mark an item as resolved
router.patch('/:itemId/resolve', async (req, res) => {
    try {
        console.log(`Marking item ${req.params.itemId} as resolved`);
        const docRef = doc(db, 'lost_found', req.params.itemId);
        await updateDoc(docRef, { status: 'resolved' });
        res.status(200).json({ message: 'Item marked as resolved' });
    } catch (error) {
        console.error("Error updating item:", error);
        res.status(500).json({ error: 'Error updating item', details: error.message });
    }
});

export default router;
