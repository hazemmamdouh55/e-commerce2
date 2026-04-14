
import { DEleteOneCart, GetCart, UpdateCart } from '@/actions/cart.actions'
import { CartResponce } from '@/interfaces/cart.interface';
import React from 'react'
import Link from 'next/link'
import {
    ShoppingCart, CreditCard,
    Trash2, Tag, Lock,
    Minus,
    PercentIcon
} from 'lucide-react'
import AddToCartButton from '@/component/AddToCartButton/AddToCartButton';
import DEletFromCartButton from '@/component/removeoneCart/remonveCartButton';
import { getServerSession } from "next-auth";



export default async function Page() {
    const cartRes: CartResponce = await GetCart()
    const cartData = cartRes?.data
    const products = cartData?.products || []


    if (!cartData || products.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center bg-slate-50 px-4">
                <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 text-center">
                    <ShoppingCart size={64} className="text-slate-200 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-slate-800">Your cart is empty</h2>
                    <p className="text-slate-500 mt-2 mb-6">Looks like you have not added anything yet.</p>
                    <Link href="/products" className="bg-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-700 transition-all">
                        Start Shopping
                    </Link>
                </div>
            </div>
        )
    }
    const session = await getServerSession();


    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header / Breadcrumb */}
            <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                        <ShoppingCart size={20} className="text-green-600" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">Shopping Cart</h1>
                        <p className="text-sm text-slate-500">
                            Manage your <span className="text-green-600 font-semibold">{cartRes.numOfCartItems} items</span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 lg:px-6 pb-12">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Items List */}
                    <div className="flex-1 space-y-4">
                        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-200">
                            <div className="col-span-6">Product Details</div>
                            <div className="col-span-3 text-center">Quantity</div>
                            <div className="col-span-3 text-right">Unit Price</div>
                        </div>

                        {products.map((item) => (
                            <div key={item._id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 md:p-6 transition-all hover:shadow-md">
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">

                                    {/* Product Info */}
                                    <div className="md:col-span-6 flex items-center gap-4">
                                        <div className="w-20 h-20 rounded-xl bg-slate-50 overflow-hidden shrink-0 border border-slate-100">
                                            <img
                                                src={item.product.imageCover}
                                                alt={item.product.title}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className="font-bold text-slate-800 text-sm md:text-base truncate">
                                                {item.product.title}
                                            </h3>
                                            <p className="text-green-600 text-xs font-medium mt-1">
                                                {item.product.category?.name || 'General'}
                                            </p>
                                            <DEletFromCartButton variant={""} productId={item.product._id} >
                                                <button onClick={() => {
                                                    DEleteOneCart(item.product._id);

                                                }} className="flex items-center gap-1.5 text-red-400 hover:text-red-600 text-xs mt-3 transition-colors group">

                                                </button>
                                            </DEletFromCartButton>
                                        </div>
                                    </div>

                                    {/* Quantity Controls (Client Component) */}
                                    <div className="md:col-span-3 flex justify-center">
                                        <div className="md:col-span-3 flex justify-center">

                                            <div className="flex items-center gap-3 bg-slate-50 rounded-xl border border-slate-200 p-1.5">

                                                <button className="w-8 h-8 flex items-center justify-center bg-white rounded-lg text-slate-500 shadow-sm hover:text-red-500 transition-colors">

                                                    <Minus size={14} />

                                                </button>

                                                <span className="text-sm font-bold text-slate-800 w-6 text-center">{item.count}</span>



                                                <AddToCartButton variant={""} productId={item.product._id} ><button onClick={() => UpdateCart(item.product._id)}>

                                                </button></AddToCartButton>

                                            </div>

                                        </div>
                                    </div>

                                    {/* Price */}
                                    <div className="md:col-span-3 text-right">
                                        <div className="text-lg font-black text-slate-800">
                                            {item.price.toLocaleString()} <span className="text-[10px] text-slate-400 font-normal">EGP</span>
                                        </div>
                                        {item.count > 1 && (
                                            <p className="text-[10px] text-slate-400 mt-0.5">
                                                Total: {(item.price * item.count).toLocaleString()} EGP
                                            </p>
                                        )}
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Sidebar Summary */}
                    <div className="w-full lg:w-80 shrink-0">
                        <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                                <ShoppingCart size={80} />
                            </div>

                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <CreditCard size={20} className="text-green-400" />
                                Summary
                            </h2>

                            <div className="space-y-4 relative z-10">
                                <div className="flex justify-between text-slate-400 text-sm">
                                    <span>Items count</span>
                                    <span className="text-white font-medium">{cartRes.numOfCartItems}</span>
                                </div>
                                <div className="flex justify-between text-slate-400 text-sm">
                                    <span>Shipping</span>
                                    <span className="text-green-400 font-medium">Free</span>
                                </div>

                                <div className="pt-4 border-t border-white/10 mt-4">
                                    <div className="flex justify-between items-end">
                                        <span className="text-slate-400 text-sm">Total Amount</span>
                                        <div className="text-right">
                                            <div className="text-2xl font-black text-green-400">
                                                {cartData.totalCartPrice.toLocaleString()}
                                            </div>
                                            <span className="text-[10px] text-slate-500 uppercase">Egyptian Pound</span>
                                        </div>
                                    </div>
                                </div>

                                {!session ? (
                                    <Link href="/login">
                                        <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3.5 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm mb-4">
                                            Login to check out
                                        </button>
                                    </Link>
                                ) : (
                                    <Link href="/cart/checkout">
                                        <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3.5 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm mb-4">
                                            Secure Checkout
                                        </button>
                                    </Link>
                                )}
                            </div>
                        </div>

                        {/* Promo Code Mini Box */}
                        <div className="mt-4 bg-white border border-slate-100 rounded-2xl p-4 flex items-center gap-3 shadow-sm">
                            <Tag size={18} className="text-slate-400" />
                            <input
                                type="text"
                                placeholder="Promo code?"
                                className="bg-transparent border-none outline-none text-sm flex-1 text-slate-700"
                            />
                            <button className="text-green-600 font-bold text-sm hover:text-green-700 transition-colors">Apply</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}