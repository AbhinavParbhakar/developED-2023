export default function Home() {
  return (
        <div className="flex justify-center h-screen items-center">
            <form className="flex form-control shadow-2xl w-96 flex-col card p-10 bg-base-200">
                <label className="flex label">
                    <h2 className="label-text">Name</h2>
                </label>
                <input type="text" className="input input-bordered input-primary " name="service" id="" />
                <label className="flex label">
                    <h2 className="label-text">Email</h2>
                </label>
                <input type="" className="input input-bordered input-primary " name="service" id="" />
                <label className="flex label">
                    <h2 className="label-text">Date of Birth</h2>
                </label>
                <input type="date" className="input input-bordered input-primary "></input>
                <label className="flex label">
                    <h2 className="label-text">Password</h2>
                </label>
                <input type="" className="input input-bordered input-primary " name="service" id="" />
                <label className="flex label">
                    <h2 className="label-text">Confirm Password</h2>
                </label>
                <input type="text" className="input input-bordered input-primary "></input>
                <button type="submit" className="btn-primary input input-bordered input-info mt-4" >Register</button>
            </form>
        </div>
  )
}