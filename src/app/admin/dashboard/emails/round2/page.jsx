"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../../../convex/_generated/api";
import { SendHorizontal, Mail, CheckCircle2, AlertCircle, Info } from "lucide-react";
import { useState } from "react";

export default function Round2EmailPage() {
  const submissions = useQuery(api.round2.getSubmittedProjects);

  const [subject, setSubject] = useState("Round 2 — Project Submission Received");
  const [message, setMessage] = useState(
    `<p>Hello Team,</p>
<p>We have successfully received your <strong>Round 2 project submission</strong>.</p>
<p>Our judging panel is evaluating your codebase and architecture. Results and finalist announcements will be published by end of January 2026.</p>
<p>Best regards,<br/>ByteBattle Organizing Committee • NIT Silchar</p>`
  );

  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState("");
  const [loading, setLoading] = useState(false);

  if (!submissions) return <div className="text-white/40 py-12 text-center">Loading submitted teams...</div>;

  const emails = submissions.map((row) => row.team.leaderEmail).filter(Boolean);

  const sendEmails = async () => {
    if (emails.length === 0) {
      alert("No submitted teams found to send emails to.");
      return;
    }

    setLoading(true);
    setStatus("");

    try {
      const res = await fetch("/api/admin/emails/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emails, subject, message }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus(data.message || `Broadcast successfully delivered to ${emails.length} team(s)!`);
        setStatusType("success");
      } else {
        setStatus(data?.error || "Error sending emails");
        setStatusType("error");
      }
    } catch (err) {
      setStatus(err?.message || "Network error. Please try again.");
      setStatusType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 text-white pb-12">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-red-500/20">
        <div>
          <h1 className="text-3xl font-extrabold flex items-center gap-3">
            <Mail className="text-red-400" />
            Round 2 — Project Submission Confirmation
          </h1>
          <p className="text-sm text-white/50 mt-1">
            Send receipt confirmation to teams that submitted Round 2 solutions.
          </p>
        </div>

        <div className="px-4 py-2 bg-red-950/40 border border-red-500/40 rounded-xl text-sm font-semibold text-red-300 flex items-center gap-2">
          <CheckCircle2 size={16} />
          Submissions: <span className="text-white font-bold">{emails.length} Team(s)</span>
        </div>
      </div>

      {status && (
        <div
          className={`p-4 rounded-2xl border text-sm flex items-center gap-3 ${
            statusType === "success"
              ? "bg-green-950/60 border-green-500/50 text-green-300"
              : "bg-red-950/60 border-red-500/50 text-red-300"
          }`}
        >
          {statusType === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span>{status}</span>
        </div>
      )}

      {/* TABLE */}
      <div className="bg-black/60 rounded-2xl border border-white/10 overflow-hidden shadow-xl">
        <div className="px-6 py-3 bg-white/5 border-b border-white/10 text-xs font-bold uppercase tracking-wider text-white/50">
          Submitted Teams ({submissions.length})
        </div>
        <table className="min-w-full text-left text-sm">
          <thead className="bg-white/5 border-b border-white/10 text-white/50 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Team Name</th>
              <th className="px-6 py-3">GitHub</th>
              <th className="px-6 py-3">Demo</th>
              <th className="px-6 py-3">Leader Email</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {submissions.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-white/40">
                  No Round 2 submissions received yet.
                </td>
              </tr>
            ) : (
              submissions.map((row) => (
                <tr key={row.team._id} className="hover:bg-white/5 transition">
                  <td className="px-6 py-4 font-semibold text-white">{row.team.teamName}</td>
                  <td className="px-6 py-4 font-mono text-xs text-white/60">{row.submission.githubLink || "—"}</td>
                  <td className="px-6 py-4 font-mono text-xs text-white/60">{row.submission.demoLink || "—"}</td>
                  <td className="px-6 py-4 font-mono text-xs text-white/70">{row.team.leaderEmail}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* COMPOSER */}
      <div className="bg-black/60 border border-white/10 p-6 sm:p-8 rounded-3xl space-y-4 shadow-xl">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <SendHorizontal size={18} className="text-red-400" />
          Compose Round 2 Notification
        </h3>

        <div>
          <label className="block text-xs font-semibold text-white/60 mb-1">Subject</label>
          <input
            className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-sm text-white focus:border-red-500 focus:outline-none"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-white/60 mb-1">Message Body (HTML supported)</label>
          <textarea
            className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-sm text-white font-mono h-40 focus:border-red-500 focus:outline-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3">
          <button
            onClick={sendEmails}
            disabled={loading || emails.length === 0}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white font-bold text-sm shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 transition hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            <SendHorizontal size={16} />
            {loading ? "Sending Broadcast..." : `Send Email to ${emails.length} Team(s)`}
          </button>
          <p className="text-xs text-white/40 flex items-center gap-1.5">
            <Info size={14} className="text-red-400 shrink-0" />
            Live delivery with Resend; simulated log mode when API key is unconfigured.
          </p>
        </div>
      </div>
    </div>
  );
}
