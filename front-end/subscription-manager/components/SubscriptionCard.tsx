'use client'
import React from "react"
import { Subscription } from "@/app/interfaces/interfaces"

interface subscriptionProp{
    input: Subscription,
    color: string
}

const SubscriptionCard:React.FC<subscriptionProp> = ({input,color}) => {
    return(
    <div className="flex flex-col max-w-xl shadow-2xl card p-10 bg-base-200 justify-between">
        <h2>Company:<strong>{input.company}</strong></h2>
        <h3>Plan: <strong>{input.plan_name}</strong></h3>
        <h3>Plan Type: <strong>{input.plan_type}</strong></h3>
        <h3>Plan Cost: <strong>{input.cost}</strong></h3>
        <h3>Next Bill: <strong>{input.due_date}</strong></h3>
        <button className="btn-primary input input-bordered input-info mt-4">Modify Information</button>
    </div>
    )
}

export default SubscriptionCard