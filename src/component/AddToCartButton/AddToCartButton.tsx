"use client"
import { addTOCart, DEleteOneCart } from '@/actions/cart.actions';
import { Button } from '@/components/ui/button'
import { log } from 'console';
import { Trash2 } from 'lucide-react';
import React from 'react'
import { toast } from 'sonner';





export default function AddToCartButton({ productId, variant, ...props }) {
    async function Addtocart(productId: string) {
        console.log("added", productId);
        //api 
        const res = await addTOCart(productId)
        console.log(res);
        if (res.status) {
            toast.success(res.message)
        } else {
            toast.error(res.error.message)
        }

    }
    return (
        <Button onClick={() => Addtocart(productId)}
            className='bg-emerald-600 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-emerald-700 transition-colors shadow-sm '
            {...props}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
        </Button>
    )
}
