import { Router } from 'express';
import {
  addCart,addProductToCart,removeProductToCart,
  
} from '../controllers/CartC.js';
const router = Router();

// Create a new producSt
router.post('/add', addCart);
router.put('/adPtC',addProductToCart);
router.delete('/rmPtC',removeProductToCart);

export default router;