import PatientModel from "@/db/models/Patients";
import { comparePassword } from "@/helpers/bcrypt";
import { signToken } from "@/helpers/jwt";
import { cookies } from "next/headers";

// API POST LOGIN PATIENTS

// API POST REGISTER PATIENTS

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const patient = await PatientModel.findByEmail(email);
    if (!patient) throw { message: "Invalid Email/Password", status: 400 };

    const isInvalidPassword = comparePassword(password, patient.password);
    if (!isInvalidPassword)
      throw { message: "Invalid Email/Password", status: 400 };

    const payload = {
      _id: patient._id.toString(),
      role: "patients"
    }
    
    const accessToken = signToken(payload);
    cookies().set("Authorization", `Bearer ${accessToken}`);

    return Response.json({ accessToken });
  } catch (error: unknown) {
    const rawError = error as { message: string; status: number };
    return Response.json(
      { message: rawError.message },
      { status: rawError.status }
    );
  }
}
