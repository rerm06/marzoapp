const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Format: Bearer <token>
  if (!token) {
    console.log('Access denied. No token provided.');
    return res.status(403).json({ message: 'A token is required for authentication' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log('Token verified successfully');
  } catch (error) {
    console.error('Invalid Token:', error.message, error.stack);
    return res.status(401).json({ message: 'Invalid Token' });
  }
  return next();
};

module.exports = verifyToken;