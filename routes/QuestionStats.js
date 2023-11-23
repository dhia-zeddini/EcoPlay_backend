import express from 'express';

import QuestionStatusController from '../controllers/QuestionStatusController.js';

const router = express.Router();

// Get question stats
router.get('/question-stats',QuestionStatusController.getQuestionStats);

// Create question stats
router.post('/question-stats', QuestionStatusController.createQuestionStats);

// Update question stats
router.put('/question-stats', QuestionStatusController.updateQuestionStats);

// Delete question stats
router.delete('/question-stats', QuestionStatusController.deleteQuestionStats);

export default router;
