import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getSpecificBrand } from '@/service/spacificBrand.service'
import { SpacificBrand } from '@/interfaces/Spacific.brand.interface '

interface Props {
    params: { id: string }
}

export default async function BrandDetails({ params }: Props) {
    // جلب بيانات البراند باستخدام الـ ID من الرابط
    const { id } = await params
    const brandData = await getSpecificBrand(id)
    const brand: SpacificBrand = brandData.data

    return (
        <section className="min-h-screen bg-gray-50">

            {/* Hero Section - تصميم متناسق مع الصفحة الرئيسية */}
            <div className="bg-gradient-to-r from-purple-700 to-indigo-600 px-6 py-16 shadow-lg">
                <div className="max-w-7xl mx-auto">
                    {/* Breadcrumbs / مسار التنقل */}
                    <nav className="text-purple-100 text-sm mb-8 flex items-center gap-2">
                        <Link href="/" className="hover:text-white transition-colors">الرئيسية</Link>
                        <span>/</span>
                        <Link href="/brands" className="hover:text-white transition-colors">البراندات</Link>
                        <span>/</span>
                        <span className="text-white font-medium">{brand.name}</span>
                    </nav>

                    <div className="flex flex-col md:flex-row items-center gap-10">
                        {/* صورة البراند */}
                        <div className="relative w-48 h-48 md:w-64 md:h-64 bg-white rounded-3xl p-6 shadow-2xl flex items-center justify-center transform transition-transform hover:scale-105">
                            <Image
                                src={brand.image}
                                alt={brand.name}
                                width={300}
                                height={300}
                                className="object-contain"
                                priority
                            />
                        </div>

                        {/* معلومات البراند */}
                        <div className="text-center md:text-right">
                            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">
                                {brand.name}
                            </h1>
                            <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-4">
                                <span className="px-5 py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-medium border border-white/10">
                                    براند موثق
                                </span>
                                <span className="px-5 py-2 bg-purple-500/30 backdrop-blur-md rounded-full text-purple-100 text-sm font-medium border border-purple-400/20">
                                    وصل حديثاً
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* منطقة المنتجات (Placeholder حالياً) */}
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-16">
                <div className="flex items-center justify-between mb-10 border-b border-gray-200 pb-5">
                    <h2 className="text-3xl font-bold text-gray-800">منتجات {brand.name}</h2>
                    <span className="text-purple-600 font-semibold cursor-pointer hover:underline">عرض الكل</span>
                </div>

                {/* يمكنك هنا عمل Loop على المنتجات إذا كان الـ API يوفرها للبراند */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    <div className="bg-white p-10 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-center space-y-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7.5 4.27 9 5.15" /><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" /><path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" /></svg>
                        </div>
                        <p className="text-gray-500 font-medium">سيتم عرض منتجات {brand.name} هنا قريباً</p>
                    </div>
                </div>
            </div>

        </section>
    )
}