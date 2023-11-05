import mongoose from "mongoose";
import db from "../config/DBConnection.js";
const { Schema } = mongoose;



const challengeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  start_date: {
    type: Date,
    required: true,
  },
  end_date: {
    type: Date,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  point_value: {
    type: Number,
    required: true,
  },
  participants: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User', 
    },
  ],
  media: {
    images: [String],
    videos: [String],
  },
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
      },
      text: String,
      rating: Number,
    },
  ],
  leaderboard: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
      },
      points: Number,
    },
  ],
  notifications: [
    {
      type: String, 
      message: String,
    },
  ],
}, {
  timestamps: true,
});



export default mongoose.model("ChallengeM", challengeSchema);
