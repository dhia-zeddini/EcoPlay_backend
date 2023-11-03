import { response } from "express";
import ProductM from "../models/ProductM.js"; // Assuming .mjs extension for ESM
import dotenv from 'dotenv';
import { validationResult } from 'express-validator';


dotenv.config();

 //  Get -- All Products

async function getAllP(req, res ) {
    try {
      const listP = await ProductM.find();
      res.status(200).json(
        listP
      );
    } catch (error) {
      res.status(500).json("An error has occurred!");
    }
  }

  // Get --Product  by Id

  async function getPById(req, res) {
    try {
      const produitId = req.body.produitId;
      const produit = await ProductM.findById(produitId);
      res.json({
        produit,
      });
    } catch (error) {
      res.status(500).json("An error has occurred!");
    }
  }

  //   Add Product

  async function addP(req, res) {
    try {
      var newProduct = {
        nameP: req.body.nameP,
        descriptionP: req.body.descriptionP,
        image:req.body.image,
        priceP: req.body.priceP,
        typeP: req.body.typeP,

    }
    var product = new ProductM(newProduct);
    await product.save();
      res.status(201).json({
        message: 'Product added successfully',
        product: product,
      });
    } catch (error) {
      res.status(500).json("An error has occurred!");
    }
  }




  // update Product

  async function updateP(req, res) {
    try {
      const produitId = req.body.produitId;
      const updatedData = req.body;
  
      const updatedProduct = await ProductM.findByIdAndUpdate(produitId, updatedData, { new: true });
  
      if (updatedProduct) {
        res.status(200).json({
          message: 'Product updated successfully',
          product: updatedProduct,
        });
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (error) {
      res.status(500).json("An error has occurred!");
    }
  }


  /// delete product
  async function deleteP(req, res) {
    try {
      const produitId = req.body.produitId;
  
      const deletedProduct = await ProductM.findByIdAndDelete(produitId);
  
      if (deletedProduct) {
        res.status(200).json({
          message: 'Product deleted successfully',
        });
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (error) {
      res.status(500).json("An error has occurred!");
    }
  }


  export { getPById ,getAllP,addP,updateP,deleteP};
  
