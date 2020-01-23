const express = require('express');
const dotenv = require('dotenv');
const flash = require('connect-flash');
const session = require('express-session');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');

const connectDB = require('./config/db');

// configuration of enviromental variables
dotenv.config({
  path: './config/config.env'
});

const app = express();

// Passport config
require('./config/passport')(passport);

// DB Connection
connectDB();

// Set static folder (for client-side js, css, img, etc)
app.use(express.static(path.join(__dirname, 'public')));

// setting EJS as templating language
app.use(expressLayouts);
app.set('view engine', 'ejs');

// to get form data (using req.body) bodyParser middleware
app.use(express.urlencoded({
  extended: false
}));

// Express Session middleware
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash middleware (for showing flash messages)
app.use(flash());

// Global vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes middleswares (for cleaner hamdling of routes)
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));