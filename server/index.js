const express = require('express'); //import express folder
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');


mongoose.connect(keys.mongoURI);

const app = express(); //create express app

require('./routes/authRoutes')(app);

const PORT = (process.env.PORT || 5000); //process.env.PORT is for Heroku and 5000 is local dev port
app.listen(PORT);
