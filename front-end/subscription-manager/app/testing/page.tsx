'use client'



export default function testing(){

    
    return (
        <form onSubmit={(e) => { 
                e.preventDefault()
                console.log(e.target)
            }
            }>
            <label >label</label>
            <input defaultValue="this" type="text" name="this_one" />
            <button type="submit">Submit</button>
        </form>
    )
}