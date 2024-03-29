const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'username' }, (username, password, done) => {
      // Match user
      User.findOne({ username: username })
        .then(user => {
          if (!user) {
            console.log(`No user found with username: ${username}`);
            return done(null, false, { message: 'That username is not registered' });
          }

          // Match password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
              console.error('Error comparing passwords:', err);
              return done(err);
            }
            if (isMatch) {
              return done(null, user);
            } else {
              console.log('Password incorrect for user:', username);
              return done(null, false, { message: 'Password incorrect' });
            }
          });
        })
        .catch(err => {
          console.error('Error finding user during authentication:', err);
          return done(err);
        });
    })
  );

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser((id, done) => {
    User.findById(id, function(err, user) {
      if (err) {
        console.error('Error deserializing user:', err);
        return done(err);
      }
      done(null, user);
    });
  });
};