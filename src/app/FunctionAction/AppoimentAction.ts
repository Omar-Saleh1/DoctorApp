"use server";

import { FormValues } from "../(main)/ADDdoctors/page";

export default async function fetchDoctors() {
  try {
    const res = await fetch(`https://apidoctor.onrender.com/doctors/allDoctors`);
    if (!res.ok) throw new Error("Failed to fetch");
    const data = await res.json();
    return { success: true, data };
  } catch {
    return { success: false, message: "Failed to fetch doctors" };
  }
}

export async function handleAppointments(values: FormValues, token: string) {
  try {
    const res = await fetch(`https://apidoctor.onrender.com/appointments/createAppointment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });

    const data = await res.json();
    return { success: res.ok, data, message: data.message };
  } catch (error: any) {
    console.error("🔥 handleAppointments error:", error);
    return { success: false, message: "Something went wrong" };
  }
}
