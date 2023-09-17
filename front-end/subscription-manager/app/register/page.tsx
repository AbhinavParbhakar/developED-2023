'use client'

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

function AddSubscription() {
  // Define the subscription state outside of the component
  const [formData, setFormData] = useState({
    name: '',
    l_name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });


  // Define the handleInputChange function
  const handleInputChange = (e : any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const router = useRouter();

  // Define the handleSubmit function
  const handleSubmit = async (e : any) => {
    // You can perform actions with the form data here
    e.preventDefault();
    const url = 'https://example.com/api/endpoint'; // Replace with your API endpoint URL

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('POST request successful');
        router.push('/mysubscriptions');
      } else {
        console.error('POST request failed');
        router.push('/mysubscriptions');
      }
    } catch (error) {
      console.error('Error:', error);
      router.push('/mysubscriptions');
    }
  


  };

  return (
    <div className="flex justify-center h-screen items-center">
      <form onSubmit={handleSubmit} className="flex form-control shadow-2xl w-96 flex-col card p-10 bg-neutral-content">
        <h1>Register to SubManager</h1>


        <label htmlFor="company" className="flex label">
          <h2 className="label-text">First Name:</h2>
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={handleInputChange}
          name="name"
          id="name"
          className="input input-bordered input-primary"
        />
        <label htmlFor="l_name" className="flex label">
          <h2 className="label-text">Last Name:</h2>
        </label>
        <input
          type="text"
          value={formData.l_name}
          onChange={handleInputChange}
          className="input input-bordered input-primary"
          name="l_name"
          id="l_name"
        />
        <label className="flex label">
          <h2 className="label-text">Email: </h2>
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          className="input input-bordered input-primary"
          name="email"
          id='email'
        />

        <label className="flex label">
          <h2 className="label-text">Password:</h2>
        </label>
        <input
          type="password"
          value={formData.password}
          onChange={handleInputChange}
          className="input input-bordered input-primary"
          name="password"
          id='password'
        />
        <label className="flex label">
          <h2 className="label-text">Confirm Password:</h2>
        </label>
        <input
          type="password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          className="input input-bordered input-primary"
          name="confirmPassword"
          id='confirmPassword'
        />
        <button type="submit" className="btn-primary input input-bordered input-info mt-4">
          Register
        </button>
        
      </form>
    </div>
  );
}

export default AddSubscription;