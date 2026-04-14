import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { GetCart } from "@/actions/cart.actions";
import { useSession } from "next-auth/react";

interface CartContextType {
    numOfCartItems: number
    setnumOfCartItems: (count: number) => void
}

const Cartcontext = createContext<CartContextType | null>(null)

export default function CartProvider({ children }: { children: ReactNode }) {
    const [numOfCartItems, setnumOfCartItems] = useState(0)
    const { status } = useSession()

    async function fetchCart() {
        const data = await GetCart()
        if (data.ok) {
            setnumOfCartItems(data.numOfCartItems)
        }
    }

    useEffect(() => {
        if (status === "authenticated") {
            fetchCart()
        }
    }, [status]) 

    return (
        <Cartcontext.Provider value={{ numOfCartItems, setnumOfCartItems }}>
            {children}
        </Cartcontext.Provider>
    )
}

export function useCart() {
    const context = useContext(Cartcontext)
    if (!context) throw new Error("useCart must be used within CartProvider")
    return context
}