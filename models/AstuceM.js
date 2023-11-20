import mongoose from "mongoose";
import db from "../config/DBConnection.js"; // Assuming .mjs extension for ESM
const { Schema } = mongoose;

const astuceSchema = new Schema(
    {
        titleA: {
          type: String,
          required: true,
        },
        sujetA: {
          type: String,
          required: true,
        },
        imageDetailA: {
          type: String,
          required: true,
        },
        imageItemA: {
          type: String,
          required: true,
        },
        level: {
          type: String,
          required: true,
        },
    
        informationsA: {
          type: String,
          required: true,
        },
        linkA: {
            type: String,
          },
    
      },
);
const AstuceM=db.model('Astuce', astuceSchema);
export default AstuceM;