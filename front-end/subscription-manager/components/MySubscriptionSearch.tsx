'use client'

import { useState } from "react"
import MySubscriptionCard from "./MySubscriptionCard"
import { Subscription } from "@/app/interfaces/interfaces"
import { Session } from "next-auth"

interface searchArgs {
    "data": Array<Subscription>
}
export default function MySubscriptionSearch({ data }: searchArgs) {

    const [searchParams, setSearchParams] = useState("") //search parameters

    function update_search(event: any) {
        setSearchParams(event.target.value)
    }

    //iteratively go through every styles
    var style_index: number = 0
    const styles: { [key: number]: string } = { 0: "bg-accent", 1: "bg-info", 2: "bg-success", 3: "bg-warning", 4: "bg-error" }
    const styles_length = 5
    return (
        <div className="flex flex-col">
            <div>
                <input
                    type="text"
                    onChange={update_search}
                    placeholder="Search..."
                    className="w-full py-2 px-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                />
            </div>
            <div className="mt-3">
                {
                    data.filter((subscription) => {
                        if (subscription.name.toLowerCase().includes(searchParams.toLowerCase())) {
                            return subscription
                        }
                    }).map((subscription) => {
                        let temp_index = style_index
                        style_index += 1
                        return <MySubscriptionCard key={temp_index} service={subscription} color={styles[temp_index % styles_length]}></MySubscriptionCard>
                    })}
            </div>
        </div>
    )
}