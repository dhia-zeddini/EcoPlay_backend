import mongoose from 'mongoose';
import db from '../config/DBConnection.js'; // Assuming the extension .mjs for ESM
const { Schema } = mongoose;

const quizSchema = new Schema({
  title: {
    type: String,
    required: true,
  
  },
  image: {
    type: String, // Assuming the image path or URL will be stored as a string
    required: true,
  },
  questions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Question',
    },
  ],
});


const Quiz = db.model('Quiz', quizSchema);

export default Quiz;

