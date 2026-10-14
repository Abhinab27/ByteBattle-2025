"use client";

import { GridBackground } from "@/app/components/ui/grid-background";
import { Grid } from "lucide-react";

import Sidebar from "@/app/components/admin/Sidebar";
import Topbar from "@/app/components/admin/Topbar";


export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen text-white">
      <GridBackground />
      {/* Sidebar */}
      <Sidebar />

      {/* Topbar + Main */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar />

        <main className="p-6 overflow-y-auto h-[calc(100vh-64px)]">
          {children}
        </main>
      </div>
    </div>
  );
}
