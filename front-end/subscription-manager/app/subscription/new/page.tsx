'use client'

import { redirect } from 'next/navigation'
import React, { ReactEventHandler, useState } from 'react';

function AddSubscription() {
  // Define the subscription state outside of the component
  const [formData, setFormData] = useState({
    company: '',
    name: '',
    startDate: '',
    planType: '',
    price: '',
  });

  // Define the handleInputChange function
  const handleInputChange = (e : any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Define the handleSubmit function
  const handleSubmit = async (e : any) => {
    // You can perform actions with the form data here
    e.preventDefault();
    console.log( ...e);
  };

  return (
    <div className="flex justify-center h-screen items-center">
      <form className="flex form-control shadow-2xl w-96 flex-col card p-10 bg-base-200">
        <label htmlFor="company" className="flex label">
          <h2 className="label-text">Company</h2>
        </label>
        <input
          type="text"
          value={formData.company}
          onChange={handleInputChange}
          name="company"
          id="company"
          className="input input-bordered input-primary"
        />
        <label htmlFor="name" className="flex label">
          <h2 className="label-text">Subscription Name</h2>
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={handleInputChange}
          className="input input-bordered input-primary"
          name="name"
          id="name"
        />
        <label className="flex label">
          <h2 className="label-text">Subscription Price</h2>
        </label>
        <input
          type="text"
          value={formData.price}
          onChange={handleInputChange}
          className="input input-bordered input-primary"
          name="price"
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
        <button type="submit" className="btn-primary input input-bordered input-info mt-4">
          Add Subscription
        </button>
      </form>
    </div>
  );
}

export default AddSubscription;
