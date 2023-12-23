import Image from 'next/image'
import Link from 'next/link'
import styles from './cardStack.module.css'
import { authOptions } from './api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth'
import { getSession } from 'next-auth/react'
import { NextResponse } from 'next/server'
import { redirect } from 'next/navigation'


export default async function Home() {
  let session = await getServerSession(authOptions)

  //let response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/subscription/${session?.user.email as string}`,{method:'GET',headers:{'Accept': 'application/json'},cache:'no-store'})
  if (session?.user) {
    //redirect to /home if user is already logged in
    redirect('/home')
  } else {


    return (
      <div>
        <div className="">
          <div className='flex flex-col items-center'>
            <div className='hidden md:flex md:justify-between md:drop-shadow-xl bg-black'>
              {/**This block is used for displaying the hero and the text side by side */}
              <div className='flex flex-col ml-2'>
                {/**This block is used to store the text */}
                <p className='font-serif pt-5 text-white md:text-5xl lg:text-6xl transition-opacity animate-fade-primary' >
                  Never Forget a Subscription Again.
                  <br /><br />Save Money.
                </p>
                <br></br>
                <p className='text-[#6419e6] md:text-3xl lg:text-4xl animate-fade-secondary'><strong>We help you remember to cancel things you don&apos;t need.</strong></p>
              </div>

              <img src='/hero_banner.png' className='xl:hidden'></img>
              <img src='/hero_banner_lg.png' className='hidden xl:flex'></img>
            </div>
            <div className=' md:hidden' >
              {/**This block is used for displaying the hero and text on phone screens */}
              <img src='/hero_banner.png' className='z-0'></img>
              {/**Z index set to 0 for the image */}
              <div className='z-10 flex flex-col text-left'>
                <p>Never Forget a Sub Again</p>
              </div>

            </div>
            <div className='flex mt-6 justify-center'>
              <Link href="/sign-in" className="drop-shadow-md btn btn-primary normal-case text-xl max-w-sm place-self-end">Register Now</Link>
            </div>


            <h2 className='mt-5 font-serif text-2xl md:text-3xl lg:text-4xl'>Three Easy Steps:</h2>
            <div className='flex flex-col md:flex-row my-4'>
              {/**This block is used to show the steps of the process */}
              <div className=' flex flex-col items-center'>
                {/**step 1 */}
                <img src='/step_1.png'></img>
                <h3>Sign Up</h3>
              </div>
              <div className='md:mx-10 flex flex-col  items-center'>
                {/**step 2 */}
                <img src='/step_2.png'></img>
                <h3>Receive Reminders</h3>
              </div>
              <div className=' flex flex-col items-center'>
                {/**step 3 */}
                <img src='/step_3.png'></img>
                <h3>Save Money</h3>

              </div>

            </div>



          </div>
        </div>
      </div>
    )
  }
}
