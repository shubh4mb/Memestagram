import User from '../models/user-model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        // Check if username already exists
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(409).json({ message: "Username already exists" });
        }

        // Check if email already exists
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(409).json({ message: "Email already exists" });
        }

        // If no conflicts, hash the password and create the new user
        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });

        // Save the new user
        await newUser.save();
        res.status(201).json({ message: "success" });
    } catch (error) {
        next(error);
    }
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
        res.cookie('access_token', token, { httpOnly: true, maxAge: 1000 * 60 * 5 })
            .status(200)
            .json({ user: rest, message: 'Login successful' });

    } catch (error) {
        next(error); // Pass errors to the error handling middleware
    }
};
