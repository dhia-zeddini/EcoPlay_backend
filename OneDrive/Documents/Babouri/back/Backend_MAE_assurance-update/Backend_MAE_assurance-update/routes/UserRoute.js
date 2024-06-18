import express from "express";
import { createUser, updateAccount, deleteAccount, getUser, getAllUsers, getAllAdmins } from '../controllers/userController.js';
import {verifyAdmin,verifyAndAuth,} from "../middleware/verifyToken.js"; 
const router = express.Router();

// Route to create a new user by admin
router.post('/create',  createUser);

// Other user routes
router.put('/update', verifyAdmin, updateAccount);
router.delete('/delete', verifyAdmin, deleteAccount);
router.post('/get', verifyAdmin, getUser);
router.get('/users', verifyAdmin, getAllUsers);
router.get('/admins', verifyAdmin, getAllAdmins);

export default router;
