"use client"
import { addTOCart, DEleteOneCart } from '@/actions/cart.actions';
import { RemoveWishList } from '@/actions/wishlist.actions';
import { Button } from '@/components/ui/button'
import { log } from 'console';
import { Trash2 } from 'lucide-react';
import React from 'react'
import { toast } from 'sonner';





export default function RemoveFromWishlistButton({ productId, variant, ...props }) {
    async function Addtocart(productId: string) {
        console.log("added", productId);
        //api 
        const res = await RemoveWishList(productId)
        console.log(res);
        if (res.status) {
            toast.success(res.message)
        } else {
            toast.error(res.error.message)
        }

    }
    return (
        <Button onClick={() => Addtocart(productId)}
            className='flex items-center gap-1.5 text-red-400 hover:text-red-600 text-xs mt-3 cursor-pointer transition-colors '
            {...props}>
            <Trash2 size={14} /> Remove from wishlist
        </Button>
    )
}
