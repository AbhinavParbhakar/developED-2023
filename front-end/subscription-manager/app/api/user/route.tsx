import { NextRequest, NextResponse } from "next/server";
import { getDocs, addDoc, query, where } from "firebase/firestore";
import { UserObject } from "@/app/interfaces/interfaces";
import { userCollection } from "../firestore/config";
import { NextURL } from "next/dist/server/web/next-url";


//use this to create a new user if they don't exist already
export async function POST(request:NextRequest) {
    const newUser:UserObject = await request.json()
    const check_user_query = query(userCollection,where("email",'==',newUser.email))
    const check_password_query = query(userCollection, where("email","==",newUser.email), where("passwd","==",newUser.passwd))

    const response_1 = await getDocs(check_user_query)
    if (response_1.empty){
        addDoc(userCollection,newUser)
        return NextResponse.json({"user added":"user added"},{status : 200})
    }else{
        const response_2 = await getDocs(check_password_query)
        if (response_2.empty){
            return NextResponse.json({"message" : "incorrect password"},{status : 455})
        }else{
            return NextResponse.json({"message" : "user authenticated"},{status : 200})
        }
        
    }
}