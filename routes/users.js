const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// the User model of mongoDB
const User = require('../models/User');

// Routes
router.route('/login').get((req, res) => res.render('login'));

router.route('/signup').get((req, res) => res.render('signup'));

router.route('/signup').post(async (req, res) => {
  // form's input values
  const {
    name,
    email,
    password,
    rePassword
  } = req.body;

  // help store errors
  let errors = [];

  // check for empty fields
  if (!name || !email || !password || !rePassword) {
    errors.push({
      msg: 'Please fill in all fields'
    });
  }

  // check password matches
  if (password !== rePassword) {
    errors.push({
      msg: 'Password do not match'
    });
  }

  // if there are any errors
  if (errors.length > 0) {
    res.render('signup', {
      errors,
      email,
      password,
      rePassword
    });
  } else {
    // @desc: Validate Pass
    // - check to see if the user exit
    try {
      let checkUser = await User.findOne({
        email: email
      });
      if (checkUser) {
        errors.push({
          msg: "You already have an account with us!"
        });

        res.render('signup', {
          errors,
          email,
          password,
          rePassword
        });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });

        // Hash password before save into DB
        bcrypt.genSalt(
          10,
          (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;

            // reset the user's password
            newUser.password = hash;

            // save user's data into DB and redirect to login page
            newUser.save().then(user => {
              req.flash('success_msg', 'Your account is now created successfully!. You can now login');
              res.redirect('/users/login');
            }).catch(err => console.log(err));
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  }
});

// Login handler 
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// Logout handler
router.route('/logout').get((req, res) => {
  // using the passport middleware giving us the logout() method on req obj
  req.logout();
  req.flash('success_msg', 'You are logged out successfully!');
  res.redirect('/users/login');
})

// export routes
module.exports = router;