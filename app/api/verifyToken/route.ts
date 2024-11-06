import { verifyToken } from "@/components/Helpers"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    let response = {
        code: -1, content: null, message: "Invalid token"
    }

    const params = await req.json()
    const { token } = params
    if(!token) return NextResponse.json(response)

    const isVerify = await verifyToken(token)
    console.log('isVerify', token)

    if(isVerify) {
        response['code'] = 0
        response['message'] = "Success"
    }

    return NextResponse.json(response)
}