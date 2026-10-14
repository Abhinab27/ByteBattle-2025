"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Users,
  ClipboardList,
  Star,
  Mail,
  LogOut,
  HelpCircle,
  ShieldCheck,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { section: "Main" },
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },

    { section: "Hackathon Management" },
    { name: "All Teams", href: "/admin/dashboard/teams", icon: Users },
    { name: "Questions Bank", href: "/admin/dashboard/questions", icon: HelpCircle },
    { name: "Round 1 Leaderboard", href: "/admin/dashboard/round1/leaderboard", icon: Star },
    { name: "Round 2 Submissions", href: "/admin/dashboard/round2/submissions", icon: ClipboardList },

    { section: "Administration" },
    { name: "Manage Admins", href: "/admin/dashboard/admins", icon: ShieldCheck },

    { section: "Email Broadcasts" },
    { name: "Registration Emails", href: "/admin/dashboard/emails/registration", icon: Mail },
    { name: "Round 1 Emails", href: "/admin/dashboard/emails/round1", icon: Mail },
    { name: "Round 2 Emails", href: "/admin/dashboard/emails/round2", icon: Mail },
    { name: "Finalists Emails", href: "/admin/dashboard/emails/finalists", icon: Mail },
  ];

  // LOGOUT
  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  };

  return (
    <aside className="w-64 bg-gradient-to-b from-black to-[#180000] backdrop-blur-xl border-r border-red-800/20 flex flex-col overflow-y-auto shadow-[0_0_25px_rgba(255,0,0,0.2)] shrink-0">
      {/* HEADER */}
      <div className="p-6 border-b border-red-700/20 bg-black/40">
        <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(255,0,0,0.4)]">
          Admin Panel
        </h1>
        <p className="text-xs text-white/40 mt-1">ByteBattle Control Room</p>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        {links.map((item, i) =>
          item.section ? (
            <p 
              key={i} 
              className="text-[10px] font-bold uppercase tracking-wider mt-5 mb-1.5 px-3 text-red-400/60"
            >
              {item.section}
            </p>
          ) : (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                pathname === item.href
                  ? "bg-red-600/20 border border-red-500/40 shadow-[0_0_15px_rgba(255,0,0,0.3)] text-red-200"
                  : "text-white/70 hover:text-red-300 hover:bg-red-950/20"
              }`}
            >
              <item.icon
                size={17}
                className={
                  pathname === item.href
                    ? "text-red-400 drop-shadow-[0_0_6px_rgba(255,0,0,0.7)]"
                    : "text-red-400/60"
                }
              />
              <span>{item.name}</span>
            </Link>
          )
        )}
      </nav>

      {/* LOGOUT */}
      <div className="p-4 border-t border-red-800/20 bg-black/40">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2.5 w-full text-left rounded-xl text-sm font-medium text-red-400 hover:bg-red-900/20 hover:text-red-300 transition-all duration-200 cursor-pointer"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </aside>
  );
}
