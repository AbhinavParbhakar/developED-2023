import { Profile } from "next-auth";

export interface Subscription{
    company : string,
    id:string,
    cost: number,
    due_date: string,
    start_date : string,
    plan_type : string,
    plan_name : string,
}


export interface GitHubProfile extends Profile{
    login : string | undefined | null,
    id : string | number,
    node_id: string | undefined | null,
    name: string | undefined,
    email : string,
}

export interface GoogleProfile extends Profile{
    email:string,
    given_name:string,
    family_name:string,
    sub:string //id
}

export interface UserObject{
    f_name : string,
    l_name : string,
    b_day : string | null ,
    email : string,
    passwd : string
}

export interface Hashing{
    hash_algorithm : string,
    hash_encoding : string,
    min_length : number,
    max_length : number
}

export interface subscriptionList{
    subscriptions : Array<Subscription>
}