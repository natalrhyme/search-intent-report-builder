
// Mock data for development - will be replaced with actual API calls
import { GSCProperty, GSCQuery, GSCQueryData, GeminiIntentAnalysis } from "../types";

export const mockProperties: GSCProperty[] = [
  { siteUrl: "https://example.com", displayName: "Example Site" },
  { siteUrl: "https://mysite.com", displayName: "My Blog" },
  { siteUrl: "https://teststore.com", displayName: "Test Store" },
];

export const mockQueries: GSCQuery[] = [
  {
    query: "best doorbell camera",
    clicks: 2450,
    impressions: 15800,
    ctr: 0.155,
    position: 3.2,
  },
  {
    query: "5ghz smart plug",
    clicks: 1890,
    impressions: 12300,
    ctr: 0.154,
    position: 2.8,
  },
  {
    query: "wireless security camera",
    clicks: 3210,
    impressions: 19700,
    ctr: 0.163,
    position: 2.4,
  },
  {
    query: "smart home hub review",
    clicks: 1540,
    impressions: 10200,
    ctr: 0.151,
    position: 4.1,
  },
  {
    query: "alexa compatible devices",
    clicks: 2870,
    impressions: 16400,
    ctr: 0.175,
    position: 2.2,
  },
  {
    query: "google home vs alexa",
    clicks: 3450,
    impressions: 21300,
    ctr: 0.162,
    position: 1.9,
  },
  {
    query: "smart thermostats energy saving",
    clicks: 980,
    impressions: 8700,
    ctr: 0.113,
    position: 5.3,
  },
  {
    query: "wifi mesh system for large home",
    clicks: 1650,
    impressions: 11200,
    ctr: 0.147,
    position: 3.6,
  },
  {
    query: "is ring alarm insurance approved uk",
    clicks: 720,
    impressions: 6500,
    ctr: 0.111,
    position: 4.8,
  },
  {
    query: "budget smart home devices",
    clicks: 2340,
    impressions: 14900,
    ctr: 0.157,
    position: 3.1,
  },
];

export const mockQueriesOlderPeriod: GSCQuery[] = mockQueries.map(query => ({
  ...query,
  clicks: Math.floor(query.clicks * 0.8),
  impressions: Math.floor(query.impressions * 0.85),
  ctr: query.ctr * 0.95,
  position: query.position + Math.random() * 0.8,
}));

export const mockIntentAnalysis: GeminiIntentAnalysis[] = [
  {
    query: "best doorbell camera",
    intent: "Find and compare top-rated doorbell cameras",
    category: "Guide",
  },
  {
    query: "5ghz smart plug",
    intent: "Find smart plugs that work with 5GHz WiFi networks",
    category: "Explainer",
  },
  {
    query: "wireless security camera",
    intent: "Find wireless security camera options",
    category: "Guide",
  },
  {
    query: "smart home hub review",
    intent: "Read reviews of different smart home hubs",
    category: "Review",
  },
  {
    query: "alexa compatible devices",
    intent: "Find devices that work with Alexa",
    category: "Guide",
  },
  {
    query: "google home vs alexa",
    intent: "Compare Google Home and Alexa smart assistants",
    category: "Comparison",
  },
  {
    query: "smart thermostats energy saving",
    intent: "Learn how smart thermostats can reduce energy costs",
    category: "Explainer",
  },
  {
    query: "wifi mesh system for large home",
    intent: "Find mesh WiFi systems suitable for large homes",
    category: "Guide",
  },
  {
    query: "is ring alarm insurance approved uk",
    intent: "Find information about Ring Alarm insurance approval in the UK",
    category: "Explainer",
  },
  {
    query: "budget smart home devices",
    intent: "Find affordable smart home devices",
    category: "Guide",
  },
];

// Generate combined data for the report
export const generateMockReportData = (): GSCQueryData[] => {
  return mockQueries.map((query, index) => {
    const intentData = mockIntentAnalysis[index];
    return {
      query: query.query,
      metrics: {
        "clicks_28d": query.clicks,
        "impressions_28d": query.impressions,
        "ctr_28d": query.ctr,
        "position_28d": query.position,
        "clicks_3m": mockQueriesOlderPeriod[index].clicks,
        "impressions_3m": mockQueriesOlderPeriod[index].impressions,
        "ctr_3m": mockQueriesOlderPeriod[index].ctr,
        "position_3m": mockQueriesOlderPeriod[index].position,
      },
      category: intentData.category,
      intent: intentData.intent,
    };
  });
};
