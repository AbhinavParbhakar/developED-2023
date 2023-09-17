import Link from "next/link"

export default function MySubscriptions() {
    return(
        <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col space-y-4">
                <h1 className="text-4xl font-bold text-center">My Subscriptions</h1>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full py-2 pr-10 pl-4 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    />
                    <button className="absolute top-0 right-0 mt-2 mr-2">
                    </button>
                </div>
                <Link href="/spotify">
                    <div className="grid w-full rounded bg-success card grid-cols-2 gap-4 hover:p-6 hover:bg-opacity-75 p-3">
                        <div className="col-span-2">Spotify</div>
                        <div className="col-span-2 text-right">
                            <p className="text-xs">$30/mo next payment: 8 days</p>
                        </div>
                    </div>
                </Link>

                <Link href="/amazon" className="grid w-96 rounded bg-error card grid-cols-2 gap-4 p-3 hover:p-6 shadow-2xl">
                    <div className="col-span-2">Amazon Prime</div>
                    <div className="col-span-2 text-right">
                        <p className="text-xs">$20/mo next payment: 8 days</p>
                    </div>
                </Link>
                <div className="grid w-96 rounded bg-accent card grid-cols-2 gap-4 p-3 hover:p-6 shadow-2xl">
                    <div className="col-span-2">Hulu</div>
                    <div className="col-span-2 text-right">
                        <p className="text-xs">next payment: 8 days</p>
                    </div>
                </div>
            </div>
        </div>
    )    
}