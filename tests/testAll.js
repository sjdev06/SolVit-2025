import fetch from 'node-fetch';
import { strict as assert } from 'assert';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

// Replace with your Firebase config from Firebase Console > Project Settings > General > Your Apps
const firebaseConfig = {
    apiKey: "AIzaSyDlLCx4HiPSnLsDRNd9LkznnHwTNzRhZgs",
    authDomain: "traceit-2fb70.firebaseapp.com",
    projectId: "traceit-2fb70",
    storageBucket: "traceit-2fb70.appspot.com",  // Fixed incorrect URL
    messagingSenderId: "579731167386",
    appId: "1:579731167386:web:6e257a14dc67c38820e723",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const BASE_URL = 'http://localhost:3000';
const testEmail = 'testuser@example.com';
const testPassword = 'password123';

async function testAll() {
    let idToken, userId;
    try {
        // 1. Setup: Sign up and get ID token
        console.log('Testing signup...');
        const userCredential = await createUserWithEmailAndPassword(auth, testEmail, testPassword);
        idToken = await userCredential.user.getIdToken();
        userId = userCredential.user.uid;
        assert(idToken, 'Firebase signup should provide an ID token');
        console.log('✅ Signup successful');

        // 2. Test Lost & Found Routes
        console.log('Testing Lost & Found routes...');
        // Create Lost Item
        const lostItemData = {
            title: 'Lost Wallet',
            description: 'Black leather wallet',
            category: 'Personal Items',
            location: 'Downtown',
            type: 'lost',
            userId
        };
        const createLostRes = await fetch(`${BASE_URL}/lost-found/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${idToken}` },
            body: JSON.stringify(lostItemData)
        });
        const createLostJson = await createLostRes.json();
        assert(createLostRes.status === 201, `Expected 201, got ${createLostRes.status}`);
        assert(createLostJson.message === 'Item added successfully', 'Lost item creation failed');
        const lostItemId = createLostJson.item.id;
        console.log('✅ Created lost item');

        // Get All Lost/Found Items
        const getAllLostRes = await fetch(`${BASE_URL}/lost-found`, {
            headers: { 'Authorization': `Bearer ${idToken}` }
        });
        const getAllLostJson = await getAllLostRes.json();
        assert(getAllLostRes.status === 200, `Expected 200, got ${getAllLostRes.status}`);
        assert(Array.isArray(getAllLostJson.items), 'Expected array of lost/found items');
        console.log('✅ Fetched all lost/found items');

        // Get Lost Item by ID
        // Get Lost Item by ID
        const getLostByIdRes = await fetch(`${BASE_URL}/lost-found/${lostItemId}`, {
            headers: { 'Authorization': `Bearer ${idToken}` }
        });
        const getLostByIdJson = await getLostByIdRes.json();
        console.log('Get Lost Item by ID Response:', getLostByIdJson);
        assert(getLostByIdRes.status === 200, `Expected 200, got ${getLostByIdRes.status}`);
        assert(getLostByIdJson.id === lostItemId, 'Fetched item ID mismatch');
        console.log('✅ Fetched lost item by ID');

        // Resolve Lost Item
        const resolveLostRes = await fetch(`${BASE_URL}/lost-found/${lostItemId}/resolve`, {
            method: 'PATCH',
            headers: { 'Authorization': `Bearer ${idToken}` }
        });
        const resolveLostJson = await resolveLostRes.json();
        assert(resolveLostRes.status === 200, `Expected 200, got ${resolveLostRes.status}`);
        assert(resolveLostJson.message === 'Item marked as resolved', 'Resolve failed');
        console.log('✅ Resolved lost item');

        // Delete Lost Item
        const deleteLostRes = await fetch(`${BASE_URL}/lost-found/${lostItemId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${idToken}` }
        });
        const deleteLostJson = await deleteLostRes.json();
        assert(deleteLostRes.status === 200, `Expected 200, got ${deleteLostRes.status}`);
        assert(deleteLostJson.message === 'Item deleted successfully', 'Delete failed');
        console.log('✅ Deleted lost item');

        // 3. Test Second-Hand Routes
        console.log('Testing Second-Hand routes...');
        // Create Second-Hand Item
        const secondHandItemData = {
            title: 'Used Laptop',
            description: 'Good condition',
            price: 200,
            condition: 'good',
            donate: false,
            userId
        };
        const createSecondHandRes = await fetch(`${BASE_URL}/second-hand/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${idToken}` },
            body: JSON.stringify(secondHandItemData)
        });
        const createSecondHandJson = await createSecondHandRes.json();
        assert(createSecondHandRes.status === 201, `Expected 201, got ${createSecondHandRes.status}`);
        assert(createSecondHandJson.message === 'Item added successfully', 'Second-hand creation failed');
        const secondHandItemId = createSecondHandJson.item.id;
        console.log('✅ Created second-hand item');

        // Get All Second-Hand Items
        const getAllSecondHandRes = await fetch(`${BASE_URL}/second-hand`, {
            headers: { 'Authorization': `Bearer ${idToken}` }
        });
        const getAllSecondHandJson = await getAllSecondHandRes.json();
        assert(getAllSecondHandRes.status === 200, `Expected 200, got ${getAllSecondHandRes.status}`);
        assert(Array.isArray(getAllSecondHandJson.items), 'Expected array of second-hand items');
        console.log('✅ Fetched all second-hand items');

        // Get Second-Hand Item by ID
        const getSecondHandByIdRes = await fetch(`${BASE_URL}/second-hand/${secondHandItemId}`, {
            headers: { 'Authorization': `Bearer ${idToken}` }
        });
        const getSecondHandByIdJson = await getSecondHandByIdRes.json();
        assert(getSecondHandByIdRes.status === 200, `Expected 200, got ${getSecondHandByIdRes.status}`);
        assert(getSecondHandByIdJson.id === secondHandItemId, 'Fetched item ID mismatch');
        console.log('✅ Fetched second-hand item by ID');

        // Mark Second-Hand Item as Sold
        const markSoldRes = await fetch(`${BASE_URL}/second-hand/${secondHandItemId}/sold`, {
            method: 'PATCH',
            headers: { 'Authorization': `Bearer ${idToken}` }
        });
        const markSoldJson = await markSoldRes.json();
        assert(markSoldRes.status === 200, `Expected 200, got ${markSoldRes.status}`);
        assert(markSoldJson.message === 'Item marked as sold', 'Mark as sold failed');
        console.log('✅ Marked second-hand item as sold');

        // Delete Second-Hand Item
        const deleteSecondHandRes = await fetch(`${BASE_URL}/second-hand/${secondHandItemId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${idToken}` }
        });
        const deleteSecondHandJson = await deleteSecondHandRes.json();
        assert(deleteSecondHandRes.status === 200, `Expected 200, got ${deleteSecondHandRes.status}`);
        assert(deleteSecondHandJson.message === 'Item deleted successfully', 'Delete failed');
        console.log('✅ Deleted second-hand item');

        // 4. Test User Listings Routes
        console.log('Testing User Listings routes...');
        // Get User Listings
        const getUserListingsRes = await fetch(`${BASE_URL}/user-listings`, {
            headers: { 'Authorization': `Bearer ${idToken}` }
        });
        const getUserListingsJson = await getUserListingsRes.json();
        assert(getUserListingsRes.status === 200, `Expected 200, got ${getUserListingsRes.status}`);
        assert(getUserListingsJson.lostFound && getUserListingsJson.secondHand, 'Expected lostFound and secondHand arrays');
        console.log('✅ Fetched user listings');

        // Update a Listing (e.g., second-hand item)
        const updateListingRes = await fetch(`${BASE_URL}/user-listings/second_hand/${secondHandItemId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${idToken}` },
            body: JSON.stringify({ description: 'Updated description' })
        });
        const updateListingJson = await updateListingRes.json();
        assert(updateListingRes.status === 200, `Expected 200, got ${updateListingRes.status}`);
        assert(updateListingJson.message === 'Item updated successfully', 'Update failed');
        console.log('✅ Updated user listing');

        // Mark Listing Status (e.g., second-hand item as sold again for consistency)
        const markStatusRes = await fetch(`${BASE_URL}/user-listings/second_hand/${secondHandItemId}/status`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${idToken}` },
            body: JSON.stringify({ status: 'sold' })
        });
        const markStatusJson = await markStatusRes.json();
        assert(markStatusRes.status === 200, `Expected 200, got ${markStatusRes.status}`);
        assert(markStatusJson.message === 'Item marked as sold', 'Mark status failed');
        console.log('✅ Marked user listing status');

        console.log('✅ All tests passed successfully!');
    } catch (error) {
        console.error('❌ Test failed:', error.message);
    } finally {
        // Cleanup: Delete the test user
        try {
            await signOut(auth);
            await signInWithEmailAndPassword(auth, testEmail, testPassword);
            await auth.currentUser.delete();
            console.log('Cleanup: Test user deleted');
        } catch (cleanupError) {
            console.error('Cleanup failed:', cleanupError.message);
        }
        process.exit(0);
    }
}

testAll();