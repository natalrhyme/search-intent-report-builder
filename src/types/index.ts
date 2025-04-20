
// Types for Google Search Console Data
export interface GSCProperty {
  siteUrl: string;
  displayName?: string;
}

export interface TimeRange {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
}

export interface GSCMetric {
  id: string;
  name: string;
  timeRange: TimeRange;
  type: 'clicks' | 'impressions' | 'ctr' | 'position';
}

export interface GSCQuery {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export interface GSCQueryData {
  query: string;
  metrics: Record<string, number>;
  category?: string;
  intent?: string;
}

export interface DraggableBlock {
  id: string;
  name: string;
  type: 'metric' | 'intent';
  timeRange?: TimeRange;
  metricType?: 'clicks' | 'impressions' | 'ctr' | 'position';
}

export interface ReportColumn {
  id: string;
  name: string;
  type: 'query' | 'metric' | 'category' | 'intent';
  timeRange?: TimeRange;
  metricType?: 'clicks' | 'impressions' | 'ctr' | 'position';
}

export interface ReportConfig {
  title: string;
  property: GSCProperty;
  columns: ReportColumn[];
}

export interface GeminiIntentAnalysis {
  query: string;
  intent: string;
  category?: string;
}
