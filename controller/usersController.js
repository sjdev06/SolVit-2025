import { createUser, getUserById } from '../services/usersService.js';

export const addUser = async (req, res) => {
    try {
        const { uid, email, username } = req.body;
        if (!uid || !email || !username) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const newUser = await createUser(uid, { email, username });
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ error: 'Error creating user: ' + error.message });
    }
};

export const getUser = async (req, res) => {
    try {
        const uid = req.params.uid;
        const user = await getUserById(uid);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching user: ' + error.message });
    }
};