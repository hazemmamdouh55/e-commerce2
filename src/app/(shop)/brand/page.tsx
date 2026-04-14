import React from 'react'
import { BrandResponse, } from '@/types/response.type'
import Image from 'next/image'
import Link from 'next/link'
import { getAllbrand } from '@/service/brand.service '


export default async function Brands() {
  const Brands: BrandResponse = await getAllbrand()

  return (
    <section className='py-12 bg-gray-50'>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-400 px-6 py-12 mb-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-purple-200 text-sm mb-6">
            Home / <span className="text-white font-medium">Brands</span>
          </p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
                <line x1="7" y1="7" x2="7.01" y2="7" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Top Brands</h1>
              <p className="text-purple-100 text-sm mt-1">Shop from your favorite brands</p>
            </div>
          </div>
        </div>
      </div>

      {/* Brands Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {Brands.data.map((cat) => (
            <Link
              key={cat._id}
              href={`/brand/${cat._id}`}
              className='bg-white border border-gray-200 rounded-2xl p-4 flex flex-col items-center justify-center text-center group hover:border-purple-300 hover:shadow-md transition-all duration-300'
            >
              <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center mb-3">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  width={150}
                  height={150}
                  className="w-full h-full object-contain p-2"
                />
              </div>

              <h3 className='text-sm md:text-base font-semibold text-gray-700 group-hover:text-purple-600 transition-colors'>
                {cat.name}
              </h3>

              <p className="text-xs text-purple-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                View Products →
              </p>
            </Link>
          ))}
        </div>
      </div>

    </section>
  )
}



