import mongoose from "mongoose";
import db from "../config/DBConnection.js"; // Assuming .mjs extension for ESM
const { Schema } = mongoose;

const categorySchema = new Schema({
  image: {
    type: String,
    required: true,
    default: 'default-image.jpg', // Remplacez ceci par le chemin du fichier par défaut si nécessaire

  },
  name: {
    type: String,
    required: true,
  },
});

const Category = db.model('Category', categorySchema);

export default Category;
