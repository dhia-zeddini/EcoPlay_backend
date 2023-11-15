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

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json())
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/products', productRoutes);
app.use('/carts', cartRoutes);

 

app.listen(port, () => {
  console.log("hello " + `Server running at http://localhost:${port}`);
});