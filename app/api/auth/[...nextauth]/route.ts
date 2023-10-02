import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [CredentialsProvider({
    name: "Credentials",
    credentials: {
      email: { label: "E-mail", type: "email", placeholder: "email@host.com"},
      password: { label: "Password", type: "password" }
    },
    // @ts-ignore
    async authorize(credentials, req) {
      const email = credentials?.email;
      const password = credentials?.password;

      let response;

      try {
        response = await axios.post("http://localhost:3000/api/session", {email, password});
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message);
        }
        return null;
      }

      const user = response.data;

      console.log({user});

      if (user) {
        return user;
      }

      return null;
    }
  })],
};

const handler = NextAuth(authOptions);
export {handler as GET, handler as POST};
