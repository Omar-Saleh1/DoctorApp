import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const NextOption: NextAuthOptions = {
  pages: { signIn: "/Login" },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/signin`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        });

        const data = await res.json();
        if (!res.ok || !data.token) return null;

        return {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          role: data.user.role,
          token: data.token, // 👈 ده هو JWT اللي السيرفر بيولّده
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.accessToken = user.token; // 👈 لازم اسمه كده
      }
      return token;
    },

    async session({ session, token }) {
      session.user = {
        id: token.id,
        name: token.name,
        email: token.email,
        role: token.role,
      };
      session.accessToken = token.accessToken; // 👈 هنا كده يتحط نفس التوكن
      return session;
    },
  },

  secret: process.env.SECRET_KEY, // 👈 خليها نفس السر اللي في السيرفر
};

const handler = NextAuth(NextOption);
export { handler as GET, handler as POST };
