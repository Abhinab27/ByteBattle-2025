"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import { useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import { GridBackground } from "../components/ui/grid-background";
import { Calendar, ArrowRight, CheckCircle2, Clock, Sparkles } from "lucide-react";

const events = [
  {
    title: "Registration Portal Opens",
    date: "2025-11-15",
    mode: "Online",
    details: "Registration opens for ByteBattle NIT Silchar national hackathon.",
    extra: [
      "100% Free registration — no fee required",
      "Teams of 3 members",
      "Open to university and college students nationwide",
    ],
    targetLabel: "Register Team",
    targetUrl: "/register",
  },
  {
    title: "Hackathon Briefing & Launch Meetup",
    date: "2025-12-05",
    mode: "Virtual",
    details: "Kickoff session, problem domain orientation, and event guidelines.",
    extra: ["Event overview & rules", "Q&A with mentor panel", "Meet organizers & sponsors"],
    targetLabel: "Join Meetup",
    targetUrl: "/meetup",
  },
  {
    title: "Round 1 — Online Screening Assessment",
    date: "2025-12-15",
    mode: "Online Test",
    details: "20 randomized MCQs on programming, DSA, and problem solving. Scoring ≥ 45% qualifies for Round 2.",
    extra: [
      "20 randomized questions per team",
      "30-minute timed assessment",
      "Threshold: ≥ 45% correct answers to unlock Round 2",
    ],
    targetLabel: "Start Assessment",
    targetUrl: "/assessment",
  },
  {
    title: "AI/ML & Innovation Bootcamp",
    date: "2025-12-28",
    mode: "Virtual Workshop",
    details: "Hands-on technical sessions covering AI/ML problem statements, architecture, and APIs.",
    extra: ["AI/ML deep dive", "System design & cloud architecture", "Mentorship office hours"],
    targetLabel: "Workshop Details",
    targetUrl: "/bootcamp",
  },
  {
    title: "Round 2 — Project & Idea Submission Deadline",
    date: "2026-01-20",
    mode: "Online Submission",
    details: "Qualified teams submit problem statements, architecture diagrams, GitHub repositories, and demo videos.",
    extra: [
      "Project description & problem statement",
      "GitHub repository link",
      "Working video demonstration URL",
    ],
    targetLabel: "Submit Project",
    targetUrl: "/round2",
  },
  {
    title: "Round 2 Results & Finalist Announcements",
    date: "2026-01-30",
    mode: "Online Announcement",
    details: "Jury evaluation concludes; top 10 finalist teams shortlisted for the on-campus grand finale.",
    extra: [
      "Top 10 finalist teams announced",
      "Travel grant guidelines provided",
      "Assigned mentor alignment for finals",
    ],
    targetLabel: "Check Status",
    targetUrl: "/round2",
  },
  {
    title: "Round 3 — On-Campus Grand Finale (NIT Silchar)",
    date: "2026-02-20",
    mode: "Offline • NIT Silchar Campus",
    details: "48-hour live coding marathon, judge presentations, and ₹1,20,000+ cash award distribution.",
    extra: [
      "48-hour intense on-campus hackathon",
      "Live presentation to industry jury",
      "₹1,20,000+ total prizes & trophies",
    ],
    targetLabel: "Final Details",
    targetUrl: "/prizes",
  },
];

