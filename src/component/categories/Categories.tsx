import { getcategories } from '@/service/categories.service'
import React from 'react'
import { categoriesResponse } from '@/types/response.type'
import Image from 'next/image'
import Link from 'next/link' // استيراد Link

export default async function Categories() {
    const categories: categoriesResponse = await getcategories()

    return (
        <section className='py-12 bg-gray-50'>
            <div className="container px-4 md:px-6 mx-auto"> {/* إضافة mx-auto للتوسيط */}

                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-10">
                    <div className="flex items-center gap-3 my-4 sm:my-8">
                        <div className="h-8 w-1.5 bg-gradient-to-b from-emerald-500 to-emerald-700 rounded-full"></div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                            Shop By <span className="text-emerald-600">Category</span>
                        </h2>
                    </div>
                    <Link // تحويل a لـ Link
                        className="text-emerald-600 self-end sm:self-auto hover:text-emerald-700 font-medium flex items-center cursor-pointer transition-colors group"
                        href="/categories" // التأكد من المسار الصحيح
                    >
                        View All Categories
                        <svg
                            className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" // حركة بسيطة للسهم
                            fill="currentColor"
                            viewBox="0 0 512 512"
                        >
                            <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-105.4 105.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path>
                        </svg>
                    </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {categories.data.map((cat) => (
                        <Link // تحويل div لـ Link
                            key={cat._id}
                            href={`/categories/${cat._id}`} // رابط صفحة تفاصيل القسم
                            className='col-span-1 bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center text-center group'
                        >

                            <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-100 rounded-full overflow-hidden flex items-center justify-center mb-3 transition-transform group-hover:scale-105 duration-300">
                                <Image
                                    src={cat.image}
                                    alt={cat.name}
                                    width={150}
                                    height={150}
                                    className="w-full h-full object-contain p-2"
                                />
                            </div>

                            <h3 className='text-sm md:text-base font-semibold text-gray-700 group-hover:text-emerald-600 transition-colors'>
                                {cat.name}
                            </h3>


                            <p className="text-xs text-emerald-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                View Products →
                            </p>
                        </Link>
                    ))}
                </div>
            </div>


            <div className='mt-12'>
                <div className="container mx-auto p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Banner 1 */}
                        <div className="relative overflow-hidden bg-gradient-to-br from-emerald-500 to-emerald-800 rounded-3xl p-8 text-white shadow-lg min-h-[280px] flex flex-col justify-center">
                            <div className="absolute top-[-20px] right-[-20px] w-32 h-32 bg-white/10 rounded-full"></div>
                            <div className="absolute bottom-[-40px] left-[-20px] w-24 h-24 bg-white/10 rounded-full"></div>

                            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium w-fit mb-4">
                                <span>🔥</span> Deal of the Day
                            </div>

                            <h2 className="text-3xl font-bold mb-2">Fresh Organic Fruits</h2>
                            <p className="text-emerald-50 mb-6 text-sm opacity-90">
                                Get up to 40% off on selected organic fruits
                            </p>

                            <div className="flex items-center gap-4 mb-8">
                                <span className="text-4xl font-black">40% OFF</span>
                                <span className="text-xs opacity-80 bg-black/10 px-2 py-1 rounded">Use code: <span className="font-bold">ORGANIC40</span></span>
                            </div>

                            <button className="bg-white text-emerald-700 font-bold py-3 px-8 rounded-full w-fit flex items-center gap-2 hover:bg-emerald-50 transition-colors">
                                Shop Now
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </button>
                        </div>

                        {/* Banner 2 */}
                        <div className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-3xl p-8 text-white shadow-lg min-h-[280px] flex flex-col justify-center">
                            <div className="absolute top-[-20px] right-[-20px] w-32 h-32 bg-white/10 rounded-full"></div>
                            <div className="absolute bottom-[-40px] left-[-20px] w-24 h-24 bg-white/10 rounded-full"></div>

                            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium w-fit mb-4">
                                <span>✨</span> New Arrivals
                            </div>

                            <h2 className="text-3xl font-bold mb-2">Exotic Vegetables</h2>
                            <p className="text-orange-50 mb-6 text-sm opacity-90">
                                Discover our latest collection of premium vegetables
                            </p>

                            <div className="flex items-center gap-4 mb-8">
                                <span className="text-4xl font-black">25% OFF</span>
                                <span className="text-xs opacity-80 bg-black/10 px-2 py-1 rounded">Use code: <span className="font-bold">FRESH25</span></span>
                            </div>

                            <button className="bg-white text-orange-600 font-bold py-3 px-8 rounded-full w-fit flex items-center gap-2 hover:bg-orange-50 transition-colors">
                                Explore Now
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}