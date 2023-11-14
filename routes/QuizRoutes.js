// routes/quizRoutes.js
import multer from 'multer';  // Assurez-vous que vous importez multer
import express from 'express';
import QuizController from '../controllers/QuizController.js';
const router = express.Router();

const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    let date = Date.now();
    let fl = date + '-' + file.mimetype.split('/')[1];
    cb(null, fl);
  },
});

const upload = multer({ storage: storage });
// Create a new quiz
router.get('/:quizId', QuizController.getQuizById);
router.post('/create', upload.single('image'), QuizController.createQuiz);
router.put('/:quizId', QuizController.updateQuiz);
router.delete('/:quizId', QuizController.deleteQuiz);

export default router;

  


