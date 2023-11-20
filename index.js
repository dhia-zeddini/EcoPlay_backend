import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import astuceRoutes from './routes/routeAstuce.js';

const app = express();
const port = process.env.PORT || 3000;

// Utilisez le middleware intégré d'Express pour analyser les corps de requête
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const staticPath = path.join(__dirname, 'public', 'images', 'astuce');

// Servez les fichiers statiques depuis le répertoire "public"
app.use(express.static(path.join(__dirname, 'public')));

// Définissez une route pour gérer les demandes d'images
app.get('/img/:image', (req, res) => {
  const imageName = req.params.image;
  res.sendFile(path.join(staticPath, imageName));
});

// Utilisez les routes Astuce
app.use('/astuce', astuceRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});