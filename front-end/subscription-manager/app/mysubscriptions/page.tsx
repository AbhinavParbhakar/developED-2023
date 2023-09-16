export default function MySubscriptions() {
    return(
        <div className="flex justify-center">
            <div className="flex flex-col">
                <div className="grid w-96 h-20 rounded bg-primary text-primary-content place-content-center">
                    Spotify
                </div> 
                <div className="grid w-96 h-20 rounded bg-accent text-accent-content place-content-center">
                    Netflix
                </div> 
                <div className="grid w-96 h-20 rounded bg-secondary text-secondary-content place-content-center">
                    Hulu
                </div>
            </div>
        </div>
    )    
}