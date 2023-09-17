'use client'
import {useState} from 'react'

export default function addSubscription(){
    const [optionState,setOptionState] = useState(false)

    function setOptions(value : string){
        if (value === "custom"){
            setOptionState(true)
            console.log("Option changed")
        }
        console.log("function accessed")
    }

    return(
        <div className="flex justify-center h-screen items-center">
                <form className="flex form-control w-100 shadow-2xl flex-col card p-10 bg-base-200">
                    <label className="flex label">
                        <h2 className="label-text">Company</h2>
                    </label>
                    <input type="text" className="input input-bordered input-primary " name="service" id="" />
                    <label className="flex label">
                        <h2 className="label-text">Subscription Name</h2>
                    </label>
                    <input type="text" className="input input-bordered input-primary " name="service" id="" />
                    <label className="flex label">
                        <h2 className="label-text">Subscription Price</h2>
                    </label>
                    <input type="text" className="input input-bordered input-primary "></input>
                    <label className="flex label">
                        <h2 className="label-text">Start Date </h2>
                    </label>
                    <input type="date" className="input input-bordered input-primary "></input>
                    <label className="flex label">
                        <h2 className="label-text">Plan Type</h2>
                    </label>
                    <select name="frequency" onChange={(e) => {setOptions(e.target.value)}} className="flex select select-bordered select-primary">
                        <option disabled>Select Frequency</option>
                        <option value="weekly">Weekly</option>
                        <option value="biweekly">Bi-Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="anually">Yearly</option>
                        <option value="custom">Custom</option>
                    </select>
                    {optionState ?  
                    <div>
                    <label className="flex label">
                        <h2 className="label-text">Custom Value</h2>
                    </label>
                    <input type="text" placeholder="Enter number of days" className="input input-bordered input-primary "></input>
                    </div>
                    : <></> 
                    }
                    <button type="submit" className="btn-primary input input-bordered input-info mt-4" >Add Subscription</button>
                </form>
        </div>
    )
}