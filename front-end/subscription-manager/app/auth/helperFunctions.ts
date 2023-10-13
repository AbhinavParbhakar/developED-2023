import { Profile } from "next-auth"
import { GitHubProfile, GoogleProfile,  UserObject } from "../interfaces/interfaces"

const crypto = require('crypto')

export function createPassword(password:string){
    const hash_algorithm  = process.env.hash_algorithm
    const hash_encoding = process.env.hash_encoding
    const min_length = process.env.min_length as unknown as number
    const max_length = process.env.max_length as unknown as number

    return crypto.createHash(hash_algorithm).update(password).digest(hash_encoding).slice(min_length,max_length)

}

export function createUser(provider_name:string,profile:GitHubProfile|GoogleProfile | null) : UserObject | null{
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()
    const userObject : UserObject = {f_name : '', l_name : '', b_day:`${year}-${month}-${day}`, email : '', passwd : ''}
    try{
        if (provider_name === "github"){
            profile = <GitHubProfile> profile
            userObject.passwd = createPassword(String(profile.id))
            userObject.f_name =  <string> profile.login
            userObject.l_name = <string> profile.login
            userObject.email = <string> profile.email
        
        }else if (provider_name === "google"){
            profile = <GoogleProfile> profile
            userObject.passwd = createPassword(profile.sub)
            userObject.f_name = profile.given_name
            userObject.l_name = profile.family_name
            userObject.email = profile.email
        }
    }catch(error){
        if (error instanceof Error){
            console.log(error.message)
        }else{
            console.log(String(error))
        }
    }

    return userObject

}