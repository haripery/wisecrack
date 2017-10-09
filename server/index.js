const express = require('express'); //import express folder
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');//for cookies needs to be enabled first before passport
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');


mongoose.connect(keys.mongoURI);

const app = express(); //create express app

//Middlewares 1 cookiesession and 2 passport
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,//cookie lifetime in browser in milliseconds
    keys: [keys.cookieKey]//key encryption
  })
)

app.use(passport.initialize()); //pulls the user id from the cookie
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = (process.env.PORT || 5000); //process.env.PORT is for Heroku and 5000 is local dev port
app.listen(PORT);
