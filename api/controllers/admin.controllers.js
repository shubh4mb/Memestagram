import Admin from '../models/admin-model.js'
import User from '../models/user-model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import multer from 'multer';
import path from 'path';
import fs from 'fs';
import Meme from '../models/meme_model.js';



// Ensure the 'uploads' folder exists
if (!fs.existsSync('./uploads')) {
    fs.mkdirSync('./uploads');
}

// Setup storage for profile images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads'); // Save images to "uploads" folder
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Name format
    }
});

// Initialize multer middleware for profile image uploads
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // 1MB limit
}).single('profile'); // 'profile' corresponds to the name in the frontend form



export const adminlogin = async (req, res) => {
    const { username, password } = req.body;
    console.log(username);
    
  
    try {
      // Find admin by username and password (both in plain text)
      const admin = await Admin.findOne({ username, password });
      if (!admin) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
  
      // Generate JWT token
      const token = jwt.sign(
        { id: admin._id, username: admin.username },
        process.env.JWT_SECRET, // Make sure to set this secret in your environment variables
        { expiresIn: '1h' } // Token expires in 1 hour
      );
  
      // Exclude password from the response
      const { password: adminPassword, ...rest } = admin._doc;
  
      // Set cookie with token and send the response
      res
        .cookie('admin_token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 }) // 5-minute expiration
        .status(200)
        .json({ message: "Login successful", admin: rest });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };

  export const getUsers = async (req, res) => {
    // console.log("working");
    
    try {
      const users = await User.find({}); // Fetch all users from the database
      
      if (users.length === 0) { // Check if no users are found
        return res.status(404).json({ message: 'No users found' }); // Return a 404 status with a custom message
      }
  
      res.status(200).json(users); // Send back users in JSON format if found
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Server error, could not fetch users' });
    }
  };


  export const updateuser= async(req,res)=>{
    console.log("working");
    
    upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ message: `Multer error: ${err.message}` });
        } else if (err) {
            return res.status(500).json({ message: `Unknown error: ${err.message}` });
        }

        const { userId, username, email } = req.body; // Ensure 'userId' is passed to identify the user

        try {
            // Find the user by ID
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            // If a file is uploaded, update the profile image
            if (req.file) {
                // If user already has a profile image, optionally delete the old image file
                if (user.profile) {
                    const oldProfilePath = path.join(__dirname, '..', user.profile);
                    fs.unlink(oldProfilePath, (err) => {
                        if (err) console.log("Failed to delete old profile image:", err);
                    });
                }
                // Set the new profile image path
                user.profile = `/uploads/${req.file.filename}`;
            }

            // Update user details
            user.username = username || user.username;
            user.email = email || user.email;

            // Save the updated user to the database
            await user.save();

            // Respond with success message
            res.status(200).json({ message: "User updated successfully", user });

        } catch (error) {
            next(error); // Pass any errors to error handling middleware
        }
    })}


    export const deleteuser=async(req,res)=>{
      {
        try {
          const { id } = req.params;
          const deletedUser = await User.findByIdAndDelete(id);
           await Meme.deleteMany({user:id})

      
          if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
          }
      
          res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
          console.error('Error deleting user:', error);
          res.status(500).json({ message: 'Failed to delete user' });
        }
      };
    }
    

    export const createuser=async(req,res,next)=>{
      console.log("working");
      
      upload(req, res, async (err) => {
          if (err instanceof multer.MulterError) {
              return res.status(400).json({ message: `Multer error: ${err.message}` });
          } else if (err) {
              return res.status(500).json({ message: `Unknown error: ${err.message}` });
          }
  
          const { username, email, password } = req.body;
  
          try {
              // Check if username or email already exists
              const existingUsername = await User.findOne({ username });
              if (existingUsername) {
                  return res.status(409).json({ message: "Username already exists" });
              }
  
              const existingEmail = await User.findOne({ email });
              if (existingEmail) {
                  return res.status(409).json({ message: "Email already exists" });
              }
  
              // If file is uploaded, save the file path to the user's profile field
              let profileImagePath = '';
              if (req.file) {
                  profileImagePath = `/uploads/${req.file.filename}`; // Store relative file path
              }
  
              // Hash the password
              const hashedPassword = bcrypt.hashSync(password, 10);
  
              // Create the new user object
              const newUser = new User({
                  username,
                  email,
                  password: hashedPassword,
                  profile: profileImagePath, // Store the profile image URL
              });
  
              // Save the new user to the database
              await newUser.save();
              res.status(201).json({ message: "User registered successfully" });
  
          } catch (error) {
              next(error); // Pass any errors to error handling middleware
          }
      });
  };

  export const logoutAdmin = (req, res) => {
    // Clear the cookie by setting it to an empty string and expire it immediately
    res.clearCookie('admin_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: 'strict', // Enforce strict SameSite policy for security
    });
  
    return res.status(200).json({ message: 'Logout successful.' });
  };

  export const verify = (req,res)=>{
 
    res.status(200).json({authentication:true,message:'valid'})
  }

  export const getMemes=async (req, res) => {
    // console.log('working');
    
  try {
    const memes = await Meme.find().sort({ createdAt: -1 }).populate('user', 'username');; // Sorts by newest
    res.status(200).json(memes);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch memes' });
  }
};