const User = require('../models/userModel');

// Middleware to check if the user has the required role
exports.requireRole = (role) => (req, res, next) => {
  if (req.isAuthenticated()) {
    User.findById(req.user._id, (err, user) => {
      if (err) {
        console.error('Error finding user during role check:', err.message, err.stack);
        return res.status(500).send('Internal server error');
      }
      if (!user) {
        console.log('User not found during role check');
        return res.status(401).send('Unauthorized');
      }
      if (user.roles.includes(role)) {
        console.log(`User ${user.username} has the required role: ${role}`);
        return next();
      } else {
        console.log(`User ${user.username} does not have the required role: ${role}`);
        return res.status(403).send('Forbidden');
      }
    });
  } else {
    console.log('User is not authenticated');
    return res.status(401).send('Unauthorized');
  }
};