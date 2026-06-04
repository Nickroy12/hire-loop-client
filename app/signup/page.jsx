"use client"
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import React from 'react'

const SignupPage = () => {
  const dataSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());
     const { data, error } = await authClient.signUp.email({
        name: user.name,
        email: user.email,
        password: user.password,
        image: user.image,
        callbackURL: '/',
      });

    console.log(data , "SIGN");


  };

  return (
    <div className="min-h-screen flex items-center justify-center  relative overflow-hidden">
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
          Sign up
        </h2>

        <form onSubmit={dataSubmit} className="space-y-5">
          <div>
  <label className="text-sm block mb-2">
    Name
  </label>

  <input
    name="name"
    type="text"
    placeholder="Enter your name"
    required
    className="w-full px-4 py-3 rounded-lg
    bg-black/30 border border-white/20
    outline-none focus:ring-2 focus:ring-purple-500"
  />
</div>

<div>
  <label className="text-sm block mb-2">
    Profile Image URL
  </label>

  <input
    name="image"
    type="url"
    placeholder="https://example.com/profile.jpg"
    className="w-full px-4 py-3 rounded-lg
    bg-black/30 border border-white/20
    outline-none focus:ring-2 focus:ring-purple-500"
  />
</div>
          <div>
            <label className="text-sm block mb-2">
              Email
            </label>

            <input
              name="email"
              type="email"
              placeholder="Enter email"
              required
              className="w-full px-4 py-3 rounded-lg
              bg-black/30 border border-white/20
              outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="text-sm block mb-2">
              Password
            </label>

            <input
              name="password"
              type="password"
              placeholder="Enter password"
              required
              className="w-full px-4 py-3 rounded-lg
              bg-black/30 border border-white/20
              outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg
            bg-gradient-to-r from-purple-600 to-blue-600
            hover:opacity-90 transition font-semibold"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center mt-5 text-sm text-white/70">
          Already have an account?{' '}
          <Link href={"/login"} className="text-purple-400 cursor-pointer">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage