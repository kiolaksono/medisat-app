// import PatientModel from "@/db/models/Patients";
import RecordsModel from "@/db/models/Records";

// GET API RECORD PATIENTS
export async function GET(request: Request) {
  const patientId = request.headers.get("id")!;
  const patients = await RecordsModel.getRecordHistoryPatientId(patientId);
  return Response.json(patients);
}
