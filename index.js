
//Importing Modules
const express =  require('express');
const passport = require('passport');
const session = require('express-session')
require('dotenv').config();
const app = express();
const tala = require('./auth');


port = process.env.PORT || 5000;
const config ={
   clientID : process.env.CLIENTID,
   clientSecret :process.env.CLIENTSECRET,
     callbackURL :  `http://127.0.0.1:${port}/auth/tala/callback`,
    
}


app.use(session({ secret:process.env.SESSIONSECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


tala(config)

//Routes
app.get('/protected' ,(req,res)=>{
  const user = tala.user;
    res.send(` Hello , Welcome , ${user}`);
})
app.get('/auth/tala',passport.authenticate('provider',{scope : ['openid']}))


app.get('/auth/tala/callback',passport.authenticate('provider', { failureRedirect: '/auth/failure' }),(req,res)=>{
 res.redirect(`/protected`)
});



app.get('/auth/failure', (req, res) => {
  res.send('Failed to authenticate..');
});


app.get('/',(req , res)=>{
    res.send('<a href="/auth/tala">Authenticate with passport-tala</a>')
})

app.listen(port,()=> console.log("Server running on http://127.0.0.1:5000"))



