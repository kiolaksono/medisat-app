// MedicalRecordCard.js

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { updateRekamMedis } from "@/app/doctors/actions";
import { date } from "zod";

export default function MedicalRecordCard() {

    // const [record, setRecord] = useState({
    //     name: "",
    //     address: "",
    //     date
    // })

    async function handleSubmit(formData: FormData) {
        "use server"   
        
        const body = {
            name: formData.get("name"),
            address: formData.get("address"),
            date: formData.get("date"),
            symptom: formData.get("symptom"),
            disease: formData.get("disease"),
            prescription: formData.get("prescription"),
            note: formData.get("note")
        }


        

    }

    return (
        <div className="w-full bg-white rounded-lg my-5 shadow border p-6 dark:bg-gray-800 border-emerald-500">
            <form 
            // action={updateRekamMedis}
            >
                <div className="space-y-4 mt-4">

                    <div>
                        <Label htmlFor="patientId">Nama Pasien</Label>
                        <Input type="text" name="name" id="patientId" />
                    </div>
                    <div>
                        <Label htmlFor="address">Alamat</Label>
                        <Input type="text" name="address" id="address" />
                    </div>
                    <div>
                        <Label htmlFor="recordDate">Tanggal Rekam Medis</Label>
                        <Input type="date" name="date" value={"2023-03-10"} id="recordDate" />
                    </div>
                    <div>
                        <Label htmlFor="symptom">Gejala</Label>
                        <Textarea id="symptom" name="symptom" placeholder="Tuliskan gejala pasien" />
                    </div>
                    <div>
                        <Label htmlFor="disease">Diagnosa</Label>
                        <Input type="text" id="disease" name="disease" placeholder="Diagnosa" />
                    </div>
                </div>

                <div className="border border-gray-400 my-4"></div>

                <div className="space-y-4">
                    <div>
                        <Label htmlFor="prescription">Resep Obat</Label>
                        <Textarea id="prescription" name="prescription" placeholder="Tuliskan resep obat" />
                    </div>
                    <div>
                        <Label htmlFor="note">Keterangan</Label>
                        <Input type="text" id="note" name="note" placeholder="Keterangan" />
                    </div>
                </div>
                <Button type="submit" className="mt-6 w-full">Simpan</Button>
            </form>
        </div>
    );
}
