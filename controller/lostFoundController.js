import { createItem, getAllItems, getItemById, resolveItem, deleteItem } from '../services/lostFoundService.js';

const DEMO_USER_ID = "demoUser";

export const addLostFoundItem = async (req, res) => {
    try {
        const newItem = { ...req.body, userId: DEMO_USER_ID };
        const createdItem = await createItem(newItem);
        res.status(201).json({ message: 'Item added successfully', item: createdItem });
    } catch (error) {
        res.status(500).json({ error: 'Error adding item: ' + error.message });
    }
};

export const getAllLostFoundItems = async (req, res) => {
    try {
        const { category, location } = req.query;
        const options = { category, location };
        const result = await getAllItems(options);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching items: ' + error.message });
    }
};

export const getLostFoundItemById = async (req, res) => {
    try {
        const itemId = req.params.itemId;
        const item = await getItemById(itemId);
        res.status(200).json(item);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

export const resolveLostFoundItem = async (req, res) => {
    try {
        const itemId = req.params.itemId;
        const result = await resolveItem(itemId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error resolving item: ' + error.message });
    }
};

export const deleteLostFoundItem = async (req, res) => {
    try {
        const itemId = req.params.itemId;
        const result = await deleteItem(itemId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error deleting item: ' + error.message });
    }
};