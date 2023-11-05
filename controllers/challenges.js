import express from 'express';
import ChallengeM from "../models/challenges.js";

// Create a new challenge
// Create a new challenge
const createChallenge = async (req, res) => {
  try {
    const challengeData = req.body; 

    if (req.file) {
      challengeData.media = [req.file.filename];
    } else {
      challengeData.media = [];
    }

    const newChallenge = await ChallengeM.create(challengeData); 
    res.status(201).json(newChallenge); 
  } catch (error) {
    res.status(500).json({ error: 'Challenge creation failed' }); // Handle errors with a 500 Internal Server Error
  }
};







// Retrieve a specified challenge by ID
const getChallengeById = async (req, res) => {
  const challengeId = req.params.id;
  try {
    const challenge = await ChallengeM.findById(challengeId);
    if (!challenge) {
      return res.status(404).json({ error: 'Challenge not found' });
    }
    res.status(200).json(challenge);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve challenge' });
  }
};

// List all challenges
const listChallenges = async (req, res) => {
  try {
    const challenges = await ChallengeM.find();
    res.status(200).json(challenges);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve challenges' });
  }
};

// Update a challenge by ID
const updateChallenge = async (req, res) => {
  const challengeId = req.params.id;
  const updatedData = req.body;
  try {
    const updatedChallenge = await ChallengeM.findByIdAndUpdate(challengeId, updatedData, { new: true });
    if (!updatedChallenge) {
      return res.status(404).json({ error: 'Challenge not found' });
    }
    res.status(200).json(updatedChallenge);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update challenge' });
  }
};

// Delete a challenge by ID
const deleteChallenge = async (req, res) => {
  const challengeId = req.params.id;
  try {
    const deletedChallenge = await ChallengeM.findByIdAndDelete(challengeId);
    if (!deletedChallenge) {
      return res.status(404).json({ error: 'Challenge not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ error: 'Failed to delete challenge' });
  }
};


const addParticipant = async (req, res) => {
  const challengeId = req.params.id;
  const userId = req.user.id; // Assuming you have the user's ID in the request (e.g., from the authentication middleware).

  try {
    const challenge = await ChallengeM.findById(challengeId);
    if (!challenge) {
      return res.status(404).json({ error: 'Challenge not found' });
    }

    if (challenge.participants.includes(userId)) {
      return res.status(400).json({ error: 'User is already a participant' });
    }

    challenge.participants.push(userId);
    await challenge.save();

    res.status(200).json({ message: 'User joined the challenge successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add a participant to the challenge' });
  }
};


// Add a comment to a challenge
const addComment = async (req, res) => {
  const challengeId = req.params.id;
  const userId = req.body.userId;
  const commentData = req.body.comment;
  try {
    // Implement logic to add a comment to a challenge
  } catch (error) {
    res.status(500).json({ error: 'Failed to add a comment to the challenge' });
  }
};

// Add a rating to a challenge
const addRating = async (req, res) => {
  const challengeId = req.params.id;
  const userId = req.body.userId;
  const ratingValue = req.body.rating;
  try {
  } catch (error) {
    res.status(500).json({ error: 'Failed to add a rating to the challenge' });
  }
};

const getLeaderboard = async (req, res) => {
  const challengeId = req.params.id;
  try {
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve the leaderboard' });
  }
};

export default {
  createChallenge,
  getChallengeById,
  listChallenges,
  updateChallenge,
  deleteChallenge,
  addParticipant,
  addComment,
  addRating,
  getLeaderboard,
};
