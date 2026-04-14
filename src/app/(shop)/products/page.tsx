
import AddToCartButton from '@/component/AddToCartButton/AddToCartButton'
import AddToWishButton from '@/component/AddToWishlistButton/AddToWishButton'
import { getProduct } from '@/service/product.service'
import { ProductsResponse } from '@/types/response.type'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default async function product() {
    const product: ProductsResponse = await getProduct()
    return <>


        {/* Hero Section */}
        <div className="bg-gradient-to-r from-green-600 to-green-400 px-6 py-12 mb-8">
            <div className="max-w-7xl mx-auto">
                <p className="text-green-200 text-sm mb-6">
                    Home / <span className="text-white font-medium">All Products</span>
                </p>
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-white">All Products</h1>
                        <p className="text-green-100 text-sm mt-1">Explore our complete product collection</p>
                    </div>
                </div>
            </div>
        </div>

        <section className='py-12 bg-gray-50'>






            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 p-6 bg-gray-50">
                {product.data.map((product) => (
                    <div key={product.id} className="group bg-white border border-gray-200 rounded-lg p-3 relative hover:shadow-lg transition-shadow duration-300">

                        <div className="relative bg-[#F2F2F2] rounded-md overflow-hidden flex items-center justify-center h-64">

                            {product.priceAfterDiscount && (
                                <span className="absolute top-2 left-2 bg-red-600 text-white text-[11px] font-bold px-2 py-1 rounded-sm z-10">
                                    -{Math.round(((product.price - product.priceAfterDiscount) / product.price) * 100)}%
                                </span>
                            )}

                            <div className="absolute top-2 right-2 flex flex-col gap-2 z-10  group-hover:opacity-100 transition-opacity duration-300">
                                <AddToWishButton variant={""} productId={product._id} />                                <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-600 hover:text-emerald-500 border border-gray-100">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                                </button>
                                <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-600 hover:text-blue-500 border border-gray-100">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                </button>
                            </div>

                            <Image
                                src={product.imageCover}
                                alt={product.title}
                                width={200}
                                height={200}
                                className="object-contain w-full h-full mix-blend-multiply"
                            />
                        </div>

                        <div className="mt-3">
                            <p className="text-gray-400 text-[10px] mb-1">{product.category.name}</p>
                            <h3 className="text-gray-800 text-sm font-medium line-clamp-2 h-10 mb-2 leading-tight">
                                <Link
                                    href={`/products/${product.id}`}
                                    className="hover:text-green-600 transition-colors"
                                >
                                    {product.title}
                                </Link>
                            </h3>

                            <div className="flex items-center gap-1 mb-3">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} className={`w-5 h-5 ${i < product.ratingsAverage ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                                <span className="text-gray-400 text-md ml-1">
                                    {product.ratingsAverage === 5 ? '5' : product.ratingsAverage} ({product.ratingsQuantity})
                                </span>
                            </div>

                            <div className="flex items-center justify-between mt-auto">
                                <div className="flex items-center gap-2">
                                    <span className="text-emerald-600 font-bold text-sm">{product.price} EGP</span>
                                    {product.priceAfterDiscount && <span className="text-gray-400 line-through text-[10px]">{product.priceAfterDiscount} EGP</span>}
                                </div>
                                <AddToCartButton variant={""} productId={product._id}></AddToCartButton>
                            </div>
                        </div>

                    </div>
                ))}
            </div>

        </section>



    </>
}