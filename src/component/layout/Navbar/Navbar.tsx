// components/Navbar.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ShoppingCart, Heart, User, Search, Phone, Mail, Truck, Gift, Headphones, Menu, X, ChevronDown } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { signOut } from "next-auth/react";
import { useCart } from '@/context/cart.context';
import { useWishlist } from '@/context/Wishlist.context';
const categories = [
  { name: 'All Categories', href: '/categories', highlight: true },
  { name: 'Electronics', href: '/categories//products?category=electronics' },
  { name: "Women's Fashion", href: '/categories//products?category=womens-fashion' },
  { name: "Men's Fashion", href: '/categories//products?category=mens-fashion' },
  { name: 'Beauty & Health', href: '/categories//products?category=beauty-health' },
  { name: 'SuperMarket', href: '/categories//products?category=supermarket' },
  { name: 'Baby & Toys', href: '/categories//products?category=electronicsbaby-toys' },
];
export default function Navbar() {
  const { status, data: sessiondata } = useSession()

  const [isTopBarVisible, setIsTopBarVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    const handleScroll = () => setIsTopBarVisible(window.scrollY < 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (categoriesRef.current && !categoriesRef.current.contains(e.target as Node)) {
        setCategoriesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const { numOfCartItems } = useCart()
  const { count } = useWishlist()
  return (
    <>
      {/* ===== TOP ANNOUNCEMENT BAR ===== */}
      <div
        className={`bg-gray-900 text-white text-xs transition-all duration-300 overflow-hidden hidden md:block ${isTopBarVisible ? 'max-h-10 py-2 opacity-100' : 'max-h-0 py-0 opacity-0'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex gap-5">
            <span className="flex items-center gap-1.5">
              <Truck size={13} className="text-green-400" />
              Free Shipping on Orders 500 EGP
            </span>
            <span className="flex items-center gap-1.5">
              <Gift size={13} className="text-green-400" />
              New Arrivals Daily
            </span>
          </div>
          <div className="flex gap-4 items-center text-gray-300">
            <a href="tel:+18001234567" className="flex items-center gap-1 hover:text-white transition-colors">
              <Phone size={12} /> +1 (800) 123-4567
            </a>
            <a href="mailto:support@freshcart.com" className="flex items-center gap-1 hover:text-white transition-colors">
              <Mail size={12} /> support@freshcart.com
            </a>
            {status === "unauthenticated" ? (
              <>
                <Link href="/login" className="flex items-center gap-1 hover:text-white transition-colors">
                  <User size={12} /> Sign In
                </Link>
                <Link href="/register" className="hover:text-white transition-colors">Sign Up</Link>
              </>
            ) : status === "authenticated" ? (

              <>
                <Link href="/profile" className="hover:text-white">{sessiondata?.user.name}</Link>
                <button onClick={() => signOut()} className="hover:text-red-400">Sign Out</button>
              </>
            ) : (
              <span>Loading...</span> // Optional: handle the "loading" state
            )}
          </div>
        </div>
      </div>

      {/* ===== MAIN NAVBAR ===== */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center gap-3 md:gap-5 h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 bg-green-100 rounded-lg flex items-center justify-center">
              <ShoppingCart size={20} className="text-green-600" />
            </div>
            <span className="text-xl font-bold text-gray-900">
              Fresh<span className="text-green-600">Cart</span>
            </span>
          </Link>

          {/* Search */}
          <div className="flex-1 max-w-lg relative hidden md:block">
            <input
              type="text"
              placeholder="Search for products, brands and more..."
              className="w-full border border-gray-300 rounded-lg py-2.5 pl-4 pr-11 text-sm text-gray-700 outline-none focus:border-green-500 transition-colors"
            />
            <button className="absolute right-0 top-0 bottom-0 w-11 bg-green-600 hover:bg-green-700 rounded-r-lg flex items-center justify-center transition-colors">
              <Search size={17} className="text-white" />
            </button>
          </div>

          {/* Nav Links */}


          <div className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${pathname === '/' ? 'text-green-600 font-medium' : 'text-gray-600 hover:text-green-600'
                }`}
            >
              Home
            </Link>

            <Link
              href="/products"
              className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${pathname === '/shop' ? 'text-green-600 font-medium' : 'text-gray-600 hover:text-green-600'
                }`}
            >
              Shop
            </Link>

            {/* Categories Dropdown */}
            <div className="relative" ref={categoriesRef}>
              <button
                onClick={() => setCategoriesOpen(!categoriesOpen)}
                className={`px-3 py-1.5 text-sm rounded-lg transition-colors flex items-center gap-1 ${pathname.startsWith('/categories') ? 'text-green-600 font-medium' : 'text-gray-600 hover:text-green-600'
                  }`}
              >
                Categories
                <ChevronDown
                  size={15}
                  className={`transition-transform duration-200 ${categoriesOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {categoriesOpen && (
                <div className="absolute top-full left-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                  {categories.map((cat) => (
                    <Link
                      key={cat.name}
                      href={cat.href}
                      onClick={() => setCategoriesOpen(false)}
                      className={`block px-4 py-2.5 text-sm transition-colors hover:bg-gray-50 ${pathname === cat.href
                        ? 'text-green-600 font-medium'
                        : cat.highlight
                          ? 'text-green-600 font-medium'
                          : 'text-gray-700 hover:text-green-600'
                        }`}
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/brand"
              className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${pathname === '/brand' ? 'text-green-600 font-medium' : 'text-gray-600 hover:text-green-600'
                }`}
            >
              Brands
            </Link>
          </div>

          {/* Support */}
          <div className="hidden md:flex items-center gap-2">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <Headphones size={15} className="text-green-600" />
            </div>
            <div className="text-xs leading-tight">
              <p className="text-gray-500">Support</p>
              <p className="font-semibold text-gray-700">24/7 Help</p>
            </div>
          </div>

          {/* Spacer موبايل */}
          <div className="flex-1 md:hidden" />

          {/* Icons */}
          <div className="flex items-center gap-1">
            <Link href="/wishlist">
              <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors text-gray-600 relative">
                <Heart size={21} />
                <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-red-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center">{count}</span>
              </button>
            </Link>
            <Link href="/cart">
              <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors text-gray-600 relative">
                <ShoppingCart size={21} />
                <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-green-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center">{numOfCartItems}</span>
              </button>
            </Link>
          </div>

          {/* Sign In */}

          {status === "unauthenticated" && (
            <div className="flex items-center gap-4">
              {/* زرار Sign In بالتصميم الجديد */}
              <Link
                href="/login"
                className="hidden md:flex bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium items-center gap-1.5 transition-colors whitespace-nowrap"
              >
                <User size={15} />
                Sign In
              </Link>

              {/* رابط Sign Up */}

            </div>
          )}

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-9 h-9 bg-green-600 hover:bg-green-700 text-white flex items-center justify-center rounded-lg transition-colors"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* ===== MOBILE MENU ===== */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 bg-white border-t border-gray-100 ${menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
            }`}
        >
          {/* Search */}
          <div className="px-4 pt-4 pb-2 relative">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full border border-gray-300 rounded-lg py-2.5 pl-4 pr-11 text-sm text-gray-700 outline-none focus:border-green-500"
            />
            <button className="absolute right-4 top-4 bottom-2 w-11 bg-green-600 rounded-r-lg flex items-center justify-center">
              <Search size={17} className="text-white" />
            </button>
          </div>

          {/* Links */}
          <div className="px-4 py-2 flex flex-col gap-1">
            <Link href="/" onClick={() => setMenuOpen(false)} className="py-2.5 px-3 text-sm text-green-600 font-medium rounded-lg bg-green-50">Home</Link>
            <Link href="/shop" onClick={() => setMenuOpen(false)} className="py-2.5 px-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">Shop</Link>

            {/* Categories in mobile - accordion style */}
            <div>
              <button
                onClick={() => setCategoriesOpen(!categoriesOpen)}
                className="w-full py-2.5 px-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg flex items-center justify-between"
              >
                Categories
                <ChevronDown size={15} className={`transition-transform duration-200 ${categoriesOpen ? 'rotate-180' : ''}`} />
              </button>
              {categoriesOpen && (
                <div className="ml-3 mt-1 flex flex-col gap-1 border-l-2 border-green-100 pl-3">
                  {categories.map((cat) => (
                    <Link
                      key={cat.name}
                      href={cat.href}
                      onClick={() => { setMenuOpen(false); setCategoriesOpen(false); }}
                      className={`py-2 text-sm ${cat.highlight ? 'text-green-600 font-medium' : 'text-gray-600 hover:text-green-600'}`}
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/brands" onClick={() => setMenuOpen(false)} className="py-2.5 px-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">Brands</Link>
          </div>

          {/* Sign In */}
          <div className="px-4 py-3 border-t border-gray-100">
            <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2">
              <User size={16} />
              Sign In
            </button>
          </div>

          {/* Support */}
          <div className="px-4 py-3 border-t border-gray-100 flex items-center gap-3 text-sm text-gray-500">
            <Headphones size={18} className="text-green-600" />
            <span>24/7 Support: <strong className="text-gray-700">+1 (800) 123-4567</strong></span>
          </div>
        </div>
      </nav>
    </>
  );
}