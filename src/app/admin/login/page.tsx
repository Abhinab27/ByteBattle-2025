// src/app/admin/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ByteBattleLogo from "@/app/components/ui/ByteBattleLogo";
import { ShieldCheck, ArrowLeft, KeyRound } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      let data;
      try {
        data = await res.json();
      } catch (err) {
        setError("Server returned invalid response");
        setLoading(false);
        return;
      }

      if (!res.ok) {
        setError(data?.error || "Login failed");
        setLoading(false);
        return;
      }

      router.push("/admin/dashboard");
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-[#140202] to-black px-6 py-12 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs text-white/50 hover:text-red-400 transition-colors mb-6 group"
        >
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
          Back to ByteBattle
        </Link>

        <form
          onSubmit={handleLogin}
          className="w-full bg-gradient-to-br from-red-950/40 via-black/70 to-red-950/30 backdrop-blur-2xl border border-red-600/30 rounded-3xl p-8 sm:p-10 shadow-[0_0_50px_rgba(255,0,0,0.2)]"
        >
          {/* HEADER */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-black/60 border border-red-500/30 shadow-[0_0_25px_rgba(255,0,0,0.4)] flex items-center justify-center">
              <ByteBattleLogo size={42} />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-semibold mb-2">
              <ShieldCheck size={14} className="text-red-400" />
              Admin Portal
            </div>

            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              ByteBattle Admin
            </h1>
            <p className="text-white/50 mt-1 text-sm">
              Manage teams, questions & hackathon rounds
            </p>
          </div>

          {/* INPUT FIELDS */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1.5">
                Admin Email
              </label>
              <input
                type="email"
                placeholder="admin@bytebattle.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl px-4 py-3 bg-black/50 border border-red-500/20 text-white placeholder:text-white/20 focus:border-red-500 focus:ring-2 focus:ring-red-600/40 outline-none transition-all text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-white/70 mb-1.5 flex justify-between">
                <span>Password</span>
                <span className="text-red-400/70 font-normal">Default: admin123</span>
              </label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl px-4 py-3 bg-black/50 border border-red-500/20 text-white placeholder:text-white/20 focus:border-red-500 focus:ring-2 focus:ring-red-600/40 outline-none transition-all text-sm"
                required
              />
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-950/50 border border-red-500/30 text-red-300 text-xs">
                {error}
              </div>
            )}
          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white py-3 rounded-xl font-semibold 
            shadow-[0_0_20px_rgba(255,0,0,0.35)] border border-red-400/30 
            hover:shadow-[0_0_30px_rgba(255,0,0,0.6)] hover:scale-[1.01] active:scale-[0.99]
            transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <KeyRound size={16} />
                <span>Log In to Dashboard</span>
              </>
            )}
          </button>

          {/* QUICK CREDENTIALS HELPER */}
          <div className="mt-6 p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white/60 space-y-1">
            <p className="font-semibold text-white/80">Authorized Admin Accounts:</p>
            <p>• <code className="text-red-300 font-mono">admin@bytebattle.com</code></p>
            <p>• <code className="text-red-300 font-mono">alimdwahid83@gmail.com</code></p>
            <p className="text-white/40 pt-1 text-[11px]">
              Password: <code className="text-white/70 font-mono">admin123</code> (can be customized via <code className="text-white/70 font-mono">ADMIN_PASSWORD</code>)
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
