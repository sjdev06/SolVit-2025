import express from 'express';
import {
    getUserListingsController,
    updateUserListingController,
    deleteUserListingController,
    markUserListingStatusController
} from '../controller/userListingsController.js';

const router = express.Router();

// 🔹 Routes for user listings
router.get('/', getUserListingsController); // Get all user listings
router.patch('/:collectionName/:itemId', updateUserListingController); // Update a listing
router.delete('/:collectionName/:itemId', deleteUserListingController); // Delete a listing
router.patch('/:collectionName/:itemId/status', markUserListingStatusController); // Mark as resolved/sold

export default router;