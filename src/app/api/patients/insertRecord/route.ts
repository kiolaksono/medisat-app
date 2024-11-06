import Doctor from "@/db/models/doctors";
import PatientModel from "@/db/models/Patients";
import RecordsModel from "@/db/models/Records";
import PatientMail from "@/helpers/mail";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

// API POST RECORD PATIENTS

export async function POST(request: NextRequest) {
  try {
    const patientId = request.headers.get("id")!;

    const { bookDate, doctorId } = await request.json();

    await Doctor.insertRecord({
      bookDate,
      status: "booked",
      patientId: new ObjectId(patientId),
      doctorId: new ObjectId(doctorId),
    });

    const patient = await PatientModel.getPatientsById(patientId)!;
    const doctor = await Doctor.getByDoctorId(doctorId)!;
    const params = {
      name: patient!.name,
      email: patient!.email,
      doctorName: doctor!.name,
      bookDate,
      status: "booked",
    }
    PatientMail(params);
        
    

    return NextResponse.json(
      { message: "Schedule created successfully" },
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

export async function GET(id: string) {
  const patient = await RecordsModel.getRecordByPatientId(id);
  if (!patient) throw { message: "Patient tidak terdaftar", status: 404 };
}
