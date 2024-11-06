"use client";

import Card from "@/components/Card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { RecordType } from "@/app/types";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "./loading";
import { handleLogout } from "./actions";
import { revalidatePath } from "next/cache";

const logo = require("@/app/assets/MEDISAT.png");

export default function Medis() {
  const searchParams = useSearchParams();
  const order_id = searchParams.get("order_id");
  const status_code = searchParams.get("status_code");
  const [record, setRecord] = useState<RecordType[]>([]);
  const router = useRouter();
  const [show, setShow] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = record.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(record.length / recordsPerPage);

  useEffect(() => {
    if (status_code === "200") {
      fetch(process.env.NEXT_PUBLIC_BASE_URL + `/api/payments/${order_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      }).then(() => {
        router.push("/patients");
        
      });
    }
  }, [status_code, order_id]);

  async function getRecord() {
    const records = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + "/api/patients/records",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        cache: "no-store",
      }
    );
    if (!records.ok) {
      throw new Error(`API Request failed : ${records.status}`);
    }

    const response = await records.json();
    return response;
  }

  useEffect(() => {
    const timer1 = setTimeout(() => setShow(true), 3 * 1000);

    return () => {
      clearTimeout(timer1);
    };
  }, [show]);



  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    getRecord().then(setRecord);
  }, []);

  return (
      <div className="flex flex-col justify-center">

        <div className="join flex flex-wrap justify-center">
          <button
            className="join-item btn"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}>
            «
          </button>
          <button className="join-item btn">
            Page {currentPage} of {totalPages}
          </button>
          <button
            className="join-item btn"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}>
            »
          </button>
        </div>
        {currentRecords.length === 0 && 
          <div className="bg-white rounded-xl border border-solid border-emerald-800 p-3 my-2">
            <div>No records found</div>
          </div>
        }
        {currentRecords.length > 0 &&
          currentRecords.map((el) => (
            <Card el={el} key={el._id} />
        ))}

      </div>

  );
}
