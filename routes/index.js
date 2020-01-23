const express = require('express');
const router = express.Router();

const {
  ensureAuthenticated
} = require('../config/auth');

// @desc: Routes
// Welcome home page
router.route('/').get((req, res) => res.render('index'));

// Dashboard page
router.route('/dashboard').get(ensureAuthenticated, (req, res) => res.render('dashboard', {
  name: req.user.name
}));

// export routes
module.exports = router;