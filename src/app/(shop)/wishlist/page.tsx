import { GetWishList } from '@/actions/wishlist.actions' // افترضت اسم الأكشن عندك
import { WishlistResponce } from '@/interfaces/wishlist.interface';
import React from 'react'
import Link from 'next/link'
import {
    Heart,
    Trash2,
    ShoppingCart,
} from 'lucide-react'
import AddToCartButton from '@/component/AddToCartButton/AddToCartButton';
import RemoveFromWishlistButton from '@/component/RemoveFromWishlistButton/RemoveFromWishlistButton';


export default async function WishlistPage() {
    // 1. Fetching Data (Server Side)
    const wishlistRes: WishlistResponce = await GetWishList()
    const products = wishlistRes?.data || []

    // 2. Empty State (نفس طريقتك في الـ Cart)
    if (!products || products.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center bg-slate-50 px-4">
                <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 text-center">
                    <Heart size={64} className="text-slate-200 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-slate-800">Your wishlist is empty</h2>
                    <p className="text-slate-500 mt-2 mb-6">Save items you like to see them here.</p>
                    <Link href="/products" className="bg-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-700 transition-all">
                        Explore Products
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
                        <Heart size={20} className="text-red-500 fill-red-500" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">My Wishlist</h1>
                        <p className="text-sm text-slate-500">
                            You have <span className="text-red-500 font-semibold">{wishlistRes.count} items</span> saved
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 lg:px-6 pb-12">
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">

                    {/* Table Header (نفس استايل الـ Cart القديم بتاعك) */}
                    <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 bg-slate-50/50">
                        <div className="col-span-6">Product Details</div>
                        <div className="col-span-3 text-center">Price</div>
                        <div className="col-span-3 text-right">Actions</div>
                    </div>

                    {/* Items List */}
                    <div className="divide-y divide-slate-100">
                        {products.map((item) => (
                            <div key={item._id} className="p-4 md:p-6 transition-all hover:bg-slate-50/50">
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">

                                    {/* Product Info */}
                                    <div className="md:col-span-6 flex items-center gap-4">
                                        <div className="w-20 h-20 rounded-xl bg-white overflow-hidden shrink-0 border border-slate-100 p-1">
                                            <img
                                                src={item.imageCover}
                                                alt={item.title}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className="font-bold text-slate-800 text-sm md:text-base truncate">
                                                {item.title}
                                            </h3>
                                            <p className="text-green-600 text-xs font-medium mt-1">
                                                {item.category?.name}
                                            </p>

                                            {/* زرار المسح بنفس طريقتك */}
                                            <RemoveFromWishlistButton variant={""} productId={item._id}>

                                            </RemoveFromWishlistButton>
                                        </div>
                                    </div>

                                    {/* Price */}
                                    <div className="md:col-span-3 text-center">
                                        <div className="text-lg font-black text-slate-800">
                                            {item.price.toLocaleString()} <span className="text-[10px] text-slate-400 font-normal">EGP</span>
                                        </div>
                                    </div>

                                    {/* Add to Cart Action */}
                                    <div className="md:col-span-3 flex justify-end">
                                        <AddToCartButton productId={item._id} variant="default">
                                            <div className="bg-[#0e9f6e] hover:bg-[#04885c] text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-sm">
                                                <ShoppingCart size={16} />
                                                Add to Cart
                                            </div>
                                        </AddToCartButton>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Back Link */}
                <div className="mt-6">
                    <Link href="/products" className="text-sm text-slate-400 hover:text-slate-600 transition-colors flex items-center gap-2">
                        ← Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    )
}