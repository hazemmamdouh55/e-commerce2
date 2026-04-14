import { CreditCard, Headphones, Mail, MapPin, Phone, RotateCcw, ShieldCheck, ShoppingCart, Truck } from 'lucide-react';
import React from 'react'
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  return <>
    <div className='bg-[#F0FDF4]'>
      <div className="container mt-4 mx-auto px-4 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

          {/* Free Shipping */}
          <div className="flex items-center p-6">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-green-100 text-green-600 mr-4">
              <Truck size={22} />
            </div>
            <div>
              <h3 className="text-gray-900 font-bold text-sm leading-tight">Free Shipping</h3>
              <p className="text-gray-500 text-xs mt-1">On orders over 500 EGP</p>
            </div>
          </div>

          {/* Easy Returns */}
          <div className="flex items-center p-6">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-green-100 text-green-600 mr-4">
              <RotateCcw size={22} />
            </div>
            <div>
              <h3 className="text-gray-900 font-bold text-sm leading-tight">Easy Returns</h3>
              <p className="text-gray-500 text-xs mt-1">14-day return policy</p>
            </div>
          </div>

          {/* Secure Payment */}
          <div className="flex items-center p-6">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-green-100 text-green-600 mr-4">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h3 className="text-gray-900 font-bold text-sm leading-tight">Secure Payment</h3>
              <p className="text-gray-500 text-xs mt-1">100% secure checkout</p>
            </div>
          </div>

          {/* 24/7 Support */}
          <div className="flex items-center p-6">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-green-100 text-green-600 mr-4">
              <Headphones size={22} />
            </div>
            <div>
              <h3 className="text-gray-900 font-bold text-sm leading-tight">24/7 Support</h3>
              <p className="text-gray-500 text-xs mt-1">Contact us anytime</p>
            </div>
          </div>

        </div>
      </div>
    </div>
    <footer className="bg-[#0B1C2C] text-gray-400 pt-10">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-8">

        {/* Brand */}
        <div>
          {/* Logo Box */}
          <div className="bg-white rounded-xl inline-flex items-center gap-2 px-4 py-2 mb-6">
            <ShoppingCart className="text-green-500" size={22} />
            <span className="text-[#0B1C2C] font-bold text-xl">FreshCart</span>
          </div>

          <p className="text-sm mb-6 leading-relaxed">
            FreshCart is your one-stop destination for quality products. From
            fashion to electronics, we bring you the best brands at competitive
            prices with a seamless shopping experience.
          </p>

          <div className="space-y-3 text-sm">
            <p className="flex items-center gap-3">
              <Phone size={15} className="text-green-500 shrink-0" />
              +1 (800) 123-4567
            </p>
            <p className="flex items-center gap-3">
              <Mail size={15} className="text-green-500 shrink-0" />
              support@freshcart.com
            </p>
            <p className="flex items-center gap-3">
              <MapPin size={15} className="text-green-500 shrink-0" />
              123 Commerce Street, New York, NY 10001
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex gap-3 mt-6">
            {[FaFacebookF, FaTwitter, FaInstagram, FaYoutube].map((Icon, i) => (
              <div
                key={i}
                className="w-9 h-9 rounded-full bg-[#1a2f42] flex items-center justify-center cursor-pointer hover:bg-[#243d52] transition-colors"
              >
                <Icon size={15} className="text-gray-300" />
              </div>
            ))}
          </div>
        </div>

        {/* Shop */}
        <div>
          <h3 className="text-white font-bold text-lg mb-4">Shop</h3>
          <ul className="space-y-3 text-sm">
            {["All Products", "Categories", "Brands", "Electronics", "Men's Fashion", "Women's Fashion"].map((link, i) => (
              <li key={i} className="text-gray-400 hover:text-[#15803D] cursor-pointer transition-colors">{link}</li>
            ))}
          </ul>
        </div>

        {/* Account */}
        <div>
          <h3 className="text-white font-bold text-lg mb-4">Account</h3>
          <ul className="space-y-3 text-sm">
            {["My Account", "Order History", "Wishlist", "Shopping Cart", "Sign In", "Create Account"].map((link, i) => (
              <li key={i} className="text-gray-400 hover:text-[#15803D] cursor-pointer transition-colors">{link}</li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-white font-bold text-lg mb-4">Support</h3>
          <ul className="space-y-3 text-sm">
            {["Contact Us", "Help Center", "Shipping Info", "Returns & Refunds", "Track Order"].map((link, i) => (
              <li key={i} className="text-gray-400 hover:text-[#15803D] cursor-pointer transition-colors">{link}</li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-white font-bold text-lg mb-4">Legal</h3>
          <ul className="space-y-3 text-sm">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((link, i) => (
              <li key={i} className="text-gray-400 hover:text-[#15803D] cursor-pointer transition-colors">{link}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 py-4 px-6 flex flex-col md:flex-row justify-between items-center text-sm max-w-7xl mx-auto">
        <p className="text-gray-400">© 2026 FreshCart. All rights reserved.</p>
        <div className="flex gap-4 mt-2 md:mt-0 items-center text-gray-400">
          <span className="flex items-center gap-1"><CreditCard size={16} /> Visa</span>
          <span className="flex items-center gap-1"><CreditCard size={16} /> Mastercard</span>
          <span className="flex items-center gap-1"><CreditCard size={16} /> PayPal</span>
        </div>
      </div>
    </footer>
  </>;
}