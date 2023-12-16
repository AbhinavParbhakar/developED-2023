import { DocumentData } from "firebase/firestore";
import { Profile } from "next-auth";

export interface Subscription{
    company : string,
    user_id:string,
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

export interface UserObject extends DocumentData{
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

export const firebaseConfig = {
    apiKey: "AIzaSyAYbfQoJwuEweTvgDBZh43jastpDkJ_kfw",
    authDomain: "submanage-97a70.firebaseapp.com",
    projectId: "submanage-97a70",
    storageBucket: "submanage-97a70.appspot.com",
    messagingSenderId: "217045540010",
    appId: "1:217045540010:web:b557558f67c42819d544d3"
  };