import { z } from "zod";
import { db } from "../config";
import { hashPassword } from "@/helpers/bcrypt";
import { ObjectId } from "mongodb";


const PatientSchema = z.object({
  nik: z.string().min(5),
  name: z.string().min(5),
  email: z.string().email().min(5),
  password: z.string().min(6),
  birthDate: z.string().min(5),
  address: z.string().min(5),
  phoneNumber: z.string().min(5),
});

type PatientType = z.infer<typeof PatientSchema>;

class PatientModel {
  static collection() {
    return db.collection("patients");
  }

  static collectionPatient = db.collection<PatientType>("patients")

  static async create(patient: PatientType) {
    await PatientSchema.parseAsync(patient);
    patient.password = hashPassword(patient.password);

    const existingPatient = await this.collection().findOne({
      $or: [{ email: patient.email }, { nik: patient.nik }],
    });

    if (existingPatient) {
      throw { message: "Email or NIK already exists", status: 400 };
    }
    return await this.collection().insertOne(patient);

  }

  static async findByEmail(email: string) {
    return await this.collection().findOne({ email });
  }

  static async getAllPatients(page: string | null, search: string | null) {
    const limit = 8;
    const currentPage = !page ? 1 : Number(page);
    const skip = (currentPage - 1) * limit;
    const arr = search?.split(" ").map((el) => ({
      name: {
        $regex: el,
        $options: "si",
      },
    }));

    const query = arr ? { $and: arr } : {};

    const totalCount = await this.collection().countDocuments(query);
    const totalPages = Math.ceil(totalCount / limit);

    const patients = await this.collection()
      .find(query)
      .sort({ name: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    return {
      patients,
      pagination: {
        currentPage,
        totalPages,
        totalCount,
        hasNextPage: currentPage < totalPages,
        hasPrevPage: currentPage > 1,
      },
    };
  }

  static async getPatientsById(id: string) {
    const patientId = new ObjectId(id);
    const patients = await this.collectionPatient.findOne(patientId);
    return patients
  }
}

export default PatientModel;
