"use server"

import { LoginPayloadType } from "@/Schema/login.schema";
import { cookies } from "next/headers";

export async function loginHandler(formValues: LoginPayloadType) {
    try {
        const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formValues)
        })
        const data = await res.json()
        if (!res.ok) {
            throw new Error(data.message || "some thing went wrong")

        }

        const cookie = await cookies()
        cookie.set("userToken", data.token)
        return data
    } catch (error) {
        console.log(error);
        return error
    }
}
export async function RegisterHandler(formValues: LoginPayloadType) {
    try {
        const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formValues)
        })
        const data = await res.json()
        if (!res.ok) {
            throw new Error(data.message || "some thing went wrong")

        }

        const cookie = await cookies()
        cookie.set("userToken", data.token)
        return {
            ...data,
            ok: true
        }
    } catch (error) {
        console.log(error);
        return {
            error,
            ok: false
        }

    }
}

//