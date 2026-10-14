"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../../../../convex/_generated/api";
import { Star, CheckCircle2, XCircle, Search, Trophy, Users } from "lucide-react";

export default function Round1LeaderboardPage() {
  const leaderboard = useQuery(api.round1.getRound1Leaderboard);
  const [search, setSearch] = useState("");

  if (!leaderboard) {
    return <div className="text-white/50 py-12 text-center">Loading leaderboard data...</div>;
  }

  const filtered = leaderboard.filter((team) =>
    team.teamName.toLowerCase().includes(search.toLowerCase()) ||
    team.institution.toLowerCase().includes(search.toLowerCase())
  );

  const qualifiedCount = leaderboard.filter(
    (t) => t.cleared ?? ((t.score ?? 0) >= 18)
  ).length;

  return (
    <div className="space-y-6 text-white pb-12">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-red-500/20">
        <div>
          <h1 className="text-3xl font-extrabold flex items-center gap-3">
            <Star className="text-red-400" />
            Round 1 Scores &amp; Leaderboard
          </h1>
          <p className="text-sm text-white/50 mt-1">
            Teams scoring <span className="text-green-400 font-semibold">≥ 45% (18+ points)</span> automatically qualify for Round 2.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-red-950/30 border border-red-500/30 rounded-xl text-sm font-semibold text-red-300 flex items-center gap-2">
            <Trophy size={16} className="text-yellow-400" />
            Qualified Teams: <span className="text-white font-bold">{qualifiedCount}</span> / {leaderboard.length}
          </div>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="relative w-full sm:w-80">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
        <input
          type="text"
          placeholder="Search team or institution..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 bg-black/40 border border-white/10 rounded-xl text-sm focus:border-red-500 focus:outline-none"
        />
      </div>

      {/* TABLE */}
      <div className="bg-black/60 rounded-2xl border border-white/10 overflow-hidden shadow-xl">
        <table className="min-w-full text-left text-sm">
          {/* TABLE HEADER */}
          <thead className="bg-white/5 border-b border-white/10 text-white/50 uppercase text-xs">
            <tr>
              <th className="px-6 py-3.5">Rank</th>
              <th className="px-6 py-3.5">Team Name &amp; Institution</th>
              <th className="px-6 py-3.5 text-center">Round 1 Score</th>
              <th className="px-6 py-3.5 text-center">Percentage</th>
              <th className="px-6 py-3.5 text-right">Status</th>
            </tr>
          </thead>

          {/* TABLE BODY */}
          <tbody className="divide-y divide-white/5">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-white/40">
                  No assessment results found.
                </td>
              </tr>
            ) : (
              filtered.map((team, idx) => {
                // ⭐ TRUE QUALIFICATION LOGIC: team.cleared from database, or score >= 18 (45% of 40)
                const isQualified = team.cleared ?? ((team.score ?? 0) >= 18);
                const score = team.score ?? 0;
                // Max score is 40 (20 questions * 2 pts)
                const percentage = Math.round((score / 40) * 100);

                return (
                  <tr
                    key={team.teamId}
                    className="hover:bg-white/5 transition"
                  >
                    {/* RANK */}
                    <td className="px-6 py-4 font-mono font-bold text-white/70">
                      {idx === 0 ? "🥇 1" : idx === 1 ? "🥈 2" : idx === 2 ? "🥉 3" : `#${idx + 1}`}
                    </td>

                    {/* TEAM NAME */}
                    <td className="px-6 py-4">
                      <div className="font-bold text-white text-base">{team.teamName}</div>
                      <div className="text-xs text-white/40 mt-0.5">{team.institution}</div>
                    </td>

                    {/* SCORE */}
                    <td className="px-6 py-4 text-center font-bold font-mono text-lg text-white">
                      {score} <span className="text-xs text-white/40 font-normal">/ 40 pts</span>
                    </td>

                    {/* PERCENTAGE */}
                    <td className="px-6 py-4 text-center font-mono text-sm text-white/80">
                      <span className={percentage >= 45 ? "text-green-400 font-semibold" : "text-red-400"}>
                        {percentage}%
                      </span>
                    </td>

                    {/* QUALIFIED BADGE */}
                    <td className="px-6 py-4 text-right">
                      {isQualified ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/20 text-green-300 border border-green-500/40 text-xs font-bold uppercase tracking-wider">
                          <CheckCircle2 size={13} />
                          Qualified
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-500/40 text-xs font-bold uppercase tracking-wider">
                          <XCircle size={13} />
                          Not Qualified (&lt;45%)
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
