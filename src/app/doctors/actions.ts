'use server'

import { revalidateTag } from "next/cache";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


export async function login(token: string) {
    cookies().set("Authorization", `Bearer ${token}`)
}

// export async function logout() {
//     cookies().delete("Authorization")
//     redirect("/doctors/auth/login");
// }

export async function getPatientList(){

        const response = await fetch(`${baseUrl}/api/doctors/records`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookies().toString(),
            },
            next: {tags: ['getPatientList']}
        });


    if (!response.ok) {
        throw new Error("Gagal mengambil daftar pasien");
    }

    return response.json();
}

export async function getMedicalHistory(patientId: string) {

        const response = await fetch(`${baseUrl}api/doctors/records/${patientId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookies().toString(),
            },
        });

        if (!response.ok) {
            throw new Error("Gagal mengambil daftar pasien");
        }

        const pasien = await response.json();
        return pasien;

}

export async function updateRekamMedis(recordId: string|null, form: Object){

        if (!recordId) {
            throw new Error("Record ID tidak valid");
        }

        const response = await fetch(`${baseUrl}api/doctors/updateRecord/${recordId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Cookie: cookies().toString(),

            },
            body: JSON.stringify(form),
        });

        if (!response.ok) {
            throw new Error("Gagal mengupdate rekam medis");
        }

        // revalidateTag('getPatientList');
        // redirect('/doctors');

}
