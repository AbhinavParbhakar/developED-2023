'use client'
import {useState} from 'react'
import { Subscription } from "../interfaces/interfaces"
import MySubscriptionCard from "@/components/MySubscriptionCard"

interface searchObjectType{
    param : string,
}

export default function MySubscriptions() {
    const fakeData : Array<Subscription> = [{
        company : 'Spotify',
        cost: 50.00,
        id:"adfadsfadsf",
        due_date: '08/25/2032',
        start_date : '08/20/2021',
        plan_type : 'weekly',
        plan_name : 'Student Plan',
    },{
        company : 'Amazon Prime',
        cost: 26.21,
        id:"fjk23j4klja",
        due_date: '05/25/2023',
        start_date : '02/28/3202',
        plan_type : 'biweekly',
        plan_name : 'Music',
    },
    {
        company : 'Netflix',
        cost: 12.23,
        id:"jk3l2jfklj3",
        due_date: '05/13/2021',
        start_date : '02/28/3202',
        plan_type : 'monthly',
        plan_name : 'Premium',
    }]

    //use searchParams to filter
    const searchObject:searchObjectType  = {param:""}
    const [searchParams,setSearchParams] = useState(searchObject)

    //use function Filter_callback to return if filter
    function filter_callback(data:Subscription){
        if (data.company.includes(searchParams.param)){
            return data
        }
    }

    function update_search(event:any){
        console.log(event.target.value)
        setSearchParams(event.target.value)
    }

    //iteratively go through every styles
    var style_index:number = 0
    const styles : {[key:number]:string} = {0:"bg-accent",1:"bg-info",2:"bg-success",3:"bg-warning",4:"bg-error"}
    const styles_length = 5

    return(
        <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col space-y-4">
                <h1 className="text-4xl font-bold text-center">My Subscriptions</h1>
                <div className="relative">
                    <input
                        type="text"
                        onChange={(e) => {console.log(e.target.value)}}
                        placeholder="Search..."
                        className="w-full py-2 pr-10 pl-4 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    />
                    <button className="absolute top-0 right-0 mt-2 mr-2">
                    </button>
                </div>
                {
                    fakeData.filter(filter_callback).map((subscription) => {
                    let temp_index = style_index
                    style_index += 1
                    return <MySubscriptionCard key={temp_index} service={subscription} color={styles[temp_index % styles_length]}></MySubscriptionCard>
                })}
            </div>
        </div>
    )    
}