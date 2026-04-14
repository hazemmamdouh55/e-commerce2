import { authOption } from "@/next-auth/authOption";
import NextAuth from "next-auth";

const authHandler = NextAuth(authOption);

// لازم الحروف تكون كابتل بالظبط كده
export { authHandler as GET, authHandler as POST };