// QuizController.js
import Quiz from "../models/Quiz.js";
import dotenv from 'dotenv';

dotenv.config();

const createQuiz = async (req, res) => {
  try {
    const newQuiz = new Quiz({
      title: req.body.title,
      image: req.file.filename,
      questions: [], // Replace with actual ObjectIds
    });

    await newQuiz.save(); // Save the new quiz to the database

    res.status(201).json(newQuiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Quiz creation failed' });
  }
};


// Retrieve a specified quiz by ID
const getQuizById = async (req, res) => {
  const quizId = req.params.id;
  try {
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve quiz' });
  }
};

// List all quizzes
const listQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve quizzes' });
  }
};

// Update a quiz by ID
const updateQuiz = async (req, res) => {
  const quizId = req.params.id;
  const updatedData = req.body;
  try {
    const updatedQuiz = await Quiz.findByIdAndUpdate(quizId, updatedData, { new: true });
    if (!updatedQuiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    res.status(200).json(updatedQuiz);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update quiz' });
  }
};

// Delete a quiz by ID
const deleteQuiz = async (req, res) => {
  const quizId = req.params.id;
  try {
    const deletedQuiz = await Quiz.findByIdAndDelete(quizId);
    if (!deletedQuiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete quiz' });
  }
};

// Add points to a quiz
const addPointsToQuiz = async (req, res) => {
  const quizId = req.params.id;
  const { points } = req.body;
  try {
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    // Assuming there is a points field in the Quiz model
    quiz.points += points;
    
    await quiz.save();

    res.status(200).json({ message: 'Points added to the quiz successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add points to the quiz' });
  }
};

export default {
  createQuiz,
  getQuizById,
  listQuizzes,
  updateQuiz,
  deleteQuiz,
  addPointsToQuiz,
};
