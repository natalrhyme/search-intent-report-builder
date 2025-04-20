
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface IntentAnalysisCardProps {
  query: string;
  intent: string;
  category?: string;
}

const IntentAnalysisCard = ({ query, intent, category }: IntentAnalysisCardProps) => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-md font-medium">{query}</CardTitle>
        {category && (
          <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-accent text-accent-foreground">
            {category}
          </span>
        )}
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{intent}</p>
      </CardContent>
    </Card>
  );
};

export default IntentAnalysisCard;
