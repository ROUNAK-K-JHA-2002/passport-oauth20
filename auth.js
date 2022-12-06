const passport = require('passport')
const authStrategy = require('passport-oauth2').Strategy;
require('dotenv').config();
require('./.env.local')

passport.use(new authStrategy({
    authorizationURL : 'http://b.pinggy.io:8081/oauth2/authorize?response_type=code&client_id=sampleclient&redirect_uri=http://127.0.0.1:5000/auth/tala/callback&scope=openid',
    tokenURL : 'http://b.pinggy.io:8081/oauth2/token?client_id=sampleclient&client_secret=secret&grant_type=authorization_code&code=AqQekFWLWyYIxkgjYSUlG7m7E_WqlYE1KZakKXAA5e-jyIzOymFy0ua4nKZKaZqMZVje55ejAuxhP-Mi-yLLxFDfEek6WMI0kJ5wRJBBY7BtifZ8ul6cxHV6GjSiMSup&redirect_uri=http://127.0.0.1:5000/auth/tala/callback',
    clientID : 'sample_clientid',
    clientSecret : 'sample_clientSecret',
    callbackURL : 'http://127.0.0.1:5000/auth/tala/callback', 
},
function(accessToken, refreshToken, profile, cb) {
    console.log(accessToken,profile)
    return done(null,user)
  }))



passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

