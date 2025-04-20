
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DraggableBlock as DraggableBlockType, 
  ReportColumn, 
  GSCQueryData 
} from "@/types";
import { Button } from "@/components/ui/button";
import { FileDown, Table as TableIcon, FileText } from "lucide-react";
import { useState } from "react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface ReportTableProps {
  columns: ReportColumn[];
  data: GSCQueryData[];
  onDrop: (e: React.DragEvent) => void;
  onExport: () => void;
  onExportToSheets?: () => void;
}

const ReportTable: React.FC<ReportTableProps> = ({
  columns,
  data,
  onDrop,
  onExport,
  onExportToSheets
}) => {
  const [dropHighlight, setDropHighlight] = useState(false);
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDropHighlight(true);
  };
  
  const handleDragLeave = () => {
    setDropHighlight(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    setDropHighlight(false);
    onDrop(e);
  };

  const formatValue = (value: number, type: string) => {
    if (type.includes('ctr')) {
      return `${(value * 100).toFixed(2)}%`;
    } else if (type.includes('position')) {
      return value.toFixed(1);
    }
    return value.toLocaleString();
  };

  const getCellValue = (row: GSCQueryData, column: ReportColumn) => {
    if (column.type === 'query') {
      return row.query;
    } else if (column.type === 'metric' && column.metricType && column.timeRange) {
      const metricKey = `${column.metricType}_${column.timeRange.id}`;
      const value = row.metrics[metricKey];
      return value !== undefined ? formatValue(value, metricKey) : 'N/A';
    } else if (column.type === 'intent') {
      return row.intent || 'Not analyzed';
    } else if (column.type === 'category') {
      return row.category || 'Uncategorized';
    }
    return 'N/A';
  };

  return (
    <div className="border rounded-md shadow-sm bg-white">
      <div className="flex justify-between items-center p-4 border-b">
        <div className="flex items-center gap-2">
          <TableIcon size={18} className="text-muted-foreground" />
          <h3 className="font-semibold">Report Preview</h3>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <FileDown size={16} />
              Export
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onExport}>
              <FileText className="mr-2 h-4 w-4" />
              <span>Export to CSV</span>
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={onExportToSheets || (() => alert('Google Sheets export would be implemented in a production app'))}
            >
              <TableIcon className="mr-2 h-4 w-4" />
              <span>Export to Google Sheets</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div 
        className={`
          ${dropHighlight ? 'border-2 border-dashed border-primary/40 bg-primary/5' : ''} 
          transition-colors duration-200
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="border-b bg-[hsl(var(--report-header))] p-2 flex">
          {columns.length > 0 ? (
            columns.map((column) => (
              <div 
                key={column.id} 
                className="flex-1 font-medium text-sm p-2 truncate"
                title={column.name}
              >
                {column.name}
              </div>
            ))
          ) : (
            <div className="w-full p-4 text-center text-muted-foreground text-sm border-dashed border-2 rounded-md mx-2">
              Drag data blocks here to build your report
            </div>
          )}
        </div>
        
        {columns.length > 0 && data.length > 0 && (
          <div className="max-h-[500px] overflow-auto">
            <Table>
              <TableHeader className="sticky top-0 bg-white z-10">
                <TableRow>
                  {columns.map((column) => (
                    <TableHead key={`header-${column.id}`} className="font-medium">
                      {column.name}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((row, rowIndex) => (
                  <TableRow 
                    key={`row-${rowIndex}`} 
                    className={rowIndex % 2 === 1 ? 'bg-[hsl(var(--report-row-alt))]' : ''}
                  >
                    {columns.map((column) => (
                      <TableCell key={`${rowIndex}-${column.id}`}>
                        {getCellValue(row, column)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
        
        {columns.length > 0 && data.length === 0 && (
          <div className="p-8 text-center text-muted-foreground">
            No data available for the selected property. Try selecting a different property.
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportTable;
