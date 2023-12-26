import express from 'express';
import QuizREsController from '../controllers/QuizREsController.js'

const router = express.Router();

// Routes pour QuizResult
router.get('/quizResults',QuizREsController.getAllQuizResults);
router.get('/quiz',QuizREsController.getAllQuizResults);
router.get('/quizResults/:id', QuizREsController.getQuizResultById);
router.post('/quizResults', QuizREsController.addQuizResult);
router.put('/quizResults/:id',QuizREsController.updateQuizResult);
router.delete('/quizResults/:id',QuizREsController.deleteQuizResult);

export default router;
