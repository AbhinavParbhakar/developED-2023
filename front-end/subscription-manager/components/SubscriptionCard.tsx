'use client'
import React, { useState } from "react"
import { Subscription, statistics } from "@/app/interfaces/interfaces"
import { App } from "./SubscriptionPieChart"
import { getOffsetDate } from "@/app/auth/helperFunctions"

interface subscriptionProp {
    input: Subscription,
    statistics: statistics
}

/**
 * Used to compare two Subscription objects to see if their values changedm return True if changed, false if not
 * @param obj1 first object to compare
 * @param obj2 second object to compare
 * @returns true if objects are different, otherwise returns false
 * */
function compareSubs(obj1:Subscription,obj2:Subscription):boolean{
    if (obj1 != obj2){
        return true
    }else{
        return false
    }
}

const SubscriptionCard: React.FC<subscriptionProp> = ({ input, statistics }) => {


    //use state to manage whether or not to show the form
    const [modifyInfo, setModifyInfo] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(false)
    const [modifyLoading, setModifyLoading] = useState(false)
    const [temp_input, setTempInput] = useState(input)

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setTempInput({
          ...temp_input,
          [name]: value,
        });
      };

    async function updateInfo(){
        setModifyLoading(true)
        const changesMade:boolean = compareSubs(temp_input,input)
        if (changesMade){
            var offset = 0
            switch (temp_input.planType) {
              case 'month':
                offset = 1
                break;
              case 'week':
                offset = 7 //this needs to be 7 for week because we're offsetting by 7 days
                break;
              case 'year':
                offset = 1
                break;
            }
            
            const value : number = temp_input.cost -  input.cost

            temp_input.dueDate = getOffsetDate(temp_input.startDate,offset,temp_input.planType)
            const reponse = await fetch('/api/subscription', {
                method: 'PATCH',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(temp_input)
            })
            const statisticsResponse = await fetch('/api/statistics', {
                method: 'PATCH',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ 'id': input.user_email, 'action': 2, 'value':  value})
            })
            window.location.assign(`${process.env.NEXT_PUBLIC_API}/subscription/${input.id}`)
        }else{
            setModifyLoading(false)
            setModifyInfo(false)
        }
    }

    async function deleteSubscription() {
        //delete 
        setDeleteLoading(true)
        const reponse = await fetch('/api/subscription', {
            method: 'DELETE',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ 'id': input.id })
        })
        const response1 = await fetch('/api/statistics', {
            method: 'DELETE',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ 'email': input.user_email, 'value': input.cost })
        })

        window.location.assign(`${process.env.NEXT_PUBLIC_API}/mysubscriptions`)
    }

    return (
        <div className="flex flex-col max-w-xl shadow-2xl mb-8 card p-5 bg-base-200 justify-between">
            {modifyInfo ?

                <div className="flex flex-col justify-between">
                    <h2 className="mb-2 content-center"><strong>Edit Information:</strong></h2>
                    <div className="flex flex-col justify-between items-center mb-3 md:mb-0">
                        <label className="label-text" htmlFor="name">Name</label>
                        <input name="name" className="input input-bordered w-full text-center " onChange={handleInputChange} defaultValue={input.name}></input>
                        <label className="label-text" htmlFor="cost">Cost</label>
                        <input name="cost" className="input input-bordered  w-full text-center " onChange={handleInputChange} defaultValue={input.cost}></input>
                        <label className="label-text">Notification Lead Time</label>
                        <select
                            name="email_frequency"
                            defaultValue={input.email_frequency}
                            onChange={handleInputChange}
                            className="input input-bordered w-full text-center"
                        >
                            <option value="1">Notify  1 day before due date</option>
                            <option value="2">Notify  2 days before due date</option>
                            <option value="3">Notify  3 days before due date</option>
                            <option value="4">Notify  4 days before due date</option>
                            <option value="5">Notify  5 days before due date</option>
                        </select>
                        <label className="label-text">Last Billing Date</label>
                        <input
                            type="date"
                            defaultValue={input.startDate}
                            onChange={handleInputChange}
                            className="input input-bordered w-full text-center"
                            name="startDate"
                        />
                        <label className="label-text" htmlFor="plan">Plan Type</label>
                        <select name="planType" defaultValue={input.planType} className="input input-bordered w-full text-center"  onChange={handleInputChange}>
                            <option value="week">Billed Weekly</option>
                            <option value="month">Billed Monthly</option>
                            <option value="year">Billed Yearly</option>
                        </select>
                    </div>
                    <div className="flex flex-row justify-between mt-10 md:mt-10">
                        <h3 className="mb-3 md:mb-0 md:mr-8"><p>Since:</p><strong>{input.startDate}</strong></h3>
                        <h3 className=""><p>Renewal On:</p><strong>{input.dueDate}</strong></h3>
                    </div>
                    <div className="flex flex-row-reverse justify-between">
                        <button onClick={() => { setModifyInfo(false) }} className="btn-error input input-bordered input-info mt-4 max-w-sm">Cancel</button>
                        {modifyLoading ?
                            <button className="text-white btn-primary input input-bordered input-info max-w-sm mt-4">
                                <p className="animate-spin rounded-full h-6 w-6 border-t-4 border-blue-500 border-solid mx-auto"></p>
                            </button>
                            :
                            <button onClick={updateInfo} className="text-white btn-primary input input-bordered input-info max-w-sm mt-4">Save Information</button>
                        }
                    </div>
                </div>

                :
                <div className="flex flex-col items-center md:items-stretch  justify-between">
                    <div className="flex flex-col md:flex-row justify-between mb-3 md:mb-0">
                        <h2 className="md:mr-8"><strong>{input.name}</strong></h2>
                        <h3 className=""><strong>${input.cost}/{input.planType}</strong></h3>
                    </div>
                    <App input={input} statistics={statistics}></App>
                    <div className="flex flex-col md:flex-row justify-between md:mt-16">
                        <h3 className="md:mr-8"><p>Since:</p><strong>{input.startDate}</strong></h3>
                        <h3 className=""><p>Renewal On:</p><strong>{input.dueDate}</strong></h3>
                    </div>
                    <div className="flex flex-col md:flex-row mt-4 md:justify-between">

                        <button onClick={() => setModifyInfo(true)} className="text-white btn-primary input input-bordered input-info  max-w-sm">Modify Information</button>

                        {deleteLoading ?
                            <button className="text-white btn-error mt-2 md:mt-0 input input-bordered input-info max-w-sm">
                                <p className="animate-spin rounded-full h-6 w-6 border-t-4 border-blue-500 border-solid mx-auto"></p>
                            </button >
                            :
                            <button onClick={() => deleteSubscription()} className="text-white btn-error mt-2 md:mt-0 input input-bordered input-info max-w-sm">Delete</button>
                        }
                    </div>
                </div>
            }
        </div >
    )
}

export default SubscriptionCard