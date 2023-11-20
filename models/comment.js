// comment.js
import mongoose from 'mongoose';
const { Schema } = mongoose;

// Define the Comment schema with automatic timestamps
const commentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,

  },
  description: {
    type: String,

  },
  image: {
    type: String,
  },
  rating: {
    type: Number,
    default: 0,
  }
}, {
  timestamps: true 
});

export default commentSchema;
