const axios = require('axios')
const crypto = require('crypto')
const { hashing } = require('../passport-config/keys')
const { validateUser } = require('./user-controller')

const createPassword = (password) =>{
    return crypto.createHash(hashing.hash_algorithm).update(password).digest(hashing.hash_encoding).slice(hashing.min_length,hashing.max_length)
}

const  googleCallBack = async (request, accessToken, refreshToken, profile, done) =>{

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

    const returnedData  = await validateUser(email=user.email,password=user.passwd)

    if (returnedData){
        const {validateError,data} = returnedData
        if (validateError){
            console.log("error")
            axios.post('http://localhost:3000/user',user)
            .then((res)=>{
                done(null,res.data)
            })
            .catch((error)=>{
                done(error,null)
            })

        }else{
            console.log("found user")
            done(null,data)
            }
    }else{

    }

}

module.exports = {
    googleCallBack
}