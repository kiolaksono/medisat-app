import Doctor from "@/db/models/doctors";
import { NextResponse } from "next/server";

//? Untuk mendapatkan data semua dokter
export async function GET() {
    try {
        const doctors = await Doctor.getAll()
        return NextResponse.json(doctors, {status:200})
    } catch (error) {
        if(error instanceof Error){
            return NextResponse.json(
                {
                    message: error.message
                },
                {
                    status : 400
                }
            )
        }
        return NextResponse.json(
            {
                message : "Something went wrong"
            },
            {
                status:500
            }
        )
    }
}