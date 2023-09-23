const express = require('express')

const {getUserById,createUser} = require('../controllers/user-controller')
const passport = require('passport')

const router = express.Router()

router.get("/google",passport.authenticate('google',{
    scope:['profile','email']
}))

router.get('/google/redirect', passport.authenticate('google') ,(req,res) =>{
     res.send("You reached the callback")
})

module.exports = router