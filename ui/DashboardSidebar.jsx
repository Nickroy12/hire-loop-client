"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Home,
  Search,
  Bell,
  Briefcase,
  Mail,
  User,
  Settings,
  Bookmark,
  FileText,
  CreditCard,
  Users,
  Shield,
  Building2,
  LayoutDashboard,
} from "lucide-react";
import { useSession } from "@/lib/auth-client";
import Image from "next/image";

// Recruiter Navigation Links
const recruiterNavLinks = [
  { icon: Home, href: "/dashboard/recruiter", name: "Home" },
  { icon: Search, href: "/dashboard/recruiter/jobs", name: "Jobs" },
  { icon: Bell, href: "/dashboard/recruiter/job/new", name: "Post A Job" },
  { icon: Briefcase, href: "/dashboard/recruiter/Company", name: "Company Profile" },
  { icon: Mail, href: "/messages", name: "Messages" },
  { icon: User, href: "/profile", name: "Profile" },
  { icon: Settings, href: "/settings", name: "Settings" },
];

// Seeker Navigation Links
const seekerNavLinks = [
  { icon: Home, href: "/dashboard/seeker", name: "Dashboard" },
  { icon: Search, href: "/dashboard/seeker/jobs", name: "Jobs" },
  { icon: Bookmark, href: "/dashboard/seeker/saved-jobs", name: "Saved Jobs" },
  { icon: FileText, href: "/dashboard/seeker/Applications", name: "Applications" },
  { icon: CreditCard, href: "/dashboard/seeker/billing", name: "Billing" },
  { icon: Settings, href: "/settings", name: "Settings" },
];

// Admin Navigation Links
const adminNavLinks = [
  { icon: LayoutDashboard, href: "/dashboard/admin", name: "Dashboard" },
  { icon: Users, href: "/dashboard/admin/users", name: "Users" },
  { icon: Briefcase, href: "/dashboard/admin/jobs", name: "Jobs" },
  { icon: Building2, href: "/dashboard/admin/companies", name: "Companies" },
  { icon: Shield, href: "/dashboard/admin/roles", name: "Roles & Permissions" },
  { icon: Mail, href: "/dashboard/admin/messages", name: "Messages" },
  { icon: Settings, href: "/dashboard/admin/settings", name: "Settings" },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const { data: session } = useSession();

  const userRole = session?.user?.role?.toLowerCase();

  const links =
    userRole === "admin"
      ? adminNavLinks
      : userRole === "recruiter"
      ? recruiterNavLinks
      : seekerNavLinks;

  const userImage = session?.user?.image;

  const SidebarContent = () => (
    <div className="flex flex-col h-full text-white w-full">
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
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold shrink-0">
            {session?.user?.name?.charAt(0) || "U"}
          </div>
        )}

        <div className="text-sm space-y-1 min-w-0">
          <p className="font-semibold truncate">
            {session?.user?.name || "User"}
          </p>

          <p className="text-gray-400 text-xs truncate">
            {session?.user?.email}
          </p>

          <div className="pt-1">
            <span className="bg-zinc-800 text-zinc-300 px-2.5 py-0.5 rounded-full text-[10px] uppercase font-medium tracking-wider border border-white/5">
              {session?.user?.role || "Seeker"}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4 space-y-1 overflow-y-auto">
        {links.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href ||
            pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                active
                  ? "bg-white/10 text-white font-medium"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon size={18} />
              <span className="text-sm">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden border-b border-white/10 w-full">
        <button
          onClick={() => setOpen(true)}
          className="text-white"
        >
          <Menu size={24} />
        </button>

  
        <div className="w-6" />
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 h-screen sticky top-0 bg-zinc-950 border-r border-white/10">
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
          className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Drawer */}
        <div
          className={`absolute top-0 left-0 h-screen w-72 bg-zinc-950 border-r border-white/10 transform transition-transform duration-300 flex flex-col ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <h2 className="text-white font-semibold">Menu</h2>

            <button
              onClick={() => setOpen(false)}
              className="text-white"
            >
              <X size={22} />
            </button>
          </div>

          <SidebarContent />
        </div>
      </div>
    </>
  );
}