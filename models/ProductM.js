import mongoose from "mongoose";
import db from "../config/DBConnection.js"; // Assuming .mjs extension for ESM
const { Schema ,model} = mongoose;

const produitSchema = new Schema(
  {
    nameP: {
      type: String,
      required: true,
    },
    descriptionP: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true
    },

    priceP: {
      type: String,
      required: true,
    },
    typeP: {
      type: String,
      required: true,
    },

  },
  {
    timestamps: true,
  }
);
const ProduitM=model('Produit', produitSchema);
export default ProduitM;


