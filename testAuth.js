import { signup, login } from "./auth.js";

const testAuth = async () => {
  await signup("testuser@example.com", "password123");
  await login("testuser@example.com", "password123");
};


testAuth();
