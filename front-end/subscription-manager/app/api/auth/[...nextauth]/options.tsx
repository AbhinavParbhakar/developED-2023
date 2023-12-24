import type { NextAuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from 'next-auth/providers/github';
import { GitHubProfile,UserObject,GoogleProfile, credentialsSignIn, credentialsRegister } from "@/app/interfaces/interfaces";
import { createPassword, createUser } from "@/app/auth/helperFunctions";
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions : NextAuthOptions = {
    secret:process.env.NEXTAUTH_SECRET as string,
    session:{
        strategy:'jwt',
        maxAge : 3 * 60 * 60 // 3 hours
    },
    pages:{
        signIn:'/',
        error : '/sign-in'
    },
    providers:[
        GoogleProvider({
            clientId:process.env.Google_clientId as string,
            clientSecret:process.env.Google_clientSecret as string
        }),
        GitHubProvider({
            clientId:process.env.Github_clientId as string,
            clientSecret:process.env.Github_clientSecret as string
        }),
        CredentialsProvider({
            type:'credentials',
            id:'credentials-sign-in',
            credentials : {},

            
            async authorize(credentials, req) {
                const updatedCredentials:credentialsSignIn = JSON.parse(req.body?.tempData)
                const userResponse = await fetch(`${process.env.API}/api/user/${updatedCredentials.email}`,{method:"POST",body:JSON.stringify({'password':createPassword(updatedCredentials.password)}),headers:{'Content-Type':'application/json'}})
                if (userResponse.status == 200){
                    const user: UserObject = await userResponse.json()
                    return user as User
                }else{
                    return null
                }
            },
        }),
        CredentialsProvider({
            type:'credentials',
            id:'credentials-register',
            credentials : {},
            async authorize(credentials, req) {
                const updatedCredentials : credentialsRegister= JSON.parse(req.body?.data)
                const response =  await fetch(`${process.env.API}/api/user`,{method:"POST",headers:{'Content-Type':'application/json'},body:JSON.stringify(createUser('creditionals',updatedCredentials))})
                await fetch(`${process.env.API}/api/statistics`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({'email':updatedCredentials?.email})})
                if (response.status == 200){
                    const userResponse = await fetch(`${process.env.API}/api/user/${updatedCredentials.email}`,{method:"GET",headers:{'Content-Type':'application/json'}})
                    const user: UserObject = await userResponse.json()
                    return user as User
                }else{
                    return null
                }
            },
        })
    ],

    callbacks:{
      
        async signIn({ user, account, profile, email, credentials }){
            if (profile == undefined){
                //only triggered when Oauth2 isn't triggered meaning credentials sign-in as profile is undefined
                //user is already created at this point, so don't try to create the account again, and simply return
                return true
            }
            var provider : string = ""
            var newProfile : GitHubProfile | GoogleProfile | null = null

            if (account?.provider==="google"){
                provider = "google"
                newProfile = profile as GoogleProfile
            }else if (account?.provider==="github"){
                provider = "github"
                newProfile = profile as GitHubProfile
            }
            const requestBody : {'name' : string, "email" : string, "passwd" : string} | null = createUser(provider, newProfile)
            let response = await fetch(`${process.env.API}/api/user`,{method:"POST",headers:{'Content-Type':'application/json'},body:JSON.stringify(requestBody)})
            //response status is 200 is user added, 201 if user already exists and correct username and password and 455 if user already exists but used other login method
                        

            if (response.status == 200){
                //if status is 200, create a new entry
                await fetch(`${process.env.API}/api/statistics`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({'email':requestBody?.email})})
            }else if (response.status != 201){
                //means that status is 455, or some other error, return false, user not authenticated
                return false
            }
            return true
        },
    }
}

