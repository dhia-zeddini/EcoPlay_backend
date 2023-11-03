import db from './config/DBConnection.js'
import express from 'express';
const app = express()
const port = process.env.PORT;
import productRoutes from './routes/produitRoutes.js';
import bodyParser from "body-parser"

app.use(bodyParser.json())
app.use('/products', productRoutes);


app.listen(port, () => {
  console.log("hello " + `Server running at http://localhost:${port}`);
});