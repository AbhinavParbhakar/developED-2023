import { Subscription, subscriptionApiReturnType } from "../interfaces/interfaces"
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/options'
import MySubscriptionSearch from "@/components/MySubscriptionSearch"
import Link from "next/link"


export default async function MySubscriptions() {
    const session = await getServerSession(authOptions)
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/subscription/${session?.user.email}`, { method: "GET", headers: { 'Accept': 'application/json' },cache:'no-store' })
    const subscriptionsReturn: subscriptionApiReturnType = await response.json()
    const arrayLength: number = subscriptionsReturn.Subscriptions.length
    return (
        <div className="flex justify-center h-screen mt-3">
            <div className="flex flex-col space-y-4">
                <h1 className="text-4xl font-bold text-center mb-2">My Subscriptions</h1>
                {arrayLength ?

                    <MySubscriptionSearch data={subscriptionsReturn.Subscriptions} />

                    :

                    <div className="flex flex-col mt-20 items-center">
                        <img className="" src="icons8-empty-64.png"></img>
                        <p className="mt-5">No Subscriptions... Add one <u><Link href="/subscription/new">here!</Link></u></p>
                    </div>}

            </div>
        </div>
    )
}