import jwt from 'jsonwebtoken';

export const authenticateJWT = (req, res, next) => {
    const token = req.cookies.access_token; // Get token from cookies
    // console.log(token);

    if (!token) {
        return res.status(403).json({authentication:false, message: 'Access denied. No token provided.' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decoded);
        
        req.user = decoded; // Attach the decoded payload to the request
        // console.log(req.user);
        

        next(); // Move to the next middleware/route handler
    } catch (err) {
        return res.status(401).json({authentication:false, message: 'Invalid or expired token.' });
    }
};
