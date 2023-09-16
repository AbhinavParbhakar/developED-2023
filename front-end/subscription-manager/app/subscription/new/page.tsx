export default function addSubscription(){
    return(
        <div className="w-100 flex justify-center">
                <form className="flex form-control flex-col items-between justify-items-center max-w-lg">
                    <label className="flex label">
                        <h2 className="label-text">Subscription Name</h2>
                    </label>
                    <input type="text" className="input input-bordered input-primary " name="service" id="" />
                    <label className="flex label">
                        <h2 className="label-text">Price</h2>
                    </label>
                    <input type="text" className="input input-bordered input-primary "></input>
                    <label className="flex label">
                        <h2 className="label-text">Notification Time </h2>
                    </label>
                    <input type="date" className="input input-bordered input-primary "></input>
                    <button type="submit" className="input input-bordered input-info mt-4" >Add Subscription</button>
                </form>
        </div>
    )
}