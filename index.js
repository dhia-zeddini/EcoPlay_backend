import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import productRoutes from './routes/produitRoutes.js';
import cartRoutes from './routes/cartRoutes.js';

const app = express();
const port = process.env.PORT;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Enable CORS for all routes
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Your existing routes
app.use('/products', productRoutes);
app.use('/carts', cartRoutes);

app.listen(port, () => {
  console.log('Server running at http://localhost:' + port);
});
