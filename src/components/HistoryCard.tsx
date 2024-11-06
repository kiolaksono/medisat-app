'use server'

import React from "react";

import { CheckIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { getMedicalHistory } from "@/app/doctors/actions";
import { recordByDoctorIdTodayType } from "@/app/types";

type CardProps = React.ComponentProps<typeof Card> & {
    patientId: string;
}


export default async function HistoryCard({ className, patientId, ...props }: CardProps) {
    
    // console.log(patientId, "patientId di history ========");

    const historys: recordByDoctorIdTodayType[] = await getMedicalHistory(patientId)

    // console.log(historys, "history ========");

    return (
        <div className="w-full bg-white rounded-lg my-5 shadow border p-6 dark:bg-gray-800 border-emerald-500 overflow-y-scroll max-h-96">
            <div className="space-y-4 mt-4">
                {historys.map((history: recordByDoctorIdTodayType) => (
                    <div
                        className="bg-gray-100 p-4 rounded shadow dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                        <Card className={cn("w-[380px]", className)} {...props}>

                            <CardHeader>
                                <CardTitle className="w-full">
                                    <div className="flex flex-row">
                                        <div className="mr-2">
                                            <CheckIcon />
                                        </div>
                                        <div>
                                            {history.patient.name}
                                        </div>
                                    </div>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>

                                <div>
                                    <div
                                        className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                                    >
                                        <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium leading-none">
                                                Penyakit
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {history.disease}
                                            </p>

                                        </div>
                                        <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                                        <div className="space-y-1">

                                            <p className="text-sm font-medium leading-none">
                                                Resep Obat
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {history.recipe}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                    </div>
                ))}
            </div>
        </div>
    );
}
