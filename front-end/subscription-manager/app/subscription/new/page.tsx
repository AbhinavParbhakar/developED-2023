'use client'
import {FormEvent, useState} from 'react'

export default function addSubscription(){
    async function onsubmit(event : FormEvent<HTMLFormElement>){
        event.preventDefault()


    }

    return(
        <div className="flex justify-center h-screen items-center">
            <form onSubmit={onsubmit} className="flex form-control shadow-2xl w-96 flex-col card p-10 bg-base-200">
                <label className="flex label">
                    <h2 className="label-text">Company</h2>
                </label>
                <input type="text" className="input input-bordered input-primary " name="service" id="" />
                <label className="flex label">
                    <h2 className="label-text">Subscription Name</h2>
                </label>
                <input type="" className="input input-bordered input-primary " name="service" id="" />
                <label className="flex label">
                    <h2 className="label-text">Subscription Price</h2>
                </label>
                <input type="text" className="input input-bordered input-primary "></input>
                <label className="flex label">
                    <h2 className="label-text">Start Date</h2>
                </label>
                <input type="date" className="input input-bordered input-primary "></input>
                <label className="flex label">
                    <h2 className="label-text">Plan Type</h2>
                </label>
                <select name="frequency" className="flex select select-bordered select-primary">
                    <option value="weekly">Weekly</option>
                    <option value="biweekly">Bi-Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="anually">Yearly</option>
                </select>
                <button type="submit" className="btn-primary input input-bordered input-info mt-4" >Add Subscription</button>
            </form>
        </div>
    )
}