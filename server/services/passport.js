const passport = require('passport'); //passport for authentication
const GoogleStrategy = require('passport-google-oauth20').Strategy; //passport-google-oauth20 strategy import
const mongoose = require('mongoose');//for MongoDB updation
const keys = require('../config/keys');//get the keys

const User = mongoose.model('users');//JS models for mongoDB

passport.serializeUser((user, done)=>{
  done(null, user.id);
});


//function to turn userid into user
passport.deserializeUser((id, done)=> {
  User.findById(id).then(user=>{
    done(null,user);
  });
})

if(process.env.NODE_ENV==='production'){
  passport.use(
    new GoogleStrategy({
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL:'https://wisecrack.herokuapp.com/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      //promise for Asynchronus functions
      const existingUser = await User.findOne({googleId:profile.id})
        if(existingUser){
          //User already present in db
          return done(null,existingUser);
        }
        //User not in database
        const user = await new User({ googleId:profile.id }).save()//creates mongoose model instance
        done(null,user);
    }
  )
  );
} else {
  passport.use(
    new GoogleStrategy({
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL:'http://localhost:5000/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      //promise for Asynchronus functions
      const existingUser = await User.findOne({googleId:profile.id})
        if(existingUser){
          //User already present in db
          return done(null,existingUser);
        }
        //User not in database
        const user = await new User({ googleId:profile.id }).save()//creates mongoose model instance
        done(null,user);
    }
  )
  );
}
