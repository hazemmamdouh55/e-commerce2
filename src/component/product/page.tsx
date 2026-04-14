import { getProduct } from '@/service/product.service'
import { ProductsResponse } from '@/types/response.type'
import { Headphones, RotateCcw, ShieldCheck, Truck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import AddToWishButton from '../AddToWishlistButton/AddToWishButton'
import AddToCartButton from '../AddToCartButton/AddToCartButton'

export default async function Productcom() {

  const product: ProductsResponse = await getProduct()
  console.log(product)
  return <>
    <section className='py-12 bg-gray-50'>
      <div className="container px-4 md:px-6">

        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-10">
          <div className="flex items-center gap-3 my-4 sm:my-8">
            <div className="h-8 w-1.5 bg-gradient-to-b from-emerald-500 to-emerald-700 rounded-full"></div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Featured
              <span className="text-emerald-600"> Products</span>
            </h2>
          </div>

        </div>
      </div>



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
                <AddToWishButton variant={""} productId={product._id}></AddToWishButton>
                <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-600 hover:text-emerald-500 border border-gray-100">
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

    <section className="p-4 md:p-8 font-sans ">

      <div className="max-w-6xl mx-auto bg-[#f1fbf5] rounded-[40px] p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-12 border border-[#e5f5eb]">


        <div className="flex-1 w-full lg:max-w-xl">


          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-[#00b277] rounded-xl flex items-center justify-center text-white shadow-md shadow-[#00b277]/20">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-[#00b277] font-bold text-xs tracking-wider uppercase mb-0.5">Newsletter</p>
              <p className="text-gray-500 text-[11px]">50,000+ subscribers</p>
            </div>
          </div>


          <h2 className="text-4xl md:text-[42px] font-extrabold text-gray-900 mb-4">
            Get the Freshest Updates <span className="text-[#00b277]">Delivered Free</span>
          </h2>
          <p className="text-gray-500 text-[15px] mb-8">
            Weekly recipes, seasonal offers & exclusive member perks.
          </p>


          <div className="flex flex-wrap gap-3 mb-8">

            <div className="bg-white border border-gray-100 px-4 py-2 rounded-full text-[13px] font-medium text-gray-600 shadow-sm flex items-center gap-2">
              <svg className="w-4 h-4 text-[#00b277]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1v12zm0 0v7" /></svg>
              Fresh Picks Weekly
            </div>

            <div className="bg-white border border-gray-100 px-4 py-2 rounded-full text-[13px] font-medium text-gray-600 shadow-sm flex items-center gap-2">
              <svg className="w-4 h-4 text-[#00b277]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" /></svg>
              Free Delivery Codes
            </div>

            <div className="bg-white border border-gray-100 px-4 py-2 rounded-full text-[13px] font-medium text-gray-600 shadow-sm flex items-center gap-2">
              <svg className="w-4 h-4 text-[#00b277]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
              Members-Only Deals
            </div>
          </div>


          <div className="flex flex-col sm:flex-row gap-3 w-full mb-3">
            <input
              type="email"
              placeholder="you@example.com"
              className="flex-1 px-5 py-3.5 rounded-xl bg-white border border-gray-200 shadow-sm outline-none focus:border-[#00b277] focus:ring-1 ring-[#00b277] text-gray-700 text-sm"
            />
            <button className="bg-[#00b277] text-white px-6 py-3.5 rounded-xl font-bold hover:bg-[#009e6a] transition-colors flex items-center justify-center gap-2 text-sm shadow-md shadow-[#00b277]/20 whitespace-nowrap">
              Subscribe
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </button>
          </div>

          <p className="text-[#f59e0b] text-[11px] flex items-center gap-1.5 ml-2">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
            <span className="text-gray-400">Unsubscribe anytime. No spam, ever.</span>
          </p>
        </div>


        <div className="w-full lg:w-[380px] bg-[#16202a] rounded-[32px] p-8 text-white relative overflow-hidden shrink-0 shadow-2xl">

          <div className="absolute top-0 right-0 w-48 h-48 bg-[#00b277]/10 rounded-full blur-[60px] -mr-10 -mt-10 pointer-events-none"></div>

          <div className="bg-[#1f3131] border border-[#2b443c] text-[#00b277] text-[9px] font-bold px-3 py-1.5 rounded-full w-fit mb-6 flex items-center gap-1.5 uppercase tracking-widest">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
            Mobile App
          </div>

          <h3 className="text-2xl font-bold mb-3">Shop Faster on Our App</h3>
          <p className="text-gray-400 text-[13px] mb-8">
            Get app-exclusive deals & 15% off your first order.
          </p>

          <div className="flex flex-col gap-3 mb-8">

            <button className="flex items-center gap-4 bg-[#212b36] border border-[#2d3a47] hover:bg-[#2a3644] transition-colors p-3.5 rounded-xl w-full text-left group">

              <svg
                className="w-7 h-7 text-white fill-current shrink-0 group-hover:scale-105 transition-transform"
                viewBox="0 0 170 170"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M150.37,130.25c-2.45,5.66-5.35,10.87-8.71,15.66c-4.58,6.53-8.33,11.05-11.22,13.56c-4.48,4.12-9.28,6.23-14.42,6.35c-3.69,0-8.14-1.05-13.32-3.18c-5.19-2.12-9.93-3.11-14.23-2.98c-4.3,0.12-9.11,1.21-14.43,3.27c-5.31,2.06-9.8,3.1-13.47,3.1c-5.47,0-10.48-2.2-15.01-6.58c-3.04-2.83-7.02-7.81-11.93-14.96C21.61,121.21,11.23,101.12,11.23,83.91c0-10.7,2.15-19.82,6.46-27.35c4.31-7.53,10.23-13.25,17.76-17.15c7.53-3.9,15.61-5.85,24.23-5.85c5.02,0,10.64,1.1,16.86,3.31c6.22,2.2,10.82,3.31,13.79,3.31c2.23,0,6.29-1.07,12.16-3.19c5.88-2.12,11.66-3.2,17.36-3.2c9.25,0,17.51,2.26,24.77,6.78c7.26,4.52,12.7,10.74,16.32,18.66c-8.62,5.2-12.93,12.87-12.93,23c0,7.91,2.46,14.4,7.38,19.49c4.92,5.08,11,8.02,18.25,8.8c-1.14,4.2-2.81,8.37-5.02,12.51v0.01ZM119.11,7.24c0,8.1-2.96,15.67-8.86,22.73c-6.13,7.33-13.65,11.33-22.56,11.98c-0.14-1.99-0.21-3.63-0.21-4.9c0-7.91,3.06-15.64,9.18-23.18c5.13-6.23,12.11-10.46,20.94-12.7c0.82,1.96,1.24,3.99,1.24,6.07H119.11Z"></path>
              </svg>
              <div>
                <p className="text-[9px] text-gray-400 uppercase tracking-widest font-medium">Download on</p>
                <p className="font-bold text-sm text-white">App Store</p>
              </div>
            </button>


            <button className="flex items-center gap-4 bg-[#212b36] border border-[#2d3a47] hover:bg-[#2a3644] transition-colors p-3.5 rounded-xl w-full text-left">
              <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M3.198 21.84c-.105-.084-.198-.21-.198-.38V2.54c0-.17.093-.296.198-.38.105-.084.254-.084.38 0l16.48 9.53c.125.072.196.185.196.31 0 .125-.07.238-.196.31l-16.48 9.53c-.126.084-.275.084-.38 0z" /></svg>
              <div>
                <p className="text-[9px] text-gray-400 uppercase tracking-widest font-medium">Get it on</p>
                <p className="font-bold text-sm text-white">Google Play</p>
              </div>
            </button>
          </div>


          <div className="flex items-center gap-2">
            <div className="flex text-[#f59e0b] gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              ))}
            </div>
            <span className="text-[11px] text-gray-400 font-medium">
              4.9 · 100K+ downloads
            </span>
          </div>
        </div>

      </div>
    </section>





  </>
}
