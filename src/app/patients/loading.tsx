import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <>

<div className="bg-white rounded-xl border border-solid border-emerald-800 p-3 my-2">
    <div className="flex flex-wrap justify-between ">
   
        <div className="p-3 w-1/3">
            <p className="text-sm text-gray-500">Status</p>
            <Skeleton className="h-4 w-[100px]" />
        </div>

        <div className="p-3 w-2/3 flex flex-wrap justify-end">
            <p className="text-sm text-gray-500">Tanggal Pemeriksaan</p>
            <Skeleton className="h-4 w-[200px]" />

        </div>
    </div>
    <div className="flex flex-wrap justify-between ">
        <div>
            <div className="p-3">
                <p className="text-sm text-gray-500">Penyakit yang diderita</p>
                <Skeleton className="h-4 w-[200px]" />

            </div>
            <div className="p-3">
                <p className="text-sm text-gray-500">Keluhan</p>
                <Skeleton className="h-4 w-[200px]" />

            </div>
            <div className="p-3">
                <p className="text-sm text-gray-500">Dokter yang menangani</p>
                <Skeleton className="h-4 w-[200px]" />
            </div>
        </div>
        <div>
            <div className="p-3">
                <p className="text-sm text-gray-500">Resep Obat</p>
                <Skeleton className="h-4 w-[200px]" />
            </div>
        </div>
        <div className="w-full flex flex-wrap justify-between p-3">
            <div>
                <p className="text-sm text-gray-500">Biaya</p>
                <Skeleton className="h-4 w-[200px]" />
            </div>
        </div>
    </div>
</div>
</>
  )
}
