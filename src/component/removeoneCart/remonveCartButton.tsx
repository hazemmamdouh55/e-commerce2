"use client"
import { addTOCart, DEleteOneCart } from '@/actions/cart.actions';
import { Button } from '@/components/ui/button'
import { log } from 'console';
import { Trash2 } from 'lucide-react';
import React from 'react'
import { toast } from 'sonner';




export default function DEletFromCartButton({ productId, variant, ...props }) {
    async function DEleteCart(productId: string) {
        console.log("added", productId);
        //api 
        const res = await DEleteOneCart(productId)
        console.log(res);
        if (res.status) {
            toast.success(res.message)
        } else {
            toast.error(res.error.message)
        }

    }
    return (
        <Button onClick={() => DEleteOneCart(productId)}
            className='flex items-center gap-1.5 text-red-400 hover:text-red-600 text-xs mt-3 transition-colors group'
            {...props}>
            <Trash2 size={14} className="group-hover:scale-110 transition-transform" />
            <span>Remove item</span>
        </Button>
    )
}

