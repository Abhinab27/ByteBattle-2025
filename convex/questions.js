import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

const INITIAL_QUESTIONS = [
  {
    text: "What will be the output of the following C++ code?\n\n#include <iostream>\nusing namespace std;\nint main(){\n    int x = 5;\n    cout << x++ + ++x;\n}\n",
    options: ["10", "11", "12", "Undefined behavior"],
    answer: "Undefined behavior",
    category: "C++",
    qid: 1,
  },
  {
    text: "Which concept allows multiple functions with the same name but different parameters in C++?",
    options: ["Encapsulation", "Polymorphism", "Function Overloading", "Abstraction"],
    answer: "Function Overloading",
    category: "C++",
    qid: 2,
  },
  {
    text: "What will be the output of the following Python code?\n\nx = [1,2,3]\nprint(x * 2)",
    options: ["[2,4,6]", "[1,2,3,1,2,3]", "Error", "None"],
    answer: "[1,2,3,1,2,3]",
    category: "Python",
    qid: 3,
  },
  {
    text: "In Java, which of the following statements about constructors is true?",
    options: ["Constructors can be inherited", "Constructors cannot be overloaded", "Constructors have no return type", "Constructors must be private"],
    answer: "Constructors have no return type",
    category: "Java",
    qid: 4,
  },
  {
    text: "What is the output of the following code?\n\n#include <iostream>\nusing namespace std;\nint main(){\n    int a=3, b=2;\n    cout << (a & b);\n}",
    options: ["1", "2", "3", "0"],
    answer: "2",
    category: "C++",
    qid: 5,
  },
  {
    text: "In Python, what is the output of:\n\nprint(0.1 + 0.2 == 0.3)",
    options: ["True", "False", "Error", "None"],
    answer: "False",
    category: "Python",
    qid: 6,
  },
  {
    text: "Which OOP principle restricts direct access to object data?",
    options: ["Abstraction", "Encapsulation", "Inheritance", "Polymorphism"],
    answer: "Encapsulation",
    category: "OOP",
    qid: 7,
  },
  {
    text: "What is printed by this Java code?\n\nclass Main {\n  public static void main(String[] args) {\n    int a = 5;\n    System.out.println(a++ + ++a);\n  }\n}",
    options: ["11", "12", "10", "Compilation Error"],
    answer: "12",
    category: "Java",
    qid: 8,
  },
  {
    text: "What will be the output of this C++ code?\n\n#include <iostream>\nusing namespace std;\nint main(){\n    string s = \"hello\";\n    cout << s[0];\n}",
    options: ["h", "e", "hello", "Error"],
    answer: "h",
    category: "C++",
    qid: 9,
  },
  {
    text: "Which of the following correctly defines a destructor in C++?",
    options: ["~ClassName()", "ClassName()", "void ~ClassName()", "delete ClassName()"],
    answer: "~ClassName()",
    category: "C++",
    qid: 10,
  },
  {
    text: "Predict the output:\n\nint main(){\n    int x = 10;\n    if(x = 5) cout << x;\n    else cout << 0;\n}",
    options: ["5", "10", "0", "Error"],
    answer: "5",
    category: "C++",
    qid: 11,
  },
  {
    text: "Which of the following is not an OOP concept?",
    options: ["Abstraction", "Encapsulation", "Recursion", "Polymorphism"],
    answer: "Recursion",
    category: "OOP",
    qid: 12,
  },
  {
    text: "In Python, what is the result of:\n\nprint('A' * 3)",
    options: ["AAA", "Error", "A3", "['A','A','A']"],
    answer: "AAA",
    category: "Python",
    qid: 13,
  },
  {
    text: "What will be the output of the following Java code?\n\nSystem.out.println(10 + 20 + \"Java\" + 30 + 40);",
    options: ["Java3040", "30Java3040", "30Java70", "3Java3040"],
    answer: "30Java3040",
    category: "Java",
    qid: 14,
  },
  {
    text: "In C++, which access specifier makes class members accessible only to derived classes?",
    options: ["private", "protected", "public", "friend"],
    answer: "protected",
    category: "C++",
    qid: 15,
  },
  {
    text: "What is printed by this code?\n\nint arr[] = {1,2,3};\ncout << *(arr+1);",
    options: ["1", "2", "3", "Error"],
    answer: "2",
    category: "C++",
    qid: 16,
  },
  {
    text: "Which operator cannot be overloaded in C++?",
    options: ["==", "()", "::", "+"],
    answer: "::",
    category: "C++",
    qid: 17,
  },
  {
    text: "In Python, which method returns the number of elements in a list?",
    options: ["length()", "size()", "count()", "len()"],
    answer: "len()",
    category: "Python",
    qid: 18,
  },
  {
    text: "What will be printed?\n\n#include <iostream>\nusing namespace std;\nint main(){\n    for(int i=0;i<3;i++){\n        static int x = 0;\n        x++;\n        cout << x << \" \";\n    }\n}",
    options: ["1 1 1", "1 2 3", "3 3 3", "0 1 2"],
    answer: "1 2 3",
    category: "C++",
    qid: 19,
  },
  {
    text: "Which concept allows the same function name in base and derived classes?",
    options: ["Encapsulation", "Function Overriding", "Abstraction", "Constructor Chaining"],
    answer: "Function Overriding",
    category: "OOP",
    qid: 20,
  },
  {
    text: "In Java, which keyword is used to inherit a class?",
    options: ["extends", "implements", "inherits", "super"],
    answer: "extends",
    category: "Java",
    qid: 21,
  },
  {
    text: "What will be the output of:\n\nprint(type(3/2))",
    options: ["<class 'int'>", "<class 'float'>", "<class 'double'>", "Error"],
    answer: "<class 'float'>",
    category: "Python",
    qid: 22,
  },
  {
    text: "Which of the following statements about virtual functions in C++ is true?",
    options: ["They cannot be overridden", "They support runtime polymorphism", "They are static", "They cannot be pure"],
    answer: "They support runtime polymorphism",
    category: "C++",
    qid: 23,
  },
  {
    text: "What will be the output of this code?\n\nx = 10\ny = 20\nprint(x and y)\n",
    options: ["True", "False", "10", "20"],
    answer: "20",
    category: "Python",
    qid: 24,
  },
  {
    text: "In C++, what is the output of:\n\nint a = 5;\ncout << a++ + ++a;",
    options: ["10", "11", "12", "Undefined behavior"],
    answer: "Undefined behavior",
    category: "C++",
    qid: 25,
  },
  {
    text: "Which of the following correctly defines polymorphism?",
    options: ["Ability of a function to take multiple forms", "Binding data and methods together", "Hiding implementation", "Creating multiple objects"],
    answer: "Ability of a function to take multiple forms",
    category: "OOP",
    qid: 26,
  },
  {
    text: "What will be printed by this Java code?\n\nSystem.out.println(10 + \"20\" + 30);",
    options: ["60", "102030", "1030", "3030"],
    answer: "102030",
    category: "Java",
    qid: 27,
  },
  {
    text: "In Python, what will be printed by:\n\na = [1,2,3]\nb = a\na.append(4)\nprint(b)",
    options: ["[1,2,3]", "[1,2,3,4]", "Error", "None"],
    answer: "[1,2,3,4]",
    category: "Python",
    qid: 28,
  },
  {
    text: "Which of the following concepts in OOP hides unnecessary details from the user?",
    options: ["Abstraction", "Encapsulation", "Inheritance", "Polymorphism"],
    answer: "Abstraction",
    category: "OOP",
    qid: 29,
  },
  {
    text: "What will be printed by this C++ code?\n\nint main(){\n    int x = 10;\n    int &ref = x;\n    ref++;\n    cout << x;\n}",
    options: ["9", "10", "11", "Error"],
    answer: "11",
    category: "C++",
    qid: 30,
  },
];

