
import { GSCQueryData, ReportColumn } from "@/types";

// Helper to format data for CSV
const formatDataForCSV = (data: GSCQueryData[], columns: ReportColumn[]): string[][] => {
  // Create header row
  const headers = columns.map(col => col.name);
  
  // Create data rows
  const rows = data.map(row => {
    return columns.map(column => {
      if (column.type === 'query') {
        return row.query;
      } else if (column.type === 'metric' && column.metricType && column.timeRange) {
        const metricKey = `${column.metricType}_${column.timeRange.id}`;
        const value = row.metrics[metricKey];
        
        if (value === undefined) return 'N/A';
        
        // Format based on metric type
        if (column.metricType === 'ctr') {
          return `${(value * 100).toFixed(2)}%`;
        } else if (column.metricType === 'position') {
          return value.toFixed(1);
        } else {
          return value.toString();
        }
      } else if (column.type === 'intent') {
        return row.intent || 'Not analyzed';
      } else if (column.type === 'category') {
        return row.category || 'Uncategorized';
      }
      return 'N/A';
    });
  });
  
  return [headers, ...rows];
};

// Export data as CSV
const exportToCSV = (data: GSCQueryData[], columns: ReportColumn[], filename: string): void => {
  const formattedData = formatDataForCSV(data, columns);
  
  // Convert to CSV format
  const csvContent = formattedData
    .map(row => row.map(cell => `"${cell}"`).join(','))
    .join('\n');
  
  // Create a blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Export to Google Sheets
const exportToGoogleSheets = (data: GSCQueryData[], columns: ReportColumn[]): void => {
  // For demonstration purposes, this would be a mock function
  // In a real application, this would use the Google Sheets API
  
  console.log('Export to Google Sheets with data:', data.length, 'rows and', columns.length, 'columns');
  alert('Export to Google Sheets functionality would be implemented here in a production app.');
  
  // This would typically involve:
  // 1. Authenticating with Google Sheets API
  // 2. Creating a new sheet or opening an existing one
  // 3. Converting the data to the format expected by Sheets API
  // 4. Making API calls to update the sheet
};

export { exportToCSV, exportToGoogleSheets };
