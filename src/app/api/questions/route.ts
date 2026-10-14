import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

// Fisher-Yates Shuffle
function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "src/app/data/questions.json");
    const fileContents = await fs.readFile(filePath, "utf-8");
    const questions = JSON.parse(fileContents);

    // Shuffle order per participant
    const randomized = shuffleArray([...questions]);

    // Select 20 random questions and remove correct answers before sending
    const safeQuestions = randomized.slice(0, 20).map(({ answer, ...rest }) => rest);

    return NextResponse.json({ questions: safeQuestions });
  } catch (err) {
    console.error("Error loading questions:", err);
    return NextResponse.json({ error: "Failed to load questions" }, { status: 500 });
  }
}
