import User from '../models/user-model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

dotenv.config();

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

export const signup = async (req, res, next) => {
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



export const signin = async (req, res, next) => {
    const { identifier, password } = req.body; // `identifier` can be either username or email

    try {
        // Determine if the identifier is an email or username
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);

        // Find the user based on the identifier (either email or username)
        const user = await User.findOne(isEmail ? { email: identifier } : { username: identifier });

        // If no user is found, return a 404 error
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Create a JWT token (assuming you use JWT for authentication)
        const token = jwt.sign(
            { id: user._id, username: user.username, email: user.email },
            process.env.JWT_SECRET, // Use your secret key here
            { expiresIn: '1h' } // Token expiry time
        );

        // Remove the password from the user data before sending it
        const { password: hashedPassword, ...rest } = user._doc;

        // Set the cookie with the JWT token and send the response
        res.cookie('access_token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 })
            .status(200)
            .json({ user: rest, message: 'Login successful' });

    } catch (error) {
        next(error); // Pass errors to the error handling middleware
    }
};


export const verify = (req, res) => {
    // If we reached this point, the token is valid, and req.user contains the user info
    // const { username, email } = req.user; // Adjust according to your token payload
    // console.log("working verify");
    
    res.status(200).json({ message: 'Token is valid.', authentication:true });
}


export const logoutUser = (req, res) => {
    // Clear the cookie by setting it to an empty string and expire it immediately
    res.clearCookie('access_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: 'strict', // Enforce strict SameSite policy for security
    });
  
    return res.status(200).json({ message: 'Logout successful.' });
  };