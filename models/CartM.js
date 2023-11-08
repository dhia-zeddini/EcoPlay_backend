import mongoose from "mongoose";
import db from "../config/DBConnection.js"; // Assuming .mjs extension for ESM
const { Schema } = mongoose;

const cartSchema = new Schema(
  {
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      }, 
      product: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Produit',
        },
      ],
      totalC: {
        type: Number,
        required: true
      },
  },
    {
        timestamps: true,
      }
    
    );
    const cartM=db.model('Cart', cartSchema);
    export default cartM;
    