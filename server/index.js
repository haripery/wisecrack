const express = require('express'); //import express folder
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');//for cookies needs to be enabled first before passport
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');


mongoose.connect(keys.mongoURI);

const app = express(); //create express app

app.use(bodyParser.json()); //Middleware for parsing put, post requests from client


//Middlewares 1 cookiesession and 2 passport
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,//cookie lifetime in browser in milliseconds
    keys: [keys.cookieKey]//key encryption
  })
);

app.use(passport.initialize()); //pulls the user id from the cookie
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static('client/build'));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = (process.env.PORT || 5000); //process.env.PORT is for Heroku and 5000 is local dev port
app.listen(PORT);
