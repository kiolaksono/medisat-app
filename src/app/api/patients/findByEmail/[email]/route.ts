// import Doctor from "@/db/models/doctors";
import PatientModel from "@/db/models/Patients";

export async function GET(
  request: Request,
  { params }: { params: { email: string } }
) {
  try {
    const email = params.email;
    const patient = await PatientModel.findByEmail(email);
    if (!patient) throw { message: "Patient tidak terdaftar", status: 404 };

    return Response.json(patient);
  } catch (rawError: unknown) {
    const error = rawError as { message: string; status: number };
    return Response.json({ message: error.message }, { status: error.status });
  }
}
