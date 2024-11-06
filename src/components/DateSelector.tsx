"use client"

import { DoctorType } from "@/app/types";
import CardSchedule from "@/components/CardSchedule";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState, useEffect } from "react";
import { handleSchedule } from "@/app/patients/actions";

export default function Schedule() {
    const [schedule, setSchedule] = useState<DoctorType[]>([]);
    const [error, setError] = useState<string>('');

    async function getSchedule() {
        try {
            const schedules = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/doctors", {
                method: "GET",
                cache: "no-store",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });
            if (!schedules.ok) {
                throw new Error(`API Request failed : ${schedules.status}`);
            }
            const response = await schedules.json();
            return response;
        } catch (error) {
            setError('Failed to load doctor schedules');
            return [];
        }
    }

    useEffect(() => {
        getSchedule().then(setSchedule);
    }, []);

    const handleSubmit = async (formData: FormData) => {
        const doctor = formData.get('doctor');
        const selectedSchedule = formData.get('selectedSchedule');
        
        if (!doctor || !selectedSchedule) {
            setError('Please select both a doctor and a schedule');
            return;
        }
        
        try {
            await handleSchedule(formData);
            // Handle successful submission
        } catch (error) {
            setError('Failed to schedule appointment');
        }
    };

    if (error) {
        return (
            <div className="w-full p-4 bg-red-100 text-red-700 rounded-lg">
                {error}
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4">
            <div className="w-full flex flex-wrap justify-center py-5">
                <Label className="text-2xl font-bold text-gray-800">JADWAL DOKTER PRAKTEK</Label>
            </div>
            
            <form action={handleSubmit}>
                <RadioGroup name="doctor" className="space-y-4">
                    {schedule.map(el => (
                        <div key={el._id} className="flex flex-wrap justify-between bg-emerald-50 rounded-xl p-5 transition-all hover:shadow-md">
                            <div className="flex items-start space-x-4 w-full">
                                <RadioGroupItem value={el._id} id={el._id} />
                                <div className="flex-1">
                                    <CardSchedule el={el} />
                                </div>
                            </div>
                            <div className="w-full flex justify-end mt-4">
                                <Button 
                                    type="submit" 
                                    className="bg-blue-600 text-white hover:bg-blue-700 rounded-xl px-6 py-2"
                                >
                                    Jadwalkan sekarang!
                                </Button>
                            </div>
                        </div>
                    ))}
                </RadioGroup>
            </form>
        </div>
    );
}