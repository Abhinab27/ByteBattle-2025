"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useConvexAuth, useQuery, useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { useUser, SignInButton } from "@clerk/clerk-react";
import { Spinner } from "../../../components/spinner";
import { api } from "../../../convex/_generated/api";
import { GridBackground } from "../components/ui/grid-background";
import { CheckCircle2, Sparkles, LogIn } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { isLoaded: isClerkLoaded, isSignedIn, user } = useUser();
  const { isAuthenticated, isLoading: isConvexLoading } = useConvexAuth();

  /* ---------------------------------------
      FORM STATE
  ---------------------------------------- */
  const [form, setForm] = useState({
    teamName: "",
    institution: "",
    leaderName: "",
    leaderEmail: "",
    member1Name: "",
    member1Email: "",
    member2Name: "",
    member2Email: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Auto-populate leader info from Clerk user if available
  useEffect(() => {
    if (user && !form.leaderEmail) {
      setForm((prev) => ({
        ...prev,
        leaderEmail: user.primaryEmailAddress?.emailAddress || prev.leaderEmail,
        leaderName: user.fullName || prev.leaderName,
      }));
    }
  }, [user]);

  /* ---------------------------------------
      ALL QUERIES + MUTATIONS AT TOP
  ---------------------------------------- */
  const myRegistration = useQuery(api.teamRegistrations.getMyRegistration, {});

  const teamNameCheck = useQuery(
    api.teamRegistrations.isTeamNameTaken,
    form.teamName ? { teamName: form.teamName } : "skip"
  );

  const leaderEmailCheck = useQuery(
    api.teamRegistrations.isEmailUsed,
    form.leaderEmail ? { email: form.leaderEmail } : "skip"
  );

  const member1EmailCheck = useQuery(
    api.teamRegistrations.isEmailUsed,
    form.member1Email ? { email: form.member1Email } : "skip"
  );

  const member2EmailCheck = useQuery(
    api.teamRegistrations.isEmailUsed,
    form.member2Email ? { email: form.member2Email } : "skip"
  );

  const createRegistration = useMutation(api.teamRegistrations.createRegistration);

  /* ---------------------------------------
      INPUT HANDLER
  ---------------------------------------- */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ---------------------------------------
      SUBMIT HANDLER
  ---------------------------------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const {
      teamName,
      institution,
      leaderName,
      leaderEmail,
      member1Name,
      member1Email,
      member2Name,
      member2Email,
    } = form;

    if (
      !teamName ||
      !institution ||
      !leaderName ||
      !leaderEmail ||
      !member1Name ||
      !member1Email ||
      !member2Name ||
      !member2Email
    ) {
      setError("⚠️ Please fill in all required fields.");
      return;
    }

    const emails = [leaderEmail, member1Email, member2Email];
    if (new Set(emails).size !== emails.length) {
      setError("⚠️ Team member emails must be unique.");
      return;
    }

    if (leaderEmailCheck || member1EmailCheck || member2EmailCheck) {
      setError("⚠️ One of the email addresses is already registered with another team.");
      return;
    }

    if (teamNameCheck) {
      setError("⚠️ Team name is already taken. Please choose another name.");
      return;
    }

    try {
      await createRegistration({
        teamName,
        institution,
        leaderName,
        leaderEmail,
        member1Name,
        member1Email,
        member2Name,
        member2Email,
      });

      setSuccess(true);
    } catch (err: any) {
      setError(err?.message || "Failed to submit registration. Please try again.");
    }
  };

  /* ---------------------------------------
      LOADING STATE
  ---------------------------------------- */
  if (!isClerkLoaded || isConvexLoading) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        <GridBackground />
        <Spinner size="icon" />
      </div>
    );
  }

  /* ---------------------------------------
      NOT SIGNED IN STATE
  ---------------------------------------- */
  if (!isSignedIn) {
    return (
      <div className="flex flex-col min-h-screen text-white">
        <GridBackground />
        <Navbar />
        <div className="h-screen flex items-center justify-center text-center px-4">
          <div className="max-w-md w-full bg-black/70 border border-red-500/30 rounded-3xl p-8 shadow-2xl backdrop-blur-xl">
            <div className="w-14 h-14 mx-auto mb-4 bg-red-600/20 border border-red-500/40 rounded-full flex items-center justify-center text-red-400">
              <LogIn size={26} />
            </div>
            <h2 className="text-2xl font-extrabold mb-2 text-white">Sign In Required</h2>
            <p className="text-white/60 text-sm mb-6">
              Please sign in with your account to register your team for ByteBattle.
            </p>
            <SignInButton mode="modal" forceRedirectUrl="/register">
              <button className="w-full py-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 rounded-xl font-bold text-white shadow-lg shadow-red-600/30 transition hover:scale-105 cursor-pointer">
                Sign In to Continue
              </button>
            </SignInButton>
          </div>
        </div>
      </div>
    );
  }

  /* ---------------------------------------
      SUCCESS SCREEN
  ---------------------------------------- */
  if (success) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center text-white px-6">
        <GridBackground />
        <div className="max-w-md w-full bg-black/70 border border-green-500/30 rounded-3xl p-8 text-center shadow-[0_0_50px_rgba(34,197,94,0.2)]">
          <div className="w-16 h-16 mx-auto mb-4 bg-green-500/20 border border-green-500/40 rounded-full flex items-center justify-center text-green-400">
            <CheckCircle2 size={36} />
          </div>
          <h1 className="text-3xl font-extrabold mb-3 text-white">
            Registration Confirmed!
          </h1>
          <p className="text-gray-300 text-sm mb-6">
            Your team is officially registered for{" "}
            <span className="text-red-400 font-semibold">ByteBattle 2026</span>. Entry is 100% free with instant clearance.
          </p>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => router.push("/events")}
              className="w-full py-3 bg-gradient-to-r from-red-600 to-red-500 rounded-xl text-white font-semibold shadow-lg shadow-red-600/30 cursor-pointer"
            >
              View Competition Roadmap
            </button>
            <button
              onClick={() => router.push("/")}
              className="w-full py-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-white/80 font-medium text-sm transition cursor-pointer"
            >
              Go to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ---------------------------------------
      ALREADY REGISTERED SCREEN
  ---------------------------------------- */
  if (myRegistration) {
    return (
      <div className="flex flex-col min-h-screen text-white">
        <GridBackground />
        <Navbar />

        <div className="h-screen flex items-center justify-center text-center px-4">
          <div className="max-w-md w-full bg-black/60 border border-white/10 rounded-3xl p-8 shadow-2xl">
            <div className="w-14 h-14 mx-auto mb-4 bg-red-600/20 border border-red-500/40 rounded-full flex items-center justify-center text-red-400">
              <Sparkles size={28} />
            </div>
            <h1 className="text-3xl font-bold mb-3">Already Registered!</h1>

            <p className="text-gray-300 mb-6 text-sm">
              Your team{" "}
              <span className="text-red-400 font-semibold">
                &quot;{myRegistration.teamName}&quot;
              </span>{" "}
              is confirmed and ready for Round 1.
            </p>

            <div className="flex flex-col gap-3">
              <a
                href="/events"
                className="bg-gradient-to-r from-red-600 to-red-500 py-3 rounded-xl text-white font-semibold shadow-lg shadow-red-600/30"
              >
                Go to Rounds Timeline
              </a>
              <a
                href="/"
                className="bg-white/5 hover:bg-white/10 py-2.5 rounded-xl text-white/70 text-sm font-medium transition"
              >
                Go Back Home
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ---------------------------------------
      REGISTRATION FORM
  ---------------------------------------- */
  return (
    <div className="flex flex-col text-white min-h-screen">
      <GridBackground />
      <Navbar />

      <div className="px-6 pt-32 pb-20 flex-1">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <span className="px-3.5 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-300 text-xs font-semibold uppercase tracking-wider inline-block mb-3">
              Free Entry — No Registration Fee
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Register for <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">ByteBattle</span>
            </h1>
            <p className="text-white/50 text-sm mt-2">
              NIT Silchar National Hackathon • Round 1 Begins Dec 2025
            </p>
          </div>

          {error && (
            <div className="p-4 mb-6 rounded-2xl bg-red-950/60 border border-red-500/40 text-red-300 text-sm text-center">
              {error}
            </div>
          )}

          <div className="backdrop-blur-xl bg-black/60 border border-red-500/20 p-6 sm:p-8 rounded-3xl shadow-[0_0_40px_rgba(255,0,0,0.15)]">
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* TEAM INFO */}
              <div>
                <h3 className="text-sm font-bold text-red-400 uppercase tracking-wider mb-3">
                  1. Team Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-red-500 focus:outline-none"
                    name="teamName"
                    placeholder="Team Name"
                    value={form.teamName}
                    onChange={handleChange}
                    required
                  />
                  <input
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-red-500 focus:outline-none"
                    name="institution"
                    placeholder="Institution / College Name"
                    value={form.institution}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* LEADER INFO */}
              <div>
                <h3 className="text-sm font-bold text-red-400 uppercase tracking-wider mb-3">
                  2. Team Leader (Primary Contact)
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-red-500 focus:outline-none"
                    name="leaderName"
                    placeholder="Leader Full Name"
                    value={form.leaderName}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="email"
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-red-500 focus:outline-none"
                    name="leaderEmail"
                    placeholder="Leader Email Address"
                    value={form.leaderEmail}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* MEMBERS */}
              <div>
                <h3 className="text-sm font-bold text-red-400 uppercase tracking-wider mb-3">
                  3. Team Members
                </h3>
                <div className="space-y-3">
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-red-500 focus:outline-none"
                      name="member1Name"
                      placeholder="Member 1 Full Name"
                      value={form.member1Name}
                      onChange={handleChange}
                      required
                    />
                    <input
                      type="email"
                      className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-red-500 focus:outline-none"
                      name="member1Email"
                      placeholder="Member 1 Email Address"
                      value={form.member1Email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-red-500 focus:outline-none"
                      name="member2Name"
                      placeholder="Member 2 Full Name"
                      value={form.member2Name}
                      onChange={handleChange}
                      required
                    />
                    <input
                      type="email"
                      className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-red-500 focus:outline-none"
                      name="member2Email"
                      placeholder="Member 2 Email Address"
                      value={form.member2Email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 rounded-xl text-white font-bold text-base shadow-[0_0_20px_rgba(255,0,0,0.4)] transition hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
              >
                Confirm Free Registration
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
