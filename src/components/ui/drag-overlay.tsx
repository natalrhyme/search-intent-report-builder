
import * as React from "react";
import { cn } from "@/lib/utils";

interface DragOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  isDragging: boolean;
}

const DragOverlay = React.forwardRef<HTMLDivElement, DragOverlayProps>(
  ({ className, children, isDragging, ...props }, ref) => {
    if (!isDragging) return null;
    
    return (
      <div
        ref={ref}
        className={cn(
          "absolute top-0 left-0 z-50 pointer-events-none",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

DragOverlay.displayName = "DragOverlay";

export { DragOverlay };
