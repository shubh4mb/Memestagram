
import User from '../models/user-model.js';
import Meme from '../models/meme_model.js';
// Assuming you have a User model
import multer from 'multer';
import path from 'path';
import fs from 'fs';
// import mongoose from 'mongoose';

// Check if the uploads directory exists, and create it if not
if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}

// Multer setup for profile image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage }).single('profile');


export const test = (req,res)=>{
    res.json({
        message:"hi"
    })
}

export const memehome = (req,res)=>{
    res.json({
        message:"yoyo"
    })
}

export const profile = async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId);
  
      // Construct full profile image URL
      const profileUrl = `${req.protocol}://${req.get('host')}${user.profile}`;
  
      res.status(200).json({
        username: user.username,
        email: user.email,
        profile: profileUrl,  // Full image URL sent to the frontend
        _id: user._id,
      });
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving user profile' });
    }
  };
  

  export const updateProfile = async (req, res) => {
    upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: `Multer error: ${err.message}` });
      } else if (err) {
        return res.status(500).json({ message: `Unknown error: ${err.message}` });
      }
  
      const { username, email } = req.body;
      let profileImagePath = req.user.profile; // Default to current profile image
  
      // If a new image file is uploaded, update the profile image path
      if (req.file) {
        profileImagePath = `/uploads/${req.file.filename}`;
      }
  
      try {
        // Update user data in the database
        const updatedUser = await User.findByIdAndUpdate(
          req.user.id,  // Assuming req.user is set by your authentication middleware
          {
            username,
            email,
            profile: profileImagePath,
          },
          { new: true } // Return the updated user document
        );
  
        if (!updatedUser) {
          return res.status(404).json({ message: 'User not found' });
        }
  
        res.status(200).json({ user: updatedUser, message: 'Profile updated successfully' });
      } catch (error) {
        res.status(500).json({ message: `Error updating profile: ${error.message}` });
      }
    });
  };



  export const addMeme = async (req, res) => {
    console.log('working');
    
    const { title, description } = req.body;
    const image = req.file;
  
    if (!title || !image) {
      return res.status(400).json({ message: 'Title and image are required.' });
    }
  
    const meme = new Meme({
      title,
      description,
      image: `/uploads/${image.filename}`, // store file path
      user: req.user.id, // using the authenticated user's ID
    });
  
    try {
      await meme.save();
      res.status(201).json({ message: 'Meme uploaded successfully', meme });
    } catch (error) {
      res.status(500).json({ message: 'Error saving meme' });
    }
  };


  export const getMemes=async (req, res) => {
    // console.log('working');
    
  try {
    const memes = await Meme.find().sort({ createdAt: -1 }).populate('user', 'username');; // Sorts by newest
    // console.log(memes);
    
    res.status(200).json(memes);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch memes' });
  }
};

export const deleteMeme = async (req, res) => {
  // console.log('Delete function invoked');
  
  
  try {
    const meme = await Meme.findOne({_id:req.params.id});
    console.log(meme);
    
    if (!meme) {
      // console.log('Meme not found');
      return res.status(404).json({ message: 'Meme not found' });
    }

    if (meme.user.toString() !== req.user.id) {
      // console.log('Unauthorized action');
      return res.status(403).json({ message: 'Unauthorized action' });
    }

    await meme.deleteOne();
    // console.log('Meme deleted successfully');
    res.status(200).json({ message: 'Meme deleted successfully' });
  } catch (error) {
    console.error('Error deleting meme:', error);
    res.status(500).json({ message: 'Error deleting meme' });
  }
};

export const getUserMemesById=async (req, res) => {
  
  

try {
  console.log('working');
  const id=req.params.id
  console.log(id);
  const user = await User.findById({_id:id}); 
  console.log(user);
  // if (!user) return res.status(404).json({ error: "User not found" });
  const memes = await Meme.find({user:id}).sort({ createdAt: -1 }).populate('user', 'username');; // Sorts by newest
  console.log(memes);
  
  res.status(200).json( {username: user.username,memes});
} catch (error) {
  console.log('workinhss');
  
  res.status(500).json({ message: 'Failed to fetch memes' });
}
};