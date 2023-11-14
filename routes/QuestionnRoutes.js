// routes/quizRoutes.js
import express from 'express';
import QuestionnController from '../controllers/QuestionnController.js';

const router = express.Router();



// Create a new quiz
router.get('/:quizId', QuestionnController.getQuestionById);
router.post('/create', QuestionnController.createQuestion);
router.put('/:quizId', QuestionnController.updateQuestion);
router.delete('/:quizId', QuestionnController.deleteQuestion);

export default router;
