import { deleteDoc, doc } from "firebase/firestore"
import { db } from "../firestore/config"
import { NextResponse } from "next/server"

export async function DELETE(request: Request) {
    //must get the subscription id to delete the subscription
    const response : {'id':string} = await request.json()
    const docRef = doc(db,'Subscriptions',response.id)
    const deleteResponse = await deleteDoc(docRef)

    return NextResponse.json({"message":"ok"})
}