import SubscriptionCard from "@/components/SubscriptionCard";
import { Subscription, statistics } from "@/app/interfaces/interfaces";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/api/firestore/config";

export default async function subscriptionCardWrapper({ params}: { params: { id: string }}){

    const docReference = await getDoc(doc(db,"Subscriptions",params.id))
    const subscription:Subscription = {...docReference.data(),"id" : docReference.id} as Subscription
    const statisticsReferece = await getDoc(doc(db,'Statistics',subscription.user_email))
    const statistics:statistics = await {...statisticsReferece.data(),"id" : statisticsReferece.id} as statistics
    return (
        <div className="flex justify-center h-screen items-center w-full">
            <SubscriptionCard input={subscription} statistics={statistics}/>
        </div>
    )
}