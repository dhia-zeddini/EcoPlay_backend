import mongoose from 'mongoose';
import db from '../config/DBConnection.js';
const { Schema } = mongoose;
const QuizResultSchema = new Schema({
  category: { type: String, required: true },
  type: { type: String, required: true },
  question: { type: String, required: true },
  correct_answer: { type: String, required: true },
  incorrect_answers: { type: [String], required: true },
});

const QuizResult = db.model('QuizResult', QuizResultSchema);

export default  QuizResult;
