import assert from "assert";
import { createItem, getAllItems, getItemById, resolveItem, deleteItem } from "../services/lostFoundService.js";
import { createSellItem, getAllSellItems, markAsSold, deleteSellItem } from "../services/sellDonateService.js";

const runTests = async () => {
    console.log("Running tests...");

    try {
        // 🔹 Test Lost & Found Item Creation
        const lostItemData = {
            title: "Lost Wallet",
            category: "Accessories",
            location: "NYC",
            userId: "user123",
            description: "Black leather wallet",
            status: "active"
        };

        const lostItem = await createItem(lostItemData);
        console.log("Created Lost Item:", lostItem);

        assert.ok(lostItem && lostItem.id, "Lost item creation failed");
        console.log("✅ Lost item created successfully");

        // 🔹 Test Fetching Lost & Found Items
        const items = await getAllItems();
        console.log("Fetched Items:", items); // Debugging line

        assert.ok(Array.isArray(items) && items.length > 0, "Fetching items failed");
        console.log("✅ Items fetched successfully");

        // 🔹 Test Fetching an Item by ID
        const fetchedItem = await getItemById(lostItem.id);
        console.log("Fetched Item by ID:", fetchedItem);

        assert.ok(fetchedItem && fetchedItem.id === lostItem.id, "Item fetch by ID failed");
        console.log("✅ Item fetched by ID successfully");

        // 🔹 Test Resolving an Item
        await resolveItem(lostItem.id);
        const resolvedItem = await getItemById(lostItem.id);
        console.log("Resolved Item:", resolvedItem);

        assert.ok(resolvedItem && resolvedItem.status === "resolved", "Resolving item failed");
        console.log("✅ Item resolved successfully");

        // 🔹 Test Deleting an Item
        await deleteItem(lostItem.id);
        console.log("✅ Item deleted successfully");

        // 🔹 Test Sell/Donate Item Creation
        const sellItemData = {
            title: "Old Laptop",
            price: 500,
            userId: "user123",
            category: "Electronics",
            description: "Used laptop in good condition",
            location: "NYC"
        };

        const sellItem = await createSellItem(sellItemData);
        console.log("Created Sell Item:", sellItem);

        assert.ok(sellItem && sellItem.id, "Sell item creation failed");
        console.log("✅ Sell item created successfully");

        // 🔹 Test Fetching Sell/Donate Items
        const sellItems = await getAllSellItems();
        console.log("Fetched Sell Items:", sellItems);

        assert.ok(Array.isArray(sellItems) && sellItems.length > 0, "Fetching sell items failed");
        console.log("✅ Sell items fetched successfully");

        // 🔹 Test Marking Item as Sold
        await markAsSold(sellItem.id);
        const soldItem = await getItemById(sellItem.id);
        console.log("Marked as Sold:", soldItem);

        assert.ok(soldItem && soldItem.status === "sold", "Marking item as sold failed");
        console.log("✅ Item marked as sold successfully");

        // 🔹 Test Deleting a Sell Item
        await deleteSellItem(sellItem.id);
        console.log("✅ Sell item deleted successfully");

        console.log("All tests passed! 🎉");
    } catch (error) {
        console.error("❌ Test failed:", error.message);
    } finally {
        process.exit(0);
    }
};

runTests();
