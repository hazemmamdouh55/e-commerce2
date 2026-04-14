"use client"
import CartProvider from '@/context/cart.context'
import WishlistProvider from '@/context/Wishlist.context'
import { SessionProvider } from 'next-auth/react'
import React, { ReactNode } from 'react'

export default function provider({ children }: { children: ReactNode }) {
    return (
        <SessionProvider>
            <CartProvider>
                <WishlistProvider>
                    {children}

                </WishlistProvider>

            </CartProvider>


        </SessionProvider>
    )

}
