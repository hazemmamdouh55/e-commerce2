"use client"

import { addTOWishList } from '@/actions/wishlist.actions';
import { Button } from '@/components/ui/button'
import React from 'react'
import { toast } from 'sonner';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function AddToWishButton({ productId, variant, ...props }) {
    async function Addtowish(productId: string) {
        console.log("added", productId);
        //api
        const res = await addTOWishList(productId)
        console.log(res);
        if (res.status) {
            toast.success(res.message)
        } else {
            toast.error(res.error.message)
        }

    }
    return (
        <Button onClick={() => Addtowish(productId)}
            className=' w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-600 hover:text-red-500 border border-gray-100'
            {...props}
        >

            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>

        </Button>
    )
}
