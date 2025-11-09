import { getServerSession } from 'next-auth'
import React from 'react'
import { NextOption } from '../api/auth/[...nextauth]/route';

export default async function page() {
const  data = await getServerSession(NextOption)
   console.log(data);
   
    return (
    <div>
      
    </div>
  )
}