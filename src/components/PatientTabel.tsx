'use server'

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "./ui/button"
import Link from "next/link"
import { getPatientList } from "@/app/doctors/actions"
import { recordByDoctorIdToday } from "@/app/types"
import { use, useEffect } from "react"

export default async function PatientTabel() {

    const patients: recordByDoctorIdToday[] = await getPatientList()
    // console.log(patients, "patients ===========");
    
    return (
        <>
            <div className="flex flex-col items-center justify-center w-screen mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 border-emerald-500">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Daftar Pasien
                        </h1>

                        <Table>
                            <TableCaption>List pasien anda akan diupdate, tolong diupdate secara berkala</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">Nama</TableHead>
                                    <TableHead>Jadwal</TableHead>
                                    <TableHead className="text-right">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                                
                                <TableBody>
                            {patients.map((element: recordByDoctorIdToday) => (
                                <TableRow>
                                    <TableCell className="font-medium">
                                        <Link href="/patient/detail">
                                            {element.patient.name}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        {element.bookDate}
                                        </TableCell>
                                    <TableCell className="text-right">
                                        <Link href={`/doctors/records?recordId=${element._id}&patientId=${element.patient._id}&name=${element.patient.name}&date=${element.bookDate}`}>
                                            <Button variant="auth">Tangani</Button>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div >
        </>
    )
}