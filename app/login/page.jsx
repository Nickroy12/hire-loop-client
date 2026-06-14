'use client';

import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation'; // useRouter ইমপোর্ট করা হয়েছে
import React from 'react';

const LoginPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter(); // router ইনিশিয়ালাইজ করা হয়েছে
  const redirectTo = searchParams.get("redirect") || '/';
  console.log(redirectTo , "red");

  const dataSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { email, password } = user;

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        alert(error.message || 'Login failed');
        return;
      }

      alert('Login successful!');
      console.log(data);
      
      // সফল লগইনের পর ইউজারকে রিডাইরেক্ট করা হচ্ছে
      router.push(redirectTo);
      router.refresh(); // অথেনটিকেশন স্টেট আপডেট করার জন্য
      
    } catch (err) {
      console.error(err);
      alert('Something went wrong!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute w-[400px] h-[400px] bg-purple-600 blur-[120px] opacity-30 rounded-full top-10 left-10"></div>
      <div className="absolute w-[300px] h-[300px] bg-blue-600 blur-[120px] opacity-20 rounded-full bottom-10 right-10"></div>

      {/* Glass Card */}
      <div
        className="w-full max-w-md p-8 rounded-2xl
        bg-white/10 backdrop-blur-xl border border-white/20
        shadow-2xl text-white z-10"
      >
        <h2 className="text-3xl font-bold text-center mb-6">
          Login
        </h2>

        <form onSubmit={dataSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="text-sm block mb-2">
              Email
            </label>

            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              required
              className="w-full px-4 py-3 rounded-lg
              bg-black/30 border border-white/20
              outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm block mb-2">
              Password
            </label>

            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              required
              className="w-full px-4 py-3 rounded-lg
              bg-black/30 border border-white/20
              outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg
            bg-gradient-to-r from-purple-600 to-blue-600
            hover:opacity-90 transition font-semibold"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-5 text-sm text-white/70">
          Don't have an account?{' '}
          <Link
            href={`/signup?redirect=${redirectTo}`}
            className="text-purple-400 hover:text-purple-300"
          >
            Registration
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;