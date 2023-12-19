import Image from 'next/image'
import Link from 'next/link'
import styles from './cardStack.module.css'
import { authOptions } from './api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth'
import { getSession } from 'next-auth/react'


export default async function Home() {
  let session  = await getServerSession(authOptions)
  
  let response = await fetch(`http://localhost:3000/api/subscription/${session?.user.email as string}`,{method:'GET',headers:{'Accept': 'application/json'}})
 
  

  return (
    <div>
      <div className="hero h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Welcome Back,<br/><br/> {session?.user.name}</h1>
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
