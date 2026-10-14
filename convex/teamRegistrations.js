import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/* ------------------------------------------- */
/*  CREATE TEAM REGISTRATION                    */
/* ------------------------------------------- */
export const createRegistration = mutation({
  args: {
    teamName: v.string(),
    institution: v.string(),

    leaderName: v.string(),
    leaderEmail: v.string(),

    member1Name: v.string(),
    member1Email: v.string(),
    member2Name: v.string(),
    member2Email: v.string(),

    clerkUserId: v.optional(v.string()),
  },

  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    const leaderId = user?.subject || args.clerkUserId || args.leaderEmail;

    return await ctx.db.insert("teamRegistrations", {
      teamName: args.teamName,
      institution: args.institution,
      leaderName: args.leaderName,
      leaderEmail: args.leaderEmail,
      member1Name: args.member1Name,
      member1Email: args.member1Email,
      member2Name: args.member2Name,
      member2Email: args.member2Email,
      leaderId,
      createdAt: Date.now(),
    });
  },
});

/* ------------------------------------------- */
/*  DELETE TEAM (Cascade Delete)                */
/* ------------------------------------------- */
export const deleteTeam = mutation({
  args: {
    teamId: v.id("teamRegistrations"),
  },
  handler: async (ctx, { teamId }) => {
    // 1. Delete associated assessment(s) (wiping out attempt and score records)
    const assessments = await ctx.db
      .query("teamAssessments")
      .withIndex("by_teamId", (q) => q.eq("teamId", teamId))
      .collect();
    for (const a of assessments) {
      await ctx.db.delete(a._id);
    }

    // 2. Delete associated idea submissions
    const submissions = await ctx.db
      .query("teamIdeaSubmissions")
      .withIndex("by_teamId", (q) => q.eq("teamId", teamId))
      .collect();
    for (const s of submissions) {
      await ctx.db.delete(s._id);
    }

    // 3. Delete the team registration itself
    await ctx.db.delete(teamId);

    return { success: true };
  },
});

/* ------------------------------------------- */
/*  QUERY: GET LOGGED-IN USER'S REGISTRATION    */
/* ------------------------------------------- */
export const getMyRegistration = query({
  args: {
    clerkUserId: v.optional(v.string()),
    email: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    const leaderId = user?.subject || args?.clerkUserId;

    if (leaderId) {
      const byLeader = await ctx.db
        .query("teamRegistrations")
        .withIndex("by_leaderId", (q) => q.eq("leaderId", leaderId))
        .first();
      if (byLeader) return byLeader;
    }

    if (args?.email) {
      const byEmail = await ctx.db
        .query("teamRegistrations")
        .withIndex("by_email", (q) => q.eq("leaderEmail", args.email))
        .first();
      if (byEmail) return byEmail;
    }

    return null;
  },
});

/* ------------------------------------------- */
/*  QUERY: CHECK IF TEAM NAME IS TAKEN          */
/* ------------------------------------------- */
export const isTeamNameTaken = query({
  args: { teamName: v.string() },

  handler: async (ctx, args) => {
    const team = await ctx.db
      .query("teamRegistrations")
      .withIndex("by_teamName", (q) => q.eq("teamName", args.teamName))
      .unique();

    return team !== null;
  },
});

/* ------------------------------------------- */
/*  QUERY: CHECK IF EMAIL USED ANYWHERE         */
/* ------------------------------------------- */
export const isEmailUsed = query({
  args: { email: v.string() },

  handler: async (ctx, args) => {
    const { email } = args;

    // Leader check
    const leader = await ctx.db
      .query("teamRegistrations")
      .withIndex("by_email", (q) => q.eq("leaderEmail", email))
      .unique();
    if (leader) return true;

    // Member1 check
    const m1 = await ctx.db
      .query("teamRegistrations")
      .withIndex("by_member1Email", (q) => q.eq("member1Email", email))
      .unique();
    if (m1) return true;

    // Member2 check
    const m2 = await ctx.db
      .query("teamRegistrations")
      .withIndex("by_member2Email", (q) => q.eq("member2Email", email))
      .unique();
    if (m2) return true;

    return false;
  },
});

/* ------------------------------------------- */
/*  QUERY: GET ALL TEAMS                        */
/* ------------------------------------------- */
export const getAllTeams = query({
  handler: async (ctx) => {
    const teams = await ctx.db.query("teamRegistrations").collect();
    return teams.sort((a, b) => b.createdAt - a.createdAt); // newest first
  },
});
