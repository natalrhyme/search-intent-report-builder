
import { useState } from "react";
import { DraggableBlock } from "@/components/ui/draggable-block";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TimeRangeSelect } from "@/components/ui/time-range-select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DraggableBlock as DraggableBlockType, TimeRange } from "@/types";
import { predefinedTimeRanges } from "@/utils/dateUtils";

interface DataBlocksPanelProps {
  onDragStart: (block: DraggableBlockType, e: React.DragEvent) => void;
}

const DataBlocksPanel: React.FC<DataBlocksPanelProps> = ({ onDragStart }) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange>(predefinedTimeRanges[1]); // Default to 28 days

  const metricBlocks = [
    {
      id: `clicks_${selectedTimeRange.id}`,
      name: `Clicks ${selectedTimeRange.name}`,
      type: "metric" as const,
      timeRange: selectedTimeRange,
      metricType: "clicks" as const,
    },
    {
      id: `impressions_${selectedTimeRange.id}`,
      name: `Impressions ${selectedTimeRange.name}`,
      type: "metric" as const,
      timeRange: selectedTimeRange,
      metricType: "impressions" as const,
    },
    {
      id: `ctr_${selectedTimeRange.id}`,
      name: `CTR ${selectedTimeRange.name}`,
      type: "metric" as const,
      timeRange: selectedTimeRange,
      metricType: "ctr" as const,
    },
    {
      id: `position_${selectedTimeRange.id}`,
      name: `Position ${selectedTimeRange.name}`,
      type: "metric" as const,
      timeRange: selectedTimeRange,
      metricType: "position" as const,
    },
  ];

  const intentBlocks = [
    {
      id: "user_intent",
      name: "User Intent",
      type: "intent" as const,
    },
    {
      id: "content_category",
      name: "Content Category",
      type: "intent" as const,
    },
  ];

  const handleDragStart = (block: DraggableBlockType, e: React.DragEvent) => {
    onDragStart(block, e);
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">Data Blocks</CardTitle>
        <div className="mt-2">
          <TimeRangeSelect
            selectedTimeRange={selectedTimeRange}
            onSelectTimeRange={setSelectedTimeRange}
          />
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="metrics">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="metrics" className="flex-1">Metrics</TabsTrigger>
            <TabsTrigger value="intent" className="flex-1">Intent Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="metrics" className="space-y-3">
            {metricBlocks.map((block) => (
              <DraggableBlock
                key={block.id}
                id={block.id}
                draggable
                onDragStart={(e) => handleDragStart(block, e)}
              >
                {block.name}
              </DraggableBlock>
            ))}
          </TabsContent>
          
          <TabsContent value="intent" className="space-y-3">
            {intentBlocks.map((block) => (
              <DraggableBlock
                key={block.id}
                id={block.id}
                draggable
                onDragStart={(e) => handleDragStart(block, e)}
              >
                {block.name}
              </DraggableBlock>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DataBlocksPanel;
