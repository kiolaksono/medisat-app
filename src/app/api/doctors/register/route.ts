import Doctor from "@/db/models/doctors";
import PatientMail from "@/helpers/mail";
import { NextRequest, NextResponse } from "next/server";



//? Untuk registrasi dokter
export async function POST(request: NextRequest) {
    try {
        const {employeeId, name, password, image, phoneNumber, polyclinic, schedule} = await request.json()

        await Doctor.newDoctor({
            employeeId, name, password, image, phoneNumber, polyclinic, schedule
        })    
        return NextResponse.json(
            {message:"Doctor registered"},
            {status:201}
        )
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