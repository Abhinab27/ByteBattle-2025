"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../../../convex/_generated/api";
import { SendHorizontal, Mail, CheckCircle2, AlertCircle, Info, Settings, ShieldCheck } from "lucide-react";
import { useState, useEffect } from "react";

export default function Round1EmailPage() {
  const assessments = useQuery(api.round1.getClearedTeams);

  const [subject, setSubject] = useState("ByteBattle 2026 — Round 1 Qualified! 🎉");
  const [message, setMessage] = useState(
    `<p>Hello Team,</p>
<p>Congratulations! Your team has successfully <strong>cleared Round 1</strong> of ByteBattle 2026 by scoring above the 45% qualification mark.</p>
<p>You are now officially eligible to submit your solution architecture and code repository in <strong>Round 2</strong>.</p>
<p>Head to the ByteBattle dashboard to view problem statements and submit your project.</p>
<p>Best regards,<br/>ByteBattle Organizing Committee • NIT Silchar</p>`
  );

  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState(""); // "success" | "error"
  const [loading, setLoading] = useState(false);
  const [providerInfo, setProviderInfo] = useState(null);

  useEffect(() => {
    fetch("/api/admin/emails/status")
      .then((r) => r.json())
      .then((d) => setProviderInfo(d))
      .catch(() => {});
  }, []);

  if (!assessments) {
    return <div className="text-white/40 py-12 text-center">Loading qualified teams...</div>;
  }

  const emails = assessments.map((a) => a.team.leaderEmail).filter(Boolean);

  const sendEmails = async () => {
    if (emails.length === 0) {
      alert("No qualified teams found to send emails to.");
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
        setStatus(data?.error || "Failed to dispatch emails. Check configuration.");
        setStatusType("error");
      }
    } catch (err) {
      console.error("Email send error:", err);
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
            Broadcast to Round 1 Qualified Teams
          </h1>
          <p className="text-sm text-white/50 mt-1">
            Send congratulatory announcements &amp; Round 2 instructions to all teams that cleared Round 1.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {providerInfo && (
            <div
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 border ${
                providerInfo.configured
                  ? "bg-green-950/40 border-green-500/40 text-green-300"
                  : "bg-amber-950/40 border-amber-500/40 text-amber-300"
              }`}
            >
              {providerInfo.configured ? <ShieldCheck size={14} /> : <AlertCircle size={14} />}
              Service: <span>{providerInfo.provider}</span>
            </div>
          )}

          <div className="px-4 py-2 bg-green-950/40 border border-green-500/40 rounded-xl text-sm font-semibold text-green-300 flex items-center gap-2">
            <CheckCircle2 size={16} />
            Recipients: <span className="text-white font-bold">{emails.length} Team(s)</span>
          </div>
        </div>
      </div>

      {/* PROVIDER NOTICE IF NOT CONFIGURED */}
      {providerInfo && !providerInfo.configured && (
        <div className="p-4 bg-amber-950/30 border border-amber-500/40 rounded-2xl text-xs text-amber-200/90 space-y-2">
          <div className="flex items-center gap-2 font-bold text-amber-300">
            <AlertCircle size={16} />
            <span>Real Inbox Delivery Setup (Choose Option 1 or 2 in .env.local):</span>
          </div>
          <p className="text-white/70">
            To make sure qualified teams actually receive emails in their Gmail/Inbox, configure one of the following in your <code className="bg-black/60 px-1.5 py-0.5 rounded text-amber-300">.env.local</code> file and restart the dev server:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 text-xs">
            <div className="p-3 bg-black/60 rounded-xl border border-white/10 font-mono">
              <strong className="text-white font-sans block mb-1">Option A: Resend (Recommended)</strong>
              <code>RESEND_API_KEY=re_your_api_key</code>
              <p className="text-[11px] text-white/50 font-sans mt-1">Free 100 emails/day from resend.com</p>
            </div>
            <div className="p-3 bg-black/60 rounded-xl border border-white/10 font-mono">
              <strong className="text-white font-sans block mb-1">Option B: Gmail App Password</strong>
              <code>GMAIL_USER=your_email@gmail.com</code>
              <br />
              <code>GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx</code>
              <p className="text-[11px] text-white/50 font-sans mt-1">Google Account &gt; Security &gt; App Passwords</p>
            </div>
          </div>
        </div>
      )}

      {/* STATUS BANNER */}
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
          Target Recipients ({emails.length})
        </div>
        <table className="min-w-full text-left text-sm">
          <thead className="bg-white/5 border-b border-white/10 text-white/50 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Team Name</th>
              <th className="px-6 py-3">Round 1 Score</th>
              <th className="px-6 py-3">Leader Email</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/5">
            {assessments.length === 0 ? (
              <tr>
                <td colSpan={3} className="p-8 text-center text-white/40">
                  No teams have cleared Round 1 yet.
                </td>
              </tr>
            ) : (
              assessments.map((row) => (
                <tr key={row.team._id} className="hover:bg-white/5 transition">
                  <td className="px-6 py-4 font-semibold text-white">{row.team.teamName}</td>
                  <td className="px-6 py-4 font-mono font-bold text-green-400">{row.ass.round1Score} pts</td>
                  <td className="px-6 py-4 font-mono text-xs text-white/70">{row.team.leaderEmail}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* EMAIL COMPOSER */}
      <div className="bg-black/60 border border-white/10 p-6 sm:p-8 rounded-3xl space-y-4 shadow-xl">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <SendHorizontal size={18} className="text-red-400" />
          Compose Broadcast Message
        </h3>

        <div>
          <label className="block text-xs font-semibold text-white/60 mb-1">
            Subject
          </label>
          <input
            className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-sm text-white focus:border-red-500 focus:outline-none"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Email Subject"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-white/60 mb-1">
            Message Body (HTML supported)
          </label>
          <textarea
            className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-sm text-white font-mono h-44 focus:border-red-500 focus:outline-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3">
          <button
            onClick={sendEmails}
            disabled={loading || emails.length === 0}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white font-bold text-sm shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 transition hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <SendHorizontal size={16} />
            {loading ? "Sending Broadcast..." : `Send Email to ${emails.length} Team(s)`}
          </button>

          <p className="text-xs text-white/40 flex items-center gap-1.5">
            <Info size={14} className="text-red-400 shrink-0" />
            Direct inbox delivery via {providerInfo?.provider || "configured email service"}.
          </p>
        </div>
      </div>
    </div>
  );
}
