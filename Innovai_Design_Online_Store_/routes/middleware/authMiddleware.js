const supabase = require('../../supabaseClient');

const isAuthenticated = async (req, res, next) => {
  const { user, error } = await supabase.auth.getUser();

  if (error) {
    console.error("Error fetching user:", error.message, error.stack);
    return res.status(401).send('You are not authenticated');
  }

  if (user) {
    req.user = user; // Attach user to request object
    console.log("User authenticated:", user.email);
    return next();
  } else {
    console.error("User not authenticated");
    return res.status(401).send('You are not authenticated');
  }
};

module.exports = {
  isAuthenticated
};