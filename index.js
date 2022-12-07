
//Importing Modules
const express =  require('express');
const passport = require('passport');
const authStrategy = require('passport-oauth2').Strategy
const app = express();



//Declearing variables
const port = 3000;
const clientID = 'sampleclient';
const clientSecret = 'clientSecret';
let token ='sampletoken'
var redirectUri = `http://127.0.0.1:${port}/auth/tala/callback`
var authorizationURL = `http://b.pinggy.io:8081/oauth2/authorize?response_type=code&client_id=${clientID}&redirect_uri=${redirectUri}&scope=openid`
var tokenUri = `http://b.pinggy.io:8081/oauth2/token?client_id=${clientID}&client_secret=${clientSecret}&grant_type=authorization_code&code=${token}&redirect_uri=${redirectUri}`


//Fuction to check if user is logged in
function isloggedin(req,res){
    req.user ? next() : res.sendStatus(401)
}

//Routes
app.get('/protected', isloggedin ,(req,res)=>{
    res.send("Hello");
})
app.get('/auth/tala',passport.authenticate('oauth2',{scope : ['openid']}))

app.get('/auth/tala/callback',
    (req,res)=>{
         token = req.query.code;
         tokenUri = `http://b.pinggy.io:8081/oauth2/token?client_id=${clientID}&client_secret=${clientSecret}&grant_type=authorization_code&code=${req.query.code}&redirect_uri=${redirectUri}`
         console.log(tokenUri)
    },passport.authenticate('oauth2'),(req,res)=>{
    console.log("Login Successful")
    res.redirect('/protected')
})


//Connection with Auth URL

passport.use(new authStrategy({
    clientID : clientID,
    clientSecret : clientSecret,
    authorizationURL : authorizationURL,
    tokenURL : tokenUri,
    callbackURL : redirectUri
},
function(accessToken, refreshToken, profile, done) {
    console.log(accessToken)
    return done(err,user)
  }))


app.get('/',(req , res)=>{
    res.send('<a href="/auth/tala">Authenticate </a>')
})

app.listen(port,()=> console.log("Server running on http://127.0.0.1:3000"))


