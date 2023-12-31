'use client'

import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react'
import { signOut } from 'next-auth/react';

const Navbar = () => {
    const { data: session, status } = useSession()

    var imagePath: string = ""
    if (session?.user?.image == null || session?.user?.image == undefined) {
        imagePath = 'filler_profile.png'
    } else {
        imagePath = session?.user?.image as string
    }



    return (<>{!session ?

        <div className='navbar bg-base-100 justify-between'>
            <Link href="/" className="btn btn-ghost normal-case text-xl">SubManager</Link>
            <Link href="/sign-in" className="btn btn-primary normal-case text-xl">Login</Link>
        </div>

        :
        (<div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <Link href="/mysubscriptions">My Subscriptions</Link>
                        <Link href="/subscription/new" className='mt-3'>Add Subscription</Link>
                    </ul>
                </div>
                <Link href="/" className="btn btn-ghost normal-case text-xl">SubManager</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <Link href="/mysubscriptions" className='mr-3'>My Subscriptions</Link>
                    <Link href="/subscription/new" className='mx-3'>Add Subscription</Link>
                </ul>
            </div>
            <div className="navbar-end">
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img src={imagePath} />
                        </div>
                    </label>
                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                        <li>
                            <a className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li onClick={() => { signOut({ callbackUrl: '/' }) }}><a>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>)}
    </>
    );
}

export default Navbar;