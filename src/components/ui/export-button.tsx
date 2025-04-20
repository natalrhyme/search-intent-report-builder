
import * as React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { FileDown } from "lucide-react";

interface ExportButtonProps extends ButtonProps {
  onExport: () => void;
  label?: string;
}

const ExportButton: React.FC<ExportButtonProps> = ({
  onExport,
  label = "Export to CSV",
  ...props
}) => {
  return (
    <Button
      variant="outline"
      onClick={onExport}
      className="flex items-center gap-2"
      {...props}
    >
      <FileDown size={16} />
      {label}
    </Button>
  );
};

export { ExportButton };
