"use server"
import { getUserToken } from "@/lib/server.utils";
import { revalidatePath } from "next/cache"; // عشان الصفحة تتحدث أول ما تمسح أو تضيف

export async function addTOWishList(productId: string) {
    try {
        const token = await getUserToken();

        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                token: token
            },
            // لازم تبعت الـ productId هنا
            body: JSON.stringify({ productId })
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Something went wrong");

        revalidatePath("/wishlist"); // تحديث البيانات
        return { ...data, ok: true };

    } catch (error: any) {
        return { error: error.message, ok: false };
    }
}

export async function RemoveWishList(productId: string) {
    try {
        const token = await getUserToken();

        // الحذف في RouteMisr بيكون بـ ID المنتج في الـ URL
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                token: token
            }
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to remove");

        revalidatePath("/wishlist");
        return { ...data, ok: true };

    } catch (error: any) {
        return { error: error.message, ok: false };
    }
}

export async function GetWishList() {
    try {
        const token = await getUserToken();

        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
            method: "GET",
            headers: {
                token: token
            },
            cache: 'no-store'
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch wishlist");

        return { ...data, ok: true };

    } catch (error: any) {
        return { error: error.message, ok: false };
    }
}