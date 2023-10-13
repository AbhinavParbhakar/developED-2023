const passport = require("passport")
const GoogleStrategy = require('passport-google-oauth20')
const keys = require('./keys')
const axios = require('axios')
const { googleCallBack } = require("../controllers/auth-controller")


passport.serializeUser((userData,done)=>{
    done(null,userData.id)
})

passport.deserializeUser((userID,done)=>{
    axios.get(`http://localhost:3000/user/${userID}`)
    .then((user)=>{
        done(null,user)
    })
    .catch((error)=>{
        done(error,null)
    })
})

passport.use(
    new GoogleStrategy({
    //options for google strategy
    callbackURL:"/auth/google/redirect",
    clientID:keys.google.GOOGLE_CLIENT_ID,
    clientSecret:keys.google.GOOGLE_CLIENT_SECRET
},googleCallBack))


