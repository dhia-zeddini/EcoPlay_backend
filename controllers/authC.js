import UserM from "../models/UserM.js"; // Assuming .mjs extension for ESM
import nodemailer from "nodemailer";
import UserService from "../services/UserS.js";
import cartM from "../models/CartM.js";

// import { html } from "../utils/mailTemplate.js";

import twilio from "twilio"
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

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

 async function register(req, res, next) {
  console.log("api invocked");

  console.log(req.body);
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
    var newCart = new cartM({
      User: succRes, 
       products: [], 
      totalC:  0, 
  });

  await newCart.save();
    res.json({ status: true, success: "User Registered with cart" });
  } catch (error) {
    if (error.keyPattern) {
      console.log("Error", error);
      res.status(403).json({
        status: false,
        success: Object.keys(error.keyPattern)[0] + " already used",
      });
    } else {
      console.log("err", error);
      res.status(500).json({ status: false, success: "Internal Server Error" });
    }
  }
}

async function login(req, res, next) {
  console.log("api invocked");
  console.log(req.body);
  try {
    const { data, password } = req.body;
    const user = await UserService.checkuser(data);
    console.log(data);
    if (!user) {
      res.status(404).json({ status: false, token: "", error: "User does not exist" });
    }
    const isMatch = await UserService.comparePassword(password, user.password);
    if (isMatch === false) {
      res.status(401).json({ status: false, token: "", error: "Invalid password" });
    }

    const tokenData = { _id: user._id, phoneNumber: user.phoneNumber };
    const token = await UserService.generateToken(tokenData, "secretKey", "5h");
    res.status(200).json({ status: true, token: token, error: "" });
  } catch (error) {
    next(error);
    res.status(500);
  }
}


 async function forgetPwd(req, res) {
  console.log("forget");
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
          from: '"EcoPlay 👻" <ecoPlay@example.com>',
          to: user.email,
          subject: "Reset your password",
          html: `<h1><strong>Hi! ${user.firstName}</strong></h1><h3>We have received a request to reset your password.</h3>Verification code:${random}`,
        })
        .then(() => {
          console.log(`Message sent:${token}`);
          //console.log("html", html);
        })
        .catch((error) => {
          console.log(error);
        });
      // console.log(`Message sent:${token}`);
      res.status(200).json({ status: true, token: token });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
 async function forgetPwdSms(req, res) {
  console.log("forget");
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
      client.messages
      .create({
         body: `Hi! ${user.firstName} We have received a request to reset your password. Verification code:${random}`,
         from: '+12565308558',
         to: '+21692703351'
       })
      .then(message => console.log(message.sid))
        .catch((error) => {
          console.log(error);
        });
      // console.log(`Message sent:${token}`);
      res.status(200).json({ status: true, token: token });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
async function otp(req,res){

  const code = req.user.code;
    const paramCode = req.body.data;
    console.log(paramCode);
    if (code.trim() === paramCode.trim()) {
      const tokenData = {
        _id: req.user._id,
        email: req.user.email,
        code: code,
      };
      const token = await UserService.generateToken(
        tokenData,
        "secretKey",
        "5m"
      );
      res.status(200).json({ status: true, token: token });
    } else {
      res.status(403).json({ status: false, token: "Invalid code" });
    }
}
 async function newPwd(req, res) {
  try {
   
      const user = await UserM.findOneAndUpdate(
        { _id: req.user._id },
        { password: req.body.password, forgetPwd: null },
        { new: true }
      );
      if (!user) {
        res.status(404).json({ status: false, token: "", error: "User not found" });
      } else {
        console.log("ok");
        res.status(200).json({ status: true, token: "Password updated successfully", error: "" });
      }
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

export default {register,login,forgetPwd,newPwd,otp,forgetPwdSms};
