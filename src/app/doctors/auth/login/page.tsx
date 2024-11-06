"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import Swal from "sweetalert2";
import { redirect, useRouter } from "next/navigation";
import { login } from "../../actions";
import Image from "next/image";
import { ArrowBigLeftDash, ArrowBigRightDash } from "lucide-react";
import Alert from "@/components/Alert";

const logo = require("../../../assets/MEDISAT.png");

export default function Login() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [user, setUser] = useState({
    employeeId: "",
    password: "",
  });

  const handleSubmit = async (element: FormEvent<HTMLFormElement>) => {
    // console.log(user.employeeId, "ini employeeId");
    // console.log(user.password, "ini password");

    element.preventDefault();

    
    try {
      if(!user.employeeId) {
        redirect("/doctors/auth/login?error=ID Dokter tidak boleh kosong")
      }
  
      if(!user.password) {
        redirect("/doctors/auth/login?error=Kata Sandi tidak boleh kosong")
      }
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/doctors/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );
      const data = await res.json();

      if (!res.ok) {
        
      }

      login(data.access_token);

      Swal.fire({
        title: "Sukses!",
        text: "Sukses Masuk!",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#3e9392",
      }).then(() => {
        router.push("/doctors");
      });
    } catch (error) {

      Swal.fire({
        title: "Error!",
        text: "Login Gagal! Email atau Password Salah!",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#3e9392",
        customClass: {
          confirmButton:
            "bg-emerald-500 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-md",
        },
      });
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const toggleSignUp = () => setIsSignUp((prev) => !prev);

  return (
    <>
    <Alert />
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-200 to-emerald-200">
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-3xl overflow-hidden">
        <div
          className={`flex transition-transform duration-1000 ${
            isSignUp ? "-translate-x-1/2" : "translate-x-1/2"
          }`}
          style={{ width: "100%" }}>
          <div className="w-1/2 p-6 space-y-4 flex flex-col items-center justify-center">
            <Image src={logo} alt="MEDISAT Logo" />
            <h1 className="text-2xl font-bold text-emerald-700">
              Medical Sehat
            </h1>
          </div>

          {/* SLIDE2*/}
          <div className="w-1/2 p-6 space-y-4 flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold text-emerald-700">MASUK AKUN</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="employeeId"
                value={user.employeeId}
                onChange={handleChange}
                placeholder="ID Dokter"
                className="w-full p-3 bg-gray-100 rounded-md"
                required
              />
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                placeholder="Kata Sandi"
                className="w-full p-3 bg-gray-100 rounded-md"
                required
              />
              <button
                type="submit"
                className="w-full py-3 text-white bg-emerald-500 rounded-md hover:bg-emerald-700">
                MASUK
              </button>
            </form>
          </div>
        </div>

        {/* KOTAK SLIDING */}
        <div
          className={`absolute inset-y-0 left-0 w-1/2 flex items-center justify-center transition-transform duration-700 ${
            isSignUp ? "translate-x-full" : "translate-x-0"
          } bg-emerald-600 text-white p-8`}>
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">
              {isSignUp ? "Selamat Datang Dokter!" : "Halo Dokter"}
            </h2>
            <p>{isSignUp ? "Silahkan Masuk" : "Silahkan Masuk"}</p>
            <button
              onClick={toggleSignUp}
              className="px-8 py-2 bg-white text-emerald-600 rounded-md hover:bg-gray-200">
              {isSignUp ? (
                <div className="flex flex-row">
                  <div>
                    <ArrowBigLeftDash />
                  </div>
                  <div>Masuk</div>
                </div>
              ) : (
                <div className="flex flex-row">
                  <div>Masuk</div>
                  <div>
                    <ArrowBigRightDash />
                  </div>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
