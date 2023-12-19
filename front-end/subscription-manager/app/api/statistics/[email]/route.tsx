import { doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db, statisticsCollection } from "../../firestore/config";
import { NextResponse } from "next/server";
import { statistics } from "@/app/interfaces/interfaces";

//use this to get statistics by email, should get body
export async function GET(request:Request) {
    const tokens = request.url.split("/")
    const email = tokens[tokens.length - 1]
    const docRef = doc(db,'Statistics',email)
    const queryResponse = await getDoc(docRef)
    var statistics = {...queryResponse.data(),'id':queryResponse.id} as statistics
    return NextResponse.json(statistics)
}