import Image from 'next/image'
import Link from 'next/link'
import { authOptions } from '../api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth'
import { getSession } from 'next-auth/react'


export default async function Home() {
  let session  = await getServerSession(authOptions)
  
  //let response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/subscription/${session?.user.email as string}`,{method:'GET',headers:{'Accept': 'application/json'},cache:'no-store'})
 
  

  return (
    <div>
      <div className="hero h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Welcome Back,</h1>
            <h2 className='text-2xl font-bold '>{session?.user.name}</h2>
            <p className="text-base mt-5">Never forget about your subscriptions again!</p>
            <Link href="/subscription/new" className="btn btn-primary mt-4 mb-4">Add subscription</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
