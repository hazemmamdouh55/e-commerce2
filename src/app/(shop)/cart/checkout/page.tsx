import React from 'react'
import Link from 'next/link'
import {
    ChevronRight, ArrowLeft, MapPin, Plus, Info,
    Banknote, CreditCard, Lock, ShieldCheck, Truck, RotateCcw
} from 'lucide-react'
import { CartResponce } from '@/interfaces/cart.interface'
import { GetCart } from '@/actions/cart.actions'
// هنفترض إننا نقلنا الـ UI اللي محتاج State لكومبوننت خارجي أو هنخليه Client
// لكن للتبسيط، هعدلك الكود بحيث يعرض بيانات الـ API فوراً

export default async function Page() {
    // 1. جلب البيانات من الـ API
    const cartRes: CartResponce = await GetCart()
    const cartData = cartRes?.data
    const products = cartData?.products || []

    // لو مفيش بيانات أو السلة فاضية
    if (!cartData || products.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <h2 className="text-xl font-bold">Your cart is empty</h2>
                <Link href="/products" className="text-green-600 underline mt-4">Go shopping first</Link>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50">

            {/* ===== BREADCRUMB ===== */}
            <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4">
                <nav className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Link href="/" className="hover:text-green-600 transition-colors">Home</Link>
                    <ChevronRight size={12} />
                    <Link href="/cart" className="hover:text-green-600 transition-colors">Cart</Link>
                    <ChevronRight size={12} />
                    <span className="text-slate-600 font-medium">Checkout</span>
                </nav>
            </div>

            {/* ===== PAGE TITLE ===== */}
            <div className="max-w-7xl mx-auto px-4 lg:px-6 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                        <ShieldCheck className="text-green-600" size={28} />
                        Complete Your Order
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">Review your items and complete your purchase</p>
                </div>
                <Link href="/cart" className="flex items-center gap-2 text-sm font-semibold text-green-600 hover:text-green-700 transition-colors">
                    <ArrowLeft size={16} />
                    Back to Cart
                </Link>
            </div>

            {/* ===== MAIN CONTENT ===== */}
            <div className="max-w-7xl mx-auto px-4 lg:px-6 pb-12">
                <div className="flex flex-col lg:flex-row gap-6 items-start">

                    {/* ===== LEFT — FORMS (العناوين والدفع) ===== */}
                    <div className="flex-1 w-full space-y-6">
                        {/* قسم العنوان (Address) */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="bg-green-600 p-4 text-white">
                                <div className="flex items-center gap-2 mb-1">
                                    <MapPin size={18} />
                                    <h2 className="font-semibold text-lg">Shipping Address</h2>
                                </div>
                            </div>
                            <div className="p-5">
                                <div className="border border-green-500 bg-green-50 rounded-xl p-4 mb-3">
                                    <p className="font-semibold text-sm text-slate-800">Default Address</p>
                                    <p className="text-xs text-slate-500 mt-1">Sadat City, Menofia</p>
                                </div>
                            </div>
                        </div>

                        {/* قسم الدفع (Payment) */}
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="bg-green-600 p-4 text-white">
                                <div className="flex items-center gap-2 mb-1">
                                    <CreditCard size={18} />
                                    <h2 className="font-semibold text-lg">Payment Method</h2>
                                </div>
                            </div>
                            <div className="p-5 space-y-3">
                                <div className="border border-green-500 bg-green-50 rounded-xl p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Banknote className="text-green-600" />
                                        <p className="font-semibold text-sm">Cash on Delivery</p>
                                    </div>
                                    <ShieldCheck className="text-green-600" size={20} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ===== RIGHT — ORDER SUMMARY (ربط البيانات هنا) ===== */}
                    <div className="w-full lg:w-96 shrink-0 space-y-4">
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="bg-green-600 p-4 text-white">
                                <h2 className="font-semibold text-lg">Order Summary</h2>
                                <p className="text-green-100 text-xs">{cartRes.numOfCartItems} items in your bag</p>
                            </div>

                            <div className="p-4">
                                {/* عرض المنتجات من الـ API */}
                                <div className="space-y-4 max-h-64 overflow-y-auto pr-2 mb-4">
                                    {products.map((item) => (
                                        <div key={item._id} className="flex gap-3">
                                            <img
                                                src={item.product.imageCover}
                                                alt={item.product.title}
                                                className="w-12 h-12 rounded-lg bg-slate-100 object-cover shrink-0"
                                            />
                                            <div className="flex-1 min-w-0 flex justify-between">
                                                <div className="pr-2">
                                                    <p className="text-sm font-semibold text-slate-800 leading-tight truncate">
                                                        {item.product.title}
                                                    </p>
                                                    <p className="text-xs text-slate-500 mt-1">
                                                        QTY: {item.count}
                                                    </p>
                                                </div>
                                                <p className="text-sm font-bold text-slate-800 shrink-0">
                                                    {item.price.toLocaleString()} <span className="text-[10px] font-normal text-slate-500">EGP</span>
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* الحسابات الإجمالية */}
                                <div className="space-y-2 border-t border-slate-100 pt-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500">Subtotal</span>
                                        <span className="font-semibold text-slate-800">{cartData.totalCartPrice.toLocaleString()} EGP</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500">Shipping</span>
                                        <span className="font-semibold text-green-600">FREE</span>
                                    </div>
                                    <div className="flex justify-between text-lg font-bold border-t border-slate-200 pt-3 mt-3">
                                        <span className="text-slate-800">Total</span>
                                        <span className="text-green-600">
                                            {cartData.totalCartPrice.toLocaleString()}
                                            <span className="text-xs font-normal text-slate-500 ml-1">EGP</span>
                                        </span>
                                    </div>
                                </div>

                                <button className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm">
                                    <Lock size={16} />
                                    Confirm & Place Order
                                </button>
                            </div>
                        </div>

                        {/* Trust Badges */}
                        <div className="flex flex-wrap justify-center gap-4 text-xs text-slate-500 px-2">
                            <span className="flex items-center gap-1">
                                <CreditCard size={14} className="text-green-600" /> Secure Payment
                            </span>
                            <span className="flex items-center gap-1">
                                <Truck size={14} className="text-green-600" /> Fast Delivery
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}