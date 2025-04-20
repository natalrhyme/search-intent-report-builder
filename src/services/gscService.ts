
import { GSCProperty, GSCQuery, GSCQueryData, TimeRange } from "@/types";
import { mockProperties, mockQueries, mockQueriesOlderPeriod } from "@/utils/mockData";

// Get GSC properties
const getProperties = async (): Promise<GSCProperty[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // In a real app, this would fetch from the GSC API
  return mockProperties;
};

// Get query data for a specific property and time range
const getQueryData = async (
  property: GSCProperty,
  timeRange: TimeRange,
  rowLimit: number = 50
): Promise<GSCQuery[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // In a real app, this would fetch from the GSC API with proper pagination
  // For the prototype, we'll use the mock data
  
  // Use different mock data based on the time range
  if (timeRange.id === "3m") {
    return mockQueriesOlderPeriod.slice(0, rowLimit);
  } else {
    return mockQueries.slice(0, rowLimit);
  }
};

// Combines GSC data from different time periods into a single dataset
const getCombinedQueryData = async (
  property: GSCProperty,
  timeRanges: TimeRange[]
): Promise<GSCQueryData[]> => {
  // First, get the query data for the first time range to establish the base queries
  const baseQueries = await getQueryData(property, timeRanges[0]);
  
  // Create a map to store combined data by query
  const queryDataMap: Record<string, GSCQueryData> = {};
  
  // Initialize the map with base queries
  baseQueries.forEach(query => {
    queryDataMap[query.query] = {
      query: query.query,
      metrics: {
        [`clicks_${timeRanges[0].id}`]: query.clicks,
        [`impressions_${timeRanges[0].id}`]: query.impressions,
        [`ctr_${timeRanges[0].id}`]: query.ctr,
        [`position_${timeRanges[0].id}`]: query.position,
      },
    };
  });
  
  // For each additional time range, fetch and add the data
  for (let i = 1; i < timeRanges.length; i++) {
    const additionalQueries = await getQueryData(property, timeRanges[i]);
    
    additionalQueries.forEach(query => {
      // If this query already exists in our map, add the metrics
      if (queryDataMap[query.query]) {
        queryDataMap[query.query].metrics[`clicks_${timeRanges[i].id}`] = query.clicks;
        queryDataMap[query.query].metrics[`impressions_${timeRanges[i].id}`] = query.impressions;
        queryDataMap[query.query].metrics[`ctr_${timeRanges[i].id}`] = query.ctr;
        queryDataMap[query.query].metrics[`position_${timeRanges[i].id}`] = query.position;
      } else {
        // If this is a new query not in the base set, add it
        queryDataMap[query.query] = {
          query: query.query,
          metrics: {
            [`clicks_${timeRanges[i].id}`]: query.clicks,
            [`impressions_${timeRanges[i].id}`]: query.impressions,
            [`ctr_${timeRanges[i].id}`]: query.ctr,
            [`position_${timeRanges[i].id}`]: query.position,
          },
        };
      }
    });
  }
  
  // Convert the map back to an array
  return Object.values(queryDataMap);
};

export { getProperties, getQueryData, getCombinedQueryData };
