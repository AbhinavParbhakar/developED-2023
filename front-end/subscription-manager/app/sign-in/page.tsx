'use client'

import { signIn } from "next-auth/react"
import Link from 'next/link'
import { useSearchParams } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { UserObject, credentialsSignIn } from "../interfaces/interfaces";

export default function Home() {
    const searchParams = useSearchParams()
    const error: null | string = searchParams.get("error")
    let errorMessage = ""
    const [data, setData] = useState({
        email: "none",
        password: ""
    } as credentialsSignIn)
    const [loading, setLoading] = useState(false)
    async function handleSignin(method: String) {
        if (method == 'google') {
            await signIn('google', { callbackUrl: '/' })
        } else if (method == 'github') {
            await signIn('github', { callbackUrl: '/' })
        } else if (method == 'credentials') {
            let temp = data
            const tempData = JSON.stringify(temp)
            await signIn('credentials-sign-in', { tempData, callbackUrl: '/' })
        }

    }

    if (error) {
        if (error == "AccessDenied") {
            errorMessage = "Email already exists. Use existing credentials."
        } else if (error == "CredentialsSignin") {
            errorMessage = "Email or Password is incorrect."
        } else {
            errorMessage = error + " Error"
        }
    }

    function handleChange(e:ChangeEvent<HTMLInputElement>){
        const {name,value} = e.target

        setData({
            ...data,
            [name] : value
        })
    }

    return (
        <div className="hero min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center ml-4 lg:text-left">
                    <h2 className="text-3xl font-bold">Sign in to SubManager</h2>
                    <p className="py-5">Never forget to cancel a subscription again!</p>
                    <p className="py-5 hidden md:block">Keep track of all your subscriptions.</p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 ring-1 ring-slate-200">
                    <form className="card-body">
                        <div className="form-control">
                            {error ? <label className="label justify-center">
                                <span className="label-text text-red-600">{errorMessage}</span>
                            </label> : <></>}
                            <label className="label justify-center">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="text" placeholder="jane.doe@gmail.com" name="email" onChange={(e)=>{handleChange(e)}} className="input input-bordered text-center" />
                        </div>
                        <div className="form-control">
                            <label className="label justify-center">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" onChange={(e)=>{handleChange(e)}} className="input input-bordered text-center" />

                            <label className="label">

                            </label>
                            <span>
                                <label className="label">
                                    <Link className="label-text-alt link link-hover" href="/register"><u>Register for an account</u></Link>
                                    <a href="#" className="label-text-alt link link-hover"><u>Forgot password?</u></a>
                                </label>
                            </span>
                            {loading ?
                                <button className="btn-primary input ">
                                    <p className="animate-spin rounded-full h-6 w-6 border-t-4 border-blue-500 border-solid mx-auto"></p>
                                </button> :
                                <input className="input btn text-white btn-primary" type="submit" placeholder="Login" onClick={() => {
                                    setLoading(true)
                                    handleSignin("credentials")
                                }}></input>
                            }
                        </div>
                        <hr />
                        <div className="form-control mt-3 justify-between">
                            <div className="mt-2">
                                <button type="button" onClick={() => { handleSignin("google") }} className="text-white w-full  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between dark:focus:ring-[#4285F4]/55 mr-2 mb-2"><svg className="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>Login with Google<div></div></button>
                                <button type="button" onClick={() => { handleSignin("github") }} className="text-white w-full  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between dark:focus:ring-[#4285F4]/55 mr-2 mb-2"><svg className="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>Login With GitHub<div></div></button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}