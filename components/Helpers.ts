import clsx from "clsx"
import { twMerge } from "tailwind-merge"

export const initialsName = (string: string) => string.split(' ').map(str => str.substr(0, 1).toUpperCase()).join('')

export const cn = (...inputs: any[]): string => {
    return twMerge(clsx(inputs))
}

export const verifyToken = async (token: string|null, action: string|null = null, referer: string): Promise<any> => {
    try {
        const params = {
            event: {
                token,
                expectedAction: action,
                siteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
            }
        }
    
        const config: RequestInit = {
            method: "POST",
            body: JSON.stringify(params),
            headers: {
                Referer: referer
            }
        }
    
        const url: string = 'https://recaptchaenterprise.googleapis.com/v1/projects/bap-website-327911/assessments?key='+ process.env.NEXT_PUBLIC_GOOGLE_CLOUD_KEY!
    
        const req = await fetch(url, config)
    
        const response = await req.json()

        if(!req?.ok) return
        
        return response?.tokenProperties?.valid
    } catch (err) {
        console.log(err)
    }
}

export const randNumber = (length: number = 10000) => Math.floor(Math.random() * length)