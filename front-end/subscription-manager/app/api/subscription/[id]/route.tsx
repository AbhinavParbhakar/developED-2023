import { NextResponse } from "next/server";
import { subscriptionCollection } from "../../firestore/config";
import { addDoc, getDocs, query, where } from "firebase/firestore";
import { Subscription } from "@/app/interfaces/interfaces";
import { redirect } from "next/navigation";

//used to get all subscriptions for a certain user by email
export async function GET(request:Request) {
    const urlTokens = request.url.split("/")
    const userEmail = urlTokens[urlTokens.length - 1]
    const q = query(subscriptionCollection,where("user_email","==",userEmail))
    const response = await getDocs(q)
    const subscriptions:Array<{"id":string}> = []

    response.forEach((subscription) =>{
        const data = {...subscription.data(),"id":subscription.id}
        subscriptions.push(data)
    })
    return NextResponse.json({"Subscriptions":subscriptions})
}

//used to add a subscription to a user by email
export async function POST(request:Request){
    const urlTokens = request.url.split("/")
    const userEmail = urlTokens[urlTokens.length - 1]
    const subscription : Subscription = await request.json()
    subscription.user_email = userEmail
    addDoc(subscriptionCollection,subscription)
    return NextResponse.json({"message":"ok"})
}
