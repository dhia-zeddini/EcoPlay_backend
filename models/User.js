import mongoose from "mongoose";
import db from "../config/DBConnection.js"; // Assuming .mjs extension for ESM
const { Schema } = mongoose;

const userSchema = new Schema(
    {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      
      email: {
        type: String,
        required: true,
        unique: true,
      },
      phoneNumber: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      
      avatar: {
        type: String,
        default:"defaultAvatar.png"
      },
     
      forgetPwd: {
        type: String,
        
      },
     
    },
    {
      timestamps: true,
    }
  );

  const UserM = db.model("User", userSchema);
  export default UserM;