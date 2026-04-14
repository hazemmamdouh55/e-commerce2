"use server"

import { getUserToken } from '@/lib/server.utils';
import { revalidatePath } from 'next/cache';

export async function addTOCart(productId: string) {
    try {
        const token = await getUserToken()
        const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                token: token
            },
            body: JSON.stringify({ productId })
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.message || "Something went wrong")

        revalidatePath('/cart')
        return { ...data, ok: true }
    } catch (error: any) {
        return { error: error.message, ok: false }
    }
}

export async function GetCart() {
    try {
        const token = await getUserToken()
        const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
            method: "GET",
            headers: { token: token },
            cache: 'no-store'
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.message || "Failed to fetch cart")

        return { ...data, ok: true }
    } catch (error: any) {
        return { error: error.message, ok: false }
    }
}

export async function UpdateCart(productId: string, count: number) {
    try {
        const token = await getUserToken()
        const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${productId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                token: token
            },
            body: JSON.stringify({ count: count })
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.message || "Update failed")

        revalidatePath('/cart')
        return { ...data, ok: true }
    } catch (error: any) {
        return { error: error.message, ok: false }
    }
}

export async function DEleteOneCart(productId: string) {
    try {
        const token = await getUserToken()
        const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${productId}`, {
            method: "DELETE",
            headers: {
                token: token
            }
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.message || "Delete failed")

        revalidatePath('/cart')
        return { ...data, ok: true }
    } catch (error: any) {
        return { error: error.message, ok: false }
    }
}