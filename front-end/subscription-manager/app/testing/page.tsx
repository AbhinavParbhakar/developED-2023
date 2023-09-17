export default function testing(){
    return (
        <div>
            <label >label</label>
            <input type="text" onChange={(e) => {console.log(e.target.value)} }/>
        </div>
    )
}