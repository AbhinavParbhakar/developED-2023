import Image from 'next/image'

export default function Home() {
  return (
    <div >
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Welcome User</h1>
            <p className="py-6">Never forget your subscriptions again, only pay for what you want</p>
            <button className="btn btn-primary">Add subscription</button>
          </div>
        </div>
      </div>
    </div>
  )
}
