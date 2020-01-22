const express = require('express');
const router = express.Router();

// Routes
router.route('/login').get((req, res) => res.render('login'));

router.route('/signup').get((req, res) => res.render('signup'));

router.route('/signup').post((req, res) => {
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
  if(password !== rePassword) {
    errors.push({msg: 'Password do not match'});
  }

  // if there are any errors
  if(errors.length > 0) {
    res.render('signup', {
      errors,
      email,
      password,
      rePassword
    });
  } else {
    res.send('Pass completed!')
  }
});

// export routes
module.exports = router;