import express from 'express';
import multer from 'multer';

// import multer from '../utils/multer.js';
import {
  addP,
  getPById,
  getAllP,
  updateP,
  deleteP,
} from '../controllers/ProduitC.js';

const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./public/images/product"), // Define where to store files
  filename: (req, file, cb) => {
    cb(null, req.body["nameP"] + Date.now() + ".jpeg");
  },
});  
const upload = multer({
  storage: storage,
});

// Create a new producSt
router.post('/add', upload.single("image"), addP);

// Get a product by ID
router.get('/', getPById);

// Get all products
router.get('/getall', getAllP);

// Update a product by ID
router.put('/', updateP);

// Delete a product by IDa
router.delete('/', deleteP);

export default router;