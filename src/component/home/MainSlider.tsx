"use client";
import React, { useRef } from 'react';
import NextImage from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import type { SwiperClass } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import slidephoto from "../../assets/images/home-slider-1.d79601a8.png";
import { ChevronLeft, ChevronRight, Headphones, RotateCcw, ShieldCheck, Truck } from 'lucide-react';

export default function MainSlider() {
  const swiperRef = useRef<SwiperClass | null>(null);

  return (
    <section className="mb-8">
      <div className="container mx-auto">

        {/* Slider */}
        <div className="relative">
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            spaceBetween={0}
            slidesPerView={1}
            pagination={{ clickable: true }}
            modules={[Pagination]}
            loop={true}
            className="overflow-hidden"
          >
            <SwiperSlide>
              <div className="relative w-full h-[400px]">
                <NextImage src={slidephoto} alt="Slide 1" className="w-full h-full object-cover" fill priority />
                <div className="absolute inset-0 bg-green-500/50" />
                <div className="absolute inset-0 flex flex-col justify-center px-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Fresh Products Delivered</h2>
                  <p className="text-white text-base mb-2">to your Door</p>
                  <p className="text-white/90 text-sm mb-6">Get 20% off your first order</p>
                  <div className="flex gap-3">
                    <button className="bg-white text-green-600 font-semibold px-6 py-2.5 rounded-lg hover:bg-gray-100 transition-colors">Shop Now</button>
                    <button className="border-2 border-white text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-white/10 transition-colors">View Deals</button>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="relative w-full h-[400px]">
                <NextImage src={slidephoto} alt="Slide 2" className="w-full h-full object-cover" fill />
                <div className="absolute inset-0 bg-green-500/50" />
                <div className="absolute inset-0 flex flex-col justify-center px-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Premium Quality Guaranteed</h2>
                  <p className="text-white text-base mb-6">Fresh from farm to your table</p>
                  <div className="flex gap-3">
                    <button className="bg-white text-green-600 font-semibold px-6 py-2.5 rounded-lg hover:bg-gray-100 transition-colors">Shop Now</button>
                    <button className="border-2 border-white text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-white/10 transition-colors">Learn More</button>
                  </div>
                </div>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="relative w-full h-[400px]">
                <NextImage src={slidephoto} alt="Slide 3" className="w-full h-full object-cover" fill />
                <div className="absolute inset-0 bg-green-500/50" />
                <div className="absolute inset-0 flex flex-col justify-center px-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Fast & Free Delivery</h2>
                  <p className="text-white text-base mb-6">Same day delivery available</p>
                  <div className="flex gap-3">
                    <button className="bg-white text-violet-500 font-semibold px-6 py-2.5 rounded-lg hover:bg-gray-100 transition-colors">Order Now</button>
                    <button className="border-2 border-white text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-white/10 transition-colors">Delivery Info</button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>

          {/* Arrows خارج الـ Swiper وجوه الـ relative div */}
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-green-500 hover:text-green-600 rounded-full w-12 h-12 hidden md:flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft size={22} />
          </button>

          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-green-500 hover:text-green-600 rounded-full w-12 h-12 hidden md:flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Feature Cards */}
        <div className="mt-4 px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="flex items-center p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 bg-blue-50 text-blue-600 mr-4">
                <Truck size={24} />
              </div>
              <div>
                <h3 className="text-gray-900 font-bold text-base leading-tight">Free Shipping</h3>
                <p className="text-gray-500 text-xs mt-1">On orders over 500 EGP</p>
              </div>
            </div>

            <div className="flex items-center p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 bg-emerald-50 text-emerald-600 mr-4">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h3 className="text-gray-900 font-bold text-base leading-tight">Secure Payment</h3>
                <p className="text-gray-500 text-xs mt-1">100% secure transactions</p>
              </div>
            </div>

            <div className="flex items-center p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 bg-orange-50 text-orange-600 mr-4">
                <RotateCcw size={24} />
              </div>
              <div>
                <h3 className="text-gray-900 font-bold text-base leading-tight">Easy Returns</h3>
                <p className="text-gray-500 text-xs mt-1">14-day return policy</p>
              </div>
            </div>

            <div className="flex items-center p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 bg-purple-50 text-purple-600 mr-4">
                <Headphones size={24} />
              </div>
              <div>
                <h3 className="text-gray-900 font-bold text-base leading-tight">24/7 Support</h3>
                <p className="text-gray-500 text-xs mt-1">Dedicated support team</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}