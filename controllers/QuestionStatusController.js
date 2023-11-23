import QuestionStats from '../models/QuestionStatus.js';
import dotenv from 'dotenv';
dotenv.config();

const getQuestionStats = async (req, res) => {
  try {
    const questionStats = await QuestionStats.findOne();
    if (!questionStats) {
      return res.status(404).json({ error: 'QuestionStats not found' });
    }

    res.status(200).json(questionStats);
  } catch (error) {
    handleServerError(res, error);
  }
};

const createQuestionStats = async (req, res) => {
  const { overall, categories } = req.body;

  try {
    const newQuestionStats = new QuestionStats({
      overall,
      categories,
    });

    const savedQuestionStats = await newQuestionStats.save();
    res.status(201).json(savedQuestionStats);
  } catch (error) {
    handleServerError(res, error);
  }
};

const updateQuestionStats = async (req, res) => {
  const { overall, categories } = req.body;

  try {
    const updatedQuestionStats = await QuestionStats.findOneAndUpdate(
      {},
      { overall, categories },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.status(200).json(updatedQuestionStats);
  } catch (error) {
    handleServerError(res, error);
  }
};

const deleteQuestionStats = async (req, res) => {
  try {
    const deletedQuestionStats = await QuestionStats.findOneAndDelete({});
    if (!deletedQuestionStats) {
      return res.status(404).json({ error: 'QuestionStats not found' });
    }

    res.status(200).json(deletedQuestionStats);
  } catch (error) {
    handleServerError(res, error);
  }
};

const handleServerError = (res, error) => {
  console.error(error);
  res.status(500).json({ error: 'Internal Server Error' });
};

export default{ getQuestionStats, createQuestionStats, updateQuestionStats, deleteQuestionStats };
