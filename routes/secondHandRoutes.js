import express from "express";
import {
    addSecondHandItem,
    getAllSecondHandItems,
    getSecondHandItemById,
    updateSecondHandItemStatus,
    deleteSecondHandItem
} from "../controllers/secondHandController.js";

const router = express.Router();

// Create a second-hand item
router.post('/create', addSecondHandItem);

// Get all second-hand items
router.get('/', getAllSecondHandItems);

// Get a specific second-hand item by ID
router.get('/:itemId', getSecondHandItemById);

// Mark an item as sold
router.patch('/:itemId/sold', updateSecondHandItemStatus);

// Delete a second-hand item
router.delete('/:itemId', deleteSecondHandItem);

export default router;
