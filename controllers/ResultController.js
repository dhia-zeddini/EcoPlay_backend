import Result from '../models/Result.js';
import dotenv from 'dotenv';
dotenv.config();
const getResult = async (req, res) => {
  try {
    const result = await Result.findOne();
    if (!result) {
      return res.status(404).json({ error: 'Result not found' });
    }

    res.status(200).json(result);
  } catch (error) {
    handleServerError(res, error);
  }
};

const createResult = async (req, res) => {
  const { time, type, difficulty, score } = req.body;

  try {
    const newResult = new Result({
      time,
      type,
      difficulty,
      score,
    });

    const savedResult = await newResult.save();
    res.status(201).json(savedResult);
  } catch (error) {
    handleServerError(res, error);
  }
};

const updateResult = async (req, res) => {
  const { time, type, difficulty, score } = req.body;

  try {
    const updatedResult = await Result.findOneAndUpdate(
      {},
      { time, type, difficulty, score },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.status(200).json(updatedResult);
  } catch (error) {
    handleServerError(res, error);
  }
};

const deleteResult = async (req, res) => {
  try {
    const deletedResult = await Result.findOneAndDelete({});
    if (!deletedResult) {
      return res.status(404).json({ error: 'Result not found' });
    }

    res.status(200).json(deletedResult);
  } catch (error) {
    handleServerError(res, error);
  }
};

const handleServerError = (res, error) => {
  console.error(error);
  res.status(500).json({ error: 'Internal Server Error' });
};

export default { getResult, createResult, updateResult, deleteResult };
