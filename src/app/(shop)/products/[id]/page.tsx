import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Star, Heart, Share2, Plus, Minus, ShoppingCart, Zap, ChevronRight, Truck, RotateCcw, ShieldCheck } from 'lucide-react';
// افترضت ان ده مسار الـ service والـ interface عندك بناءً على كودك

import AddToCartButton from '@/component/AddToCartButton/AddToCartButton';
import AddToWishButton from '@/component/AddToWishlistButton/AddToWishButton';
import { getSpecificProduct } from '@/service/productDetails.service';

interface Props {
    params: { id: string }
}

export default async function ProductDetail({ params }: Props) {
    // 1. جلب الـ ID وجلب البيانات (Server Side)
    const { id } = await params
    const response = await getSpecificProduct(id);
    const product = response.data;



    return <>


        <section className="min-h-screen bg-[#fcfcfc] pb-12 font-sans text-left" dir="ltr">
            <div className="max-w-7xl mx-auto p-4 lg:p-8">

                {/* Breadcrumbs - Dynamic LTR */}
                <nav className="flex items-center gap-2 text-[13px] text-gray-400 mb-6 px-2">
                    <Link href="/" className="hover:text-gray-600">Home</Link>
                    <ChevronRight size={12} />
                    <Link href="/category" className="hover:text-gray-600">{product.category?.name}</Link>
                    <ChevronRight size={12} />
                    <Link href="/subcategory" className="hover:text-gray-600">{product.subcategory?.[0]?.name}</Link>
                    <ChevronRight size={12} />
                    <span className="text-gray-800 font-medium truncate max-w-[200px]">{product.title}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                    {/* Left: Image Gallery (Main + Thumbnails) */}
                    <div className="lg:col-span-5 flex flex-col md:flex-row gap-4">
                        {/* Side Thumbnails */}
                        <div className="flex md:flex-col gap-3 overflow-x-auto pb-2 md:pb-0 order-2 md:order-1">
                            {product.images?.map((img: string, index: number) => (
                                <div key={index} className={`w-20 h-24 flex-shrink-0 border ${index === 0 ? 'border-[#0aad0a] shadow-sm' : 'border-gray-100'} rounded-lg p-1 bg-white cursor-pointer hover:border-[#0aad0a] transition-all`}>
                                    <Image src={img} alt={`thumb-${index}`} width={80} height={100} className="object-contain w-full h-full" />
                                </div>
                            ))}
                        </div>
                        {/* Main Image */}
                        <div className="flex-1 bg-white border border-gray-100 rounded-xl overflow-hidden p-8 flex items-center justify-center shadow-sm relative order-1 md:order-2">
                            <Image
                                src={product.imageCover}
                                alt={product.title}
                                width={500}
                                height={600}
                                className="object-contain max-h-[500px]"
                                priority
                            />
                        </div>
                    </div>

                    {/* Right: Product Details */}
                    <div className="lg:col-span-7 space-y-5">
                        <div className="space-y-3">
                            <div className="flex gap-2">
                                <span className="bg-[#ebfaeb] text-[#0aad0a] text-[11px] px-3 py-1 rounded-md font-bold uppercase">
                                    {product.category?.name}
                                </span>
                                <span className="bg-gray-100 text-gray-500 text-[11px] px-3 py-1 rounded-md font-bold uppercase">
                                    {product.brand?.name}
                                </span>
                            </div>

                            <h1 className="text-3xl font-bold text-gray-800 tracking-tight leading-tight">{product.title}</h1>

                            <div className="flex items-center gap-2">
                                <div className="flex text-[#ffc107]">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={16}
                                            fill={i < Math.floor(product.ratingsAverage) ? "#ffc107" : "none"}
                                            stroke={i < Math.floor(product.ratingsAverage) ? "#ffc107" : "#ccc"}
                                        />
                                    ))}
                                </div>
                                <span className="text-sm text-gray-400 font-medium">
                                    {product.ratingsAverage} ({product.ratingsQuantity} reviews)
                                </span>
                            </div>

                            <div className="pt-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-3xl font-bold text-gray-900">{product.price} EGP</span>
                                </div>
                                <div className="mt-2">
                                    {product.quantity > 0 ? (
                                        <span className="bg-[#ebfaeb] text-[#0aad0a] text-[11px] px-2 py-1 rounded-full border border-[#d4f5d4] font-bold">
                                            ● In Stock
                                        </span>
                                    ) : (
                                        <span className="bg-red-50 text-red-600 text-[11px] px-2 py-1 rounded-full border border-red-100 font-bold">
                                            ● Out of Stock
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-gray-500 leading-relaxed border-t border-gray-50 pt-4 whitespace-pre-line">
                            {product.description}
                        </p>

                        {/* Actions Area */}
                        <div className="space-y-6 pt-4">
                            <div className="flex items-center gap-6">
                                <span className="text-[13px] font-bold text-gray-700">Quantity</span>
                                <div className="flex items-center border border-gray-200 rounded-lg h-10 bg-white overflow-hidden">
                                    <button className="px-3 hover:bg-gray-50 text-gray-400 border-r border-gray-200"><Minus size={14} /></button>
                                    <span className="px-6 font-bold text-sm text-gray-800">1</span>
                                    <button className="px-3 hover:bg-gray-50 text-gray-400 border-l border-gray-200"><Plus size={14} /></button>
                                </div>
                                <span className="text-xs text-gray-400 font-medium">{product.quantity} available</span>
                            </div>

                            {/* Total Price Bar */}
                            <div className="bg-[#f8f9fa] p-4 rounded-xl flex justify-between items-center">
                                <span className="text-sm text-gray-500">Total Price:</span>
                                <span className="text-xl font-bold text-[#0aad0a]">{product.price.toFixed(2)} EGP</span>
                            </div>

                            {/* Main Buttons */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <AddToCartButton variant={""} productId={product._id} className="w-full bg-[#0aad0a] hover:bg-[#099609] text-white h-12 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-sm">
                                    <ShoppingCart size={18} /> Add to Cart
                                </AddToCartButton>
                                <button className="w-full bg-[#1c2c3e] hover:bg-[#15212f] text-white h-12 rounded-xl font-bold flex items-center justify-center gap-2 transition-all">
                                    <Zap size={18} fill="white" /> Buy Now
                                </button>
                            </div>

                            {/* Wishlist & Share */}
                            <div className="flex gap-2">
                                <div className="flex-[5] h-12">
                                    <AddToWishButton variant={""} productId={product._id} className="w-full h-full border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50 flex items-center justify-center gap-2" />
                                </div>
                                <button className="flex-1 border border-gray-200 rounded-xl flex items-center justify-center hover:bg-gray-50 text-gray-400">
                                    <Share2 size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Bottom Feature Badges */}
                        <div className="grid grid-cols-3 gap-2 pt-8 border-t border-gray-50">
                            {[
                                { title: 'Free Delivery', desc: 'Orders over 500 EGP', icon: <Zap size={14} fill="currentColor" /> },
                                { title: '30 Days Return', desc: 'Money back', icon: <Zap size={14} fill="currentColor" /> },
                                { title: 'Secure Payment', desc: '100% Protected', icon: <Zap size={14} fill="currentColor" /> }
                            ].map((item, i) => (
                                <div key={i} className="flex flex-col items-center text-center">
                                    <div className="w-8 h-8 bg-[#ebfaeb] rounded-full flex items-center justify-center text-[#0aad0a] mb-1">
                                        {item.icon}
                                    </div>
                                    <span className="text-[11px] font-bold text-gray-800 leading-tight">{item.title}</span>
                                    <span className="text-[9px] text-gray-400">{item.desc}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Information Cards (Matching the 2-column design) */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Card 1: Product Information */}
                    <div className="bg-[#f8f9fa] p-8 rounded-2xl border border-gray-100">
                        <h4 className="font-bold text-gray-800 mb-6 text-lg border-b border-gray-200 pb-3">Product Information</h4>
                        <div className="space-y-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Category</span>
                                <span className="font-bold text-gray-700">{product.category?.name}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Subcategory</span>
                                <span className="font-bold text-gray-700">{product.subcategory?.[0]?.name}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Brand</span>
                                <span className="font-bold text-gray-700">{product.brand?.name}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Items Sold</span>
                                <span className="font-bold text-[#0aad0a]">{product.sold}+ sold</span>
                            </div>
                        </div>
                    </div>

                    {/* Card 2: Key Features */}
                    <div className="bg-[#f8f9fa] p-8 rounded-2xl border border-gray-100">
                        <h4 className="font-bold text-gray-800 mb-6 text-lg border-b border-gray-200 pb-3">Key Features</h4>
                        <div className="space-y-4">
                            {[
                                'Premium Quality Product',
                                '100% Authentic Guarantee',
                                'Fast & Secure Packaging',
                                'Quality Tested'
                            ].map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-3 text-sm font-medium text-gray-700">
                                    <span className="text-[#0aad0a] font-bold">✓</span>
                                    {feature}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>


    </>
}