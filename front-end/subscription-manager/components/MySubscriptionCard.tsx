import React from "react";
import { Subscription } from "@/app/interfaces/interfaces";
import Link from "next/link";

interface mySubscriptionProps{
    service:Subscription,
    color:string
}

const MySubscriptionCard:React.FC<mySubscriptionProps> = ({service,color}) => {
    const path = "/subscription/" + service.id
    const styles = "grid w-96 rounded mt-2 card grid-cols-2 gap-4 p-3 ring-1 ring-slate-200 " + color
    return(                
    <Link href={path}>
        <div className={styles}>
            <div className="col-span-2">{service.name}</div>
            <div className="col-span-2 text-right">
                <p className="text-xs">${service.cost}/mo next payment: {service.dueDate}</p>
            </div>
        </div>
    </Link>
)
}

export default MySubscriptionCard;