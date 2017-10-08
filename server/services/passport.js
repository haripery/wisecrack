const passport = require('passport'); //passport for authentication
const GoogleStrategy = require('passport-google-oauth20').Strategy; //passport-google-oauth20 strategy import
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL:'http://localhost:5000/auth/google/callback'
  },
  (accessToken, refreshToken, profile, done) => {
    new User({googleId:profile.Id}).save();
  }
)
);

//https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fauth%2Fgoogle%2Fcallback&scope=profile%20email&client_id=894213990449-7kq1cgctk936qsi58q3jpqt1dtm9mbis.apps.googleusercontent.com
//http://localhost:5000/auth/google/callback?code=4/TKpLBHQ_UtOCx73LRFXhAMEDLTChOEZ923RYmoYnFA8#

//https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fauth%2Fgoogle%2Fcallback&client_id=894213990449-7kq1cgctk936qsi58q3jpqt1dtm9mbis.apps.googleusercontent.com
