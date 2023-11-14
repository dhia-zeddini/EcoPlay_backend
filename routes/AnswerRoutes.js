import answerController from '../controllers/AnswerController';
import express from "express";

const router = express.Router();



// Créer une nouvelle réponse
router.post('/create',answerController.createAnswer);

// Obtenir une réponse par ID
router.get('/:answerId', answerController.getAnswerById);

// Mettre à jour une réponse
router.put('/:answerId', answerController.updateAnswer);

// Supprimer une réponse
router.delete('/:answerId',answerController.deleteAnswer);

export default router;
