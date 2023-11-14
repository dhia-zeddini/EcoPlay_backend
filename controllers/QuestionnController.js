import Question from '../models/Question.js';
import dotenv from 'dotenv';
dotenv.config();

const createQuestion = async (req, res) => {
    try {
      const { quiz, text, options, correctAnswer, points } = req.body;
  
      const newQuestion = new Question({
        quiz,
        text,
        options,
        correctAnswer,
        points,
      });
  
      // Enregistrez la question dans la base de données
      const savedQuestion = await newQuestion.save();
  
      res.status(201).json(savedQuestion);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while creating the question', details: error.message });
    }
  };
  

const getQuestionById = async (req, res) => {
  try {
    const questionId = req.params.questionId;
    const question = await Question.findById(questionId);

    if (question) {
      res.json({
        question,
      });
    } else {
      res.status(404).json({ message: 'Question not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the question' });
  }
};

const updateQuestion = async (req, res) => {
  try {
    const questionId = req.params.questionId;
    const updatedData = req.body;

    const updatedQuestion = await Question.findByIdAndUpdate(questionId, updatedData, { new: true });

    if (updatedQuestion) {
      res.json({
        message: 'Question updated successfully',
        question: updatedQuestion,
      });
    } else {
      res.status(404).json({ message: 'Question not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating the question' });
  }
};

const deleteQuestion = async (req, res) => {
  try {
    const questionId = req.params.questionId;
    const deletedQuestion = await Question.findByIdAndDelete(questionId);

    if (deletedQuestion) {
      res.json({
        message: 'Question deleted successfully',
      });
    } else {
      res.status(404).json({ message: 'Question not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while deleting the question' });
  }
};

export default {
  createQuestion,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
};
