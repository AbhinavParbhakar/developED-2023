import { Subscription, subscriptionApiReturnType } from "../interfaces/interfaces"
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/options'
import MySubscriptionSearch from "@/components/MySubscriptionSearch"


export default async function MySubscriptions() {
    const session = await getServerSession(authOptions)
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/subscription/${session?.user.email}`, { method: "GET", headers: { 'Accept': 'application/json' }})
    const subscriptionsReturn: subscriptionApiReturnType = await response.json()
    return (
        <div className="flex justify-center h-screen mt-3">
            <div className="flex flex-col space-y-4">
                <h1 className="text-4xl font-bold text-center mb-2">My Subscriptions</h1>
                <MySubscriptionSearch data={subscriptionsReturn.Subscriptions} />
            </div>
        </div>
    )
}