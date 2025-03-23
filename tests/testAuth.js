import { signup, login } from "../services/authService.js";

const testEmail = "testuser@example.com";
const testPassword = "password123";

const testAuthFlow = async () => {
    try {
        // First, sign up the user
        await signup(testEmail, testPassword);
        console.log("✅ Signup Successful");

        // Then, attempt login
        const user = await login(testEmail, testPassword);
        console.log("✅ Login Successful:", user);
    } catch (error) {
        console.error("❌ Error:", error.message);
    }
    finally {
        process.exit(0);
    }
};

testAuthFlow();
