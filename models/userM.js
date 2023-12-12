import mongoose from "mongoose";
import db from "../config/DBConnection.js"; // Assuming .mjs extension for ESM
import bcrypt from "bcrypt";
const { Schema, model } = mongoose;

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
      default: "defaultAvatar.png",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER", // Set a default role if needed
    },
    points: {
      type: Number,
      default: 0,
    },
    score: {
      type: Number,
      default: 0,
    },
    level: {
      type: Number,
      default: 1,
    },
    goldMedal: {
      type: Number,
      default: 0,
    },
    silverMedal: {
      type: Number,
      default: 0,
    },
    bronzeMedal: {
      type: Number,
      default: 0,
    },

    owned: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    etatDelete: {
      type: Boolean,
      default: false,
    },

    forgetPwd: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function () {
  try {
    var user = this;
    const salt = await bcrypt.genSalt(10);
    const hashpass = await bcrypt.hash(user.password, salt);
    user.password = hashpass;
  } catch (error) {
    throw error;
  }
});
userSchema.pre("findOneAndUpdate", async function () {
  try {
    if (this._update.password) {
      const salt = await bcrypt.genSalt(10);
      const hashpass = await bcrypt.hash(this._update.password, salt);
      this._update.password = hashpass;
    }
  } catch (error) {
    throw error;
  }
});
//mongoose.deleteModel('User');
const UserM = model("User", userSchema);
export default UserM;
