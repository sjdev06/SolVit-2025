import express from 'express';
import {
    addLostFoundItem,
    getAllLostFoundItems,
    getLostFoundItemById,
    updateLostFoundItemStatus,
    deleteLostFoundItem
} from '../controllers/lostFoundController.js';

const router = express.Router();

// Create a lost or found item
router.post('/create', addLostFoundItem);

// Get all active lost & found items
router.get('/', getAllLostFoundItems);

// Get specific lost/found item by ID
router.get('/:itemId', getLostFoundItemById);

// Mark an item as resolved
router.patch('/:itemId/resolve', updateLostFoundItemStatus);

// Delete a lost/found item
router.delete('/:itemId', deleteLostFoundItem);

export default router;
