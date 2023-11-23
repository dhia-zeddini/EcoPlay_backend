import express from 'express';
import CategoryController from '../controllers/CategoryController.js';
import multer from 'multer';  // Assurez-vous que vous importez multer
const router = express.Router();

const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      let date = Date.now();
      let fl = date + '.jpeg';
      cb(null, fl);
    },
  });
  
  const upload = multer({ storage: storage });
// Get all categories
router.get('/categories',CategoryController.getAllCategories);

// Get a single category by ID
router.get('/categories/{id}', CategoryController.getCategoryById);

// Create a new category
router.post('/categories',  upload.single('image'),CategoryController.createCategory);

// Update a category by ID
router.put('/categories/:id', CategoryController.updateCategoryById);

// Delete a category by ID
router.delete('/categories/:id', CategoryController.deleteCategoryById);

export default router;
