const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const connectDB = require('./config/db');

// configuration of enviromental variables
dotenv.config({
  path: './config/config.env'
});

const app = express();

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

// Routes middleswares (for cleaner hamdling of routes)
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));