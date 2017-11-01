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
  app.get('/auth/google/callback',
  passport.authenticate('google'),
  (req, res) => {
    if(process.env.NODE_ENV==='production'){
      res.redirect('/surveys');
    }else{
      res.redirect('http://localhost:3000/surveys');
    }
  }
);//it will have the code available

  app.get('/api/logout',(req, res)=>{
    req.logout(); //promise destroy the userid
    res.redirect('/')
  })


  app.get('/api/current_user',(req,res)=>{
    res.send(req.user);
  })


};
