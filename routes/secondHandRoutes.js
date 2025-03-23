import express from 'express';
import {
    addSecondHandItem,
    getAllSecondHandItems,
    getSecondHandItemById,
    markSecondHandItemAsSold,
    deleteSecondHandItem
} from '../controller/secondHandController.js';

const router = express.Router();

router.post('/create', addSecondHandItem);
router.get('/', getAllSecondHandItems);
router.get('/:itemId', getSecondHandItemById);
router.patch('/:itemId/sold', markSecondHandItemAsSold);
router.delete('/:itemId', deleteSecondHandItem);

export default router;