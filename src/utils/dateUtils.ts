
import { format, subDays, subMonths } from "date-fns";

// Predefined time ranges for GSC data
export const predefinedTimeRanges = [
  {
    id: "7d",
    name: "Last 7 Days",
    startDate: format(subDays(new Date(), 7), "yyyy-MM-dd"),
    endDate: format(new Date(), "yyyy-MM-dd"),
  },
  {
    id: "28d",
    name: "Last 28 Days",
    startDate: format(subDays(new Date(), 28), "yyyy-MM-dd"),
    endDate: format(new Date(), "yyyy-MM-dd"),
  },
  {
    id: "3m",
    name: "Last 3 Months",
    startDate: format(subMonths(new Date(), 3), "yyyy-MM-dd"),
    endDate: format(new Date(), "yyyy-MM-dd"),
  },
];

// Format date for display
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return format(date, "MMM d, yyyy");
};

// Get time range by ID
export const getTimeRangeById = (id: string) => {
  return predefinedTimeRanges.find(range => range.id === id) || predefinedTimeRanges[0];
};

// Create custom time range
export const createCustomTimeRange = (startDate: string, endDate: string) => {
  return {
    id: "custom",
    name: "Custom Range",
    startDate,
    endDate,
  };
};

// Format date range for display
export const formatDateRange = (startDate: string, endDate: string): string => {
  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
};
