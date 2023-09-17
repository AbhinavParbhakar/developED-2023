import SubscriptionCard from "@/components/SubscriptionCard";
import { Subscription } from "@/app/interfaces/interfaces";

export default function subscriptionCardWrapper({ params,children }: { params: { id: string },children:string }){
    const example : Subscription = {
        company : "Spotify",
        cost: 50.00,
        id:"fasd2ekf2332f",
        due_date: "10/28/2023",
        start_date : "08/28/2001",
        plan_type : "Yearly",
        plan_name : "Birth",
    }

    return (
        <div className="flex justify-center h-screen items-center w-full">
            <SubscriptionCard input={example} color={children}/>
        </div>
    )
}