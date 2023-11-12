import Image from 'next/image'
import Link from 'next/link'
import styles from './cardStack.module.css'
import { authOptions } from './api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth'
import { Session } from 'next-auth'
import { Subscription, subscriptionList } from './interfaces/interfaces'


export default async function Home() {
  let session  = await getServerSession(authOptions)
  
  let response = await fetch(`${process.env.API}/user/${session?.user.uuid as string}/subscriptions/`,{method:'GET',headers:{'Accept': 'application/json'}})
  let subscriptions:subscriptionList = await response.json()
  console.log(subscriptions)
  

  return (
    <div>
      <div className="hero min-h-screen bg-base-200 ">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Welcome Back {session?.user?.name}</h1>
            <p className="text-base mt-5">Never forget about your subscriptions again!</p>
            <Link href="/subscription/new" className="btn btn-primary mt-4 mb-4">Add subscription</Link>
            <div className={styles.subs}>
              <div className={styles.subsTitle}>Your Upcoming subscriptions:</div>
            <div className={styles.cardStack}>
              <div className={styles.card}>
                <div className={styles.cardHeader}>Spotify</div>
                <div className={styles.cardContent}>Renews: 10/01/23</div>
              </div>
              <div className={styles.card}>
                <div className={styles.cardHeader}>Amazon</div>
                <div className={styles.cardContent}>Renews: 10/05/23</div>
              </div>
              <div className={styles.card}>
                <div className={styles.cardHeader}>Uber Eats</div>
                <div className={styles.cardContent}>Renews: 10/11/23</div>
              </div>
              <div className={styles.companyTitle} >Brought to you by ESix LLC</div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
