export type PatientType = {
  _id: string;
  nik: string;
  name: string;
  email: string;
  password: string;
  birthDate: string;
  address: string;
  phoneNumber: string;
};

export type DoctorType = {
    _id:string;
    employeeId: string;
    name: string;
    password: string;
    image: string;
    phoneNumber: string;
    polyclinic: string;
    schedule: string[];
    createdAt?: Date | string;
    updatedAt?: Date | string;
}

export type RecordType = {
    _id:string
    name: string;
    status: string;
    price: number;
    bookDate: string;
    symptom: string;
    disease: string;
    recipe: string;
    checkupDate: string;
    patientId: string;
    doctorId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    notes?: string | undefined;
    doctor: DoctorType
}

// Add these to your existing types.ts file

export interface AppointmentData {
  doctorId: string;
  appointmentDate: string; // ISO date string
  timeRange: string;
  // Add any other fields your API requires
}

export interface AppointmentResponse {
  success: boolean;
  message: string;
  data?: {
      id: string;
      doctorId: string;
      appointmentDate: string;
      timeRange: string;
      // Add other fields that your API returns
  };
}

export type recordByDoctorIdToday = {
  _id:string,
  bookDate:string,
  status:string,
  patientId:string,
  doctorId:string,
  disease:string,
  recipe:string,
  updatedAt:string,
  createdAt:string,
  patient:{
    _id:string,
    nik:string,
    name:string,
    email:string,
    birthDate:string,
    address:string,
    phoneNumber:string
  }
}