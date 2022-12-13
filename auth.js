const passport = require('passport');
const authStrategy = require('passport-oauth').OAuth2Strategy
require('dotenv').config();
var id_token ='';


function initializePassport(config){


const clientID = config.clientID;
const clientSecret = config.clientSecret;
var redirectUri = config.callbackURL
const authorizationURL = `http://tala.pinggy.io/oauth2/authorize`
const   tokenUri = `http://tala.pinggy.io/oauth2/token`

 
//Connection with Auth URL
 passport.use('provider' , new authStrategy({
     clientID : clientID,
     clientSecret : clientSecret,
     callbackURL : redirectUri,
     authorizationURL :authorizationURL,
     tokenURL : tokenUri
},
function user(accessToken, refreshToken,idToken ,user , done) {
    id_token = idToken.id_token
    console.log(id_token)
        const userInfoEncoded = id_token.split('.')
    const userInfoDecoded = Buffer.from(userInfoEncoded[1],'base64').toString()
    const userEmail = JSON.parse(userInfoDecoded).sub
    console.log(userEmail)
    module.exports.user = userEmail;
    return done(null,user)
    
  }))
  

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});



}


module.exports = initializePassport;

