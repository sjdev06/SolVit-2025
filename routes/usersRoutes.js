import express from 'express';
import { addUser, getUser } from '../controller/usersController.js';

const router = express.Router();

router.post('/', addUser);
router.get('/:uid', getUser);

export default router;