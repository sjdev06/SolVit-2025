import { createItem, getAllItems, getItemById, resolveItem } from "../services/lostFoundService.js";

const testLostFoundService = async () => {
    try {
        console.log("🔹 Testing Lost & Found Service 🔹");

        // Test adding an item
        const newItem = {
            userId: "testUser123",
            title: "Lost Wallet",
            description: "Brown leather wallet lost near park",
            category: "Wallet",
            image: "https://example.com/wallet.jpg",
            location: "Central Park",
            status: "active"
        };
        const createdItem = await createItem(newItem);
        console.log("✅ Item Added:", createdItem);

        // Extract the ID from the created item
        const itemId = createdItem.id;

        // Test retrieving all items
        const items = await getAllItems();
        console.log("✅ Retrieved Items:", items);

        // Test fetching a specific item by ID
        if (itemId) {
            const item = await getItemById(itemId);
            console.log("✅ Retrieved Item by ID:", item);
        }

        // Test resolving an item
        if (itemId) {
            await resolveItem(itemId);
            console.log("✅ Item Marked as Resolved:", itemId);
        }
    } catch (error) {
        console.error("❌ Test Failed:", error.message);
    }
    finally {// force exits
        process.exit(0);
    }
};

testLostFoundService();
