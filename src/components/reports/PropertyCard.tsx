
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { GSCProperty } from "@/types";

interface PropertyCardProps {
  property: GSCProperty;
  selected: boolean;
  onSelect: (property: GSCProperty) => void;
}

const PropertyCard = ({ property, selected, onSelect }: PropertyCardProps) => {
  return (
    <Card 
      className={`cursor-pointer transition-all ${
        selected 
          ? 'border-primary shadow-md' 
          : 'hover:border-gray-300 hover:shadow-sm'
      }`}
      onClick={() => onSelect(property)}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{property.displayName || 'Unnamed Property'}</CardTitle>
        <CardDescription className="truncate">
          {property.siteUrl}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {selected && (
          <div className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary inline-block">
            Selected
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
