import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/**
 * submitRound1
 * - Creates a single teamAssessments row if none exists
 * - Otherwise updates existing row
 */
export const submitRound1 = mutation({
  args: {
    teamId: v.id("teamRegistrations"),
    score: v.number(),
  },

  handler: async (ctx, { teamId, score }) => {
    const assessment = await ctx.db
      .query("teamAssessments")
      .withIndex("by_teamId", (q) => q.eq("teamId", teamId))
      .first();

    const now = Date.now();
    // 45% rule: if score is percentage (>= 45) or points out of 40 (>= 18)
    const cleared = score >= 45 || score >= 18;

    if (!assessment) {
      // Insert new record
      await ctx.db.insert("teamAssessments", {
        teamId,
        score,
        startedAt: now,
        completedAt: now,
        status: "completed",

        questionOrder: [],

        round1Attempted: true,
        round1Score: score,
        round1Cleared: cleared,   // ⭐ AUTO CLEAR HERE

        round2Cleared: false,
        round2ProjectSubmitted: false,
      });

      return { inserted: true };
    }

    // Update existing record
    await ctx.db.patch(assessment._id, {
      score,
      completedAt: now,
      status: "completed",

      round1Attempted: true,
      round1Score: score,
      round1Cleared: cleared,   // ⭐ AUTO CLEAR HERE
    });

    return { updated: true };
  },
});


/**
 * getRound1Status
 * - Returns whether Round 1 was attempted + score
 */
export const getRound1Status = query({
  args: {
    teamId: v.id("teamRegistrations"),
  },

  handler: async (ctx, { teamId }) => {
    const assessment = await ctx.db
      .query("teamAssessments")
      .withIndex("by_teamId", (q) => q.eq("teamId", teamId))
      .first();

    if (!assessment) {
      return { attempted: false, score: 0 };
    }

    return {
      attempted: assessment.round1Attempted ?? false,
      score: assessment.round1Score ?? 0,
    };
  },
});

/**
 * getRound1Leaderboard
 * - Returns all teams sorted by Round 1 score
 */
export const getRound1Leaderboard = query({
  handler: async (ctx) => {
    // 1️⃣ Fetch all assessments
    const assessments = await ctx.db.query("teamAssessments").collect();

    // 2️⃣ Fetch all teams
    const teams = await ctx.db.query("teamRegistrations").collect();

    // 3️⃣ Join team + assessment data
    const leaderboard = assessments.map((assessment) => {
      const team = teams.find((t) => t._id === assessment.teamId);

      return {
        teamId: assessment.teamId,
        teamName: team?.teamName ?? "Unknown Team",
        institution: team?.institution ?? "Unknown",
        attempted: assessment.round1Attempted ?? false,
        score: assessment.round1Score ?? 0,
        cleared: assessment.round1Cleared ?? false,
      };
    });

    // 4️⃣ Sort by highest score
    leaderboard.sort((a, b) => b.score - a.score);

    return leaderboard;
  },
});

/**
 * getClearedTeams
 * - Teams who cleared round 1
 */
export const getClearedTeams = query({
  handler: async (ctx) => {
    const assessments = await ctx.db
      .query("teamAssessments")
      .filter((q) => q.eq(q.field("round1Cleared"), true))
      .collect();

    const teams = [];

    for (const ass of assessments) {
      const team = await ctx.db.get(ass.teamId);
      if (team) teams.push({ team, ass });
    }

    return teams.sort((a, b) => b.ass.round1Score - a.ass.round1Score);
  },
});

/**
 * getMyRound1
 * - Returns my Round 1 result
 */
export const getMyRound1 = query({
  args: { teamId: v.id("teamRegistrations") },

  handler: async (ctx, { teamId }) => {
    const assessment = await ctx.db
      .query("teamAssessments")
      .withIndex("by_teamId", (q) => q.eq("teamId", teamId))
      .first();

    if (!assessment) return null;

    return {
      attempted: assessment.round1Attempted ?? false,
      score: assessment.round1Score ?? 0,
      cleared: assessment.round1Cleared ?? false,
    };
  },
});
