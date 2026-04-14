import MainSlider from '@/component/home/MainSlider'
import React from 'react'
import Categories from '../component/categories/Categories'

import Productcom from '@/component/product/page'
export default function Home() {
  return (
    <div>
      {/* main slider */}
      <MainSlider />


      {/* category */}
      <Categories />

      {/* products */}
      <Productcom />
    </div>
  )
}
