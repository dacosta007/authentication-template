const express = require('express');
const router = express.Router();

// Routes
router.route('/').get((req, res) => res.render('index'));

// export routes
module.exports = router;