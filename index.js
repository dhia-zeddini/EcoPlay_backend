import db from "./config/DBConnection.js"
import express from "express";
import challengesRoute from "../EcoPlay_backend/routes/challenges.js"
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express()
const port = process.env.PORT || 9090;

app.get("/", (req, res) => {
  res.send("hello");
});

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use('/api', challengesRoute); 

app.use((req, res, next) => {
  console.log('Request URL:', req.originalUrl);
  next();
});

app.get('/img/:imageName', (req, res) => {
  const imagePath = path.join(__dirname, 'public', 'img', req.params.imageName);
  res.sendFile(imagePath, err => {
    
    if (err) {
      console.log(err);
      res.status(404).send('Image not found');
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
