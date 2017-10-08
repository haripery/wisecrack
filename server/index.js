const express = require('express'); //import express folder
const passport = require('passport'); //passport for authentication
const GoogleStrategy = require('passport-google-oauth20').Strategy; //passport-google-oauth20 strategy import
const keys = require('./config/keys');

const app = express(); //create express app

passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL:'http://localhost:5000/auth/google/callback'
  },
  (accessToken, refreshToken, profile, done) => {
    console.log('access Token',accessToken);
    console.log('Refresh Token',refreshToken);
    console.log('profile',profile);
  }
)
);

//first time authentication
app.get(
  '/auth/google',
passport.authenticate('google',{
  scope:['profile','email']
}))

//already registered and contains the code
app.get('/auth/google/callback',passport.authenticate('google'));//it will have the code available

const PORT = (process.env.PORT || 5000); //process.env.PORT is for Heroku and 5000 is local dev port
app.listen(PORT);


//https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fauth%2Fgoogle%2Fcallback&scope=profile%20email&client_id=894213990449-7kq1cgctk936qsi58q3jpqt1dtm9mbis.apps.googleusercontent.com
//http://localhost:5000/auth/google/callback?code=4/TKpLBHQ_UtOCx73LRFXhAMEDLTChOEZ923RYmoYnFA8#

//https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fauth%2Fgoogle%2Fcallback&client_id=894213990449-7kq1cgctk936qsi58q3jpqt1dtm9mbis.apps.googleusercontent.com
