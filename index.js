import db from './config/DBConnection.js'
import express from 'express';
const app = express()
const port = process.env.PORT;
import productRoutes from './routes/produitRoutes.js';
import cartRoutes from './routes/cartRoutes.js'
import bodyParser from "body-parser"

import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));


app.use(bodyParser.json())
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/products', productRoutes);
app.use('/carts', cartRoutes);

// Serve static files from the "public" folder
// app.get('/img/:imageName', (req, res) => {
//   const imagePath = path.join(__dirname, 'public', 'img', req.params.imageName);
//   res.sendFile(imagePath, err => {
//     if (err) {
//       console.log(err);
//       res.status(404).send('Image not found');
//     }
//   });
// });
app.use(express.static(path.join(__dirname, "public")));


app.listen(port, () => {
  console.log("hello " + `Server running at http://localhost:${port}`);
});