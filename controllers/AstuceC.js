import AstuceM from "./../models/astuceM.js"; // Assuming .mjs extension for ESM
import dotenv from 'dotenv';
import Response from "express"; 

import multer from 'multer';








dotenv.config();

 //  Get -- All Astuces//

async function getAllA(req, res ) {
    try {
      const listA = await AstuceM.find();
      res.status(200).json(
        listA
      );
    } catch (error) {
      res.status(500).json("An error has occurred!");
    }
  }

  // Get --Astuce  by Id

  async function getAById(req, res) {
    try {
      const astuceId = req.body.astuceId;
      const astuce = await AstuceM.findById(astuceId);
      res.json({
        astuce,
      });
    } catch (error) {
      res.status(500).json("An error has occurred!");
    }
  }

  
// Add Astuce


async function addA(req, res) {
    try {
      // Assuming you have other data in req.body, update as needed
      const titleA = req.body.titleA;
      const imageDetailA = req.files['imageDetailA'][0].filename;
      const imageItemA = req.files['imageItemA'][0].filename;
      const sujetA = req.body.sujetA;
      const level = req.body.level;
      const informationsA = req.body.informationsA;
      const linkA = req.body.linkA;

      const astuceData = {
        titleA: titleA,
        sujetA: sujetA,
        level: level,
        informationsA: informationsA,
        linkA: linkA,
        imageDetailA: imageDetailA,
        imageItemA: imageItemA,
      };
  
      const newAstuce = await AstuceM.create(astuceData);
  
      
      // Construct URLs for the images
      
  
      res.status(201).json({
        message: 'Astuce added successfully',
        astuce: newAstuce,
        imageURLDetailA: imageDetailA,
        imageURLItemA: imageItemA,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json("An error has occurred!");
    }
  }
  







  // update Astuce

  async function updateA(req, res) {
    try {
      const astuceId = req.body.astuceId;
      const updatedData = req.body;
  
      const updatedAstuce = await AstuceM.findByIdAndUpdate(astuceId, updatedData, { new: true });
  
      if (updatedAstuce) {
        res.status(200).json({
          message: 'Astuce updated successfully',
          astuce: updatedAstuce,
        });
      } else {
        res.status(404).json({ message: 'Astuce not found' });
      }
    } catch (error) {
      res.status(500).json("An error has occurred!");
    }
  }


  /// delete Astuce
  async function deleteA(req, res) {
    try {
      const astuceId = req.body.astuceId;
  
      const deletedAstuce = await AstuceM.findByIdAndDelete(astuceId);
  
      if (deletedAstuce) {
        res.status(200).json({
          message: 'Astuce deleted successfully',
        });
      } else {
        res.status(404).json({ message: 'Astuce not found' });
      }
    } catch (error) {
      res.status(500).json("An error has occurred!");
    }
  }


  export { getAById ,getAllA,addA,updateA,deleteA};
