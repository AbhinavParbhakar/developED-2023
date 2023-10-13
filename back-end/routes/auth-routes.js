const express = require('express')

const {getUserById,createUser} = require('../controllers/user-controller')
const passport = require('passport')

const router = express.Router()

router.get("/google",passport.authenticate('google',{
    scope:['profile','email']
}))

router.get('/google/callback', passport.authenticate('google') ,(req,res) =>{
     res.send(req.user)
})

module.exports = router