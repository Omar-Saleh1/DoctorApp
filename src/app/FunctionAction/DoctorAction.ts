'use server'

import { FormDoctor } from "../(main)/ADDdepartments/page";


export async function getAddDoctor(values: FormDoctor, token: string) {
  try {
    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("specialty", values.specialty);
    formData.append("description", values.description);
    formData.append("experienceYears", String(values.experienceYears));

    if (values.image) formData.append("image", values.image);

    const res = await fetch(`https://apidoctor.onrender.com/doctors/addDoctors`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
      cache: "no-store",
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Server error:", errorText);
      return { success: false, message: errorText };
    }

    return await res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return { success: false, message: "Error adding doctor" };
  }
}
