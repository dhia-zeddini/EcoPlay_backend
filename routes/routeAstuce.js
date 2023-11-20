import express from 'express';
import multer from 'multer';

import {
  addA,
  getAById,
  getAllA,
  updateA,
  deleteA,
} from '../controllers/AstuceC.js';
const router = express.Router();


const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./public/images/astuce"),
  filename: (req, file, cb) => {
    // Generate a unique filename based on timestamp and original filename
    const uniqueFilename = `${Date.now()}_${file.originalname}`;
    cb(null, uniqueFilename);
  },
});
const upload = multer({
  storage: storage,
});
router.post('/add', upload.fields([{ name: 'imageDetailA', maxCount: 1 }, { name: 'imageItemA', maxCount: 1 }]), addA);// Other routes...
router.get('/', getAById);
router.get('/getall', getAllA);
router.put('/', updateA);
router.delete('/', deleteA);

export default router;
