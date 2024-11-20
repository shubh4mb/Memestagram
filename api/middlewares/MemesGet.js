

import Meme from '../models/meme_model.js'
export const getUserMemes = async (req, res) => {
    console.log('memesworking');
    
    try {
      const memes = await Meme.find({ user: req.user.id }); // Find memes by user ID
      res.status(200).json(memes);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving memes' });
    }
  };