
import * as React from "react";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { TimeRange } from "@/types";
import { predefinedTimeRanges } from "@/utils/dateUtils";

interface TimeRangeSelectProps {
  selectedTimeRange: TimeRange;
  onSelectTimeRange: (timeRange: TimeRange) => void;
}

const TimeRangeSelect: React.FC<TimeRangeSelectProps> = ({
  selectedTimeRange,
  onSelectTimeRange
}) => {
  return (
    <Select 
      value={selectedTimeRange.id}
      onValueChange={(value) => {
        const timeRange = predefinedTimeRanges.find(tr => tr.id === value);
        if (timeRange) {
          onSelectTimeRange(timeRange);
        }
      }}
    >
      <SelectTrigger className="w-full md:w-[200px]">
        <SelectValue placeholder="Select time range" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Time Periods</SelectLabel>
          {predefinedTimeRanges.map((timeRange) => (
            <SelectItem 
              key={timeRange.id} 
              value={timeRange.id}
            >
              {timeRange.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export { TimeRangeSelect };
