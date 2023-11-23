import QuizResult from '../models/QuizRespo.js';
import dotenv from 'dotenv';
dotenv.config();

// Récupérer tous les résultats de quiz
const getAllQuizResults = async (req, res) => {
  try {
    const quizResults = await QuizResult.find();
    res.json(quizResults);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer un résultat de quiz par ID
const getQuizResultById = async (req, res) => {
  try {
    const quizResult = await QuizResult.findById(req.params.id);
    if (quizResult) {
      res.json(quizResult);
    } else {
      res.status(404).json({ message: 'Quiz result not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Ajouter un résultat de quiz
const addQuizResult = async (req, res) => {
  const quizResult = new QuizResult(req.body);

  try {
    const newQuizResult = await quizResult.save();
    res.status(201).json(newQuizResult);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Mettre à jour un résultat de quiz
const updateQuizResult = async (req, res) => {
  try {
    const updatedQuizResult = await QuizResult.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedQuizResult);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer un résultat de quiz
const deleteQuizResult = async (req, res) => {
  try {
    await QuizResult.findByIdAndDelete(req.params.id);
    res.json({ message: 'Quiz result deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  getAllQuizResults,
  getQuizResultById,
  addQuizResult,
  updateQuizResult,
  deleteQuizResult,
};
