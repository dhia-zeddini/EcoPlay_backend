import express from 'express';
import { body } from 'express-validator'; // Import the 'body' object


import { Router } from 'express';
import {
  addP,
  getPById,
  getAllP,
  updateP,
  deleteP,
} from '../controllers/ProduitC.js';
const router = Router();

// Create a new producSt
router.post('/add', addP);

// Get a product by ID
router.get('/', getPById);

// Get all products
router.get('/getall', getAllP);

// Update a product by ID
router.put('/', updateP);

// Delete a product by ID
router.delete('/', deleteP);

export default router;