
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
import { GSCProperty } from "@/types";

interface SelectPropertyProps {
  properties: GSCProperty[];
  selectedProperty: GSCProperty | null;
  onSelectProperty: (property: GSCProperty) => void;
}

const SelectProperty: React.FC<SelectPropertyProps> = ({
  properties,
  selectedProperty,
  onSelectProperty
}) => {
  return (
    <Select 
      value={selectedProperty?.siteUrl || ""}
      onValueChange={(value) => {
        const property = properties.find(p => p.siteUrl === value);
        if (property) {
          onSelectProperty(property);
        }
      }}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select property" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Your Properties</SelectLabel>
          {properties.map((property) => (
            <SelectItem 
              key={property.siteUrl} 
              value={property.siteUrl}
            >
              {property.displayName || property.siteUrl}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export { SelectProperty };
