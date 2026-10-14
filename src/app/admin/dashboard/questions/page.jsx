"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { 
  Plus, 
  Trash2, 
  Edit3, 
  HelpCircle, 
  CheckCircle2, 
  Sparkles, 
  Search, 
  X,
  Shuffle,
  Tag
} from "lucide-react";

export default function AdminQuestionsPage() {
  const questions = useQuery(api.questions.getAdminQuestions);
  const addQuestion = useMutation(api.questions.addQuestion);
  const updateQuestion = useMutation(api.questions.updateQuestion);
  const deleteQuestion = useMutation(api.questions.deleteQuestion);
  const seedQuestions = useMutation(api.questions.seedInitialQuestions);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Form state
  const [formText, setFormText] = useState("");
  const [formCategory, setFormCategory] = useState("General");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormText("");
    setFormCategory("General");
    setOptions(["", "", "", ""]);
    setSelectedAnswerIndex(0);
    setModalOpen(true);
  };

  const handleOpenEdit = (q) => {
    setEditingId(q._id);
    setFormText(q.text);
    setFormCategory(q.category || "General");
    const safeOptions = q.options?.length === 4 ? q.options : [...(q.options || []), "", "", "", ""].slice(0, 4);
    setOptions(safeOptions);
    const ansIdx = safeOptions.indexOf(q.answer);
    setSelectedAnswerIndex(ansIdx >= 0 ? ansIdx : 0);
    setModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formText.trim()) return;
    if (options.some((opt) => !opt.trim())) {
      alert("Please provide all 4 options.");
      return;
    }

    const answer = options[selectedAnswerIndex];
    setIsSubmitting(true);

    try {
      if (editingId) {
        await updateQuestion({
          id: editingId,
          text: formText,
          options,
          answer,
          category: formCategory,
        });
        setMessage("Question updated successfully!");
      } else {
        await addQuestion({
          text: formText,
          options,
          answer,
          category: formCategory,
          qid: (questions?.length || 0) + 1,
        });
        setMessage("New question created successfully!");
      }
      setModalOpen(false);
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      alert("Error saving question: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this question?")) return;
    try {
      await deleteQuestion({ id });
      setMessage("Question deleted.");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      alert("Error deleting question: " + err.message);
    }
  };

  const handleSeed = async () => {
    try {
      const res = await seedQuestions();
      alert(res.message);
    } catch (err) {
      alert("Error seeding questions: " + err.message);
    }
  };

  // Filtered list
  const filtered = (questions || []).filter((q) => {
    const matchesSearch = 
      q.text.toLowerCase().includes(search.toLowerCase()) ||
      q.category?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = 
      selectedCategory === "all" || q.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(
    new Set((questions || []).map((q) => q.category).filter(Boolean))
  );

  return (
    <div className="space-y-6 text-white pb-12">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-red-500/20">
        <div>
          <h1 className="text-3xl font-extrabold flex items-center gap-3">
            <HelpCircle className="text-red-400" />
            Question Bank (Round 1)
          </h1>
          <p className="text-sm text-white/50 mt-1">
            Teams receive <span className="text-red-400 font-semibold">20 random questions</span> from this pool. Teams scoring ≥45% qualify for Round 2.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {(!questions || questions.length === 0) && (
            <button
              onClick={handleSeed}
              className="px-4 py-2 rounded-xl bg-yellow-600/30 border border-yellow-500/50 text-yellow-200 hover:bg-yellow-600/50 text-sm font-semibold flex items-center gap-2 transition cursor-pointer"
            >
              <Sparkles size={16} />
              Seed 30 Sample Questions
            </button>
          )}

          <button
            onClick={handleOpenAdd}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white font-semibold text-sm shadow-[0_0_15px_rgba(255,0,0,0.4)] flex items-center gap-2 transition hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Plus size={18} />
            Add Question
          </button>
        </div>
      </div>

      {message && (
        <div className="p-3 bg-green-950/60 border border-green-500/40 text-green-300 rounded-xl text-sm flex items-center gap-2">
          <CheckCircle2 size={16} />
          {message}
        </div>
      )}

      {/* STATS STRIP */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-black/50 border border-red-900/30 p-4 rounded-2xl flex items-center gap-4">
          <div className="p-3 bg-red-600/20 border border-red-500/30 rounded-xl text-red-400">
            <HelpCircle size={22} />
          </div>
          <div>
            <p className="text-xs text-white/40 uppercase">Total Questions</p>
            <p className="text-2xl font-bold">{questions ? questions.length : "..."}</p>
          </div>
        </div>

        <div className="bg-black/50 border border-red-900/30 p-4 rounded-2xl flex items-center gap-4">
          <div className="p-3 bg-blue-600/20 border border-blue-500/30 rounded-xl text-blue-400">
            <Shuffle size={22} />
          </div>
          <div>
            <p className="text-xs text-white/40 uppercase">Assessment Subset</p>
            <p className="text-2xl font-bold">20 Random / Team</p>
          </div>
        </div>

        <div className="bg-black/50 border border-red-900/30 p-4 rounded-2xl flex items-center gap-4">
          <div className="p-3 bg-green-600/20 border border-green-500/30 rounded-xl text-green-400">
            <CheckCircle2 size={22} />
          </div>
          <div>
            <p className="text-xs text-white/40 uppercase">Passing Benchmark</p>
            <p className="text-2xl font-bold">≥ 45% (9+ correct)</p>
          </div>
        </div>
      </div>

      {/* CONTROLS (SEARCH & CATEGORY) */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            placeholder="Search questions by text or topic..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-black/40 border border-white/10 rounded-xl text-sm focus:border-red-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition whitespace-nowrap cursor-pointer ${
              selectedCategory === "all"
                ? "bg-red-600 text-white shadow-md shadow-red-600/40"
                : "bg-white/5 text-white/60 hover:text-white"
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? "bg-red-600 text-white shadow-md shadow-red-600/40"
                  : "bg-white/5 text-white/60 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* QUESTIONS LIST */}
      <div className="space-y-4">
        {questions === undefined ? (
          <p className="text-white/40 text-center py-10">Loading questions from Convex...</p>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 bg-black/40 border border-white/10 rounded-2xl">
            <HelpCircle size={40} className="mx-auto text-white/20 mb-3" />
            <p className="text-white/60 font-medium">No questions found</p>
            <p className="text-xs text-white/40 mt-1">
              Add your first question or click &quot;Seed 30 Sample Questions&quot; above.
            </p>
          </div>
        ) : (
          filtered.map((q, idx) => (
            <div
              key={q._id}
              className="bg-black/60 border border-white/10 hover:border-red-500/30 rounded-2xl p-5 transition group relative"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-red-600/30 text-red-300 border border-red-500/20 font-mono">
                      Q{idx + 1}
                    </span>
                    {q.category && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-white/60 border border-white/10 flex items-center gap-1">
                        <Tag size={10} />
                        {q.category}
                      </span>
                    )}
                  </div>

                  <p className="text-white font-medium whitespace-pre-line text-sm sm:text-base leading-relaxed">
                    {q.text}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(q)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition cursor-pointer"
                    title="Edit question"
                  >
                    <Edit3 size={15} />
                  </button>
                  <button
                    onClick={() => handleDelete(q._id)}
                    className="p-2 rounded-lg bg-red-950/40 hover:bg-red-600/40 text-red-400 hover:text-red-200 transition cursor-pointer"
                    title="Delete question"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>

              {/* OPTIONS GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 pt-3 border-t border-white/5">
                {q.options?.map((opt, i) => {
                  const isCorrect = opt === q.answer;
                  return (
                    <div
                      key={i}
                      className={`px-3 py-2 rounded-xl text-xs sm:text-sm flex items-center justify-between transition ${
                        isCorrect
                          ? "bg-green-950/50 border border-green-500/50 text-green-300 font-semibold"
                          : "bg-white/5 border border-white/5 text-white/70"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="font-mono text-white/40">{String.fromCharCode(65 + i)}.</span>
                        <span>{opt}</span>
                      </span>
                      {isCorrect && (
                        <span className="flex items-center gap-1 text-[11px] text-green-400 bg-green-500/20 px-2 py-0.5 rounded-md">
                          <CheckCircle2 size={12} /> Correct
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>

      {/* CREATE / EDIT MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#120000] border border-red-600/40 rounded-3xl max-w-xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-[0_0_50px_rgba(255,0,0,0.3)]">
            <div className="flex items-center justify-between pb-4 border-b border-red-500/20">
              <h2 className="text-xl font-bold flex items-center gap-2 text-white">
                <HelpCircle className="text-red-400" />
                {editingId ? "Edit Question" : "Add New Question"}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-white/50 hover:text-white cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 mt-5">
              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">
                  Question Text / Prompt
                </label>
                <textarea
                  rows={4}
                  value={formText}
                  onChange={(e) => setFormText(e.target.value)}
                  placeholder="Enter the question text (e.g. What is the output of...)"
                  className="w-full bg-black/60 border border-white/15 rounded-xl p-3 text-sm text-white focus:border-red-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1">
                  Category / Topic
                </label>
                <input
                  type="text"
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  placeholder="e.g. C++, Python, OOP, DSA"
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-sm text-white focus:border-red-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/70 mb-2">
                  Options (Select the radio next to the correct answer)
                </label>
                <div className="space-y-2">
                  {options.map((opt, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="correctAnswer"
                        checked={selectedAnswerIndex === idx}
                        onChange={() => setSelectedAnswerIndex(idx)}
                        className="w-4 h-4 text-green-600 focus:ring-green-500 cursor-pointer accent-green-500"
                        title="Mark as correct answer"
                      />
                      <span className="font-mono text-xs text-white/50 w-5">
                        {String.fromCharCode(65 + idx)}.
                      </span>
                      <input
                        type="text"
                        value={opt}
                        onChange={(e) => {
                          const updated = [...options];
                          updated[idx] = e.target.value;
                          setOptions(updated);
                        }}
                        placeholder={`Option ${String.fromCharCode(65 + idx)}`}
                        className={`flex-1 bg-black/60 border rounded-xl px-3 py-2 text-sm text-white focus:outline-none ${
                          selectedAnswerIndex === idx
                            ? "border-green-500/60 bg-green-950/20"
                            : "border-white/15 focus:border-red-500"
                        }`}
                        required
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-sm cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white text-sm font-semibold shadow-md shadow-red-600/40 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? "Saving..." : editingId ? "Update Question" : "Add Question"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
