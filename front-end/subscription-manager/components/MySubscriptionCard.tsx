import React from "react";
import { Subscription } from "@/app/interfaces/interfaces";
import Link from "next/link";

interface mySubscriptionProps{
    service:Subscription,
    color:string
}

const MySubscriptionCard:React.FC<mySubscriptionProps> = ({service,color}) => {
    const path = "/subscription/" + service.id
    const styles = "hover:scale-110 hover:duration-300 grid w-96 rounded mt-2 card grid-cols-2 gap-4 p-3 ring-1 ring-slate-200 " + color
    return(                
    <Link href={path}>
        <div className={styles}>
            <div className="col-span-2">{service.name}: ${service.cost}/{service.planType}</div>
            <div className="col-span-2 text-right">
                <p className="text-xs"> next payment: {service.dueDate}</p>
            </div>
        </div>
    </Link>
)
}

export default MySubscriptionCard;