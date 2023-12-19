import { getDocs, query, where } from "firebase/firestore"
import { userCollection } from "../../firestore/config"
import { NextRequest, NextResponse } from "next/server"
import { UserObject } from "@/app/interfaces/interfaces"

//use this to get all of the information about a user by email
export async function GET(request : Request){
    const paths:Array<String> = request.url.split("/")
    const email = paths[paths.length - 1]
    const q = query(userCollection,where("email","==",email))

    const querySnapshot = await getDocs(q)
    var userData;
    if (querySnapshot){
        querySnapshot.forEach((each) =>{
            userData = {...each.data(),"id":each.id}
        })
    }else{
        return NextResponse.error()
    }
    return NextResponse.json(userData)
}

// Use this to check if the user exits, if so, return the user
export async function POST(request:Request){
    const paths:Array<String> = request.url.split("/")
    const email = paths[paths.length - 1]
    const response : {"password" : string} = await request.json()
    const q = query(userCollection,where('email','==',email), where('passwd','==',response.password))
    const queryResponse = await getDocs(q)
    var userData;
    if (queryResponse.empty){
        return NextResponse.json({"Message":"User not found"},{status:455})
    }else{
        queryResponse.forEach((each) =>{
            userData = {...each.data(),"id":each.id}
        })
    }
    return NextResponse.json(userData)
}