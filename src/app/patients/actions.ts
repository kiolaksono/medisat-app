declare global {
  interface Window {
    snap: {
      pay: (token: string, options: {
        onSuccess: (result: any) => void,
        onPending: (result: any) => void,
        onError: (result: any) => void,
        onClose: () => void,
      }) => void;
    }
  }
}

"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function setCookieOauth(token: string) {
  cookies().set("Authorization", `Bearer ${token}`);
  redirect("/patients")
}

export async function login(formData: FormData) {
  const body = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  if(!body.email) {
    redirect("/patients/auth/login?error=Email tidak boleh kosong")
  }

  if(!body.password) {
    redirect("/patients/auth/login?error=Password tidak boleh kosong")
  }

  const response = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + "/api/patients/login",
    {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = (await response.json()) as {
    accessToken?: string;
    message?: string;
  };

  if (!response.ok) {
    redirect(`/patients/auth/login?error=${data.message}`);
  }

  cookies().set("Authorization", `Bearer ${data.accessToken}`);

  redirect("/patients/");
}

export async function register(formData: FormData) {
  const body = {
    nik: formData.get("nik"),
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    birthDate: formData.get("birthDate"),
    address: formData.get("address"),
    phoneNumber: formData.get("phoneNumber"),
  };

  if(!body.email) {
    redirect("/patients/auth/register?error=Email tidak boleh kosong")
  }

  if(!body.password) {
    redirect("/patients/auth/register?error=Password tidak boleh kosong")
  }

  if(!body.name) {
    redirect("/patients/auth/register?error=Nama tidak boleh kosong")
  }

  if(!body.nik) {
    redirect("/patients/auth/register?error=NIK tidak boleh kosong")
  }

  if(!body.birthDate) {
    redirect("/patients/auth/register?error=Tanggal lahir tidak boleh kosong")
  }

  if(!body.address) {
    redirect("/patients/auth/register?error=Alamat tidak boleh kosong")
  }

  if(!body.phoneNumber) {
    redirect("/patients/auth/register?error=Nomor telepon tidak boleh kosong")
  }


  const response = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + "/api/patients/register",
    {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
    }
  );
  await response.json();

  if (!response.ok) {
    redirect("/patients/auth/register?error=Email sudah terdaftar");
  }

  redirect("/patients/auth/login?alert=Account created successfully");
}

export const handleLogout = async () => {
  cookies().delete("Authorization");
  redirect("/patients/auth/login");
};

export async function handleSchedule(formData: FormData) {
  // Get form data
  const doctorId = formData.get("doctorId");
  const appointmentDate = formData.get("appointmentDate");
  const timeRange = formData.get("timeRange");

    if(!doctorId) {
      redirect("/patients/schedule?error=Dokter sedang tidak tersedia")
    }

  if (!timeRange) {
    redirect("/patients/schedule?alert=Mohon untuk memilih jadwal terlebih dahulu")
  }

  if (!appointmentDate) {
    redirect("/patients/schedule?alert=Mohon untuk memilih tanggal terlebih dahulu")
  }

  // Format untuk API
  const body = {
    doctorId: doctorId.toString(),
    bookDate: appointmentDate.toString(),
    schedule: timeRange.toString(),
  };

  // Kirim ke API

  const response = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + "/api/patients/insertRecord",
    {
      method: "POST",
      headers: {
        Cookie: cookies().toString(),
      },
      body: JSON.stringify(body),
    }
  );

    if(!timeRange) {
      redirect("/patients/schedule?error=Mohon untuk memilih jadwal terlebih dahulu")
    }

    if(!appointmentDate) {
      redirect("/patients/schedule?error=Mohon untuk memilih tanggal terlebih dahulu")
    }
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create appointment");
  }

  const data = await response.json();

  // Revalidate dan redirect
  revalidatePath("/patients");
  redirect("/patients");

}

export const handlePayment = async (formData: FormData) => {
  try {
    const body = {
      _id: formData.get("id")
    }

    // console.log(body, "body");

    const response = await fetch("http://localhost:3000/api/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Server response:', errorText);
      throw new Error(`Payment failed with status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Payment processing error:', error);
    throw error;
  }
}
