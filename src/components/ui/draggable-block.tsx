
import * as React from "react";
import { cn } from "@/lib/utils";

interface DraggableBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  isDraggable?: boolean;
}

const DraggableBlock = React.forwardRef<HTMLDivElement, DraggableBlockProps>(
  ({ className, id, isDraggable = true, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        id={id}
        draggable={isDraggable}
        className={cn(
          "flex items-center justify-between p-3 rounded-md border shadow-sm bg-[hsl(var(--draggable-item))] hover:bg-[hsl(var(--draggable-item-hover))] cursor-grab active:cursor-grabbing",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

DraggableBlock.displayName = "DraggableBlock";

export { DraggableBlock };