/**
 * getAdminQuestions
 * - Admin query to view all questions with answers
 */
export const getAdminQuestions = query({
  handler: async (ctx) => {
    const list = await ctx.db.query("questions").collect();
    return list.sort((a, b) => (a.qid ?? 0) - (b.qid ?? 0));
  },
});

/**
 * seedInitialQuestions
 * - Seeds 30 default questions if questions table is empty
 */
export const seedInitialQuestions = mutation({
  handler: async (ctx) => {
    const existing = await ctx.db.query("questions").collect();
    if (existing.length > 0) {
      return { count: existing.length, message: "Questions already exist" };
    }

    let count = 0;
    for (const q of INITIAL_QUESTIONS) {
      await ctx.db.insert("questions", {
        ...q,
        createdAt: Date.now(),
      });
      count++;
    }

    return { count, message: `Successfully seeded ${count} questions` };
  },
});

/**
 * addQuestion
 * - Admin mutation to create a new question
 */
export const addQuestion = mutation({
  args: {
    text: v.string(),
    options: v.array(v.string()),
    answer: v.string(),
    category: v.optional(v.string()),
    qid: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("questions", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

/**
 * updateQuestion
 * - Admin mutation to update an existing question
 */
export const updateQuestion = mutation({
  args: {
    id: v.id("questions"),
    text: v.string(),
    options: v.array(v.string()),
    answer: v.string(),
    category: v.optional(v.string()),
  },
  handler: async (ctx, { id, text, options, answer, category }) => {
    await ctx.db.patch(id, {
      text,
      options,
      answer,
      category,
    });
    return { success: true };
  },
});

/**
 * deleteQuestion
 * - Admin mutation to delete a question
 */
export const deleteQuestion = mutation({
  args: {
    id: v.id("questions"),
  },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id);
    return { success: true };
  },
});

/**
 * getRound1Questions
 * - Fetches 20 random questions without answers for participants taking Round 1
 */
export const getRound1Questions = query({
  handler: async (ctx) => {
    const all = await ctx.db.query("questions").collect();

    // If no questions in DB yet, return empty list (admin can seed)
    if (!all || all.length === 0) {
      return [];
    }

    // Shuffle array using Fisher-Yates
    const shuffled = [...all];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // Select up to 20 questions
    const selected = shuffled.slice(0, 20);

    // Return safe questions without correct answer
    return selected.map((q) => ({
      _id: q._id,
      question: q.text,
      options: q.options,
      category: q.category,
    }));
  },
});

/**
 * evaluateRound1
 * - Securely evaluates submitted answers against Convex database questions
 * - Passing criteria: >= 45% correct questions (e.g., 9 out of 20)
 * - Sets round1Cleared: true if >= 45%
 */
export const evaluateRound1 = mutation({
  args: {
    teamId: v.id("teamRegistrations"),
    answers: v.any(), // Record<string, string> (questionId -> chosenOption)
  },
  handler: async (ctx, { teamId, answers }) => {
    const questions = await ctx.db.query("questions").collect();
    const qMap = new Map();
    for (const q of questions) {
      qMap.set(q._id.toString(), q.answer);
    }

    let correctCount = 0;
    const answerEntries = Object.entries(answers ?? {});
    const totalAttempted = answerEntries.length;

    for (const [qId, selectedAns] of answerEntries) {
      const realAns = qMap.get(qId);
      if (realAns && realAns === selectedAns) {
        correctCount++;
      }
    }

    // Total questions for evaluation is 20 (or total attempted if fewer)
    const baseTotal = 20;
    const percentage = Math.round((correctCount / baseTotal) * 100);
    const cleared = percentage >= 45; // ⭐ 45% passing rule (9+ out of 20)

    const now = Date.now();
    const existing = await ctx.db
      .query("teamAssessments")
      .withIndex("by_teamId", (q) => q.eq("teamId", teamId))
      .first();

    if (!existing) {
      await ctx.db.insert("teamAssessments", {
        teamId,
        score: correctCount * 2, // 2 points per correct question
        startedAt: now,
        completedAt: now,
        status: "completed",
        round1Attempted: true,
        round1Score: correctCount * 2,
        round1Cleared: cleared,
        round2Cleared: false,
        round2ProjectSubmitted: false,
      });
    } else {
      await ctx.db.patch(existing._id, {
        score: correctCount * 2,
        completedAt: now,
        status: "completed",
        round1Attempted: true,
        round1Score: correctCount * 2,
        round1Cleared: cleared,
      });
    }

    return {
      correctCount,
      totalQuestions: baseTotal,
      score: correctCount * 2,
      maxScore: baseTotal * 2,
      percentage,
      cleared,
    };
  },
});
