"use client"

import { statistics } from "@/app/interfaces/interfaces";
import { Session } from "next-auth";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";

interface formType {
  "session": Session | null
}

export default function SubscriptionForm({ session }: formType) {
  const router = useRouter()
  // Define the subscription state outside of the component
  const [formData, setFormData] = useState({
    name: '',
    startDate: '',
    dueDate: '',
    planType: '',
    cost: '',
    user_email: ''
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
    const response = await fetch(`/api/subscription/${session?.user.email}`, { body: JSON.stringify(formData), method: "post" })
    await fetch('/api/statistics', { method: "PATCH", headers: { 'Content-type': "application/json" }, body: JSON.stringify({ 'id': session?.user.email, 'action': 0, 'value': formData.cost }) })
    window.location.assign("http://localhost:3000" + "/mysubscriptions")

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
          <h2 className="label-text">Start Date</h2>
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
          <option value="weekly">Weekly</option>
          <option value="biweekly">Bi-Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="anually">Yearly</option>
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