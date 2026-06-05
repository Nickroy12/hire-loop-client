"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  User,
  LayoutDashboard,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";

import { useSession, authClient } from "@/lib/auth-client";

const Navbar = () => {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const dropdownRef = useRef(null);

  const { data: session, isPending } = useSession();

  const navItems = [
    { name: "Browse Jobs", href: "/jobs" },
    { name: "Companies", href: "/companies" },
    { name: "Pricing", href: "/pricing" },
  ];

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    await authClient.signOut();
  };

  return (
    <div className="fixed z-100 top-0 w-full flex justify-center mt-4">
      {/* 🔥 FIX: z-index added here */}
      <nav className="w-11/12 md:w-10/12 relative z-50">

        <div className="flex items-center justify-between px-5 py-3 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 shadow-xl">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-violet-600 text-white flex items-center justify-center font-bold">
              H
            </div>
            <span className="text-white font-semibold text-lg">
              HireLoop
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const active = pathname === item.href;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`transition ${
                      active
                        ? "text-white font-medium"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center gap-3">
            {isPending ? (
              <p className="text-gray-400 text-sm">Loading...</p>
            ) : session ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-3 px-2 py-1 rounded-xl hover:bg-white/5 transition"
                >
                  <img
                    src={
                      session.user.image ||
                      `https://ui-avatars.com/api/?name=${session.user.name}`
                    }
                    alt="profile"
                    className="w-10 h-10 rounded-full object-cover border border-white/20"
                  />

                  <div className="text-left">
                    <p className="text-white text-sm font-medium">
                      {session.user.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {session.user.email}
                    </p>
                  </div>

                  <ChevronDown size={16} className="text-gray-400" />
                </button>

                {/* 🔥 FIX: high z-index dropdown */}
                {profileOpen && (
                  <div className="absolute right-0 mt-3 w-64 rounded-2xl bg-zinc-900 border border-white/10 shadow-2xl z-[9999] overflow-hidden">

                    <div className="p-4 border-b border-white/10">
                      <p className="text-white font-medium">
                        {session.user.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {session.user.email}
                      </p>
                    </div>

                    <div className="p-2">
                      <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-white/5">
                        <LayoutDashboard size={18} /> Dashboard
                      </Link>

                      <Link href="/profile" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-white/5">
                        <User size={18} /> Profile
                      </Link>

                      <Link href="/settings" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-white/5">
                        <Settings size={18} /> Settings
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/10"
                      >
                        <LogOut size={18} /> Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/login" className="text-gray-300 hover:text-white">
                  Sign In
                </Link>

                <Link
                  href="/signup"
                  className="bg-white text-black px-4 py-2 rounded-xl font-medium hover:bg-gray-200"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          {session ? (
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden relative"
            >
              <img
                src={
                  session.user.image ||
                  `https://ui-avatars.com/api/?name=${session.user.name}`
                }
                alt="profile"
                className="w-10 h-10 rounded-full object-cover border border-white/20"
              />

              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-violet-600 flex items-center justify-center">
                <ChevronDown size={10} className="text-white" />
              </div>
            </button>
          ) : (
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden text-white"
            >
              {open ? <X /> : <Menu />}
            </button>
          )}
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden mt-2 rounded-2xl bg-black/70 backdrop-blur-md border border-white/10 p-4">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-300 hover:text-white"
                >
                  {item.name}
                </Link>
              ))}

              <hr className="border-white/10" />

              {isPending ? (
                <p className="text-gray-400 text-sm">Loading...</p>
              ) : session ? (
                <>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                    <div className="min-w-0">
                      <p className="text-white font-medium truncate">
                        Hi! {session.user.name}
                      </p>
                      <p className="text-xs text-gray-400 truncate">
                        {session.user.email}
                      </p>
                    </div>
                  </div>

                  <Link href="/dashboard" className="text-gray-300 flex items-center gap-2">
                    <LayoutDashboard size={18} /> Dashboard
                  </Link>

                  <Link href="/profile" className="text-gray-300 flex items-center gap-2">
                    <User size={18} /> Profile
                  </Link>

                  <Link href="/settings" className="text-gray-300 flex items-center gap-2">
                    <Settings size={18} /> Settings
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="text-red-400 flex items-center gap-2 text-left"
                  >
                    <LogOut size={18} /> Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="text-gray-300">
                    Sign In
                  </Link>

                  <Link
                    href="/signup"
                    className="bg-white text-black text-center py-2 rounded-lg"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;