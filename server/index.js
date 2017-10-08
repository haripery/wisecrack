const express = require('express'); //import express folder
const mongoose = require('mongoose')
require('./services/passport')

mongoose.connect('mongodb://<dbuser>:<dbpassword>@ds113835.mlab.com:13835/wisecrack-dev');

const app = express(); //create express app

require('./routes/authRoutes')(app);

const PORT = (process.env.PORT || 5000); //process.env.PORT is for Heroku and 5000 is local dev port
app.listen(PORT);



//https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fauth%2Fgoogle%2Fcallback&scope=profile%20email&client_id=894213990449-7kq1cgctk936qsi58q3jpqt1dtm9mbis.apps.googleusercontent.com
//http://localhost:5000/auth/google/callback?code=4/TKpLBHQ_UtOCx73LRFXhAMEDLTChOEZ923RYmoYnFA8#

//https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fauth%2Fgoogle%2Fcallback&client_id=894213990449-7kq1cgctk936qsi58q3jpqt1dtm9mbis.apps.googleusercontent.com
