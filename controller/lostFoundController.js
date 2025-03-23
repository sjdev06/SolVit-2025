import express from "express";
import {
    createItem,
    getAllItems,
    getItemById,
    resolveItem,
    deleteItem
} from "../services/lostFoundService.js";

const router = express.Router();

// 🔹 Create Lost/Found Item
router.post("/create", async (req, res) => {
    try {
        const newItem = await createItem(req.body);
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 🔹 Get All Lost/Found Items
router.get("/", async (req, res) => {
    try {
        const items = await getAllItems();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 🔹 Get Specific Item by ID
router.get("/:id", async (req, res) => {
    try {
        const item = await getItemById(req.params.id);
        res.status(200).json(item);
    } catch (error) {
        res.status(404).json({ error: "Item not found" });
    }
});

// 🔹 Mark Item as Resolved
router.patch("/resolve/:id", async (req, res) => {
    try {
        await resolveItem(req.params.id);
        res.status(200).json({ message: "Item marked as resolved" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 🔹 Delete Lost/Found Item
router.delete("/:id", async (req, res) => {
