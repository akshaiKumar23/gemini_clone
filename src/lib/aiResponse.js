import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const generAiResponse = async (prompt) => {
  const result = await model.generateContent(prompt);
  const aiResponse = result.response.text();
  return aiResponse;
};

export default generAiResponse;
