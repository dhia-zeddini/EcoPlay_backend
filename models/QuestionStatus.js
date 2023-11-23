// models/QuestionStats.js
import mongoose from 'mongoose';
import db from "../config/DBConnection.js"; // Assuming .mjs extension for ESM


const { Schema } = mongoose;

const categoryStatsSchema = new Schema({
  total_num_of_questions: { type: Number, required: true },
  total_num_of_pending_questions: { type: Number, required: true },
  total_num_of_verified_questions: { type: Number, required: true },
  total_num_of_rejected_questions: { type: Number, required: true },
});

const overallStatsSchema = new Schema({
  total_num_of_questions: { type: Number, required: true },
  total_num_of_pending_questions: { type: Number, required: true },
  total_num_of_verified_questions: { type: Number, required: true },
  total_num_of_rejected_questions: { type: Number, required: true },
});

const questionStatsSchema = new Schema({
  overall: overallStatsSchema,
  categories: { type: Map, of: categoryStatsSchema },
});

const QuestionStats = db.model('QuestionStats', questionStatsSchema);

export default QuestionStats;


