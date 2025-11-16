"use client"
import { Award, FlaskConical, Hospital, User } from 'lucide-react'
import React, { useEffect, useState } from 'react'

function CountDoctor() {
    const [countDoctor, setCountDoctor] = useState(0)
    const [countDepartment, setDepartments] = useState(0)

    useEffect(() => {
        fetchDoctorCount()
        fetchDepartmentsCount()
    }, [])

    async function fetchDepartmentsCount() {
        const departments = await fetch(`${procces.env.NEXT_PUBLIC_API_URL}/departments/count`)  
        const data = await departments.json()
        setDepartments(data.count || 0)
    }

    async function fetchDoctorCount() {
        const doctors = await fetch(`${procces.env.NEXT_PUBLIC_API_URL}/doctors/count`)   
        const data = await doctors.json()
        setCountDoctor(data.count || 0)
    } 
        
    const StateDashboard = [
        {icon:<User/>, count: countDoctor, label:"Doctors"},
        {icon:<Hospital/>, count: countDepartment, label:"Department"},
        {icon:<FlaskConical/>, count: 8, label:"Research Labs"},
        {icon:<Award/>, count: 150, label:"Awards"}
    ]   

    return (
<div className="text-center py-8">
  <h2 className="font-extrabold text-3xl mb-6 bg-gradient-to-r underline-offset-1 from-sky-300 via-sky-400 to-blue-500 bg-clip-text text-transparent ">Dashboard Stats</h2>
  <div className="flex justify-center gap-10 text-lg flex-wrap">
    {StateDashboard.map((item, index) => (
      <div
        key={index}
        className="bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 text-white 
                   shadow-md p-6 rounded-xl flex flex-col items-center gap-3 
                   transform transition duration-300 
                   hover:scale-105 hover:shadow-2xl"
      >
        <div className="text-4xl mb-2">{item.icon}</div>
        <p className="text-3xl font-bold">{item.count}</p>
        <p className="text-lg">{item.label}</p>
      </div>
    ))}
  </div>
</div>



    )
}

export default CountDoctor
