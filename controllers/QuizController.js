// QuizController.js
import Quiz from "../models/Quiz.js";
import dotenv from 'dotenv';

dotenv.config();

// Function to get all quizzes
async function getAllQuizzes(req, res) {
  try {
    const quizzes = await Quiz.find();
    res.status(200).json(quizzes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching quizzes' });
  }
}

// Function to create a quiz
async function createQuiz(req, res) {
  try {
    const newQuiz = new Quiz({
      title: req.body.title,
      image: req.file.filename,
      questions: [], // Replace with actual ObjectIds
    });

    await newQuiz.save();

    // Customize the response data as needed
    const responseData = {
      quizId: newQuiz._id,
      title: newQuiz.title,
      imageUrl: newQuiz.image,
    };

    res.status(201).json(responseData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Quiz creation failed' });
  }
}

// Retrieve a specified quiz by ID
async function getQuizById(req, res) {
  try {
    const quizId = req.body.quizId;
    const quiz = await Quiz.findById(quizId);
    res.json({
      quiz,
    });
  } catch (error) {
    res.status(500).json("An error has occurred!");
  }
}

// Update a quiz by ID
async function updateQuiz(req, res) {
  try {
    const quizId = req.body.quizId;
    const updatedData = req.body;

    const updatedQuiz = await Quiz.findByIdAndUpdate(quizId, updatedData, { new: true });

    if (updatedQuiz) {
      res.status(200).json({
        message: 'Quiz updated successfully',
        quiz: updatedQuiz,
      });
    } else {
      res.status(404).json({ message: 'Quiz not found' });
    }
  } catch (error) {
    res.status(500).json("An error has occurred!");
  }
}

// Delete a quiz by ID
async function deleteQuiz(req, res) {
  try {
    const quizId = req.body.quizId;

    const deletedQuiz = await Quiz.findByIdAndDelete(quizId);

    if (deletedQuiz) {
      res.status(200).json({
        message: 'Quiz deleted successfully',
      });
    } else {
      res.status(404).json({ message: 'Quiz not found' });
    }
  } catch (error) {
    res.status(500).json("An error has occurred!");
  }
}

export default {
  getAllQuizzes,
  createQuiz,
  getQuizById,
  updateQuiz,
  deleteQuiz,
};
