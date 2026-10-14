"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { 
  Users, 
  Search, 
  GraduationCap, 
  Mail, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Trash2,
  AlertTriangle,
  RotateCcw
} from "lucide-react";

export default function TeamsPage() {
  const teams = useQuery(api.teamRegistrations.getAllTeams);
  const leaderboard = useQuery(api.round1.getRound1Leaderboard);
  const deleteTeam = useMutation(api.teamRegistrations.deleteTeam);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deletingId, setDeletingId] = useState(null);
  const [notice, setNotice] = useState("");

  // Create a map of teamId -> round 1 assessment info
  const assessmentMap = new Map();
  if (leaderboard) {
    for (const item of leaderboard) {
      assessmentMap.set(item.teamId, item);
    }
  }

  const handleDeleteTeam = async (team) => {
    const confirmed = window.confirm(
      `⚠️ REMOVE TEAM: "${team.teamName}"?\n\n` +
      `This will completely delete this team's registration, wipe out their Round 1 assessment score, and remove any project submissions.\n\n` +
      `The team leader (${team.leaderEmail}) will be able to register again immediately and take the Round 1 test fresh.\n\n` +
      `Are you sure you want to proceed?`
    );

    if (!confirmed) return;

    setDeletingId(team._id);
    try {
      await deleteTeam({ teamId: team._id });
      setNotice(`Team "${team.teamName}" removed successfully. They can now re-register and retake Round 1.`);
      setTimeout(() => setNotice(""), 6000);
    } catch (err) {
      alert("Error removing team: " + err.message);
    } finally {
      setDeletingId(null);
    }
  };

  const filteredTeams = (teams || []).filter((team) => {
    const term = search.toLowerCase();
    const matchesSearch =
      team.teamName.toLowerCase().includes(term) ||
      team.institution.toLowerCase().includes(term) ||
      team.leaderName.toLowerCase().includes(term) ||
      team.leaderEmail.toLowerCase().includes(term) ||
      team.member1Name?.toLowerCase().includes(term) ||
      team.member2Name?.toLowerCase().includes(term);

    const ass = assessmentMap.get(team._id);
    let matchesStatus = true;
    if (statusFilter === "cleared") {
      matchesStatus = ass?.cleared === true;
    } else if (statusFilter === "attempted") {
      matchesStatus = ass?.attempted === true;
    } else if (statusFilter === "pending") {
      matchesStatus = !ass?.attempted;
    }

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 text-white pb-12">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-red-500/20">
        <div>
          <h1 className="text-3xl font-extrabold flex items-center gap-3">
            <Users className="text-red-400" />
            Hackathon Teams &amp; Participants
          </h1>
          <p className="text-sm text-white/50 mt-1">
            Review registered teams, remove teams to allow re-testing, and monitor Round 1 progression.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-red-950/30 border border-red-500/30 rounded-xl text-sm font-semibold text-red-300">
            Total Teams: <span className="text-white font-bold ml-1">{teams?.length ?? 0}</span>
          </div>
        </div>
      </div>

      {/* SUCCESS NOTICE */}
      {notice && (
        <div className="p-4 bg-green-950/60 border border-green-500/40 text-green-300 rounded-2xl text-sm flex items-center gap-2.5 shadow-lg">
          <RotateCcw size={18} className="text-green-400 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      {/* SEARCH AND FILTERS */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            placeholder="Search teams, institutions, names..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-black/40 border border-white/10 rounded-xl text-sm focus:border-red-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setStatusFilter("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
              statusFilter === "all"
                ? "bg-red-600 text-white shadow-md shadow-red-600/40"
                : "bg-white/5 text-white/60 hover:text-white"
            }`}
          >
            All Teams
          </button>
          <button
            onClick={() => setStatusFilter("cleared")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
              statusFilter === "cleared"
                ? "bg-red-600 text-white shadow-md shadow-red-600/40"
                : "bg-white/5 text-white/60 hover:text-white"
            }`}
          >
            Round 1 Cleared (≥45%)
          </button>
          <button
            onClick={() => setStatusFilter("attempted")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
              statusFilter === "attempted"
                ? "bg-red-600 text-white shadow-md shadow-red-600/40"
                : "bg-white/5 text-white/60 hover:text-white"
            }`}
          >
            Attempted
          </button>
          <button
            onClick={() => setStatusFilter("pending")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
              statusFilter === "pending"
                ? "bg-red-600 text-white shadow-md shadow-red-600/40"
                : "bg-white/5 text-white/60 hover:text-white"
            }`}
          >
            Not Attempted
          </button>
        </div>
      </div>

      {/* TEAMS TABLE */}
      <div className="bg-black/60 rounded-2xl border border-white/10 overflow-hidden shadow-xl">
        {teams === undefined ? (
          <div className="p-8 text-center text-white/40">Loading team data...</div>
        ) : filteredTeams.length === 0 ? (
          <div className="p-12 text-center text-white/40">No teams found matching your search.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-white/5 border-b border-white/10 text-white/50 uppercase text-xs">
                <tr>
                  <th className="px-6 py-3.5">Team Name &amp; Institution</th>
                  <th className="px-6 py-3.5">Team Leader</th>
                  <th className="px-6 py-3.5">Team Members</th>
                  <th className="px-6 py-3.5 text-center">Round 1 Status</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredTeams.map((team) => {
                  const ass = assessmentMap.get(team._id);
                  const isDeleting = deletingId === team._id;

                  return (
                    <tr
                      key={team._id}
                      className="hover:bg-white/5 transition"
                    >
                      <td className="px-6 py-4">
                        <div className="font-bold text-white text-base">{team.teamName}</div>
                        <div className="flex items-center gap-1.5 text-xs text-white/50 mt-1">
                          <GraduationCap size={13} className="text-red-400" />
                          <span>{team.institution}</span>
                        </div>
                        <div className="text-[10px] text-white/30 font-mono mt-0.5">
                          Registered: {team.createdAt ? new Date(team.createdAt).toLocaleDateString() : "Recent"}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="font-semibold text-white/90">{team.leaderName}</div>
                        <div className="text-xs text-red-300/80 font-mono flex items-center gap-1 mt-0.5">
                          <Mail size={11} />
                          {team.leaderEmail}
                        </div>
                      </td>

                      <td className="px-6 py-4 text-xs space-y-1">
                        <div>
                          <span className="font-medium text-white/80">{team.member1Name}</span>
                          <span className="text-white/40 ml-1">({team.member1Email})</span>
                        </div>
                        <div>
                          <span className="font-medium text-white/80">{team.member2Name}</span>
                          <span className="text-white/40 ml-1">({team.member2Email})</span>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-center">
                        {ass?.attempted ? (
                          <div className="inline-flex flex-col items-center">
                            {ass.cleared ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-500/20 text-green-300 border border-green-500/40 text-xs font-semibold">
                                <CheckCircle2 size={12} /> Cleared (Score: {ass.score})
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-500/40 text-xs font-semibold">
                                <XCircle size={12} /> Failed (&lt;45%)
                              </span>
                            )}
                            <span className="text-[10px] text-white/40 mt-1 font-mono">{ass.score} pts</span>
                          </div>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 text-white/50 border border-white/10 text-xs">
                            <Clock size={12} /> Not Attempted
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDeleteTeam(team)}
                          disabled={isDeleting}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-950/40 hover:bg-red-600/40 border border-red-600/30 text-red-300 hover:text-white text-xs font-semibold transition hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer shadow-sm"
                          title="Remove team and allow them to register & retake test fresh"
                        >
                          <Trash2 size={13} />
                          <span>{isDeleting ? "Removing..." : "Remove Team"}</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
