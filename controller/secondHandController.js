import { createItem, getAllItems, getItemById, markAsSold, deleteItem } from '../services/secondHandService.js';

const DEMO_USER_ID = "demoUser";

export const addSecondHandItem = async (req, res) => {
    try {
        const newItem = { ...req.body, userId: DEMO_USER_ID };
        const createdItem = await createItem(newItem);
        res.status(201).json({ message: 'Item added successfully', item: createdItem });
    } catch (error) {
        res.status(500).json({ error: 'Error adding item: ' + error.message });
    }
};

export const getAllSecondHandItems = async (req, res) => {
    try {
        const { category, condition } = req.query;
        const options = { category, condition };
        const result = await getAllItems(options);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching items: ' + error.message });
    }
};

export const getSecondHandItemById = async (req, res) => {
    try {
        const itemId = req.params.itemId;
        const item = await getItemById(itemId);
        res.status(200).json(item);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

export const markSecondHandItemAsSold = async (req, res) => {
    try {
        const itemId = req.params.itemId;
        const result = await markAsSold(itemId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error marking item as sold: ' + error.message });
    }
};

export const deleteSecondHandItem = async (req, res) => {
    try {
        const itemId = req.params.itemId;
        const result = await deleteItem(itemId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error deleting item: ' + error.message });
    }
};