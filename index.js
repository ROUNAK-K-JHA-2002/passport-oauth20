
//Importing Modules
const express =  require('express');
const passport = require('passport');
const session = require('express-session')
const authStrategy = require('passport-oauth').OAuth2Strategy
const app = express();

app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

//Declearing variables
const port = 5000;
const clientID = 'sampleclient';
const clientSecret = 'secret';
let token ='sampletoken'
var redirectUri = `http://127.0.0.1:${port}/auth/tala/callback`
var authorizationURL = `http://b.pinggy.io:8081/oauth2/authorize`
var tokenUri = `http://b.pinggy.io:8081/oauth2/token`


passport.use('provider' , new authStrategy({
    clientID : clientID,
    clientSecret : clientSecret,
    authorizationURL : authorizationURL,
    tokenURL : tokenUri,
    callbackURL : redirectUri,
},
function(accessToken, refreshToken, profile, done) {
    console.log("accessToken " + accessToken)
    console.log("refreshToken " + refreshToken)
    console.log("profile " + JSON.stringify(profile))
    return done(null,profile)
  }))


//Routes
app.get('/protected' ,(req,res)=>{
    res.send("Hello");
})
app.get('/auth/tala',passport.authenticate('provider',{scope : ['openid']}))

// app.get('/auth/tala/callback',
//     (req,res)=>{
//          token = req.query.code;
//          tokenUri = `http://b.pinggy.io:8081/oauth2/token?client_id=${clientID}&client_secret=${clientSecret}&grant_type=authorization_code&code=${req.query.code}&redirect_uri=${redirectUri}`
//       console.log(tokenUri)
//     },
//     passport.authenticate('oauth2', {successRedirect:'/protected', failureRedirect: '/auth/failed' }),(req,res)=>{
//      console.log("Login Successful")
// })
app.get('/auth/tala/callback',passport.authenticate('provider', { successRedirect: '/protected',
                                      failureRedirect: '/auth/failure' }));



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
    res.send('<a href="/auth/tala">Authenticate </a>')
})

app.listen(port,()=> console.log("Server running on http://127.0.0.1:5000"))


