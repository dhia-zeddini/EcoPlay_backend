import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'C:/ecoplay/EcoPlay_backend/uploads'),
    filename: (req, file, cb) => {
    cb(null, 'challenge_' + Date.now() + '.jpeg'); 
  },
});

const upload = multer({
  storage: storage,
});

export default upload;
