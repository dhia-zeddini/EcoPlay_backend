import express from 'express';
import challengesController from "../controllers/challenges.js";

const router = express.Router();

router.post('/challenges', challengesController.createChallenge);

router.get('/challenges/:id', challengesController.getChallengeById);

router.get('/challenges', challengesController.listChallenges);

router.put('/challenges/:id', challengesController.updateChallenge);

router.delete('/challenges/:id', challengesController.deleteChallenge);

router.post('/challenges/:id/join', challengesController.addParticipant);

router.post('/challenges/:id/leave', challengesController.addParticipant);

router.post('/challenges/:id/comments', challengesController.addComment);

router.post('/challenges/:id/ratings', challengesController.addRating);

router.get('/challenges/:id/leaderboard', challengesController.getLeaderboard);

export default router;
