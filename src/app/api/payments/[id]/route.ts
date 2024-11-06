import RecordsModel from "@/db/models/Records";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id: string = params.id;
    await RecordsModel.updateRecord(id);
    // const data = await RecordsModel.getRecordHistoryPatientIdFromParams(id);
    // console.log(der);
    return NextResponse.json(
      { message: `Record updated successfully` },
      { status: 201 }
    );
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
