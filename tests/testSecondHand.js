import { createItem, getAllItems, getItemById, markAsSold, deleteItem } from "../services/secondHandService.js";

const testSecondHandService = async () => {
    try {
        console.log("🔹 Testing Second-Hand Service 🔹");

        // Test adding an item for sale
        const newItem = {
            userId: "testUser456",
            title: "Used Laptop",
            description: "Dell Inspiron 15, good condition",
            category: "Electronics",
            image: "https://example.com/laptop.jpg",
            location: "Downtown",
            price: 20000,
            donate: false, // Not a donation
            status: "available"
        };
        const addedItem = await createItem(newItem);
        console.log("✅ Item Added with ID:", addedItem.id, "Price:", addedItem.price);

        // Test adding a donated item
        const donatedItem = {
            userId: "testUser789",
            title: "Old Books",
            description: "Set of novels",
            category: "Books",
            image: "https://example.com/books.jpg",
            location: "Library",
            price: 500, // Should be overridden
            donate: true, // Marked for donation
            status: "available"
        };
        const addedDonatedItem = await createItem(donatedItem);
        console.log("✅ Donated Item Added with ID:", addedDonatedItem.id, "Price:", addedDonatedItem.price); // Should be 0

        // Test retrieving all items
        const items = await getAllItems();
        console.log("✅ Retrieved Items:", items);

        // Test fetching a specific item by ID
        if (addedItem.id) {
            const fetchedItem = await getItemById(addedItem.id);
            console.log("✅ Retrieved Item by ID:", fetchedItem);
        }

        // Test marking an item as sold
        if (addedItem.id) {
            await markAsSold(addedItem.id);
            console.log("✅ Item Marked as Sold:", addedItem.id);
        }

        // Test deleting an item
        if (addedItem.id) {
            await deleteItem(addedItem.id);
            console.log("✅ Item Deleted:", addedItem.id);
        }
    } catch (error) {
        console.error("❌ Test Failed:", error.message);
    }
    finally {
        process.exit(0);
    }
};

testSecondHandService();
