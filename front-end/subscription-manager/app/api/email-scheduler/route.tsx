import { NextResponse } from "next/server";
import { MailtrapClient } from "mailtrap";
import { getDocs, query } from "firebase/firestore";
import { subscriptionCollection } from "../firestore/config";
import { Subscription, UserObject } from "@/app/interfaces/interfaces";
import { getOffsetDate } from "@/app/auth/helperFunctions";

//Cron job
//Update next due date
//Send email if today is x number of days before due date
export async function GET() {
    const response = await getDocs(subscriptionCollection)

    let subscriptionArray: Array<Subscription> = []

    if (response.empty) {
        return NextResponse.json({ 'message': '0 subs' })
    } else {
        const TOKEN = process.env.EMAIL_TOKEN as string
        const ENDPOINT = "https://send.api.mailtrap.io/";
        let emailsSentCount = 0
        let subsUpdated = 0
        const client = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });
        const sender = {
            email: "mailtrap@esix.ca",
            name: "SubManager",
        };
        response.forEach((sub) => {
            subscriptionArray.push({ ...sub.data(), 'id': sub.id } as Subscription)
        })
        const date: string = new Date().toISOString().slice(0, 10)

        for (let sub of subscriptionArray) {
            const offsetDate: string = getOffsetDate(date, Number(sub.email_frequency), 'day')

            if (offsetDate == sub.dueDate) {
                emailsSentCount +=1
                //send email, as today + sub.email_frequency is the due date, notify the user as they requested
                const userResponse = await fetch(`${process.env.API}/api/user/${sub.user_email}`,
                    {
                        method: "GET",
                        headers: {
                            'Accept': 'application/json'
                        }
                    }
                )
                const user: UserObject = await userResponse.json()
                const recipients = [
                    {
                        email: sub.user_email,
                    }
                ];
                client
                    .send({
                        from: sender,
                        to: recipients,
                        subject: "Upcoming Subscription Reminder",
                        html:
                            `
                <!DOCTYPE html>
    <html>
    <head>
     <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">

        <div style="max-width: 600px; margin: 20px auto;">

            <div style="background-color: rgba(29,35,42,255);; color: #fff; text-align: center; padding: 10px;">
                <h2>Subscription Renewal Reminder</h2>
            </div>

            <div style="padding: 20px;">

                <p>Dear ${user.name},</p>

                <p>We hope this email finds you well. We would like to remind you that your subscription for <strong>${sub.name}</strong> is due for renewal.</p>

                <p>The details of your subscription are as follows:</p>

                <ul>
                    <li><strong>Subscription:</strong> ${sub.name}</li>
                    <li><strong>Price:</strong> $${sub.cost}</li>
                    <li><strong>Due Date:</strong> ${sub.dueDate}</li>
                </ul>

                <p>Please take a moment to manage your subscription before the due date, if you so choose.</p>

                <p>Thank you for choosing our service!</p>

                <p>Best regards,<br>SubManager</p>
            </div>

            <div style="background-color: #f4f4f4; padding: 10px; text-align: center;">
                <p>If you have any questions, please contact our support team at <a href="mailto:submanager.esix@gmail.com">submanager.esix@gmail.com</a></p>
            </div>

        </div>

    </body>
    </html>



                `,
                        category: "Subscription Test",
                    })
            }else if (date == sub.dueDate){
                subsUpdated +=1
                //check if today is the due date. update the dueDate to the next dueDate
                sub.startDate = date
                var offset = 0
                switch (sub.planType) {
                  case 'month':
                    offset = 1
                    break;
                  case 'week':
                    offset = 7 //this needs to be 7 for week because we're offsetting by 7 days
                    break;
                  case 'year':
                    offset = 1
                    break;
                }
                sub.dueDate = getOffsetDate(sub.startDate,offset,sub.planType)
                const reponse = await fetch(`${process.env.API}/api/subscription`, {
                    method: 'PATCH',
                    headers: { 'Content-type': 'application/json' },
                    body: JSON.stringify(sub)
                })
                //added a commment
            }

        }
        console.log( `On ${date}, ${emailsSentCount} emails sent, ${subsUpdated} subs updated`)
        return NextResponse.json({result:{ 'message': `On ${date}, ${emailsSentCount} emails sent, ${subsUpdated} subs updated` }})
    }
}