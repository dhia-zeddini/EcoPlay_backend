import express from 'express';
import ChallengeM from "../models/challenges.js";
import moment from 'moment';
import fetch from 'node-fetch';


import dotenv from 'dotenv';
dotenv.config();






// Create a new challenge
// Create a new challenge
const createChallenge = async (req, res) => {
  try {
    const challengeData = req.body;
    challengeData.start_date = moment(challengeData.start_date, 'DD-MM-YYYY').toDate();
    challengeData.end_date = moment(challengeData.end_date, 'DD-MM-YYYY').toDate();
    challengeData.point_value = Number(challengeData.point_value);
    if (req.file) {
      const networkIP = '192.168.1.115'; 
      challengeData.media = `${req.protocol}://${networkIP}:9001/img/${req.file.filename}`;
    } else {
      challengeData.media = ''; // If no file uploaded, default to an empty string
    }
    const newChallenge = await ChallengeM.create(challengeData);
    res.status(201).json(newChallenge);
  } catch (error) {
    console.error(error); // Log the error for server-side debugging
    res.status(500).json({ error: 'Challenge creation failed' }); 
  }
};


const deleteComment = async (req, res) => {
  try {
    const { challengeId, commentId } = req.params;

    // Find the challenge by ID
    const challenge = await ChallengeM.findById(challengeId);
    if (!challenge) {
      return res.status(404).json({ error: 'Challenge not found' });
    }

    // Find the index of the comment to delete
    const commentIndex = challenge.comments.findIndex(c => c._id.toString() === commentId);
    if (commentIndex === -1) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    // Remove the comment from the array
    challenge.comments.splice(commentIndex, 1);

    // Save the challenge with the updated comments array
    await challenge.save();

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ error: 'Failed to delete the comment' });
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
  const userId = req.body.userId; // Get the user ID from the request body

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
    console.error(error); // Log the error so you can see it in your server logs.
    res.status(500).json({ error: 'Failed to add a participant to the challenge' });
  }
};


async function moderateContent(content) {
  const apiUser = process.env.API_USER;
  const apiSecret = process.env.API_SECRET;
  const formBody = new URLSearchParams();
  formBody.append('api_user', apiUser);
  formBody.append('api_secret', apiSecret);
  formBody.append('text', content);
  formBody.append('mode', 'rules');
  formBody.append('lang', 'en,fr,es'); 

  const response = await fetch('https://api.sightengine.com/1.0/text/check.json', {
    method: 'POST',
    body: formBody
  });

  const result = await response.json();

  console.log('Moderation result:', result);

  if (result.status === 'failure') {
    throw new Error(`API call failed: ${result.error.message}`);
  }

  if (result.profanity && result.profanity.matches && result.profanity.matches.length > 0) {
    throw new Error('Content is not appropriate due to profanity');
  }

  if (result.personal && result.personal.matches && result.personal.matches.length > 0) {
    throw new Error('Content is not appropriate due to personal information');
  }

  return result;
}





const addComment = async (req, res) => {
  const challengeId = req.params.id;
  const { userId, title, description } = req.body;
  const image = req.file ? req.file.filename : '';

  try {
    const challenge = await ChallengeM.findById(challengeId);
    if (!challenge) {
      return res.status(404).json({ error: 'Challenge not found' });
    }

    await Promise.all([
      moderateContent(title),
      moderateContent(description),
      //moderateContent(image)
    ]);

    const newComment = {
      user: userId,
      title: title,
      description: description,
      image: image,
    };

    challenge.comments.push(newComment);
    await challenge.save();
    res.status(201).json({ message: 'Comment added successfully', comment: newComment });

  } catch (error) {
    console.error('Error adding comment:', error);
    if (error.message.includes('Content is not appropriate')) {
      return res.status(400).json({ error: 'Your comment contains inappropriate content.' });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: 'Validation Error', details: error.errors });
    }
    res.status(500).json({ error: 'Failed to add a comment to the challenge', message: error.message });
  }
};


const addRating = async (req, res) => {
  const challengeId = req.params.id;
  const commentId = req.params.commentId; 
  const { userId, rating } = req.body;

  try {
    const challenge = await ChallengeM.findById(challengeId);
    if (!challenge) {
      return res.status(404).json({ error: 'Challenge not found' });
    }

    const comment = challenge.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    // Assuming you want to keep an array of ratings for each comment
    comment.ratings.push({ user: userId, rating: rating });
    await challenge.save();

    res.status(200).json({ message: 'Rating added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add a rating to the comment' });
  }
};


const getLeaderboard = async (req, res) => {
  const challengeId = req.params.id;

  try {
    const challenge = await ChallengeM.findById(challengeId);
    if (!challenge) {
      return res.status(404).json({ error: 'Challenge not found' });
    }

    // Assuming each comment has an array of ratings
    // and each rating has a 'value' field.
    const leaderboard = challenge.comments
      .map(comment => {
        const averageRating = comment.ratings.reduce((acc, rating) => acc + rating.value, 0) / comment.ratings.length;
        return {
          user: comment.user,
          comment: comment.text,
          averageRating: averageRating,
          totalRatings: comment.ratings.length
        };
      })
      // Filter out comments with no ratings
      .filter(comment => comment.totalRatings > 0)
      // Sort by average rating in descending order
      .sort((a, b) => b.averageRating - a.averageRating);

    res.status(200).json(leaderboard);
  } catch (error) {
    console.error(error);
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
  deleteComment,
  addRating,
  getLeaderboard,
};
