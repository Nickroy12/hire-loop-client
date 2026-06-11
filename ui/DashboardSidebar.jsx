"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, LayoutDashboard, User,BriefcaseBusiness, Settings } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import Image from "next/image";

export default function DashboardSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { data: session, isPending } = useSession();

  const links = [
    {
      name: "Dashboard",
      href: "/dashboard/recruiter",
      icon: LayoutDashboard,
    },
    {
      name: "My Company",
      href: "/dashboard/recruiter/Company",
      icon: User,
    },
    {
      name: "New Job Post",
      href: "/dashboard/recruiter/job/new",
      icon: BriefcaseBusiness,
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ];

  const userImage = session?.user?.image;

  const SidebarContent = () => (
    <div className="flex flex-col h-fit text-white">
      
      {/* Profile Section */}
      <div className="p-4 border-b border-white/10 flex items-center gap-3">
        {userImage ? (
          <Image
            src={userImage}
            width={40}
            height={40}
            alt="profile"
            className="rounded-full object-cover border border-white/20"
          />
        ) : (
          <div className="w-10  rounded-full bg-white/10 flex items-center justify-center text-sm font-bold">
            {session?.user?.name?.charAt(0) || "U"}
          </div>
        )}

        <div className="text-sm space-y-1">
          <p className="font-semibold">
            {session?.user?.name || "User"}
          </p>
          <p className="text-gray-400 text-xs">
            {session?.user?.email}
          </p>
          <span className="bg-zinc-400/40 px-4 rounded-3xl py-1 ">{session?.user?.role}</span>
        </div>
      </div>

      {/* Links */}
      <div className="flex-1 p-4 space-y-2">
        {links.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                active
                  ? "bg-white/10 text-white"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon size={18} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden p-4">
        <button onClick={() => setOpen(true)} className="text-white">
          <Menu size={24} />
        </button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64  bg-zinc-950 border-r border-white/10">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-50 md:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Overlay */}
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Drawer */}
        <div
          className={`absolute top-0 left-0 h-screen w-72 bg-zinc-950 border-r border-white/10 transform transition-transform duration-300 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <h2 className="text-white font-semibold">Dashboard</h2>

            <button onClick={() => setOpen(false)} className="text-white">
              <X size={22} />
            </button>
          </div>

          <SidebarContent />
        </div>
      </div>
    </>
  );
}