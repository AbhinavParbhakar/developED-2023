import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Welcome Back User</h1>
            <p className="py-6">Never forget your subscriptions again! Only pay for what you want!</p>
            <Link href="/subscription/new" className="btn btn-primary mt-4">Add subscription</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
