
import { GeminiIntentAnalysis } from "@/types";

async function analyzeQueryIntent(queries: string[]): Promise<GeminiIntentAnalysis[]> {
  const API_KEY = "YOUR_GEMINI_API_KEY";
  const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

  const results = await Promise.all(
    queries.map(async (query) => {
      const prompt = `Analyze this search query and provide:
      1. The user's intent
      2. Content category
      
      Query: "${query}"
      
      Respond in JSON format:
      {
        "intent": "user's intent",
        "category": "content category"
      }`;

      const response = await fetch(`${API_URL}?key=${API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }]
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error("Failed to analyze query with Gemini");
      }

      const data = await response.json();
      let result: IntentAnalysisResponse;

      try {
        const responseText = data.candidates[0].content.parts[0].text;
        result = JSON.parse(responseText);
      } catch (error) {
        console.error("Error parsing Gemini response:", error);
        result = {
          intent: "Failed to analyze",
          category: "Unknown"
        };
      }

      return {
        query,
        intent: result.intent,
        category: result.category
      };
    })
  );

  return results;
}

interface IntentAnalysisResponse {
  intent: string;
  category: string;
}

export { analyzeQueryIntent };
