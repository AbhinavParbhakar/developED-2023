'use client'
import React, { useState } from "react"
import { Subscription, statistics } from "@/app/interfaces/interfaces"
import { App } from "./SubscriptionPieChart"

interface subscriptionProp{
    input: Subscription,
    statistics: statistics
}

const SubscriptionCard:React.FC<subscriptionProp> = ({input,statistics}) => {


    //use state to manage whether or not to show the form
    const [modifyInfo,setModifyInfo] = useState(false)
    const [temp_input,setTempInput] = useState(input)

    const updateInfo = () =>{
        setModifyInfo(false)
    }

    return(
    <div className="flex flex-col max-w-xl shadow-2xl card p-5 bg-base-200 justify-between">
        {modifyInfo ? 
        
        <div className="flex flex-col justify-between">
            <h2 className="mb-2 content-center"><strong>Edit Information:</strong></h2>
            <div className="flex flex-col md:flex-row justify-between mb-3 md:mb-0">
                <h2 className="mb-2 md:mb-0 md:mr-2"><input onChange={(e) => {setTempInput({...temp_input,name:e.target.value})}} defaultValue={input.name}></input></h2>
                <h3 className="mb-2 md:mb-0 md:mr-2"><input onChange={(e) => {setTempInput({...temp_input,cost:Number(e.target.value)})}} defaultValue={input.cost}></input></h3>
                <select className=""onChange={(e) => {setTempInput({...temp_input,planType:e.target.value})}}>
                    <option value="weekly">Weekly</option>
                    <option value="biweekly">Bi-Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="anually">Yearly</option>
                </select>
            </div>
            <div className="flex flex-row justify-between mt-10 md:mt-16">
                <h3 className="mb-3 md:mb-0 md:mr-8"><p>Since:</p><strong>{input.startDate}</strong></h3>
                <h3 className=""><p>Renewal On:</p><strong>{input.dueDate}</strong></h3>
            </div>
            <div className="flex flex-row justify-center">
                <button onClick={updateInfo} className="btn-primary input input-bordered input-info mt-4 max-w-sm">Save Information</button>
            </div>
        </div>
        
        :
        <div className="flex flex-col items-center md:items-stretch  justify-between">
            <div className="flex flex-col md:flex-row justify-between mb-3 md:mb-0">
                <h2 className="md:mr-8"><strong>{input.name}</strong></h2>
                <h3 className=""><strong>${input.cost} {input.planType}</strong></h3>
            </div>
            <App input={input} statistics={statistics}></App>
            <div className="flex flex-col md:flex-row justify-between md:mt-16">
                <h3 className="md:mr-8"><p>Since:</p><strong>{input.startDate}</strong></h3>
                <h3 className=""><p>Renewal On:</p><strong>{input.dueDate}</strong></h3>
            </div>
            <div className="flex flex-col md:flex-row  mt-4 justify-between">
            <button onClick={() => setModifyInfo(true)} className="text-white btn-primary input input-bordered input-info  max-w-sm">Modify Information</button>
            <button className="text-white btn-error input input-bordered input-info max-w-sm">Delete</button>
            </div>
        </div>
        }
    </div>
    )
}

export default SubscriptionCard