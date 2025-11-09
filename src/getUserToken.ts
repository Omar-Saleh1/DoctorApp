import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";




export async function getUserToken() {
    const cookiesData = await cookies()
    const encryptToken = cookiesData.get("next-auth.session-token")?.value
    console.log(encryptToken);
 const data = await decode({token:encryptToken , secret:process.env.NEXTAUTH_SECRET!})
 console.log( data?.accessToken);
 
return data?.accessToken
    
}