import db from "./config/DBConnection.js"
import express from "express"
import categoryRoutes from './routes/CategoryRoutes.js'
import questionStatsRoutes from './routes/QuestionStats.js'
import resultatRoutes from './routes/ResultatRoute.js'
import ResultatRoute from "./routes/ResultatRoute.js"
import path from 'path';
import { fileURLToPath } from 'url';
import QuizResultRoute from "./routes/QuizResultRoute.js"

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express()
const port = process.env.PORT || 9090;

app.get("/", (req, res) => {
  res.send("hello");
});

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use('/category', categoryRoutes); 

app.use('/QuestionStats', questionStatsRoutes);
app.use('/Resultat', resultatRoutes); 
app.use('/Resultat', ResultatRoute); 
app.use('/QuizR', QuizResultRoute); 






// Serve static files from the "public" folder
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