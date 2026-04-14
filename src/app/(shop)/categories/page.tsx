import { getcategories } from '@/service/categories.service'
import { categoriesResponse } from '@/types/response.type'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default async function Categories() {
  const categories: categoriesResponse = await getcategories()

  return (
    <section className='py-12 bg-gray-50 min-h-screen'>

      {/* Hero Section - بنفس استايل البراندات */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-400 px-6 py-12 mb-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-purple-200 text-sm mb-6">
            Home / <span className="text-white font-medium">Categories</span>
          </p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Top Categories</h1>
              <p className="text-purple-100 text-sm mt-1">Explore products by category</p>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Grid - نفس تقسيم البراندات مع Link */}
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {categories.data.map((cat) => (
            <Link
              key={cat._id}
              href={`/categories/${cat._id}`} // تأكد من وجود هذا المسار في مشروعك
              className='bg-white border border-gray-200 rounded-2xl p-4 flex flex-col items-center justify-center text-center group hover:border-purple-300 hover:shadow-md transition-all duration-300'
            >
              {/* حاوية الصورة - مربعة مع زوايا دائرية مثل البراندات */}
              <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center mb-3">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  width={150}
                  height={150}
                  className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* الاسم */}
              <h3 className='text-sm md:text-base font-semibold text-gray-700 group-hover:text-purple-600 transition-colors truncate w-full'>
                {cat.name}
              </h3>


              <p className="text-xs text-purple-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                Explore More →
              </p>
            </Link>
          ))}
        </div>
      </div>

    </section>
  )
}