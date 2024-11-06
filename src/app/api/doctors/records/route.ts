import RecordsModel from "@/db/models/Records";
import { NextRequest, NextResponse } from "next/server";


//? Untuk melihat semua data yang daftar dengan dokter tesebut pada hari yang sama
export async function GET(request: NextRequest) { 
    try {
        // console.log("masuk api");
        
        const doctorId = request.headers.get('id') as string;

        
        const patients = await RecordsModel.getRecordByDoctorIdToday(doctorId);
        return NextResponse.json(patients,{status:200})
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