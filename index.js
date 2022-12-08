
//Importing Modules
const express =  require('express');
const passport = require('passport');
const session = require('express-session')
const authStrategy = require('passport-oauth').OAuth2Strategy
require('dotenv').config();
const app = express();


app.use(session({ secret:process.env.SESSIONSECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

//Declearing variables
const port = process.env.PORT || 5000;
const clientID = process.env.CLIENTID;
const clientSecret = process.env.CLIENTSECRET;
let token ='sampletoken'
var redirectUri = `http://127.0.0.1:${port}/auth/tala/callback`
var authorizationURL = `http://b.pinggy.io:8081/oauth2/authorize`
var tokenUri = `http://b.pinggy.io:8081/oauth2/token`
var user;
var id_token;


passport.use('provider' , new authStrategy({
    clientID : clientID,
    clientSecret : clientSecret,
    authorizationURL : authorizationURL,
    tokenURL : tokenUri,
    callbackURL : redirectUri,
},
function user(accessToken, refreshToken,idToken ,user, done) {
    id_token = idToken.id_token;
    console.log(user)
    return done(null,user)
  }))
  

  
  
  //Routes
  app.get('/protected' ,(req,res)=>{
  console.log(id_token)
  const userInfoEncoded = id_token.split('.')
  const userInfoDecoded = Buffer.from(userInfoEncoded[1],'base64').toString()
  const userEmail = JSON.parse(userInfoDecoded).sub
  console.log(userEmail)
  
    res.send(` Hello <h2>${userEmail}</h2> `);
})
app.get('/auth/tala',passport.authenticate('provider',{scope : ['openid']}))


app.get('/auth/tala/callback',passport.authenticate('provider', { successRedirect: '/protected',failureRedirect: '/auth/failure' }));



//Connection with Auth URL




passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});



app.get('/auth/failure', (req, res) => {
  res.send('Failed to authenticate..');
});


app.get('/',(req , res)=>{
    res.send('<a href="/auth/tala">Authenticate with passport-tala</a>')
})

app.listen(port,()=> console.log("Server running on http://127.0.0.1:5000"))


module.exports.app = app;