export default function EventsRoadmap() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const myRegistration = useQuery(api.teamRegistrations.getMyRegistration, {});
  const isRegistered = !!myRegistration;

  const round1Status = useQuery(
    api.round1.getMyRound1,
    myRegistration?._id ? { teamId: myRegistration._id } : "skip"
  );

  const round2Status = useQuery(
    api.round2.getRound2Status,
    myRegistration?._id ? { teamId: myRegistration._id } : "skip"
  );

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="flex flex-col min-h-screen text-white">
      <GridBackground />
      <Navbar />

      <main className="grow px-6 pt-36 pb-20">
        <div className="max-w-5xl mx-auto">
          {/* HEADER */}
          <div className="text-center mb-16">
            <span className="px-3.5 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-semibold uppercase tracking-wider inline-block mb-3">
              Official Hackathon Roadmap
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              ByteBattle <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">2025–2026</span>
            </h1>
            <p className="text-gray-400 text-sm sm:text-base mt-2 max-w-xl mx-auto">
              Follow your team&apos;s journey from screening to the NIT Silchar campus grand finale.
            </p>

            {isRegistered && (
              <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-xl bg-green-950/40 border border-green-500/40 text-green-300 text-xs font-semibold">
                <CheckCircle2 size={16} />
                Team &quot;{myRegistration.teamName}&quot; is registered (Free Entry Confirmed)
              </div>
            )}
          </div>

          {/* TIMELINE */}
          <div className="space-y-8 relative border-l border-red-600/30 ml-4 sm:ml-8 pl-6 sm:pl-10">
            {events.map((ev, idx) => {
              const isRound1 = ev.title.includes("Round 1");
              const isRound2 = ev.title.includes("Round 2 — Project");

              return (
                <div key={idx} className="relative group">
                  {/* Timeline bullet dot */}
                  <div className="absolute -left-[31px] sm:-left-[47px] top-6 w-4 h-4 rounded-full bg-gradient-to-r from-red-500 to-red-600 border-2 border-black shadow-[0_0_12px_rgba(255,0,0,0.8)] group-hover:scale-125 transition-transform" />

                  <div className="bg-gradient-to-br from-red-950/30 via-black/60 to-red-950/20 border border-red-500/30 rounded-3xl p-6 shadow-xl hover:border-red-500/60 transition-all duration-300">
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                      <span className="text-xs px-3 py-1 rounded-full bg-red-600/20 text-red-300 border border-red-500/30 font-semibold uppercase tracking-wider">
                        {ev.mode}
                      </span>
                      <div className="flex items-center gap-1.5 text-xs text-white/50 font-mono">
                        <Calendar size={13} className="text-red-400" />
                        <span>{ev.date}</span>
                      </div>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-white mt-2">
                      {ev.title}
                    </h2>
                    <p className="text-gray-300 text-sm mt-2 leading-relaxed">
                      {ev.details}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 mt-4 pt-3 border-t border-white/5">
                      <button
                        onClick={() => toggle(idx)}
                        className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-semibold text-white/70 hover:text-white transition cursor-pointer"
                      >
                        {openIndex === idx ? "Hide Details" : "View Details"}
                      </button>

                      {/* ROUND 1 ACTION */}
                      {isRound1 && (
                        isRegistered ? (
                          round1Status?.attempted ? (
                            round1Status.cleared ? (
                              <span className="px-3 py-1.5 rounded-xl bg-green-500/20 text-green-300 border border-green-500/40 text-xs font-semibold flex items-center gap-1.5">
                                <CheckCircle2 size={14} /> Round 1 Cleared (Score: {round1Status.score})
                              </span>
                            ) : (
                              <span className="px-3 py-1.5 rounded-xl bg-red-500/20 text-red-300 border border-red-500/40 text-xs font-semibold">
                                Round 1 Attempted (Score: {round1Status.score})
                              </span>
                            )
                          ) : (
                            <Link
                              href={`/assesment/${myRegistration._id}`}
                              className="px-5 py-2 rounded-xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white text-xs font-bold shadow-[0_0_15px_rgba(255,0,0,0.4)] flex items-center gap-1.5 transition hover:scale-105 cursor-pointer animate-pulse"
                            >
                              <span>Take Round 1 Test</span>
                              <ArrowRight size={14} />
                            </Link>
                          )
                        ) : (
                          <Link
                            href="/register"
                            className="px-4 py-2 rounded-xl bg-red-600/20 text-red-300 border border-red-500/30 text-xs font-semibold hover:bg-red-600/30"
                          >
                            Register to Unlock
                          </Link>
                        )
                      )}

                      {/* ROUND 2 ACTION */}
                      {isRound2 && (
                        isRegistered ? (
                          round1Status?.cleared ? (
                            round2Status?.submitted ? (
                              <span className="px-3 py-1.5 rounded-xl bg-green-500/20 text-green-300 border border-green-500/40 text-xs font-semibold flex items-center gap-1.5">
                                <CheckCircle2 size={14} /> Project Submitted
                              </span>
                            ) : (
                              <Link
                                href="/round2"
                                className="px-5 py-2 rounded-xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white text-xs font-bold shadow-[0_0_15px_rgba(255,0,0,0.4)] flex items-center gap-1.5 transition hover:scale-105"
                              >
                                <span>Submit Round 2 Project</span>
                                <ArrowRight size={14} />
                              </Link>
                            )
                          ) : (
                            <span className="px-3 py-1.5 rounded-xl bg-white/5 text-white/40 border border-white/5 text-xs">
                              Locked • Requires Round 1 clearance (≥45%)
                            </span>
                          )
                        ) : null
                      )}
                    </div>

                    {/* EXPANDABLE DETAILS */}
                    {openIndex === idx && (
                      <div className="mt-4 pt-4 border-t border-red-500/20">
                        <ul className="space-y-2 text-xs text-gray-300">
                          {ev.extra.map((point, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <span className="text-red-400 font-bold">•</span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
