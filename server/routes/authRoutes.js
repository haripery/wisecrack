const passport = require('passport');
//first time authentication

module.exports = (app) => {
  app.get(
    '/auth/google',
  passport.authenticate('google',{
    scope:['profile','email']
  })
);

  //already registered and contains the code
  app.get('/auth/google/callback',passport.authenticate('google'));//it will have the code available
};
