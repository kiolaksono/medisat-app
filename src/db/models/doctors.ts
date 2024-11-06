import { hash } from "bcryptjs";
import { db } from "../config";
import { ObjectId } from "mongodb";
import { z } from "zod";
import { UpdateRecordType } from "@/app/api/doctors/updateRecord/[id]/route";

export const DoctorSchema = z.object({
    _id: z.instanceof(ObjectId,{message:"Doctor Id is required"}).optional(),
    employeeId:z.string({message:"Employee Id is required"}),
    name:z.string({message:"Name is required"}),
    password:z.string({message:"Password is required"}),
    image:z.string({message:"Image is required"}),
    phoneNumber:z.string({message:"Phone Number is required"}),
    polyclinic:z.string({message:"Polyclinic is required"}),
    schedule:z.array(z.string({message:"Schedule is required"})),
    createdAt:z.date().default(new Date()).optional(),
    updatedAt:z.date().default(new Date()).optional()
})

export type DoctorType = z.infer<typeof DoctorSchema>;

export const RecordSchema = z.object({
    _id : z.instanceof(ObjectId).optional(),
    bookDate:z.string({message:"Book Date is required"}),
    status:z.string({message:"Status is required"}),
    symptom:z.string({message:"Symptom is required"}).optional(),
    disease:z.string({message:"Disease is required"}).optional(),
    recipe:z.string({message:"Recipe is required"}).optional(),
    notes:z.string().optional(),
    patientId:z.instanceof(ObjectId,{message:"Patient Id is required"}),
    doctorId:z.instanceof(ObjectId,{message:"Doctor Id is required"}),
    createdAt:z.date().default(new Date()).optional(),
    updatedAt:z.date().default(new Date()).optional()
})

export type RecordType = z.infer<typeof RecordSchema>
export default class Doctor {
  static collDoc = db.collection<DoctorType>("doctors");
  static collRec = db.collection<RecordType>("records");

  static async getAll() {
    const doctors = await this.collDoc.find().toArray();
    return doctors;
  }

    static async getByDoctorId(id:string){
      const doctorId = new ObjectId(id)
      const doctor = await this.collDoc.findOne(doctorId);
      return doctor
    }

    static async insertRecord(newRecord:RecordType){
        await RecordSchema.parseAsync(newRecord);

        const data = {
            ...newRecord,
        }
        data.createdAt = data.updatedAt = new Date();
        
        await this.collRec.insertOne(data)
    }

    static async updateRecord(updateRecord:UpdateRecordType){
        
        const data ={
            ...updateRecord,
            status:"done"
        }
        await this.collRec.updateOne({_id:updateRecord._id}, {$set:data});
    }

    static async findByEmployeeId(id:string){
        const doctor = await this.collDoc.findOne({
            employeeId: id
        })

    return doctor;
  }

  static async newDoctor(newDoctor: DoctorType) {
    await DoctorSchema.parseAsync(newDoctor);

    const data = {
      ...newDoctor,
      password: await hash(newDoctor.password, 10),
    };
    data.createdAt = data.updatedAt = new Date();
    await this.collDoc.insertOne(data);
  }

  static async getRecordByPatientId(_id: string) {
    const doctor = await this.collRec.findOne({
      patientId: new ObjectId(_id),
    });
    return doctor;
  }
}
