import express from 'express';
import ResultatController from '../controllers/ResultController.js';


const router = express.Router();

// Get result
router.get('/result', ResultatController.getResult);

// Create result
router.post('/result', ResultatController.createResult);

// Update result
router.put('/result', ResultatController.updateResult);

// Delete result
router.delete('/result', ResultatController.deleteResult);

export default router;
