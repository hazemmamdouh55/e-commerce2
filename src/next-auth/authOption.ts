import { jwtDecode } from 'jwt-decode';
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface DecodedToken {
    id: string
    email: string
    name: string
}

export const authOption: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            name: "Exclusive",
            credentials: {
                email: { label: "Email", placeholder: "example@gmail.com", type: "email" },
                password: { label: "Password", placeholder: "********", type: "password" }
            },
            async authorize(credentials) {
                try {
                    const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            email: credentials?.email,
                            password: credentials?.password
                        })
                    })
                    const data = await res.json()
                    if (!res.ok) {
                        throw new Error(data.message || "Something went wrong")
                    }

                    const decode = jwtDecode<DecodedToken>(data.token);

                    return {
                        id: decode.id,
                        email: decode.email,       // ✅ من الـ decoded token
                        name: decode.name,         // ✅ مش decode.user.name
                        accessToken: data.token
                    }
                } catch (error) {
                    console.log(error);
                    return null
                }
            }
        }),
    ],
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.accessToken = user.accessToken;
                token.user = {
                    id: user.id,
                    email: user.email,
                    name: user.name
                }
            }
            return token
        },
        session({ token, session }) {
            session.user = token.user
            return session
        },
    }
}
