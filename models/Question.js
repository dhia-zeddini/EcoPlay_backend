import mongoose from "mongoose";
const { Schema } = mongoose;

const answerSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  isCorrect: {
    type: Boolean,
    default: false,
  },
  points: {
    type: Number,
    default: 0,
  },
});

const Answer = mongoose.model('Answer', answerSchema);

export default Answer;
