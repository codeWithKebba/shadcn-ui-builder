import React from "react";
import { AddComponentsPopover } from "@/components/ui/ui-builder/internal/add-component-popover";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type DividerControlProps = {
  className?: string;
  addPosition?: number;
  parentLayerId: string;
};

export function DividerControl({
  className,
  addPosition,
  parentLayerId,
}: DividerControlProps) {
  return (
    <div className={cn("relative py-0", className)}>
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-primary border-dashed" />
      </div>
      <AddComponentsPopover
        addPosition={addPosition}
        parentLayerId={parentLayerId}
      >
        <Button
          variant="outline"
          className="group flex items-center rounded-full bg-secondary h-min p-2 text-sm font-semibold text-secondar-foreground shadow-sm ring-1 ring-inset ring-secondary transition-all duration-200 ease-in-out"
        >
          <PlusCircle className="h-5 w-5 text-secondary-foreground" />
          <span className="sr-only">Add component</span>
          <span className="overflow-hidden max-w-0 group-hover:max-w-xs transition-all duration-200 ease-in-out group-hover:pl-2">
            Add component
          </span>
        </Button>
      </AddComponentsPopover>
    </div>
  );
}
