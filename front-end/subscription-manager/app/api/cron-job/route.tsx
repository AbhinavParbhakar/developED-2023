import { NextResponse } from "next/server";
import { MailtrapClient } from "mailtrap";

export async function GET() {
    const TOKEN = process.env.EMAIL_TOKEN as string
    const ENDPOINT = "https://send.api.mailtrap.io/";

    const client = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });

    const sender = {
        email: "mailtrap@develop-ed-2023.vercel.app",
        name: "Mailtrap Test",
    };
    const recipients = [
        {
            email: "abhinav.parbhakar302@gmail.com",
        }
    ];

    client
        .send({
            from: sender,
            to: recipients,
            subject: "You are awesome!",
            text: "Congrats for sending test email with Mailtrap!",
            category: "Integration Test",
        })
        .then(console.log, console.error);
    return NextResponse.json({ 'message': 'sent' })
}