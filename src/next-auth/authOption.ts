import { jwtDecode } from 'jwt-decode';
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { id } from "zod/v4/locales";
import { use } from "react";
import { email } from "zod";
import { useSession } from "next-auth/react";

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
                email: { label: "user Email  ", placeholder: "example@gmail.com", type: "email" },
                password: { label: "user Email ", placeholder: "********", type: "password" }
            },
            async authorize(credentials, req) {
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
                        throw new Error(data.message || "some thing went wrong")
                    }
                    console.log('authorize', data);
                    const decode = jwtDecode<any>(data.token);

                    console.log("Decoded Token content:", decode);

                    return {
                        id: decode.id,

                        email: data.user.email,
                        name: decode.user.name,
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
            console.log("jwt", { token, user });
            if (user) {

                token.accessToken = user.accessToken;
                token.user = {
                    id: user.id
                    , email: user.email,
                    name: user.name
                }

            }
            return token

        },
        session({ token, session }) {
            // use session
            // get server session 
            // api/auth//session
            console.log("jwt", { token, session });
            session.user = token.user
            return session
        },
    }
}