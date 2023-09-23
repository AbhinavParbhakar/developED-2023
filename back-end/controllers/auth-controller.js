const {createUser,getUserById} = require('./user-controller')
const axios = require('axios')
const crypto = require('crypto')
const { hashing } = require('../passport-config/keys')

const createPassword = (password) =>{
    return crypto.createHash(hashing.hash_algorithm).update(password).digest(hashing.hash_encoding).slice(hashing.min_length,hashing.max_length)
}

const googleCallBack = (request, accessToken, refreshToken, profile, done) =>{


    const user = {
        f_name : profile.name.givenName,
        l_name : profile.name.familyName,
        b_day : "2018-07-22",
        //for emails, it returns an array of objects, just pick the first object called Value,
        //format = { value: 'email', verified: boolean}
        email : profile.emails[0].value,
        // set a random password, how else
        passwd : createPassword(profile.id)
    }
    console.log(profile)
    console.log(user)
    axios.post('http://localhost:3000/user',user).then((res)=>{
        console.log(res)
    })
    console.log('created user')
}

module.exports = {
    googleCallBack
}