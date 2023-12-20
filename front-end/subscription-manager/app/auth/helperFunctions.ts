import { Profile, User } from "next-auth"
import { GitHubProfile, GoogleProfile, UserObject, credentialsRegister } from "../interfaces/interfaces"

const crypto = require('crypto')

export function createPassword(password: string) {
    const hash_algorithm = process.env.hash_algorithm
    const hash_encoding = process.env.hash_encoding
    const min_length = process.env.min_length as unknown as number
    const max_length = process.env.max_length as unknown as number

    return crypto.createHash(hash_algorithm).update(password).digest(hash_encoding)

}
/**
 * Takes in a start date, and returns the resulting offset date, specified by the the number of offsets.
 * 
 * @param startDate should be in the format 'YYYY-MM-DD'
 * @param offsetAmount should be a number
 * @param offsetType should be either 'day', 'week', 'month', or 'year'
 * @returns Date that is the offset of the start date in 'YYYY-MM-DD' format
 */

export function getOffsetDate(startDate: string, offsetAmount: number, offsetType: string): string {
    const tempDates: Array<string> = startDate.split('-')
    var dates: Array<number> = []

    for (let index = 0; index < tempDates.length; index++) {
        dates.push(Number(tempDates[index]))
    }
    var daysInMonth: Array<number> = [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    daysInMonth[1] = (dates[0] % 4 === 0 && dates[0] % 100 !== 0) || (dates[0] % 400 === 0) ? 29 : 28;



    switch (offsetType) {
        case 'month':
            if (dates[1] + offsetAmount > 12) {
                dates[0] += 1
                dates[1] = (dates[1] + offsetAmount) % 12 //12 months in a year
            }else{
                dates[1] += offsetAmount
            }

            break;
        case 'year':
            dates[0] += offsetAmount
            break;
        default:
            //the same process for days and weeks
            const days = daysInMonth[dates[1] - 1] //month -1, as array is 0 indexed
            if (dates[2] + offsetAmount > days) {
                if (dates[1] + 1 > 12) { //so it should be january, increase year by 1, make month 1
                    dates[0] += 1
                    dates[1] = 1
                }else{
                    dates[1] +=1
                }
            }else{
                dates[2] += offsetAmount
            }
            break;
    }

    

    return `${dates[0]}-${(dates[1].toString().length - 1) ? dates[1] : dates[1].toString().padStart(2,'0')}-${(dates[2].toString().length - 1) ? dates[2] : dates[2].toString().padStart(2,'0')}`
}

export function createUser(provider_name: string, profile: GitHubProfile | GoogleProfile | credentialsRegister | null): { 'name': string, "email": string, "passwd": string } | null {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()
    const userObject: { 'name': string, "email": string, "passwd": string } = { name: '', email: '', passwd: '' }
    try {
        if (provider_name === "github") {
            profile = <GitHubProfile>profile
            userObject.passwd = createPassword(String(profile.id))
            userObject.name = <string>profile.login
            userObject.email = <string>profile.email

        } else if (provider_name === "google") {
            profile = <GoogleProfile>profile
            userObject.passwd = createPassword(profile.sub)
            userObject.name = profile.name as string
            userObject.email = profile.email
        } else {
            profile = <credentialsRegister>profile
            userObject.passwd = createPassword(profile?.passwd)
            userObject.name = profile?.name as string
            userObject.email = profile?.email as string
        }
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message)
        } else {
            console.log(String(error))
        }
    }

    return userObject

}