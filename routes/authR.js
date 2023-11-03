import express from 'express';
import authController from '../controllers/authC.js'; // Assuming .mjs extension for ESM
import { verifyForgetPwd ,verifyToken} from '../middlewares/verifyToken.js'; // Assuming .mjs extension for ESM
import multer from 'multer';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./public/images/avatars"), // Define where to store files
  filename: (req, file, cb) => {
    cb(null, req.body["phoneNumber"] + Date.now() + ".jpeg");
  },
});
const upload = multer({
  storage: storage,
});

router.post('/registration', upload.single("img"), authController.register);
router.post('/login', authController.login);
router.post('/forgetPwd', authController.forgetPwd);
router.post('/otp', verifyToken,authController.otp);
router.post('/newPwd', verifyToken, authController.newPwd);

export default router;
