import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from 'next-auth/providers/github';
import { GitHubProfile,UserObject,GoogleProfile } from "@/app/interfaces/interfaces";
import { createUser } from "@/app/auth/helperFunctions";

export const authOptions : NextAuthOptions = {
    secret:process.env.NEXTAUTH_SECRET as string,
    pages:{
        signIn:'/sign-in'
    },
    providers:[
        GoogleProvider({
            clientId:'291764762187-vkrbm483cbbnh5rgs374brpacnpoocn5.apps.googleusercontent.com',
            clientSecret:'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'
        }),
        GitHubProvider({
            clientId:'d85d70e294d318266e5c',
            clientSecret:'1f7f7c224f7aeed0cd8e053dac875e29ebccf1b3'
        })
    ],

    callbacks:{
      
        async signIn({ user, account, profile, email, credentials }){
            var provider : string = ""
            var newProfile : GitHubProfile | GoogleProfile | null = null
            
            if (account?.provider==="google"){
                provider = "google"
                newProfile = profile as GoogleProfile
            }else if (account?.provider==="github"){
                provider = "github"
                newProfile = profile as GitHubProfile
            }
            //console.log(newProfile)
            const requestBody : UserObject | null = createUser(provider, newProfile)
            //console.log("\n\nRequest Body:\n\n" + JSON.stringify(requestBody))
            let response = await fetch("http://localhost:3001/user/",{method:"POST",headers:{'Content-Type':'application/json'},body:JSON.stringify(requestBody)})

            if (response.ok){
                const body = await response.json()
                user.id = body.id
                //console.log("Created user")
            }else{
                let validate_response = await fetch("http://localhost:3001/user/validate",{method:"POST",headers:{'Content-Type':'application/json'},body:JSON.stringify(requestBody)})
                if (validate_response.ok){
                    const new_body = await validate_response.json()
                    user.id = new_body.id
                    //console.log(new_body)
                    //console.log("Validated user")
                }
            }
            return true
        },
        async session(params){
            console.log("\n\n" + JSON.stringify(params) + "\n\n")
            params.session.user.uuid = params.token.sub as string
            return params.session
        }

    }
}

