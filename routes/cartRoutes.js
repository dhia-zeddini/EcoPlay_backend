import { Router } from 'express';
import {
  addCart,addProductToCart,getAllC,removeProductToCart,getPById,
  
} from '../controllers/CartC.js';
import { getAllP } from '../controllers/ProduitC.js';
const router = Router();

// Create a new producSt
router.post('/add', addCart);
router.put('/adPtC',addProductToCart);
router.delete('/rmPtC',removeProductToCart);
router.post('/get',getPById);
router.get('/getall',getAllC);
export default router;