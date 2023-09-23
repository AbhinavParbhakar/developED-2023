const passport = require("passport")
const GoogleStrategy = require('passport-google-oauth20')
const keys = require('./keys')
const { googleCallBack } = require("../controllers/auth-controller")

passport.use(
    new GoogleStrategy({
    //options for google strategy
    callbackURL:"/auth/google/redirect",
    clientID:keys.google.GOOGLE_CLIENT_ID,
    clientSecret:keys.google.GOOGLE_CLIENT_SECRET
},googleCallBack))
