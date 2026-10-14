// src/lib/admin.js

// Default fallback admin emails
const DEFAULT_ADMINS = [
  "admin@bytebattle.com",
  "y6352821@gmail.com",
  "alimdwahid83@gmail.com",
  "your-email@gmail.com",
  "numan@example.com",
];

// Combine environment variable configured admins with defaults
const envAdmins = process.env.ADMIN_EMAILS
  ? process.env.ADMIN_EMAILS.split(",").map((e) => e.trim().toLowerCase()).filter(Boolean)
  : [];

export const ADMIN_EMAILS = Array.from(
  new Set([...DEFAULT_ADMINS.map((e) => e.toLowerCase()), ...envAdmins])
);

export function isAdminEmail(email) {
  if (!email) return false;
  const normalized = email.trim().toLowerCase();
  return ADMIN_EMAILS.includes(normalized);
}
