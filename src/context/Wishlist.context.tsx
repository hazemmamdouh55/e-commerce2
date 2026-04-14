import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { GetWishList, GetWishlist } from "@/actions/wishlist.actions";

interface WishlistContextType {
    count: number
    setnumOfcount: (count: number) => void
}

const Wishlistcontext = createContext<WishlistContextType | null>(null)

export default function WishlistProvider({ children }: { children: ReactNode }) {
    const [count, setnumOfcount] = useState(0)
    const { status } = useSession()

    async function fetchWishlist() {
        const data = await GetWishList()
        if (data.ok) {
            setnumOfcount(data.count)
        }
    }

    useEffect(() => {
        if (status === "authenticated") {
            fetchWishlist()
        }
    }, [status])

    return (
        <Wishlistcontext.Provider value={{ count, setnumOfcount }}>
            {children}
        </Wishlistcontext.Provider>
    )
}

export function useWishlist() {
    const context = useContext(Wishlistcontext)
    if (!context) throw new Error("useWishlist must be used within WishlistProvider")
    return context
}