"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Browse Job", href: "/jobs" },
    { name: "Company", href: "/company" },
    { name: "Pricing", href: "/pricing" },
  ];

  return (
    <div className="w-full flex justify-center mt-4">
      <nav className="w-11/12 md:w-10/12">
        <div
          className="flex items-center justify-between px-4 py-3 rounded-2xl
          bg-black/60 backdrop-blur-md border border-white/10 shadow-lg"
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md flex justify-center items-center bg-purple-600 text-white">
              P
            </div>
            <span className="text-white font-semibold">HireLoop</span>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-6 text-sm">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`transition ${
                      isActive
                        ? "text-white font-medium"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="text-gray-300 hover:text-white text-sm"
            >
              Sign in
            </Link>

            <Link
              href="/signup"
              className="bg-white text-black px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-gray-200"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden mt-2 rounded-2xl bg-black/70 backdrop-blur-md border border-white/10 p-4 text-gray-300">
            <ul className="flex flex-col gap-3">
              {navItems.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`block ${
                        isActive ? "text-white font-medium" : ""
                      }`}
                      onClick={() => setOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}

              <hr className="border-white/10" />

              <li>
                <Link href="/login" onClick={() => setOpen(false)}>
                  Sign in
                </Link>
              </li>

              <li className="text-white font-medium">
                <Link href="/signup" onClick={() => setOpen(false)}>
                  Get Started
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;