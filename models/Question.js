import mongoose from "mongoose";
import db from "../config/DBConnection.js"; // Assuming .mjs extension for ESM
const { Schema } = mongoose;

const questionSchema = new Schema({
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  options: [String],
  correctAnswer: {
    type: String,
    required: true,
  },
  points: {
    type: Number, // You can adjust this based on your requirements (e.g., Integer, Float)
    default: 1,   // Default value for points (you can change it)
  },
});

const Question = db.model('Question', questionSchema);

export default Question;
