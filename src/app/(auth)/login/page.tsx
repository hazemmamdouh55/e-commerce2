"use client"
import { LoginPayloadType, LoginSchema, defaultValue } from '@/Schema/login.schema';
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';
import { Mail, Lock, Eye, Truck, ShieldCheck, Clock, EyeOff } from 'lucide-react'; // أيقونات مشابهة للتصميم
import Image from 'next/image';

import cartIMG from '../../../assets/images/2e5810ff3e-e750761ebcd4ae5907db.png';
import Link from 'next/link';
import { loginHandler } from '@/actions/auth.actions';
import { signIn } from 'next-auth/react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
export default function Login() {
  const router = useRouter()
  const { handleSubmit, control } = useForm<LoginPayloadType>({
    defaultValues: defaultValue,
    resolver: zodResolver(LoginSchema),
    mode: "onChange"
  })
  const [showPassword, setShowPassword] = useState(false)
  async function onSubmit(formvalues: LoginPayloadType) {
    console.log(formvalues);
    //   // fetch API
    const resp = await signIn("credentials", { ...formvalues, redirect: false, callbackUrl: "/" })
    console.log(resp);

    if (resp?.ok) {
      toast.success("welcome back")
      router.push('/')
    } else
      toast.error(resp?.error || "Invalid email or password");


    //  const data = await loginHandler(formvalues);
    //  console.log(data);
    //  //
    //  if (data.message === "success") {
    //   alert("welcome back ")
    //  }
  }
  return (
    <section className="min-h-screen bg-slate-50 flex items-center justify-center p-4">

      <div className=" w-full bg-white flex overflow-hidden">


        <div className="hidden lg:flex w-1/2 flex-col items-center justify-center p-12 bg-slate-50/50">
          <div className="w-full max-w-md text-center">

            <Image
              src={cartIMG}
              alt="FreshCart Cart"
              className="w-full h-auto mb-8 rounded-3xl shadow-xl "
              width={600}
              height={400}
              priority
            />
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              FreshCart - Your One-Stop Shop for Fresh Products
            </h2>
            <p className="text-slate-500 mb-8">
              Join thousands of happy customers who trust FreshCart for their daily grocery needs
            </p>


            <div className="flex justify-center gap-6 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-green-600" />
                <span>Free Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-green-600" />
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-green-600" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>


        <div className="w-full lg:w-1/2 p-8 sm:p-12 flex flex-col justify-center border-l rounded-3xl shadow-xl  border-slate-100">
          <div className="w-full max-w-md mx-auto">

            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-green-600 mb-2">FreshCart</h1>
              <h2 className="text-xl font-semibold text-slate-800">Welcome Back!</h2>
              <p className="text-sm text-slate-500 mt-1">Sign in to continue your fresh shopping experience</p>
            </div>


            <div className="space-y-3 mb-6">
              <Button variant="outline" className="w-full flex items-center justify-center gap-2 h-11 border-slate-200">
                <span className="text-red-500 font-bold">G</span> Continue with Google
              </Button>
              <Button variant="outline" className="w-full flex items-center justify-center gap-2 h-11 border-slate-200">
                <span className="text-blue-600 font-bold">f</span> Continue with Facebook
              </Button>
            </div>

            <div className="relative flex items-center justify-center mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative bg-white px-4 text-xs text-slate-400 uppercase">
                Or continue with email
              </div>
            </div>
            {/* **********     Form        *********** */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

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

              {/* Checkbox */}
              <div className="flex items-center gap-2 mt-2">
                <input type="checkbox" id="keep-signed" className="rounded border-slate-300 text-green-600 focus:ring-green-500" />
                <label htmlFor="keep-signed" className="text-sm text-slate-600">Keep me signed in</label>
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full h-11 bg-green-600 hover:bg-green-700 text-white font-medium text-base mt-2 transition-colors">
                Sign In
              </Button>
            </form>

            {/* Create Account Link */}
            <div className="text-center mt-8">
              <p className="text-sm text-slate-600">
                New to FreshCart? <Link href="/register" className="text-green-600 font-semibold hover:underline">
                  Create an account
                </Link>
              </p>
            </div>

            {/* Footer Badges */}
            <div className="flex justify-center gap-4 mt-8 text-xs text-slate-400">
              <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> SSL Secured</span>
              <span className="flex items-center gap-1">👥 50K+ Users</span>
              <span className="flex items-center gap-1">⭐ 4.9 Rating</span>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}