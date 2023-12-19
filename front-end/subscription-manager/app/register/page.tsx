'use client'

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

function AddSubscription() {
  // Define the subscription state outside of the component
  const [formData, setFormData] = useState({
    name: '',
    email: 'none',
    password: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  // Define the handleInputChange function
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  // Define the handleSubmit function
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('register invoked')
    if (formData.confirmPassword == formData.password) {
      setError(false)
      setLoading(true)
      const data = JSON.stringify({
        name: formData.name,
        email: formData.email,
        passwd: formData.password
      })
      const response = await signIn('credentials-register', {data, redirect: false})
      if (response?.status == 200) {
        window.location.assign('http://localhost:3000/')
      } else {
        setLoading(false)
        setError(true)
        setErrorMessage("User Already exits")
      }

    } else {
      setError(true)
      setErrorMessage("Passwords don't match.")
    }
  }

  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col lg:flex-row">
        <div className="text-center ml-4 lg:text-left">
          <h2 className="text-3xl font-bold">Sign Up for SubManager</h2>
            <p className="py-5">Never forget to cancel a subscription again!</p>
            <p className="py-5 hidden md:block">Keep track of all your subscriptions.</p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 ring-1 ring-slate-200">
          <form className="card-body" onSubmit={(e) => { handleSubmit(e) }}>
            <div className="form-control">
              {error ? <label className="label justify-center">
                <span className="label-text text-red-600">{errorMessage}</span>
              </label> : <></>}
              <label className="label justify-center">
                <span className="label-text">Name</span>
              </label>
              <input type="text" name='name' placeholder="Jane Doe" onChange={(e) => { handleInputChange(e) }} className="input text-center input-bordered" />
            </div>
            <div className="form-control">
              <label className="label justify-center">
                <span className="label-text">Email</span>
              </label>
              <input type="email" name='email' placeholder="jane.doe@gmail.com" onChange={(e) => { handleInputChange(e) }} className="input text-center input-bordered" />
            </div>
            <div className="form-control">
              <label className="label justify-center">
                <span className="label-text">Password</span>
              </label>
              <input type="password" name='password' onChange={(e) => { handleInputChange(e) }} className="input text-center input-bordered" />
            </div>
            <div className="form-control">
              <label className="label justify-center">
                <span className="label-text">Re-enter Password</span>
              </label>
              <input onChange={(e) => { handleInputChange(e) }} type="password" name='confirmPassword' className="input input-bordered text-center" />
            </div>
            <div className="form-control">
              <label className="label">
                <p className="label-text-alt">Existing user? <Link href="/sign-in"><u>Sign in</u></Link></p>
              </label>
            </div>
            <div className="form-control mt-3">
              {loading ?
                <button className="btn-primary input">
                  <p className="animate-spin rounded-full h-6 w-6 border-t-4 border-blue-500 border-solid mx-auto"></p>
                </button> :
                <input className="btn-primary btn input" type='submit' placeholder='Register' />
              }
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddSubscription;
