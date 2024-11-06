import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { DoctorType } from "@/app/types";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Calendar } from "lucide-react";
import formatDate from "@/helpers/formatDate";

export default function CardSchedule({ el, active, setActive }: { el: DoctorType, active: string, setActive: Dispatch<SetStateAction<string>> }) {
    const [selectedDate, setSelectedDate] = useState(''); //2024-11-05
    const [availableDates, setAvailableDates] = useState<Date[]>([]);
    const [selectedSchedule, setSelectedSchedule] = useState(''); //09.00 - 12.00
    const [formattedSchedule, setFormattedSchedule] = useState(''); //GMT +7

    useEffect(() => {
        if (el.schedule && el.schedule.length > 0) {
            const [firstDay] = el.schedule[0].split(", ");
            setAvailableDates(getNextTwoWeeksDates(firstDay));
        }
    }, [el.schedule]);

    useEffect(() => {
        if (active !== el._id) {
            setSelectedDate('')
            setSelectedSchedule('')
            setFormattedSchedule('')
        }
    }, [active, el._id, setActive, setSelectedDate, setSelectedSchedule]);

    // console.log(new Date().getDate()+15, "<<<<<")

    const getNextTwoWeeksDates = (targetDay: string) => {
        const dates: Date[] = [];
        const today = new Date();
        const twoWeeksFromNow = new Date(today);
        twoWeeksFromNow.setDate(today.getDate() + 15);

        let currentDate = new Date(today);

        while (currentDate <= twoWeeksFromNow) {
            const dayName = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
            if (dayName === targetDay) {
                dates.push(new Date(currentDate));
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return dates;
    };

    const formatDateForDisplay = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatDateForValue = (date: Date) => {
        return date.toISOString().split('T')[0];
    };

    const handleScheduleSelect = (schedule: string) => {
        if (active !== el._id) setActive(el._id);


        const [day, timeRange] = schedule.split(", ");
        setSelectedSchedule(timeRange);
    };

    // console.log(selectedDate, "<<<<<")
    const handleDateSelect = (dateValue: string) => {
        setSelectedDate(dateValue);

    };

    useEffect(() => {
        setFormattedSchedule(`${selectedDate ? formatDate(selectedDate) : selectedDate} ${selectedSchedule}`);
    }, [selectedDate, selectedSchedule])

    return (
        <div className="w-full flex flex-col">
            <div className="w-full flex flex-wrap justify-center my-3">
                <div className="w-full flex justify-center">
                    <img src={el.image} className="w-20 h-20 rounded-sm" alt={el.name} />
                    <div className="flex flex-wrap">
                        <div className="w-full flex justify-center mt-2">
                            <p className="font-semibold text-xs">{el.name}</p>
                        </div>
                        <div className="w-full flex justify-center">
                            <p className="text-gray-600">{el.polyclinic}</p>
                        </div>

                    </div>
                </div>
            </div>
            <div className="w-full flex flex-wrap justify-center">
                <div className="w-full flex flex-wrap justify-center items-center mb-3">
                    <Label className="text-lg font-semibold">Jadwal Praktek</Label>
                </div>
                <div className="w-full flex flex-wrap justify-center gap-2">
                    {el.schedule.map((schedule, i) => (
                        <Button
                            key={i}
                            type="button"
                            variant="outline"
                            className={`${selectedSchedule === schedule.split(", ")[1]
                                ? 'bg-blue-100 border-blue-500'
                                : ''
                                }`}
                            onClick={() => handleScheduleSelect(schedule)}
                        >
                            {schedule}
                        </Button>
                    ))}
                </div>
                {selectedSchedule && (
                    <div className="w-full mt-4">
                        <Label className="block mb-2">Pilih Tanggal</Label>
                        <div>
                            <select
                                name="appointmentDate"
                                className="w-full px-4 py-2 pr-8 border rounded-lg focus:outline-none focus:border-blue-500"
                                value={selectedDate}
                                onChange={(e) => handleDateSelect(e.target.value)}
                                required
                            >
                                <option value="" className="text-xs">Pilih tanggal</option>
                                {availableDates.map((date) => (
                                    <option key={date.toISOString()} value={formatDateForValue(date)}>
                                        {formatDateForDisplay(date)}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                <Calendar className="h-5 w-5 text-gray-400" />
                            </div>
                        </div>
                    </div>
                )}

                {/* Hidden inputs for form submission */}
                <input type="hidden" name="doctorId" value={el._id} />
                <input type="hidden" name="selectedDate" value={selectedDate} />
                <input type="hidden" name="timeRange" value={selectedSchedule} />

                {selectedDate && (
                    <div className="w-full mt-4 p-3 bg-blue-50 rounded-lg">
                        <Label className="block mb-2 text-xs">Jadwal yang Dipilih:</Label>
                        <p className="text-blue-800 text-sm">{formattedSchedule}</p>
                    </div>
                )}
            </div>
        </div>
    );
}