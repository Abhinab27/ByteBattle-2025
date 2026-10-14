"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { ShieldCheck, UserPlus, Trash2, CheckCircle2, Shield, Info, Mail } from "lucide-react";

export default function ManageAdminsPage() {
  const admins = useQuery(api.admins.listAdmins);
  const addAdmin = useMutation(api.admins.addAdmin);
  const removeAdmin = useMutation(api.admins.removeAdmin);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("admin");
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setStatusMsg("");
    try {
      await addAdmin({
        email: email.trim(),
        name: name.trim() || undefined,
        role,
      });
      setEmail("");
      setName("");
      setStatusMsg("Admin access successfully granted!");
      setTimeout(() => setStatusMsg(""), 4000);
    } catch (err) {
      alert("Error adding admin: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (adminId, adminEmail) => {
    if (!confirm(`Are you sure you want to revoke admin access for ${adminEmail}?`)) return;
    try {
      await removeAdmin({ adminId });
      setStatusMsg(`Admin access revoked for ${adminEmail}`);
      setTimeout(() => setStatusMsg(""), 4000);
    } catch (err) {
      alert("Error removing admin: " + err.message);
    }
  };

  return (
    <div className="space-y-6 text-white max-w-5xl pb-12">
      {/* HEADER */}
      <div className="pb-3 border-b border-red-500/20">
        <h1 className="text-3xl font-extrabold flex items-center gap-3">
          <ShieldCheck className="text-red-400" />
          Admin Management
        </h1>
        <p className="text-sm text-white/50 mt-1">
          Manage who can access the ByteBattle Admin Panel, review questions, and oversee the hackathon.
        </p>
      </div>

      {statusMsg && (
        <div className="p-3 bg-green-950/60 border border-green-500/40 text-green-300 rounded-xl text-sm flex items-center gap-2">
          <CheckCircle2 size={16} />
          {statusMsg}
        </div>
      )}

      {/* HOW IT WORKS BANNER */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-red-950/40 to-black/60 border border-red-500/30 flex items-start gap-3">
        <Info size={20} className="text-red-400 shrink-0 mt-0.5" />
        <div className="text-xs text-white/70 space-y-1">
          <p className="font-semibold text-white">How Admin Authentication Works:</p>
          <p>
            1. Any email listed below or in your <code className="text-red-300 font-mono">ADMIN_EMAILS</code> environment variable is recognized as an authorized admin.
          </p>
          <p>
            2. When logging in at <code className="text-red-300 font-mono">/admin/login</code>, admins enter their email and the master admin password (default: <code className="text-red-300 font-mono">admin123</code>).
          </p>
        </div>
      </div>

      {/* ADD ADMIN FORM */}
      <div className="bg-black/60 border border-red-900/30 rounded-2xl p-6 shadow-lg">
        <h2 className="text-lg font-bold flex items-center gap-2 mb-4 text-red-300">
          <UserPlus size={18} />
          Add New Admin
        </h2>

        <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs text-white/60 mb-1">Admin Email *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. organizer@nits.ac.in"
              className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2.5 text-sm text-white focus:border-red-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs text-white/60 mb-1">Full Name (Optional)</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. John Doe"
              className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2.5 text-sm text-white focus:border-red-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs text-white/60 mb-1">Role</label>
            <div className="flex gap-2">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2.5 text-sm text-white focus:border-red-500 focus:outline-none"
              >
                <option value="admin">Admin</option>
                <option value="superadmin">Super Admin</option>
              </select>

              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2.5 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 rounded-xl text-white font-semibold text-sm whitespace-nowrap shadow-md shadow-red-600/30 transition hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                {loading ? "Adding..." : "Grant Access"}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* ADMINS TABLE */}
      <div className="bg-black/60 border border-white/10 rounded-2xl overflow-hidden shadow-lg">
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Shield size={18} className="text-red-400" />
            Registered Admins ({admins?.length ?? 0})
          </h2>
        </div>

        {admins === undefined ? (
          <div className="p-8 text-center text-white/40">Loading admins...</div>
        ) : admins.length === 0 ? (
          <div className="p-8 text-center text-white/40">No admins recorded yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-white/5 border-b border-white/10 text-white/50 uppercase text-xs">
                <tr>
                  <th className="px-6 py-3">Admin</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Role</th>
                  <th className="px-6 py-3">Added Date</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {admins.map((adm) => (
                  <tr key={adm._id} className="hover:bg-white/5 transition">
                    <td className="px-6 py-4 font-semibold text-white flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-300 font-bold text-xs uppercase">
                        {(adm.name || adm.email).substring(0, 2)}
                      </div>
                      <span>{adm.name || "Admin"}</span>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-white/70">
                      {adm.email}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-red-500/10 border border-red-500/30 text-red-300 uppercase">
                        {adm.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-white/40">
                      {new Date(adm.addedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleRemove(adm._id, adm.email)}
                        className="p-2 rounded-lg bg-red-950/30 hover:bg-red-600/30 text-red-400 hover:text-red-200 transition cursor-pointer"
                        title="Revoke admin access"
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
