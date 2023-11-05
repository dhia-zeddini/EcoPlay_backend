import db from './config/DBConnection.js';
import { ChallengeM } from './models/challenges.js';

// Sample data for the new challenge
const newChallengeData = {
  title: 'Sample Challenge',
  description: 'This is a test challenge.',
  start_date: new Date(),
  end_date: new Date(),
  category: 'Test',
  point_value: 10,
};

// Create a new challenge document
const newChallenge = new ChallengeM(newChallengeData);

// Save the challenge document to the database
newChallenge.save()
  .then(() => {
    console.log('New challenge created and saved to the database');
  })
  .catch((error) => {
    console.error('Error creating and saving the challenge:', error);
  })
  .finally(() => {
    // Close the database connection after the operation
    db.close();
  });
