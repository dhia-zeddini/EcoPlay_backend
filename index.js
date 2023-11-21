import db from './config/DBConnection.js'

import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import authRoute from "./routes/authR.js"; // Assuming .mjs extension for ESM
import userRoute from "./routes/UserR.js"; 
import productRoutes from './routes/produitRoutes.js';
import cartRoutes from './routes/cartRoutes.js'
import challengesRoute from "./routes/challenges.js"
import path from 'path';
import { fileURLToPath } from 'url';
import astuceRoutes from './routes/routeAstuce.js';

dotenv.config();
const app =express()
const port=process.env.PORT;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", authRoute);
app.use("/user", userRoute);
app.use('/products', productRoutes);
app.use('/carts', cartRoutes);
app.use('/api', challengesRoute);
app.use('/astuce', astuceRoutes);

app.get("/", (req, res) => {
  res.send("hello");
});
app.get('/img/:image', (req, res) => {
  const imageName = req.params.image;
  res.sendFile(path.join(staticPath, imageName));
});

// Utilisez les routes Astuce
app.get('/img/:imageName', (req, res) => {
  const imagePath = path.join(__dirname, 'public', 'img', req.params.imageName);
  res.sendFile(imagePath, err => {
    if (err) {
      console.log(err);
      res.status(404).send('Image not found');
    }
  });
});

app.get('/images/astuce/:imageName', (req, res) => {
  const imagePath = path.join(__dirname, 'public', 'images','astuce', req.params.imageName);
  res.sendFile(imagePath, err => {
    if (err) {
      console.log(err);
      res.status(404).send('Image not found');
    }
  });
});

app.use('/images/astuce', express.static(path.join(__dirname, 'public/images/astuce')));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
