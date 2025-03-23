import {
    getUserListings,
    updateListing,
    deleteListing,
    markAsResolvedOrSold
} from '../services/userListingsService.js';

// 🔹 Get all listings for the authenticated user
export const getUserListingsController = async (req, res) => {
    try {
        const userId = req.user.uid; // Assuming user ID comes from Firebase Auth middleware
        const listings = await getUserListings(userId);
        res.status(200).json(listings);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching user listings: ' + error.message });
    }
};

// 🔹 Update a listing (Lost & Found or Second-Hand)
export const updateUserListingController = async (req, res) => {
    try {
        const { collectionName, itemId } = req.params;
        const updateData = req.body;
        const userId = req.user.uid;

        // Validate collection name
        if (!['lost_found', 'second_hand'].includes(collectionName)) {
            return res.status(400).json({ error: 'Invalid collection name' });
        }

        // Ensure the user owns the item (additional check can be done in service)
        const result = await updateListing(collectionName, itemId, updateData);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error updating listing: ' + error.message });
    }
};

// 🔹 Delete a listing (Lost & Found or Second-Hand)
export const deleteUserListingController = async (req, res) => {
    try {
        const { collectionName, itemId } = req.params;
        const userId = req.user.uid;

        if (!['lost_found', 'second_hand'].includes(collectionName)) {
            return res.status(400).json({ error: 'Invalid collection name' });
        }

        const result = await deleteListing(collectionName, itemId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error deleting listing: ' + error.message });
    }
};

// 🔹 Mark a listing as resolved or sold
export const markUserListingStatusController = async (req, res) => {
    try {
        const { collectionName, itemId } = req.params;
        const { status } = req.body; // e.g., "resolved" or "sold"
        const userId = req.user.uid;

        if (!['lost_found', 'second_hand'].includes(collectionName)) {
            return res.status(400).json({ error: 'Invalid collection name' });
        }

        if (!['resolved', 'sold'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }

        const result = await markAsResolvedOrSold(collectionName, itemId, status);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error updating listing status: ' + error.message });
    }
};