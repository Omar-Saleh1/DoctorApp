import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'
import React from 'react'

export default async function middleware(request:NextRequest) {

    const token = await getToken({req:request})
 if(token){
    return NextResponse.next()
 }else{
    return NextResponse.redirect(new URL ('/Login',request.url))
 }
}

export const config = {
    matcher:['/ADDdepartments','/ADDdoctors']
}
