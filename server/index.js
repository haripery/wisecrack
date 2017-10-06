const express = require('express'); //import express folder
const passport = require('passport'); //passport for authentication
const GoogleStrategy = require('passport-google-oauth20').Strategy; //passport-google-oauth20 strategy import
const keys = require('./config/keys');

const app = express(); //create express app


passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL:'auth/google/callback'
  }, (accessToken)=>{
    console.log(accessToken);
  })
);

app.get(
  '/auth/google',
passport.authenticate('google',{
  scope:['profile','email']
}))

app.get('auth/google/callback',passport.authenticate('google'));

const PORT = (process.env.PORT || 5000); //process.env.PORT is for Heroku and 5000 is local dev port
app.listen(PORT);
