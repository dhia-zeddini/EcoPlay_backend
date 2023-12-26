import { Router } from 'express';
import {
  addCart,addProductToCart,getAllC,removeProductToCart,getPById,calculateCartTotal,pay,getMonthlyStripePayments
  
} from '../controllers/CartC.js';
import stripeModule from 'stripe';
const secretKey = process.env.KEYSTRIPE;
const stripe = stripeModule(process.env.KEYSTRIPE);

   
import { getAllP } from '../controllers/ProduitC.js';
const router = Router();
import {
  verifyForgetPwd,
  verifyToken,
  verifyAndAuth,
} from "../middlewares/verifyToken.js";
// Create a new producSt
router.post('/add', verifyToken,addCart);
router.put('/adPtC',verifyToken,addProductToCart);
router.delete('/rmPtC',verifyToken,removeProductToCart);
router.post('/get',verifyToken,getPById);
router.get('/getall',getAllC);
router.post('/total', verifyToken,calculateCartTotal);
router.post('/pay',pay);
router.get('/payments/:year/:month', getMonthlyStripePayments);
export default router;