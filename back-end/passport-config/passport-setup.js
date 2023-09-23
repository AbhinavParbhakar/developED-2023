const passport = require("passport")
const GoogleStrategy = require('passport-google-oauth20')
const keys = require('./keys')

passport.use(
    new GoogleStrategy({
    //options for google strategy
    callbackURL:"/auth/google/redirect",
    clientID:keys.google.GOOGLE_CLIENT_ID,
    clientSecret:keys.google.GOOGLE_CLIENT_SECRET
},(request, accessToken, refreshToken, profile, done)=>{
    console.log(profile)
}))
