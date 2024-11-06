"use client";

import { handlePayment } from "@/app/patients/actions";
import { RecordType } from "@/app/types";
import formatDate from "@/helpers/formatDate";
import { NextResponse } from "next/server";
import { useEffect } from "react";

export default function Card(
  { el }: { el: RecordType },
  { response }: { response: Response }
) {
  const handleClick = async () => {
    try {
      const formData = new FormData();
      formData.append("id", el._id);
      const data = await handlePayment(formData);

      window.snap.pay(data.token, {
        onSuccess: function (result) {
          return false;
        },
        onPending: function (result) {
          if (response instanceof Error) {
            return NextResponse.json(
              {
                message: response.message,
              },
              {
                status: 400,
              }
            );
          }
          return NextResponse.json(
            {
              message: "Something went wrong",
            },
            {
              status: 500,
            }
          );
        },
        onError: function (result) {
          if (response instanceof Error) {
            return NextResponse.json(
              {
                message: response.message,
              },
              {
                status: 400,
              }
            );
          }
          return NextResponse.json(
            {
              message: "Something went wrong",
            },
            {
              status: 500,
            }
          );
        },
        onClose: function () {
          if (response instanceof Error) {
            return NextResponse.json(
              {
                message: response.message,
              },
              {
                status: 400,
              }
            );
          }
          return NextResponse.json(
            {
              message: "Something went wrong",
            },
            {
              status: 500,
            }
          );
        },
      });
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };

  useEffect(() => {
    const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js";
    const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY;

    const script = document.createElement("script");
    script.src = snapScript;
    script.setAttribute("data-client-key", clientKey!);
    script.async = true;

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <>
      <div className="bg-white rounded-xl border border-solid border-emerald-800 p-3 my-2">
        <form action={handleClick}>
          <div className="flex flex-wrap justify-between ">
            <input type="hidden" name="id" value={el._id} />
            <div className="p-3 w-1/3">
              <p className="text-sm text-gray-500">Status</p>
              <p className="text-emerald-700">{el.status === "done" ? "Pemeriksaan Selesai" : el.status === "paid" ? "Sudah Bayar" : "Pemeriksaan Menanti"}</p>
            </div>

            <div className="p-3 w-2/3 flex flex-wrap justify-end">
              <p className="text-sm text-gray-500">Tanggal Pemeriksaan</p>
              <p className="text-emerald-700">{formatDate(el.bookDate)}</p>
            </div>
          </div>
          <div className="flex flex-wrap justify-between ">
            <div>
              <div className="p-3">
                <p className="text-sm text-gray-500">Penyakit yang diderita</p>
                <p className="text-emerald-700">{el.disease}</p>
              </div>
              <div className="p-3">
                <p className="text-sm text-gray-500">Keluhan</p>
                <p className="text-emerald-700">{el.symptom}</p>
              </div>
              <div className="p-3">
                <p className="text-sm text-gray-500">Dokter yang menangani</p>
                <p className="text-emerald-700">{el.doctor.name}</p>
              </div>
            </div>
            <div>
              <div className="p-3">
                <p className="text-sm text-gray-500">Resep Obat</p>
                <p className="text-emerald-700">{el.recipe}</p>
              </div>
            </div>
            <div className="w-full flex flex-wrap justify-between p-3">
              <div>
                <p className="text-sm text-gray-500">Biaya</p>
                <p className="text-emerald-700">Rp. 300.000</p>
              </div>
              <div>
                {el.status === "done" && (
                  <button
                    type="submit"
                    className="bg-emerald-700 text-white px-3 py-2 rounded-md">
                    Bayar
                  </button>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
