import PatientModel from "@/db/models/Patients";
import { NextRequest } from "next/server";

// API GET ALL PATIENTS

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get("page");
  const search = searchParams.get("search");

  const patient = await PatientModel.getAllPatients(page, search);
  return Response.json(patient);
}
