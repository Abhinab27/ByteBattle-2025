// src/app/api/admin/login/route.js
import { NextResponse } from "next/server";
import { isAdminEmail } from "@/lib/admin";

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch (e) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { email, password } = body ?? {};

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const expectedPassword = process.env.ADMIN_PASSWORD || "admin123";

  // Check against admin list
  const isAuthorized = isAdminEmail(normalizedEmail);

  if (!isAuthorized || password !== expectedPassword) {
    return NextResponse.json(
      { error: "Invalid admin credentials. Please check your email or password." },
      { status: 401 }
    );
  }

  const res = NextResponse.json({ success: true, email: normalizedEmail });

  // Set cookie with known attributes that middleware will check
  res.cookies.set("admin-auth", "true", {
    path: "/",
    httpOnly: false,
    sameSite: "Lax",
    maxAge: 60 * 60 * 24, // 1 day
  });

  return res;
}
