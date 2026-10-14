"use client";

export default function Topbar() {
  return (
    <header className="h-16 bg-gradient-to-r from-black via-[#1a0000] to-black border-b border-red-700/30 shadow-[0_0_18px_rgba(255,0,0,0.25)] backdrop-blur-xl flex items-center justify-between px-6">
      {/* LEFT — Title */}
      <h2 className="text-lg font-bold tracking-wide bg-gradient-to-r from-red-400 to-red-600 text-transparent bg-clip-text drop-shadow-[0_0_10px_rgba(255,0,0,0.6)]">
        Hackathon Admin
      </h2>

      {/* RIGHT — Admin Badge */}
      <div className="flex items-center gap-3">
        <span className="px-3 py-1 text-sm font-semibold bg-red-700/20 border border-red-600/40 rounded-xl text-red-300 shadow-[0_0_10px_rgba(255,0,0,0.3)] backdrop-blur-md">
          Admin
        </span>
      </div>
    </header>
  );
}
