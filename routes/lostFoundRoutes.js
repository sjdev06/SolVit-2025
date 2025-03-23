import express from 'express';
import {
    addLostFoundItem,
    getAllLostFoundItems,
    getLostFoundItemById,
    resolveLostFoundItem,
    deleteLostFoundItem
} from '../controller/lostFoundController.js';

const router = express.Router();

router.post('/create', addLostFoundItem);
router.get('/', getAllLostFoundItems);
router.get('/:itemId', getLostFoundItemById);
router.patch('/:itemId/resolve', resolveLostFoundItem);
router.delete('/:itemId', deleteLostFoundItem);

export default router;