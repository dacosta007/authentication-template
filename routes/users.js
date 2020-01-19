const express = require('express');
const router = express.Router();

// Routes
router.route('/login').get((req, res) => res.render('login'));

router.route('/signup').get((req, res) => res.render('signup'));

// export routes
module.exports = router;