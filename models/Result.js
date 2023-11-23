import mongoose from 'mongoose';
import db from '../config/DBConnection.js'; // Assuming the extension .mjs for ESM
const { Schema } = mongoose;

// Define Result schema
const resultSchema = new Schema({
  time: { type: Number, required: true },
  type: { type: String },
  difficulty: { type: String },
  score: { type: Number, required: true },
});

// Create Result model
const Result = db.model('Result', resultSchema);

export default Result;
