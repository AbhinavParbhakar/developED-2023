import { EmailAuthCredential } from "firebase/auth/cordova";
import { DocumentData } from "firebase/firestore";
import { Profile, User } from "next-auth";

export interface Subscription{
    cost: number,
    dueDate: string,
    startDate : string,
    planType : string,
    name : string,
    user_email : string,
    id:string
}

export interface credentialsSignIn{
    email : string,
    password : string
}

export interface statistics{
    subscriptions_count : number,
    subscriptions_total : number,
    id : string
}

export interface credentialsRegister extends User{
    email : string,
    passwd : string,
    name : string
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
    name : string,
    email : string,
    passwd : string,
    id : string

}

export interface Hashing{
    hash_algorithm : string,
    hash_encoding : string,
    min_length : number,
    max_length : number
}

export interface subscriptionApiReturnType{
    "Subscriptions":Array<Subscription>
}