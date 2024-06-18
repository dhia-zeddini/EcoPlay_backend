import express from 'express';
import {
  createContract,
  getAllContracts,
  getContractById,
  updateContract,
  deleteContract,
  getContractsByUser
} from '../controllers/contractController.js';
import { verifyAndAuth, verifyAdmin } from '../middleware/verifyToken.js';

const router = express.Router();

// Route to create a new contract
router.post('/create', createContract);

// Route to get all contracts
router.get('/all', getAllContracts);

// Route to get contracts by user ID
router.post('/getByUser', getContractsByUser);

// Route to get a contract by ID
router.post('/getById', getContractById);

// Route to update a contract by ID
router.put('/update', verifyAdmin, updateContract);

// Route to delete a contract by ID
router.delete('/delete', verifyAdmin, deleteContract);

export default router;
