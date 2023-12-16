import { NextRequest, NextResponse } from "next/server";
import { getDocs, addDoc } from "firebase/firestore";
import { UserObject } from "@/app/interfaces/interfaces";
import { userCollection } from "../firestore/config";
import { NextURL } from "next/dist/server/web/next-url";

// const config = firebaseConfig
// const app = initializeApp(config);
// const db = getFirestore(app)
// const usersCollection = collection(db,"Users");
export async function GET(request : Request){

    const userDocs = await getDocs(userCollection)
    const userList = userDocs.docs.map(doc => {return {...doc.data(),id:doc.id}})
    return NextResponse.json({"data":userList})
}

export async function POST(request:NextRequest) {
    //const newUser:UserObject = await request.json()
    
    //addDoc(userCollection,newUser)
    //const url : NextURL = request.nextUrl.clone()
    return NextResponse.json({"ok":"response"})
}