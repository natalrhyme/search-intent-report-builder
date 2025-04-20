
import { GeminiIntentAnalysis } from "@/types";

// This would be replaced with an actual API call to the Gemini API
// For the prototype, we'll use the mock data
const analyzeQueryIntent = async (queries: string[]): Promise<GeminiIntentAnalysis[]> => {
  console.log("Analyzing queries with Gemini API:", queries);
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // In a real application, this would use the Gemini API
  // For now, we'll return mock data
  // The mock data structure is matching the expected response structure from Gemini
  return queries.map(query => ({
    query,
    intent: generateMockIntent(query),
    category: generateMockCategory(query),
  }));
};

// Helper function to generate mock intent data
const generateMockIntent = (query: string): string => {
  const intents = [
    "Find and compare top options",
    "Learn how to use or setup",
    "Find specific information about compatibility",
    "Read reviews and recommendations",
    "Solve a specific problem or issue",
    "Find products within a budget"
  ];
  
  // Simulate some logic to generate relevant intent
  if (query.includes("best")) {
    return `Find and compare ${query.replace("best", "").trim()}`;
  } else if (query.includes("how")) {
    return `Learn how to use ${query.replace("how", "").trim()}`;
  } else if (query.includes("vs")) {
    return `Compare options: ${query}`;
  } else if (query.includes("review")) {
    return `Read reviews about ${query.replace("review", "").trim()}`;
  } else if (query.includes("fix") || query.includes("issue")) {
    return `Solve problems with ${query.replace("fix", "").replace("issue", "").trim()}`;
  } else if (query.includes("budget") || query.includes("cheap")) {
    return `Find affordable ${query.replace("budget", "").replace("cheap", "").trim()}`;
  } else {
    return `Find information about ${query}`;
  }
};

// Helper function to generate mock category data
const generateMockCategory = (query: string): string => {
  if (query.includes("how") || query.includes("guide")) {
    return "Guide";
  } else if (query.includes("vs") || query.includes("compare")) {
    return "Comparison";
  } else if (query.includes("review")) {
    return "Review";
  } else if (query.includes("what is") || query.includes("definition")) {
    return "Explainer";
  } else if (query.includes("best") || query.includes("top")) {
    return "List";
  } else {
    return "Blog";
  }
};

export { analyzeQueryIntent };
