
import UserService from "../services/UserService.js";
import UserM from "../models/userModel.js";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { generateId } from '../utils/generateId.js';  // Adjust the import path as necessary
import { checkuser, generateToken, comparePassword } from '../services/UserService.js';  // Adjust the import path as necessary
dotenv.config();

var transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "e5dab2feb37ad0",
    pass: "0306da7b993bea"
  }
});


async function register(req, res) {
  try {
    const { 
        fullName,
        email,
        phoneNumber,
        password,
        adress,
        birthdate,
        } = req.body;
        const createUser = new UserM({
        fullName,
        email,
        phoneNumber,
        password,
        adress,
        birthdate,
        });
        await createUser.save();
        return res.status(201).json({ status: true, response: "User Registered" });
  } catch (error) {
    if (error.keyPattern) {
      return res.status(409).json({
        status: false,
        response: Object.keys(error.keyPattern)[0] + " already used",
      });
    } else {
      return res.status(500).json({ status: false, response: "Internal Server Error" });
    }
  }
}


const login = async (req, res) => {
  try {
    const { id, password } = req.body;
    const user = await UserM.findOne({ id });
    if (!user) {
      return res.status(404).json({ status: false, token: "", error: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ status: false, token: "", error: "Invalid password" });
    }

    const tokenData = { _id: user._id, phoneNumber: user.phoneNumber };
    const token = jwt.sign(tokenData, "secretKey", { expiresIn: "90d" });

    // Include user information in the response
    res.status(200).json({
      status: true,
      token: token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        adress: user.adress,
        birthdate: user.birthdate,
        role: user.role,
        etatDelete: user.etatDelete,
        _id: user._id,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      error: ""
    });
  } catch (error) {
    console.error(`Error during login: ${error.message}`);
    res.status(500).json({ status: false, token: "", error: error.message });
  }
};

async function loginAdmin(req, res) {
    try {
      const { data, password } = req.body;
      const user = await UserService.checkuser(data);
      console.log(user);
      if (!user) {
        res
          .status(404)
          .json({ status: false, token: "", error: "User does not exist" });
      }
      if (user.role === "ADMIN") {
        const isMatch = await UserService.comparePassword(
          password,
          user.password
        );
        if (isMatch === false) {
          res
            .status(401)
            .json({ status: false, token: "", error: "Invalid password" });
        }
  
        const tokenData = { _id: user._id, phoneNumber: user.phoneNumber };
        const token = await UserService.generateToken(
          tokenData,
          "secretKey",
          "5h"
        );
        res.status(200).json({ status: true, token: token, error: "" });
      } else {
        res.status(403).json({ status: false, token: "", error:"You are not authorized to perform this action"});
      }
    } catch (error) {
      res.status(500).json({ status: false, token: "", error: error });
    }
  }
  
  async function forgetPwd(req, res) {
    try {
      const { data} = req.body;
      const user = await UserService.checkuser(data);
      const random = await UserService.generateCode();
      if (!user) {
        res.status(404).json({ status: false, token: "", error: "User not found" });
      } else {
        const tokenData = {
          _id: user._id,
          email: user.email,
          code: random,
        };
        const token = await UserService.generateToken(
          tokenData,
          "secretKey",
          "1h"
        );
        await transporter
          .sendMail({
            from: '"MAE" <MAE@example.com>',
            to: user.email,
            subject: "Reset your password",
            html: `<h1><strong>Hi! ${user.firstName}</strong></h1><h3>We have received a request to reset your password.</h3>Verification code:${random}`,
          })
          .then(() => {
            console.log(`Message sent:${token}`);
          })
          .catch((error) => {
            console.log(error);
          });
          return res.status(200).json({ status: true, token: token, error: "" });
      }
    } catch (error) {
      return res.status(500).json({ status: false, token: "", error: error });
    }
  }
 
  async function otp(req, res) {
    try{
      const code = req.payload.code;
      const paramCode = req.body.data;
     
      if (code.trim() === paramCode.trim()) {
        console.log(code);
        console.log(req.payload.email);
        const tokenData = {
          _id: req.payload._id,
          email: req.payload.email,
          code: code,
        };
        console.log(tokenData);
        const token = await UserService.generateToken(tokenData, "secretKey", "5m");
        console.log(token);
        res.status(200).json({ status: true, token: token, error: "" });
      } else {
        return res.status(403).json({ status: false, token: "", error: "Invalid code" });
      }
    } catch (error) {
       return res.status(500).json({ status: false, token: "", error: error });
    }
  }


  async function newPwd(req, res) {
    try {
      const user = await UserM.findOneAndUpdate(
        { _id: req.payload._id },
        { password: req.body.password},
        { new: true }
      );
      if (!user) {
        return  res
          .status(404)
          .json({ status: false, token: "", error: "User not found" });
      } else {
        return  res
          .status(200)
          .json({ status: true, token: "", error: "" });
      }
    } catch (error) {
      return res.status(500).json({ status: false, token: "", error: error });
    }
  }


  async function newAdmin(req, res, next) {
    try {
      const { 
        fullName,
        email,
        phoneNumber,
        password,
        adress,
        birthdate,
      } = req.body;
      
      const avatar = req.file?.filename;
      const id = generateId();  // Generate a unique 8-character ID
  
      const createUser = new UserM({
        id,
        fullName,
        email,
        phoneNumber,
        password,
        adress,
        birthdate,
        avatar,
        role: "ADMIN"
      });
      
      await createUser.save();
      res.status(201).json({ status: true, response: "Admin Registered" , createUser });
    } catch (error) {
      if (error.keyPattern) {
        console.log("Error", error);
        res.status(403).json({
          status: false,
          response: Object.keys(error.keyPattern)[0] + " already used",
        });
      } else {
        console.log("err", error);
        res.status(500).json({ status: false, response: "Internal Server Error" });
      }
    }
  }
  export default { register, login, forgetPwd, newPwd, otp , loginAdmin , newAdmin };
  