import { createItem, getAllItems, getItemById, updateItemStatus, deleteItem } from '../services/lostFoundService.js';

// Controller to add a new item
export const addLostFoundItem = async (req, res) => {
    try {
        const newItem = req.body; // Getting item data from request body
        const createdItem = await createItem(newItem); // Adding item via service
        res.status(201).json({ message: 'Item added successfully', item: createdItem });
    } catch (error) {
        res.status(500).json({ error: 'Error adding item: ' + error.message });
    }
};

// Controller to get all items
export const getAllLostFoundItems = async (req, res) => {
    try {
        const { category, location, fromDate, toDate, lastVisible, pageSize } = req.query;
        const options = {
            category,
            location,
            fromDate: fromDate ? new Date(fromDate) : undefined,
            toDate: toDate ? new Date(toDate) : undefined,
            lastVisible,
            pageSize: pageSize ? parseInt(pageSize) : 10
        };
        const result = await getAllItems(options);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching items: ' + error.message });
    }
};

// Controller to get an item by ID
export const getLostFoundItemById = async (req, res) => {
    try {
        const itemId = req.params.id; // Getting item ID from URL
        const item = await getItemById(itemId);
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching item: ' + error.message });
    }
};

// Controller to update item status (e.g., marking as sold)
export const updateLostFoundItemStatus = async (req, res) => {
    try {
        const itemId = req.params.id;
        const { status } = req.body; // Status to update (e.g., "sold", "found")
        const updatedItem = await updateItemStatus(itemId, status);
        if (!updatedItem) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.status(200).json({ message: 'Item status updated', item: updatedItem });
    } catch (error) {
        res.status(500).json({ error: 'Error updating item status: ' + error.message });
    }
};

// Controller to delete an item
export const deleteLostFoundItem = async (req, res) => {
    try {
        const itemId = req.params.id;
        const deletedItem = await deleteItem(itemId);
        if (!deletedItem) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting item: ' + error.message });
    }
};
