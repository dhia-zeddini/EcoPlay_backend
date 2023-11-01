import UserM from "../models/UserM.js"; // Assuming .mjs extension for ESM
import nodemailer from "nodemailer";
import UserService from "../services/UserS.js";
// import { html } from "../utils/mailTemplate.js";
import dotenv from 'dotenv';
dotenv.config();

const testaccount = await nodemailer.createTestAccount();
const transporter = nodemailer.createTransport({
  host: process.env.NODEMAILER_HOST,
  port: process.env.NODEMAILER_PORT,
  secure: false,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

 async function register(req, res, next) {
  try {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
    } = req.body;
    const succRes = await UserService.registerUser(
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      req.file?.filename,
    );
    res.json({ status: true, success: "User Registered" });
  } catch (error) {
    if (error.keyPattern) {
      console.log("Error", error);
      res.status(403).json({
        status: false,
        error: Object.keys(error.keyPattern)[0] + " already used",
      });
    } else {
      console.log("err", error);
      res.status(500).json({ status: false, error: "Internal Server Error" });
    }
  }
}

 async function login(req, res, next) {
  try {
    const { phoneNumber, password } = req.body;
    const user = await UserService.checkuser(phoneNumber);
    if (!user) {
      res.status(401).json("User does not exist");
    }
    const isMatch = await UserService.comparePassword(password, user.password);
    if (isMatch === false) {
      res.status(401).json("Invalid password");
    }

    const tokenData = { _id: user._id, phoneNumber: user.phoneNumber };
    const token = await UserService.generateToken(tokenData, "secretKey", "5h");
    res.status(200).json({ status: true, token: token });
  } catch (error) {
    next(error);
    res.status(500);
  }
}

 async function forgetPwd(req, res) {
  try {
    const random = await UserService.generateCode();
    const user = await UserM.findOne({
      $or: [
        {
          email: req.body.data,
        },
        {
          phoneNumber: req.body.data,
        },
      ],
    });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      await user.updateOne({ forgetPwd: random });
      const tokenData = {
        _id: user._id,
        email: user.email,
        code: random,
      };
      console.log("token code", random);
      const token = await UserService.generateToken(
        tokenData,
        "secretKey",
        "5h"
      );
      await transporter
        .sendMail({
          from: '"HeyU 👻" <heyU@example.com>',
          to: user.email,
          subject: "Reset your password",
          html: `<h1><strong>Hi! dhia</strong></h1><h3>We have received a request to reset your password.</h3>Verification code:${random}`,
        })
        .then(() => {
          console.log("Message sent: %s");
          console.log("html", html);
        })
        .catch((error) => {
          console.log(error);
        });

      res.status(200).json({ status: true, token: token });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

 async function newPwd(req, res) {
  try {
    if (req.body.newPwd !== req.body.confirmPwd) {
      res.status(403).json("You have to confirm your password");
    } else {
      const user = await UserM.findOneAndUpdate(
        { _id: req.user._id },
        { password: req.body.newPwd, forgetPwd: null },
        { new: true }
      );
      if (!user) {
        res.status(404).json("User not found");
      } else {
        res.status(200).json("Password updated successfully");
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

export default {register,login,forgetPwd,newPwd};
