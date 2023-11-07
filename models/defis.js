import mongoose from "mongoose";
const { Schema } = mongoose;
import db from "../config/DBConnection.js";


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
   
  },
  end_date: {
    type: Date,
   
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
    type: String,
    default: "1699199236672-EveryPlate.jpeg"
  },  
  
 
}, {
  timestamps: true,
});



export default mongoose.model("ChallengeM", challengeSchema);
