import express from "express";
import challengesController from "../controllers/challenges.js";
import multer from '../middlewares/multer.js'; // Assuming this is your Multer configuration
import { commentsUpload } from "../middlewares/commentsMulter.js"; // Adjust the import path as needed

import ChallengeM from "../models/challenges.js";

const router = express.Router();

router.post('/challenges', multer, challengesController.createChallenge);

router.get('/challenges/:id', challengesController.getChallengeById);

router.get('/challenges', challengesController.listChallenges);

router.put('/challenges/:id', challengesController.updateChallenge);

router.delete('/challenges/:id', challengesController.deleteChallenge);

router.post('/challenges/:id/join', challengesController.addParticipant);

router.post('/challenges/:id/leave', challengesController.addParticipant);

router.post('/challenges/comments/:id/', commentsUpload, challengesController.addComment);

// Assuming you have an Express server and a Challenge model
// with a comments field that is an array of comment objects

router.get('/challenges/comments/:id', async (req, res) => {
    try {
      const challengeId = req.params.id;
      const challenge = await ChallengeM.findById(challengeId).lean();
  
      if (!challenge) {
        return res.status(404).json({ message: 'Challenge not found' });
      }
  
      res.status(200).json(challenge.comments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });
  

  
router.delete('/challenges/comments/:challengeId/:commentId', challengesController.deleteComment);


router.post('/challenges/:id/ratings', challengesController.addRating);

router.get('/challenges/:id/leaderboard', challengesController.getLeaderboard);

export default router;
