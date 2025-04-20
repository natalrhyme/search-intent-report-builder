
import { GSCQueryData, ReportColumn } from "@/types";

export const convertToCSV = (data: GSCQueryData[], columns: ReportColumn[]): string => {
  // Create the CSV header row
  const headerRow = columns.map(col => `"${col.name}"`).join(',');
  
  // Create data rows
  const rows = data.map(item => {
    const values = columns.map(column => {
      let value: string | number = '';
      
      // Get appropriate value based on column type
      if (column.type === 'query') {
        value = item.query;
      } else if (column.type === 'metric' && column.metricType && column.timeRange) {
        const metricKey = `${column.metricType}_${column.timeRange.id}`;
        const rawValue = item.metrics[metricKey];
        
        if (rawValue !== undefined) {
          if (column.metricType === 'ctr') {
            value = (rawValue * 100).toFixed(2) + '%';
          } else if (column.metricType === 'position') {
            value = rawValue.toFixed(1);
          } else {
            value = rawValue;
          }
        } else {
          value = 'N/A';
        }
      } else if (column.type === 'intent') {
        value = item.intent || 'Not analyzed';
      } else if (column.type === 'category') {
        value = item.category || 'Uncategorized';
      }
      
      // Escape double quotes and wrap in quotes
      return `"${value.toString().replace(/"/g, '""')}"`;
    });
    
    return values.join(',');
  });
  
  // Combine header and rows
  return [headerRow, ...rows].join('\n');
};

export const downloadCSV = (csvContent: string, filename: string): void => {
  // Create a blob with the CSV content
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  
  // Create a download link
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  
  // Trigger the download
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToGoogleSheets = (data: GSCQueryData[], columns: ReportColumn[]): void => {
  // For demonstration purposes, this would be a mock function
  // In a real application, this would use the Google Sheets API
  
  alert('Export to Google Sheets functionality would be implemented here in a production app.');
  
  // This would typically involve:
  // 1. Authenticating with Google Sheets API
  // 2. Creating a new sheet or opening an existing one
  // 3. Converting the data to the format expected by Sheets API
  // 4. Making API calls to update the sheet
};
