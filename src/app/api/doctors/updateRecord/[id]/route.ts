import Doctor, { RecordType } from "@/db/models/doctors";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export type UpdateRecordType = {
    _id:ObjectId,
    symptom:string,
    disease:string,
    recipe:string,
    notes:string,
}

// ? Untuk update record pasien
export async function PUT(request: NextRequest, {params}:{params:{id:string}}) {
    try {
        
        const _id = new ObjectId(params.id);

    const { symptom, disease, recipe, notes } =
      await request.json();


    await Doctor.updateRecord({
      _id,
      symptom,
      disease,
      recipe,
      notes,
    } as UpdateRecordType);

    return NextResponse.json(
      { message: "Record updated successfully" },
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
