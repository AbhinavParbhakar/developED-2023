export default function Home() {
  return (
    <div className="hero min-h-screen bg-base-200">
        <div className="card-body">
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Name</span>
                </label>
                <input type="text" placeholder="name" className="input input-bordered" />
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input type="text" placeholder="email" className="input input-bordered" />
                </div>
                <div className="form-control">
                <label className="label">
                    <span className="label-text">Password</span>
                </label>
                <input type="text" placeholder="password" className="input input-bordered" />
                </div>
                <div className="form-control">
                <label className="label">
                    <span className="label-text">Confirm Password</span>
                </label>
                <input type="text" placeholder="confirm password" className="input input-bordered" />
                </div>
                <div className="form-control mt-6">
                <button className="btn btn-primary">Register</button>
            </div>
        </div>
    </div>
  )
}