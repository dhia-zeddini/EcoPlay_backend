import mongoose from 'mongoose';
import db from '../config/DBConnection.js';
const { Schema,model } = mongoose;

const QuizResultSchema = new Schema({
  question: { type: String, required: true },
  correct_answer: { type: String, required: true },
  incorrect_answers: { type: [String], required: true },
});

const QuizResult = model('QuizResult', QuizResultSchema);

export default QuizResult;

