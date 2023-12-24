import SubscriptionCard from "@/components/SubscriptionCard";
import { Subscription, statistics } from "@/app/interfaces/interfaces";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/api/firestore/config";

export default async function subscriptionCardWrapper({ params }: { params: { id: string } }) {

    const subResponse = await fetch(`${process.env.API}/api/subscription`,
        {
            method: 'POST',
            body: JSON.stringify({ 'id': params.id }),
            headers:{'Accept':'application/json','Content-type':'application/json'},
            cache:'no-store'
            
        })
    const subscription = await subResponse.json() as Subscription
    const statisticsResponse = await fetch(`${process.env.API}/api/statistics/${subscription.user_email}`,
        {
            method:'GET',
            headers:{'Accept':'application/json'},
            cache:'no-store'
        }
    )
    const statistics: statistics = await statisticsResponse.json() as statistics
    return (
        <div className="flex flex-col items-center w-full">
            <h1 className="text-4xl font-bold my-6">Subscription Details</h1>
            <SubscriptionCard input={subscription} statistics={statistics} />
        </div>
    )
}