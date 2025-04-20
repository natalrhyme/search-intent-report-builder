
import { useState, useEffect } from "react";
import HelpGuide from "@/components/builder/HelpGuide";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import DataBlocksPanel from "@/components/builder/DataBlocksPanel";
import ReportTable from "@/components/builder/ReportTable";
import { SelectProperty } from "@/components/ui/select-property";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DraggableBlock, 
  GSCProperty, 
  GSCQueryData, 
  ReportColumn,
  TimeRange 
} from "@/types";
import { getProperties, getCombinedQueryData } from "@/services/gscService";
import { analyzeQueryIntent } from "@/services/geminiService";
import { exportToCSV, exportToGoogleSheets } from "@/services/exportService";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { FileDown, Table as TableIcon, Plus } from "lucide-react";
import { predefinedTimeRanges } from "@/utils/dateUtils";

const Builder = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [properties, setProperties] = useState<GSCProperty[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<GSCProperty | null>(null);
  const [reportTitle, setReportTitle] = useState("Search Intent Analysis");
  const [columns, setColumns] = useState<ReportColumn[]>([
    { id: "query", name: "GSC Query", type: "query" }
  ]);
  const [reportData, setReportData] = useState<GSCQueryData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentDragBlock, setCurrentDragBlock] = useState<DraggableBlock | null>(null);
  const [showHelp, setShowHelp] = useState(false);

  // Check authentication and load properties
  useEffect(() => {
    const authStatus = localStorage.getItem('gsc_auth_status');
    
    if (authStatus !== 'authenticated') {
      navigate('/auth');
      return;
    }
    
    setIsAuthenticated(true);
    
    // Load GSC properties
    const loadProperties = async () => {
      try {
        const props = await getProperties();
        setProperties(props);
        if (props.length > 0) {
          setSelectedProperty(props[0]);
        }
      } catch (error) {
        console.error("Error loading properties:", error);
      }
    };
    
    loadProperties();
  }, [navigate]);

  // Load data when property is selected
  useEffect(() => {
    if (!selectedProperty) return;
    
    const loadInitialData = async () => {
      setIsLoading(true);
      try {
        // Just load basic data initially, with the default 28d period
        const queryData = await getCombinedQueryData(
          selectedProperty, 
          [predefinedTimeRanges[1]] // 28 days by default
        );
        setReportData(queryData);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadInitialData();
  }, [selectedProperty]);

  // Handle drag start
  const handleDragStart = (block: DraggableBlock, e: React.DragEvent) => {
    setCurrentDragBlock(block);
  };

  // Handle drop
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    
    if (!currentDragBlock || !selectedProperty) return;
    
    // Add the column if it doesn't already exist
    const columnExists = columns.some(col => col.id === currentDragBlock.id);
    
    if (!columnExists) {
      let newColumn: ReportColumn;
      
      if (currentDragBlock.type === "metric") {
        newColumn = {
          id: currentDragBlock.id,
          name: currentDragBlock.name,
          type: "metric",
          timeRange: currentDragBlock.timeRange,
          metricType: currentDragBlock.metricType,
        };
      } else if (currentDragBlock.id === "user_intent") {
        newColumn = {
          id: "intent",
          name: "User Intent",
          type: "intent",
        };
        
        // When user intent is added, analyze the queries if not already done
        const needsIntentAnalysis = !reportData.some(item => item.intent);
        
        if (needsIntentAnalysis) {
          analyzeQueries();
        }
      } else if (currentDragBlock.id === "content_category") {
        newColumn = {
          id: "category",
          name: "Content Category",
          type: "category",
        };
        
        // Also ensure intent analysis is done for categories
        const needsIntentAnalysis = !reportData.some(item => item.category);
        
        if (needsIntentAnalysis) {
          analyzeQueries();
        }
      } else {
        return; // Unknown block type
      }
      
      setColumns([...columns, newColumn]);
      
      // Check if we need to load additional time range data
      if (newColumn.type === "metric" && newColumn.timeRange) {
        const timeRangeInData = reportData.some(item => 
          `${newColumn.metricType}_${newColumn.timeRange?.id}` in item.metrics
        );
        
        if (!timeRangeInData) {
          loadAdditionalTimeRangeData(newColumn.timeRange);
        }
      }
    }
    
    setCurrentDragBlock(null);
  };

  // Load data for a specific time range
  const loadAdditionalTimeRangeData = async (timeRange: TimeRange) => {
    if (!selectedProperty) return;
    
    setIsLoading(true);
    
    try {
      // Get all existing time ranges in the current columns
      const existingTimeRanges = columns
        .filter(col => col.type === "metric" && col.timeRange)
        .map(col => col.timeRange) as TimeRange[];
      
      // Add the new time range if not already included
      const timeRangeExists = existingTimeRanges.some(tr => tr.id === timeRange.id);
      const timeRangesToLoad = timeRangeExists 
        ? existingTimeRanges 
        : [...existingTimeRanges, timeRange];
      
      // Load combined data with all needed time ranges
      const updatedData = await getCombinedQueryData(selectedProperty, timeRangesToLoad);
      setReportData(updatedData);
    } catch (error) {
      console.error("Error loading additional time range data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Analyze queries with Gemini API
  const analyzeQueries = async () => {
    if (reportData.length === 0) return;
    
    setIsLoading(true);
    
    try {
      // Extract queries from the report data
      const queries = reportData.map(item => item.query);
      
      // Get intent analysis from Gemini API
      const intentAnalysis = await analyzeQueryIntent(queries);
      
      // Merge the intent analysis with the report data
      const updatedData = reportData.map(item => {
        const analysis = intentAnalysis.find(a => a.query === item.query);
        
        if (analysis) {
          return {
            ...item,
            intent: analysis.intent,
            category: analysis.category,
          };
        }
        
        return item;
      });
      
      setReportData(updatedData);
    } catch (error) {
      console.error("Error analyzing queries:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle export to CSV
  const handleExport = () => {
    if (reportData.length === 0) return;
    
    const filename = reportTitle.replace(/\s+/g, '_').toLowerCase();
    exportToCSV(reportData, columns, filename);
  };
  
  // Handle export to Google Sheets
  const handleExportToSheets = () => {
    if (reportData.length === 0) return;
    
    // This would be implemented with the Google Sheets API in a production app
    // For now, we'll just show a message
    alert('Export to Google Sheets functionality would be implemented here in a production app.');
  };

  // Reset report
  const handleReset = () => {
    setColumns([{ id: "query", name: "GSC Query", type: "query" }]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {showHelp && <HelpGuide onClose={() => setShowHelp(false)} />}
        <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Custom Report Builder</h1>
            <p className="text-muted-foreground">
              Drag and drop blocks to create your custom report
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              className="hidden md:flex" 
              onClick={() => setShowHelp(true)}
            >
              Help Guide
            </Button>
            
            {isAuthenticated && (
              <div className="w-full md:w-auto">
                <SelectProperty
                  properties={properties}
                  selectedProperty={selectedProperty}
                  onSelectProperty={setSelectedProperty}
                />
              </div>
            )}
          </div>
        </div>
        
        {isLoading && (
          <div className="w-full py-4 flex justify-center">
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
              <span>Loading data...</span>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <DataBlocksPanel onDragStart={handleDragStart} />
          </div>
          
          <div className="md:col-span-3 space-y-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Report Title"
                      value={reportTitle}
                      onChange={(e) => setReportTitle(e.target.value)}
                      className="font-medium"
                    />
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={handleReset}
                  >
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <ReportTable
              columns={columns}
              data={reportData}
              onDrop={handleDrop}
              onExport={handleExport}
              onExportToSheets={handleExportToSheets}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Builder;
