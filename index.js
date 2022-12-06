const express =  require('express');
const passport = require('passport');
require('./auth')
require('dotenv').config();



const app = express();
const port = 5000;


function isloggedin(req,res){
    req.user ? next() : res.sendStatus(401)
}


app.get('/protected',isloggedin,(req,res)=>{
    res.send("Hello");
})


app.get('/auth/tala',passport.authenticate('oauth2',{
    scope : ['openid']
}))

app.get('/auth/tala/callback',passport.authenticate('oauth2',{
    failureRedirect : '/auth/failed',
    successRedirect : '/protected'
}))




app.get('/',(req , res)=>{
    res.send('<a href="/auth/tala">Authenticate </a>')
})

app.listen(port,()=> console.log("Server running on http://localhost:5000"))