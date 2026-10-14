"use client";

import { useQuery, useMutation } from "convex/react";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { useState, useEffect } from "react";
import { api } from "../../../convex/_generated/api";
import { GridBackground } from "../components/ui/grid-background";

export default function Round2SubmitPage() {
  const myReg = useQuery(api.teamRegistrations.getMyRegistration, {});
  const teamId = myReg?._id;

  const assessment = useQuery(
    api.round1.getMyRound1,
    teamId ? { teamId } : "skip"
  );

  const existing = useQuery(
    api.round2.getMySubmission,
    teamId ? { teamId } : "skip"
  );

  const submitProject = useMutation(api.round2.submitProject);

  const [title, setTitle] = useState("");
  const [problem, setProblem] = useState("");
  const [desc, setDesc] = useState("");
  const [github, setGithub] = useState("");
  const [demo, setDemo] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (existing) {
      setTitle(existing.title);
      setDesc(existing.description);
      setProblem(existing.problemStatement);
      setGithub(existing.githubLink || "");
      setDemo(existing.demoLink || "");
    }
  }, [existing]);

  if (!teamId)
    return <div className="text-white text-center pt-40"> <GridBackground/>Please register first.</div>;

  if (!assessment)
    return <div className="text-white text-center pt-40"><GridBackground/>Loading...</div>;

  if (!assessment.cleared)
    return (
      <div className="text-center text-red-400 pt-40 text-xl">
        <GridBackground/>
        ❌ You are not eligible for Round 2.<br />
        You must clear Round 1 to submit a project.
      </div>
    );

  const handleSubmit = async () => {
    if (!title || !problem || !desc || !github || !demo) {
      setStatus("Please fill all fields");
      return;
    }

    try {
      await submitProject({
        teamId,
        title,
        description: desc,
        problemStatement: problem,
        githubLink: github,
        demoLink: demo,
      });

      setStatus("submitted");
    } catch (err) {
      setStatus(err.message);
    }
  };

  return (
    <div className=" text-white">
        <GridBackground/>
      <Navbar />

      <div className="max-w-2xl mx-auto mt-32 p-6 backdrop-blur rounded-xl border border-gray-700 shadow-xl">
        <h1 className="text-3xl font-bold mb-3">Round 2 Project Submission</h1>
        <p className="text-gray-400 mb-6">
          Submit your full project with title, description, and links.
        </p>

        {existing?.status === "submitted" && status !== "submitted" && (
          <div className="bg-green-600/30 text-green-300 p-3 rounded-md mb-4">
            ✔ You have already submitted. You can update your submission.
          </div>
        )}

        {/* Title */}
        <label className="block text-sm mb-1">Project Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 rounded  mb-4 border border-gray-600"
          placeholder="Your project title"
        />

        {/* Problem Statement */}
        <label className="block text-sm mb-1">Problem Statement</label>
        <textarea
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          className="w-full p-2 rounded mb-4 border border-gray-600 h-24"
          placeholder="What problem does your project solve?"
        />

        {/* Description */}
        <label className="block text-sm mb-1">Project Description</label>
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="w-full p-2 rounded  mb-4 border border-gray-600 h-32"
          placeholder="Describe your solution, tech stack, features…"
        />

        {/* GitHub */}
        <label className="block text-sm mb-1">GitHub Link</label>
        <input
          value={github}
          onChange={(e) => setGithub(e.target.value)}
          className="w-full p-2 rounded mb-4 border border-gray-600"
          placeholder="https://github.com/your-project"
        />

        {/* Demo */}
        <label className="block text-sm mb-1">Demo Link</label>
        <input
          value={demo}
          onChange={(e) => setDemo(e.target.value)}
          className="w-full p-2 rounded  mb-4 border border-gray-600"
          placeholder="https://your-demo.com"
        />

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="bg-gradient-to-r from-red-500 to-red-900 px-4 py-2 rounded-md font-medium hover:opacity-80 transition mt-2"
        >
          Submit Project
        </button>

        {/* Status */}
        {status === "submitted" && (
          <p className="text-green-400 mt-3">✔ Project Submitted Successfully</p>
        )}
        {status && status !== "submitted" && (
          <p className="text-red-400 mt-3">{status}</p>
        )}
      </div>
        <div className="h-20"></div>
      <Footer />
    </div>
  );
}
