"use client";

import { useEffect, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import Link from "next/link";
import { CheckCircle2, XCircle, ArrowRight, Home, Clock, AlertCircle } from "lucide-react";

interface Question {
  _id: string;
  question: string;
  options: string[];
  category?: string;
}

export default function AssessmentPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [current, setCurrent] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<{
    correctCount: number;
    totalQuestions: number;
    score: number;
    percentage: number;
    cleared: boolean;
  } | null>(null);

  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes
  const [started, setStarted] = useState(false);
  const [reentered, setReentered] = useState(false);
  const [loadingState, setLoadingState] = useState(true);

  // Fetch logged-in team
  const myTeam = useQuery(api.teamRegistrations.getMyRegistration, {});

  // Fetch attempt status
  const round1Status = useQuery(
    api.round1.getMyRound1,
    myTeam?._id ? { teamId: myTeam._id } : "skip"
  );

  // Convex mutation for evaluating Round 1
  const evaluateRound1 = useMutation(api.questions.evaluateRound1);

  // Convex query for 20 questions
  const convexQuestions = useQuery(api.questions.getRound1Questions);

  /* ---------------------- LOAD QUESTIONS ---------------------- */
  useEffect(() => {
    if (convexQuestions && convexQuestions.length > 0) {
      setQuestions(convexQuestions);
    } else {
      // Fallback to API if Convex query is still loading or empty
      fetch("/api/questions")
        .then((res) => res.json())
        .then((data) => {
          if (data.questions && data.questions.length > 0) {
            setQuestions(data.questions.slice(0, 20));
          }
        })
        .catch((err) => console.error("Error fetching questions:", err));
    }
  }, [convexQuestions]);

  /* ---------------------- CHECK RESUME ---------------------- */
  useEffect(() => {
    if (!myTeam?._id) return;
    const teamKey = myTeam._id;
    const savedStart = localStorage.getItem(`assessmentStartTime_${teamKey}`) || localStorage.getItem("assessmentStartTime");
    const alreadyStarted = localStorage.getItem(`assessmentStarted_${teamKey}`) || localStorage.getItem("assessmentStarted");

    if (alreadyStarted && savedStart) {
      setStarted(true);
      setReentered(true);
    } else {
      setStarted(false);
      setReentered(false);
    }

    setLoadingState(false);
  }, [myTeam?._id]);

  /* ---------------------- START TEST ---------------------- */
  const startTest = () => {
    if (!myTeam?._id) return;
    const teamKey = myTeam._id;
    localStorage.setItem(`assessmentStarted_${teamKey}`, "true");
    if (!localStorage.getItem(`assessmentStartTime_${teamKey}`)) {
      localStorage.setItem(`assessmentStartTime_${teamKey}`, Date.now().toString());
    }
    setStarted(true);
  };

  /* ---------------------- TIMER ---------------------- */
  useEffect(() => {
    if (!started || submitted || !myTeam?._id) return;

    const teamKey = myTeam._id;
    const savedStart = localStorage.getItem(`assessmentStartTime_${teamKey}`) || localStorage.getItem("assessmentStartTime");
    if (!savedStart) return;

    const updateTimer = () => {
      const startTime = Number(savedStart);
      const endTime = startTime + 1800 * 1000;
      const now = Date.now();
      const remaining = Math.max(0, Math.floor((endTime - now) / 1000));

      setTimeLeft(remaining);

      if (remaining <= 0) handleSubmit();
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [started, submitted, myTeam?._id]);

  /* ---------------------- ANSWER HANDLER ---------------------- */
  const handleChange = (qid: string, ans: string) => {
    setAnswers({ ...answers, [qid]: ans });
  };

  /* ---------------------- SUBMIT TEST ---------------------- */
  const handleSubmit = async () => {
    if (myTeam?._id) {
      const teamKey = myTeam._id;
      localStorage.removeItem(`assessmentStartTime_${teamKey}`);
      localStorage.removeItem(`assessmentStarted_${teamKey}`);
    }
    localStorage.removeItem("assessmentStartTime");
    localStorage.removeItem("assessmentStarted");

    if (!myTeam?._id) {
      alert("No registered team found. Please make sure you are registered.");
      return;
    }

    try {
      const evalResult = await evaluateRound1({
        teamId: myTeam._id,
        answers,
      });

      setResult(evalResult);
      setSubmitted(true);
    } catch (err: any) {
      console.error("Evaluation error:", err);
      // Fallback evaluation via API
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });
      const data = await res.json();
      const pts = data.score ?? 0;
      const pct = Math.round((pts / 40) * 100);
      setResult({
        correctCount: Math.round(pts / 2),
        totalQuestions: 20,
        score: pts,
        percentage: pct,
        cleared: pct >= 45,
      });
      setSubmitted(true);
    }
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const goNext = () => {
    if (current < questions.length - 1) setCurrent(current + 1);
  };

  const goPrev = () => {
    if (current > 0) setCurrent(current - 1);
  };

  /* ---------------------- LOADING WAIT ---------------------- */
  if (!myTeam || round1Status === undefined || loadingState) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white/60">
        Loading assessment portal...
      </div>
    );
  }

  /* ---------------------- ALREADY ATTEMPTED SCREEN ---------------------- */
  if (round1Status && round1Status.attempted && !submitted) {
    const isCleared = round1Status.cleared;
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-[#140202] to-black px-6 py-12">
        <div className="max-w-xl w-full bg-black/80 border border-red-500/30 rounded-3xl p-8 sm:p-10 shadow-2xl text-center">
          <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
            isCleared ? "bg-green-500/20 text-green-400 border border-green-500/40" : "bg-red-500/20 text-red-400 border border-red-500/40"
          }`}>
            {isCleared ? <CheckCircle2 size={36} /> : <AlertCircle size={36} />}
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
            Round 1 Already Completed
          </h1>

          <p className="text-white/60 text-sm mb-6">
            Your team has already submitted Round 1 assessment.
          </p>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-6 space-y-2">
            <p className="text-xs uppercase tracking-wider text-white/40">Your Score</p>
            <p className="text-3xl font-extrabold text-white font-mono">
              {round1Status.score} pts
            </p>
            <div className="pt-2">
              {isCleared ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/20 border border-green-500/40 text-green-300 text-xs font-bold uppercase">
                  <CheckCircle2 size={14} /> Qualified for Round 2 (≥45%)
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-red-300 text-xs font-bold uppercase">
                  <XCircle size={14} /> Not Qualified (&lt;45%)
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {isCleared && (
              <Link
                href="/round2"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-600/30"
              >
                Proceed to Round 2 <ArrowRight size={16} />
              </Link>
            )}
            <Link
              href="/"
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm flex items-center justify-center gap-2"
            >
              <Home size={16} /> Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /* ---------------------- NORMAL TEST UI ---------------------- */
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#110000] to-black text-white px-4 sm:px-6 pt-16 pb-12 flex justify-center">
      {/* 1. START CONFIRMATION MODAL */}
      {!started && !submitted && !reentered && (
        <div className="w-full max-w-xl my-auto bg-black/80 border border-red-500/30 rounded-3xl shadow-[0_0_50px_rgba(255,0,0,0.2)] p-8 sm:p-10 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-600/20 border border-red-500/40 rounded-full flex items-center justify-center text-red-400">
            <Clock size={32} />
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold mb-3 text-white">
            Ready to Begin Round 1?
          </h1>

          <div className="text-white/70 text-sm space-y-2 mb-8 text-left bg-white/5 border border-white/10 p-4 rounded-2xl">
            <p className="font-semibold text-white">Round 1 Assessment Rules:</p>
            <p>• You will receive <strong className="text-red-400">20 random multiple-choice questions</strong>.</p>
            <p>• Total time allocated: <strong className="text-white">30 minutes</strong>.</p>
            <p>• Passing requirement: <strong className="text-green-400">≥ 45% correct answers</strong> (at least 9 out of 20).</p>
            <p>• Scoring 45% or higher unlocks immediate entry to <strong className="text-red-400">Round 2</strong>.</p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={startTest}
              className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white rounded-xl text-base font-bold shadow-lg shadow-red-600/30 transition hover:scale-105 active:scale-95 cursor-pointer"
            >
              Start Assessment Now
            </button>
            <Link
              href="/events"
              className="px-6 py-3 bg-white/10 hover:bg-white/15 text-white/80 rounded-xl text-base font-semibold transition"
            >
              Return to Roadmap
            </Link>
          </div>
        </div>
      )}

      {/* 2. ACTIVE TEST INTERFACE */}
      {started && !submitted && (
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6 items-start">
          {/* QUESTION CARD */}
          <div className="bg-black/70 border border-red-500/30 rounded-3xl p-6 sm:p-8 shadow-xl">
            {/* TOP BAR */}
            <div className="flex justify-between items-center pb-4 mb-6 border-b border-white/10">
              <span className="text-xs uppercase tracking-wider font-bold text-red-400 px-3 py-1 rounded-full bg-red-600/20 border border-red-500/30 font-mono">
                Question {current + 1} of {questions.length}
              </span>
              <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-black/60 border border-red-500/40 text-red-400 font-mono text-sm font-bold shadow-[0_0_15px_rgba(255,0,0,0.3)]">
                <Clock size={16} />
                <span>{formatTime(timeLeft)}</span>
              </div>
            </div>

            {/* QUESTION TEXT */}
            {questions.length > 0 ? (
              <>
                <p className="text-white text-base sm:text-lg mb-6 leading-relaxed whitespace-pre-line font-medium">
                  {questions[current].question}
                </p>

                <div className="space-y-3">
                  {questions[current].options.map((opt, i) => {
                    const isSelected = answers[questions[current]._id] === opt;
                    return (
                      <label
                        key={opt}
                        className={`flex items-center border rounded-2xl px-4 py-3.5 cursor-pointer transition text-sm ${
                          isSelected
                            ? "bg-red-950/40 border-red-500 text-white shadow-[0_0_15px_rgba(255,0,0,0.25)]"
                            : "border-white/10 bg-white/5 hover:bg-white/10 text-white/80"
                        }`}
                      >
                        <input
                          type="radio"
                          name={questions[current]._id}
                          value={opt}
                          checked={isSelected}
                          onChange={(e) =>
                            handleChange(questions[current]._id, e.target.value)
                          }
                          className="mr-3 accent-red-500 w-4 h-4"
                        />
                        <span className="font-mono text-xs text-white/40 mr-2">
                          {String.fromCharCode(65 + i)}.
                        </span>
                        <span>{opt}</span>
                      </label>
                    );
                  })}
                </div>
              </>
            ) : (
              <p className="text-white/50 text-center py-10">Preparing questions...</p>
            )}

            {/* NAVIGATION BUTTONS */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/10">
              <button
                onClick={goPrev}
                disabled={current === 0}
                className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition cursor-pointer ${
                  current === 0
                    ? "bg-white/5 text-white/20 cursor-not-allowed"
                    : "bg-white/10 hover:bg-white/20 text-white"
                }`}
              >
                Previous
              </button>

              {current === questions.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-600 text-white px-7 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-green-600/30 transition hover:scale-105 active:scale-95 cursor-pointer"
                >
                  Submit Assessment
                </button>
              ) : (
                <button
                  onClick={goNext}
                  className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-md shadow-red-600/30 transition hover:scale-105 active:scale-95 cursor-pointer"
                >
                  Next Question
                </button>
              )}
            </div>
          </div>

          {/* QUESTION PALETTE / NAVIGATOR */}
          <div className="bg-black/70 border border-white/10 rounded-3xl p-5 sticky top-24">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white/50 mb-3">
              Question Navigator ({Object.keys(answers).length}/{questions.length} Answered)
            </h3>

            <div className="grid grid-cols-5 gap-2">
              {questions.map((q, idx) => {
                const isAnswered = !!answers[q._id];
                const isCurrent = idx === current;
                return (
                  <button
                    key={q._id}
                    onClick={() => setCurrent(idx)}
                    className={`h-9 rounded-xl font-mono text-xs font-bold transition cursor-pointer ${
                      isCurrent
                        ? "bg-red-600 text-white shadow-md shadow-red-600/50 scale-105 border border-red-400"
                        : isAnswered
                        ? "bg-green-600/30 border border-green-500/40 text-green-300"
                        : "bg-white/5 border border-white/10 text-white/50 hover:bg-white/10"
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <div className="mt-5 pt-4 border-t border-white/10 text-[11px] text-white/40 space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-red-600" />
                <span>Current Question</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-green-600/40 border border-green-500/50" />
                <span>Answered</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-white/10" />
                <span>Unanswered</span>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full mt-6 py-2.5 rounded-xl bg-white/10 hover:bg-green-600 text-white text-xs font-bold transition cursor-pointer"
            >
              Finish &amp; Submit
            </button>
          </div>
        </div>
      )}

      {/* 3. POST-SUBMISSION RESULTS SCREEN */}
      {submitted && result && (
        <div className="max-w-xl w-full my-auto bg-black/80 border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl text-center">
          <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
            result.cleared
              ? "bg-green-500/20 text-green-400 border border-green-500/40"
              : "bg-red-500/20 text-red-400 border border-red-500/40"
          }`}>
            {result.cleared ? <CheckCircle2 size={36} /> : <XCircle size={36} />}
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
            {result.cleared ? "🎉 Round 1 Cleared!" : "Assessment Completed"}
          </h2>

          <p className="text-white/60 text-sm mb-6">
            {result.cleared
              ? "Congratulations! You scored ≥45% and are officially eligible for Round 2."
              : "You scored below the 45% qualification mark for Round 2."}
          </p>

          <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 mb-6">
            <div className="p-3 bg-black/40 rounded-xl">
              <p className="text-[11px] text-white/40 uppercase">Correct Answers</p>
              <p className="text-2xl font-bold font-mono text-white mt-1">
                {result.correctCount} / {result.totalQuestions}
              </p>
            </div>
            <div className="p-3 bg-black/40 rounded-xl">
              <p className="text-[11px] text-white/40 uppercase">Percentage</p>
              <p className={`text-2xl font-bold font-mono mt-1 ${
                result.cleared ? "text-green-400" : "text-red-400"
              }`}>
                {result.percentage}%
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {result.cleared ? (
              <Link
                href="/round2"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-600/30"
              >
                Go to Round 2 Submission <ArrowRight size={16} />
              </Link>
            ) : null}
            <Link
              href="/"
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm flex items-center justify-center gap-2"
            >
              <Home size={16} /> Return to Home
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
