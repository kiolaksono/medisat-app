
import React from "react";
import HistoryCard from "../../../../components/HistoryCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { updateRekamMedis } from "../../actions";
import { redirect } from "next/navigation";
import LogError from "@/components/LogError";
import { formatDateRecord } from "@/helpers/formatDate";
import { revalidateTag } from "next/cache";

export default async function Records({ searchParams }: { searchParams: { [key: string]: string } }) {

    const patientId = searchParams.patientId;
    const patientName = searchParams.name;
    let bookDate = searchParams.date;
    // console.log(searchParams, "searchParams ======");


    async function handleForm(formData: FormData) {
        'use server'

        const recordId = searchParams.recordId;

        // console.log(recordId, "param ========");


        // Update using server component
        const formRecord = {
            name: formData.get('name'),
            date: formData.get('date'),
            symptom: formData.get('symptom'),
            disease: formData.get('disease'),
            recipe: formData.get('recipe'),
            notes: formData.get('notes')
        }

        const urlSearchParams = new URLSearchParams();
        urlSearchParams.set('patientId', patientId);
        urlSearchParams.set('name', patientName);
        urlSearchParams.set('date', bookDate);
        urlSearchParams.set('recordId', recordId);

        if (!formRecord.name) {
            urlSearchParams.set('error', 'Nama tidak boleh kosong')
            redirect('/doctors/records?' + urlSearchParams.toString())
        }
        if (!formRecord.date) {
            urlSearchParams.set('error', 'Tanggal tidak boleh kosong')
            redirect('/doctors/records?' + urlSearchParams.toString())
        }
        if (!formRecord.symptom) {
            urlSearchParams.set('error', 'Gejala tidak boleh kosong')
            redirect('/doctors/records?' + urlSearchParams.toString())
        }
        if (!formRecord.disease) {
            urlSearchParams.set('error', 'Penyakit tidak boleh kosong')
            redirect('/doctors/records?' + urlSearchParams.toString())
        }
        if (!formRecord.recipe) {
            urlSearchParams.set('error', 'Resep tidak boleh kosong')
            redirect('/doctors/records?' + urlSearchParams.toString())
        }
        if (!formRecord.notes) {
            urlSearchParams.set('error', 'Catatan tidak boleh kosong')
            redirect('/doctors/records?' + urlSearchParams.toString())
        }

        updateRekamMedis(recordId, formRecord)
        revalidateTag('getPatientList')
        
        redirect('/doctors')
    }

    return (
        <>
            <div className="flex flex-col w-full">
                <div className="flex w-full">
                    <LogError />
                </div>
                <div className="flex flex-row gap-4 px-8 min-h-screen w-full">
                    <div className="w-3/5">
                        <h1 className="text-xl font-bold mt-5 leading-tight tracking-tight text-gray-900 dark:text-white">
                            Rekam Medis dan Resep Obat
                        </h1>

                        {/* UPDATE MEDICAL HISTORY */}
                        <div className="w-full bg-white rounded-lg my-5 shadow border p-6 dark:bg-gray-800 border-emerald-500">
                            <form
                                action={handleForm}
                            >
                                <div className="space-y-4 mt-4">

                                    <div>
                                        <Label htmlFor="patientId">Nama Pasien</Label>
                                        <Input type="text" name="name" id="patientId" value={patientName} />
                                    </div>
                                    <div>
                                        <Label htmlFor="recordDate">Tanggal Rekam Medis</Label>
                                        <Input type="date" name="date" id="recordDate" value={formatDateRecord(bookDate)} />
                                    </div>
                                    <div>
                                        <Label htmlFor="symptom">Gejala</Label>
                                        <Textarea id="symptom" name="symptom" placeholder="Tuliskan gejala pasien" />
                                    </div>
                                    <div>
                                        <Label htmlFor="desease">Diagnosa</Label>
                                        <Input type="text" id="desease" name="disease" placeholder="Diagnosa" />
                                    </div>
                                </div>

                                <div className="border border-gray-400 my-4"></div>

                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="recipe">Resep Obat</Label>
                                        <Textarea id="recipe" name="recipe" placeholder="Tuliskan resep obat" />
                                    </div>
                                    <div>
                                        <Label htmlFor="notes">Keterangan</Label>
                                        <Input type="text" id="notes" name="notes" placeholder="Keterangan" />
                                    </div>
                                </div>
                                <Button type="submit" className="mt-6 w-full">Simpan</Button>
                            </form>
                        </div>

                    </div>
                    <div className="w-3/5">
                        <h1 className="text-xl font-bold mt-5 leading-tight tracking-tight text-gray-900 dark:text-white">
                            History
                        </h1>
                        <HistoryCard patientId={patientId} />
                    </div>
                </div>
            </div>
        </>
    );
}