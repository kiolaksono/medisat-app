import RecordsModel from "@/db/models/Records";
import { NextRequest, NextResponse } from "next/server";


export  async function GET(request: NextRequest, {params}: {params: {patientId: string}}) {
    try {
        
        const patients = await RecordsModel.getRecordHistoryPatientIdFromParams(params.patientId);
        return NextResponse.json(patients, {status:200})
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