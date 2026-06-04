import React from "react";
import { FiSearch, FiMapPin } from "react-icons/fi";

const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden p-24 bg-[#030712]">
      {/* Background */}
      <div className="absolute inset-0 bg-[url('/globe.png')] bg-cover bg-center opacity-40" />

      {/* Gradient Glow */}
      <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/20 blur-[120px]" />

      <div className="relative z-10 w-11/12 max-w-7xl mx-auto min-h-screen flex items-center justify-center">
        <div className="max-w-5xl mt-3 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
            <span className="text-orange-400">🔒</span>
            <span className="text-gray-300 text-xs font-medium">
              95.00% • 18° • 95% • 11:16 07/10
            </span>
          </div>

          {/* Heading */}
          <h1 className="mt-8 text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight">
            Find Your Dream
            <span className="block bg-gradient-to-r from-violet-400 to-indigo-500 bg-clip-text text-transparent">
              Job Today
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-3xl mx-auto text-base md:text-lg text-gray-400 leading-relaxed">
            HireLoop connects top talent with world-class companies.
            Browse thousands of curated opportunities and land your next
            role faster than ever before.
          </p>

          {/* Search Bar */}
          <div className="mt-10 w-full max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-stretch md:items-center rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden shadow-[0_0_30px_rgba(99,102,241,0.15)]">

              {/* Job Input */}
              <div className="flex items-center flex-1 px-5 py-4">
                <FiSearch className="text-gray-500 text-xl shrink-0" />
                <input
                  type="text"
                  placeholder="Job title, skill or company"
                  className="ml-3 w-full bg-transparent text-white placeholder:text-gray-500 outline-none"
                />
              </div>

              {/* Divider */}
              <div className="hidden md:block h-10 w-px bg-white/10" />

              {/* Location Input */}
              <div className="flex items-center  px-5 py-4 border-t md:border-t-0 border-white/10">
                <FiMapPin className="text-gray-500 text-xl shrink-0" />
                <input
                  type="text"
                  placeholder="Location or Remote"
                  className="ml-3 w-full bg-transparent text-white placeholder:text-gray-500 outline-none"
                />
                              {/* Search Button */}
              <button className="m-2 h-14 w-14 shrink-0 rounded-xl bg-violet-600 hover:bg-violet-700 flex items-center justify-center transition-all duration-300 hover:scale-105">
                <FiSearch className="text-white text-xl" />
              </button>
              </div>


            </div>
          </div>

          {/* Stats */}
         <div className="mt-12 flex flex-wrap items-center justify-center gap-3 text-center">
  <span className="text-gray-400">Trending Posts</span>

  {["Designer", "Developer", "Marketing"].map((item) => (
    <button
      key={item}
      className="
        md:px-5 px-2 py-2.5
        rounded-full
        bg-white/5
        backdrop-blur-xl
        border border-white/10
        text-white
        text-sm
        font-medium
        transition-all duration-300
        hover:bg-white/10
        hover:border-violet-500/40
        hover:shadow-[0_0_25px_rgba(139,92,246,0.25)]
      "
    >
      {item}
    </button>
  ))}
</div>
        </div>
      </div>
    </section>
  );
};

export default Hero;