import express from 'express';
import ChallengeM from "../models/challenges.js";

// Create a new challenge
// Create a new challenge
const createChallenge = async (req, res) => {
  try {
    const challengeData = req.body;
    // Convert start_date and end_date from string to Date objects
    challengeData.start_date = new Date(challengeData.start_date);
    challengeData.end_date = new Date(challengeData.end_date);
    // Convert point_value from string to Number
    challengeData.point_value = Number(challengeData.point_value);
    // Handle media file if uploaded
    if (req.file) {
      const networkIP = '192.168.1.115'; 

      // Set the media field to be a string containing the URL to the media
      challengeData.media = `${req.protocol}://${networkIP}:9001/img/${req.file.filename}`;
    } else {
      challengeData.media = ''; // If no file uploaded, default to an empty string
    }
    
    // Here, ensure that participants is an array of ObjectId's
    // If your frontend sends an array of participant IDs as strings, you would convert them like this:


    const newChallenge = await ChallengeM.create(challengeData);
    res.status(201).json(newChallenge);
  } catch (error) {
    console.error(error); // Log the error for server-side debugging
    res.status(500).json({ error: 'Challenge creation failed' }); // Send a 500 Internal Server Error response
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
