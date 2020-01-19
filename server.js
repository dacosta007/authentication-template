const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const ejs = require('ejs');

// configuration of enviromental variables
dotenv.config({
  path: './config/config.env'
});

const app = express();

// setting EJS as templating language
app.set('view engine', 'ejs');
app.use(expressLayouts);

// Set static folder (for client-side js, css, img, etc)
app.use(express.static(path.join(__dirname, 'public')));

// Routes middleswares (for cleaner hamdling of routes)
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));