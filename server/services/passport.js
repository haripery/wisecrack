const passport = require('passport'); //passport for authentication
const GoogleStrategy = require('passport-google-oauth20').Strategy; //passport-google-oauth20 strategy import
const keys = require('../config/keys');

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
