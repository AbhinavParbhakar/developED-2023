import { Profile, User } from "next-auth"
import { GitHubProfile, GoogleProfile,  UserObject, credentialsRegister } from "../interfaces/interfaces"

const crypto = require('crypto')

export function createPassword(password:string){
    const hash_algorithm  = process.env.hash_algorithm
    const hash_encoding = process.env.hash_encoding
    const min_length = process.env.min_length as unknown as number
    const max_length = process.env.max_length as unknown as number

    return crypto.createHash(hash_algorithm).update(password).digest(hash_encoding)

}

export function createUser(provider_name:string,profile:GitHubProfile|GoogleProfile | credentialsRegister |null) : {'name' : string, "email" : string, "passwd" : string} | null{
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()
    const userObject : {'name' : string, "email" : string, "passwd" : string} = {name:'', email : '', passwd : ''}
    try{
        if (provider_name === "github"){
            profile = <GitHubProfile> profile
            userObject.passwd = createPassword(String(profile.id))
            userObject.name =  <string> profile.login
            userObject.email = <string> profile.email
        
        }else if (provider_name === "google"){
            profile = <GoogleProfile> profile
            userObject.passwd = createPassword(profile.sub)
            userObject.name = profile.name as string
            userObject.email = profile.email
        }else{
            profile = <credentialsRegister> profile
            userObject.passwd = createPassword(profile?.passwd)
            userObject.name = profile?.name as string
            userObject.email = profile?.email as string
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