import express from "express";
import { getUserListings, updateListing, deleteListing, markAsResolvedOrSold } from "../services/userListingsService.js";

const router = express.Router();

// 🔹 Get all user listings
router.get("/:userId", async (req, res) => {
    try {
        const listings = await getUserListings(req.params.userId);
        res.json(listings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 🔹 Update a listing
router.put("/:collection/:itemId", async (req, res) => {
    try {
        const { collection, itemId } = req.params;
        const response = await updateListing(collection, itemId, req.body);
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 🔹 Delete a listing
router.delete("/:collection/:itemId", async (req, res) => {
    try {
        const { collection, itemId } = req.params;
        const response = await deleteListing(collection, itemId);
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 🔹 Mark as Resolved or Sold
router.post("/:collection/:itemId/status", async (req, res) => {
    try {
        const { collection, itemId } = req.params;
        const { status } = req.body; // expected values: "resolved" or "sold"
        const response = await markAsResolvedOrSold(collection, itemId, status);
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
