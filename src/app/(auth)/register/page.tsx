"use client"
import { RegisterPayloadType, RegisterSchema } from '@/Schema/register.schema ';
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';
import {
  ShoppingCart, Eye, EyeOff, Truck, RotateCcw,
  CreditCard, Headphones, CheckCircle, Star,
  Mail,
  Lock
} from 'lucide-react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { toast } from 'sonner';
import { RegisterHandler } from '@/actions/auth.actions';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { useRouter } from 'next/navigation';

export default function Register() {
  const { handleSubmit, control, formState: { errors } } = useForm<RegisterPayloadType>({
    resolver: zodResolver(RegisterSchema),
    mode: "onChange"
  })
  const [showPassword, setShowPassword] = useState(false)
  // const [showConfirm, setShowConfirm] = useState(false)
  const router = useRouter()

  async function onSubmit(formvalues: RegisterPayloadType) {
    console.log(formvalues);
    const res = await RegisterHandler(formvalues)
    console.log(res);
    if (res.ok) {
      toast.success("Register Is Succesfully")
      router.push('/login')
    }
    toast.error(res.error.message)

  }

  const features = [
    {
      icon: <CheckCircle size={20} className="text-green-600" />,
      title: "Premium Quality",
      desc: "Premium quality products sourced from trusted suppliers."
    },
    {
      icon: <Truck size={20} className="text-green-600" />,
      title: "Fast Delivery",
      desc: "Same-day delivery available in most areas."
    },
    {
      icon: <CreditCard size={20} className="text-green-600" />,
      title: "Secure Shopping",
      desc: "Your data and payments are completely secure."
    },
  ]

  const trustBadges = [
    { icon: <Truck size={18} className="text-green-600" />, label: "Free Shipping", sub: "On orders over 500 EGP" },
    { icon: <RotateCcw size={18} className="text-green-600" />, label: "Easy Returns", sub: "30-day return policy" },
    { icon: <CreditCard size={18} className="text-green-600" />, label: "Secure Payment", sub: "100% secure checkout" },
    { icon: <Headphones size={18} className="text-green-600" />, label: "24/7 Support", sub: "Contact us anytime" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ===== MAIN CONTENT ===== */}
      <div className="max-w-7xl mx-auto px-4 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* LEFT — Info */}
          <div className="flex flex-col gap-8">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                Welcome to <span className="text-green-600">FreshCart</span>
              </h1>
              <p className="text-gray-500 text-base leading-relaxed">
                Join thousands of happy customers who enjoy fresh groceries delivered right to their doorstep.
              </p>
            </div>

            {/* Features */}
            <div className="flex flex-col gap-5">
              {features.map((f) => (
                <div key={f.title} className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-green-50 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    {f.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{f.title}</p>
                    <p className="text-gray-500 text-sm">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Testimonial */}
            <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center font-bold text-green-700 text-sm">
                  SJ
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">Sarah Johnson</p>
                  <div className="flex gap-0.5 mt-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} className={i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300 fill-gray-300"} />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed italic">
                FreshCart has transformed my shopping experience. The quality of the products is outstanding, and the delivery is always on time. Highly recommend!
              </p>
            </div>
          </div>

          {/* RIGHT — Form */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-1">Create Your Account</h2>
            <p className="text-gray-500 text-sm mb-6">Start your fresh journey with us today</p>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <button className="flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Google
              </button>
              <button className="flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </button>
            </div>

            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400">or</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Name <span className="text-red-500">*</span>
                </label>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder="Ali"
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors placeholder:text-gray-400"
                    />
                  )}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>

              {/* Email */}
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="space-y-1.5">
                    <FieldLabel htmlFor={field.name} className="text-sm font-medium text-slate-700">Email Address</FieldLabel>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-4 w-4 text-slate-400" />
                      </div>
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter your email"
                        autoComplete="off"
                        className="pl-10 h-11 bg-slate-50 border-slate-200 focus-visible:ring-green-500"
                      />
                    </div>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              {/* Password */}
              <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <FieldLabel htmlFor={field.name} className="text-sm font-medium text-slate-700">Password</FieldLabel>
                      <a href="#" className="text-xs text-green-600 hover:underline">Forgot Password?</a>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-4 w-4 text-slate-400" />
                      </div>
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter your password"
                        autoComplete="off"
                        type={showPassword ? 'text' : 'password'}
                        className="pl-10 pr-10 h-11 bg-slate-50 border-slate-200 focus-visible:ring-green-500"
                      />
                      <div
                        className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                        onClick={() => setShowPassword(prev => !prev)}
                      >
                        {showPassword
                          ? <EyeOff className="h-4 w-4 text-slate-400 hover:text-slate-600" />
                          : <Eye className="h-4 w-4 text-slate-400 hover:text-slate-600" />
                        }
                      </div>
                    </div>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              {/* Confirm Password */}
              <Controller
                name="rePassword"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <FieldLabel htmlFor={field.name} className="text-sm font-medium text-slate-700">confirm Password</FieldLabel>

                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-4 w-4 text-slate-400" />
                      </div>
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="confirm your password"
                        autoComplete="off"
                        type={showPassword ? 'text' : 'password'}
                        className="pl-10 pr-10 h-11 bg-slate-50 border-slate-200 focus-visible:ring-green-500"
                      />
                      <div
                        className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                        onClick={() => setShowPassword(prev => !prev)}
                      >
                        {showPassword
                          ? <EyeOff className="h-4 w-4 text-slate-400 hover:text-slate-600" />
                          : <Eye className="h-4 w-4 text-slate-400 hover:text-slate-600" />
                        }
                      </div>
                    </div>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="tel"
                      placeholder="+1 234 567 8900"
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors placeholder:text-gray-400"
                    />
                  )}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
              </div>

              {/* Terms */}
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="mt-0.5 w-4 h-4 accent-green-600 cursor-pointer"
                />
                <label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed cursor-pointer">
                  I agree to the{' '}
                  <Link href="/terms" className="text-green-600 hover:underline">Terms of Service</Link>
                  {' '}and{' '}
                  <Link href="/privacy" className="text-green-600 hover:underline">Privacy Policy</Link>
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors mt-1"
              >
                <ShoppingCart size={16} />
                Create My Account
              </button>

              <p className="text-center text-sm text-gray-500">
                Already have an account?{' '}
                <Link href="/login" className="text-green-600 font-medium hover:underline">Sign In</Link>
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* ===== TRUST BADGES ===== */}
      <div className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustBadges.map((b) => (
              <div key={b.label} className="flex items-center gap-3">
                <div className="w-9 h-9 bg-green-50 rounded-full flex items-center justify-center shrink-0">
                  {b.icon}
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{b.label}</p>
                  <p className="text-gray-500 text-xs">{b.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}