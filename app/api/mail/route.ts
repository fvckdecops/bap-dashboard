import { verifyToken } from "@/components/Helpers";
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";
import { NextResponse } from "next/server";

const mailerSend = new MailerSend({
    apiKey: process.env.EMAIL_API_KEY!
})

interface ConfigTypes {
    [K: string]: string
}

export async function POST(req: Request) {
    const config: ConfigTypes = await req.json()

    const sentFrom = new Sender(process.env.SEND_FROM_EMAIL!, config.name)
    const recipient = [
        new Recipient(process.env.SEND_TO_EMAIL!, process.env.SEND_TO_NAME)
    ]

    const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipient)
    .setSubject(config.subject)
    .setText(config.message +'\n\nReply to: '+ config.email)

    if(!await verifyToken(config.token, null, req.headers.get('referer')!)) {
        return NextResponse.json({ code: 0, content: null, message: "You're not authorized to access this page." })
    }

    try {
        const sendEmail = await mailerSend.email.send(emailParams)
        const message = (sendEmail.statusCode === 202) ? "Email Sent!" : "Failed to send email."

        return NextResponse.json({ code: 0, content: ((sendEmail.statusCode === 202) ? null : sendEmail.body), message })
    } catch(err) {
        return NextResponse.json({ code: 0, content: err, message: "Failed to send email." })
    }
}