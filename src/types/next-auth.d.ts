import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    token: string; // 🔑 ده هو الـ JWT اللي السيرفر بيرجعه بعد تسجيل الدخول
  }

  interface Session extends DefaultSession {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
    };
    accessToken: string; // 🔑 التوكن اللي هتستخدمه في الـ fetch
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    email: string;
    role: string;
    accessToken: string;
  }
}
