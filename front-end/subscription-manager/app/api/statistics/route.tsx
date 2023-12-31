import { addDoc, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore"
import { db, statisticsCollection } from "../firestore/config"
import { NextResponse } from "next/server"
import { statistics } from "@/app/interfaces/interfaces"



//use this to create a statistics document in the collection
export async function POST(request: Request) {
    //email should be included in this request body
    const response: { 'email': string } = await request.json()
    const statistic = { 'subscriptions_count': 0, 'subscriptions_total': 0, 'user_email': response.email }

    const docRef = doc(db,'Statistics',statistic.user_email)
    setDoc(docRef,{
        'subscriptions_count': 0, 'subscriptions_total': 0
    })
    return NextResponse.json({ "message": "ok" })

}

//use this to update an account's statistics
export async function PATCH(request: Request) {
    //should contain the ID of the document, the ACTION, denoted by 0 for add, 1 to subtract
    //and VALUE to add or subtract accordingly
    const response: { 'id': string, 'action': number, 'value': number } = await request.json()
    const docRef = doc(db, 'Statistics', response.id)

    switch(response.action){
        case 1:
            //want to subtract
            response.action = -1
            response.value =  -1 * response.value
            break;
        case 0:
            //want to add 
            response.action = 1
            break;
        default:
            //want to change the the value, not the total count
            response.action = 0
    }
    //get the doc
    const statistics = await getDoc(docRef)
    const statisticsData = statistics.data() as statistics
    const updateResponse = await updateDoc(docRef, {
        subscriptions_count: statisticsData?.subscriptions_count + response.action,
        subscriptions_total: Number(statisticsData?.subscriptions_total) + Number(response.value)
    })


    return NextResponse.json({"message":"ok"})
}

//used to delete the subscription by email
export async function DELETE(request: Request) {
    const response: { 'email': string ,'value':number} = await request.json()
    //get the doc
    //set 
    const docRef = doc(db, 'Statistics', response.email) //id is the email
    const statistics = await getDoc(docRef)
    const statisticsData = statistics.data() as statistics
    const updateResponse = await updateDoc(docRef, {
        subscriptions_count: statisticsData?.subscriptions_count - 1,
        subscriptions_total: Number(statisticsData?.subscriptions_total) - Number(response.value)
    })
    return NextResponse.json({"Message":"Ok"})
}