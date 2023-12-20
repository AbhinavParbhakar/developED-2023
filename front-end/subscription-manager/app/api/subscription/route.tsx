import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "../firestore/config"
import { NextResponse } from "next/server"
import { Subscription } from "@/app/interfaces/interfaces"

//get sub by id
export async function POST(request: Request){
    const request_body : {'id' : string} = await request.json()
    const docReference = await getDoc(doc(db,"Subscriptions",request_body.id))
    const subscription:Subscription = {...docReference.data(),"id" : docReference.id} as Subscription
    return NextResponse.json(subscription)
}

//delete sub
export async function DELETE(request: Request) {
    //must get the subscription id to delete the subscription
    const response: { 'id': string } = await request.json()
    const docRef = doc(db, 'Subscriptions', response.id)
    const deleteResponse = await deleteDoc(docRef)

    return NextResponse.json({ "message": "ok" })
}

//update sub
export async function PATCH(request: Request) {
    const subscription: Subscription = await request.json()
    const docRef = doc(db, 'Subscriptions', subscription.id)

    setDoc(docRef, {
        cost: subscription.cost,
        dueDate: subscription.dueDate,
        email_frequency: subscription.email_frequency,
        name: subscription.name,
        planType: subscription.planType,
        startDate: subscription.startDate,
        user_email : subscription.user_email
    })

    return NextResponse.json({'message':'ok'})
}