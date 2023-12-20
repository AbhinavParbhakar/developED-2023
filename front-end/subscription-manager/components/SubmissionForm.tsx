"use client"

import { statistics } from "@/app/interfaces/interfaces";
import { Session } from "next-auth";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { getOffsetDate } from "@/app/auth/helperFunctions";

interface formType {
  "session": Session | null
}

export default function SubscriptionForm({ session }: formType) {
  const router = useRouter()
  // Define the subscription state outside of the component
  const [formData, setFormData] = useState({
    name: '',
    startDate: new Date().toISOString().slice(0, 10),//sets the start date as today for default
    dueDate: '',
    planType: 'month', //due monthly as default
    cost: '',
    user_email: session?.user.email,
    email_frequency: '1' //remind day before by defualt
  });

  const [loading, setLoading] = useState(false)

  // Define the handleInputChange function
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Define the handleSubmit function
  async function handleSubmit(e: any) {
    // You can perform actions with the form data here
    e.preventDefault()
    setLoading(true)

    var offset = 0
    switch (formData.planType) {
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


    formData.dueDate = getOffsetDate(formData.startDate,offset,formData.planType)
    const response = await fetch(`/api/subscription/${session?.user.email}`, { body: JSON.stringify(formData), method: "post" })
    await fetch('/api/statistics', { method: "PATCH", headers: { 'Content-type': "application/json" }, body: JSON.stringify({ 'id': session?.user.email, 'action': 0, 'value': formData.cost }) })
    window.location.assign(`${process.env.NEXT_PUBLIC_API}` + "/mysubscriptions")
    console.log(JSON.stringify(formData))
  };

  return (
    <div className="flex justify-center my-6 items-center ">
      <form onSubmit={handleSubmit} className="flex form-control shadow-2xl w-96 flex-col card p-10 bg-base-200 ring-1 ring-slate-200">
        <label htmlFor="name" className="flex label">
          <h2 className="label-text">Subscription Name</h2>
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={handleInputChange}
          name="name"
          id="name"
          className="input input-bordered input-primary"
        />
        <label className="flex label">
          <h2 className="label-text">Subscription Price</h2>
        </label>
        <input
          type="number"
          value={formData.cost}
          onChange={handleInputChange}
          className="input input-bordered input-primary"
          name="cost"
        />
        <label className="flex label">
          <h2 className="label-text">Notification Lead Time</h2>
        </label>
        <select
          name="email_frequency"
          value={formData.email_frequency}
          onChange={handleInputChange}
          className="flex select select-bordered select-primary"
        >
          <option value="1">Notify  1 day before due date</option>
          <option value="2">Notify  2 days before due date</option>
          <option value="3">Notify  3 days before due date</option>
          <option value="4">Notify  4 days before due date</option>
          <option value="5">Notify  5 days before due date</option>
        </select>
        <label className="flex label">
          <h2 className="label-text">Last Billing Date</h2>
        </label>
        <input
          type="date"
          value={formData.startDate}
          onChange={handleInputChange}
          className="input input-bordered input-primary"
          name="startDate"
        />
        <label className="flex label">
          <h2 className="label-text">Plan Type</h2>
        </label>
        <select
          name="planType"
          value={formData.planType}
          onChange={handleInputChange}
          className="flex select select-bordered select-primary"
        >
          <option value="week">Due Weekly</option>
          <option value="month">Due Monthly</option>
          <option value="year">Due Yearly</option>
        </select>
        {loading ?
          <button className="btn-primary input input-bordered input-info mt-4 ">
            <p className="animate-spin rounded-full h-6 w-6 border-t-4 border-blue-500 border-solid mx-auto"></p>
          </button> : <button type="submit" className="btn-primary input input-bordered input-info mt-4">
            Add Subscription
          </button>}
      </form>
    </div>
  );
}