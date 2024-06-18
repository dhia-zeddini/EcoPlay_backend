import express from "express";
import authController from "../controllers/authController.js";
import {verifyAndAuth } from "../middleware/verifyToken.js"; 
import customMulter from '../middleware/multer.js';
const router = express.Router();

// router.post("/registration",  authController.register);
router.post("/newAdmin", authController.newAdmin);
router.post("/login", authController.login);
router.post("/admin/login", authController.loginAdmin);
router.post("/forgetPwd", authController.forgetPwd);
router.post("/otp", verifyAndAuth, authController.otp);
router.post("/newPwd", verifyAndAuth, authController.newPwd);

export default router;
