import { Router } from 'express';
import {
  addCart,addProductToCart,getAllC,removeProductToCart,getPById,calculateCartTotal,pay,getMonthlyStripePayments
  
} from '../controllers/CartC.js';
import stripeModule from 'stripe';
const secretKey = process.env.KEYSTRIPE;
const stripe = stripeModule(process.env.KEYSTRIPE);

   
import { getAllP } from '../controllers/ProduitC.js';
const router = Router();

// Create a new producSt
router.post('/add', addCart);
router.put('/adPtC',addProductToCart);
router.delete('/rmPtC',removeProductToCart);
router.post('/get',getPById);
router.get('/getall',getAllC);
router.post('/total', calculateCartTotal);
router.post('/pay',pay);
router.get('/payments/:year/:month', getMonthlyStripePayments);
export default router;