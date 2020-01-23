const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load mongoose User model
const User = require('../models/User');

const pass = (passport) => {
  passport.use(
    new localStrategy({
        usernameField: 'email'
      },
      async (email, password, done) => {
        // Compare if user matches
        try {
          let userMatch = await User.findOne({
            email: email
          });
          if (!userMatch) {
            return done(null, false, {
              message: 'Such email does not exit'
            });
          }

          // match password
          bcrypt.compare(password, userMatch.password, (err, isMatch) => {
            if (err) throw err;

            if (isMatch) {
              return done(null, userMatch);
            } else {
              return done(null, false, {
                message: 'Incorrect Password'
              });
            }
          })
        } catch (error) {
          console.log(error);
        }
      }
    )
  );

  // Passport session handling for serializing and de-serializing session ID
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};

module.exports = pass;