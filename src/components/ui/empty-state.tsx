import React from "react";
import { PackageOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No items found",
  description = "There's nothing here yet. Check back later or try a different search.",
  icon,
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 px-6 text-center",
        className
      )}
    >
      <div className="mb-4 text-gray-400">
        {icon || <PackageOpen className="h-16 w-16 stroke-1" />}
      </div>
      <h3 className="text-xl font-semibold text-gray-700 mb-2">{title}</h3>
      <p className="text-gray-500 max-w-md">{description}</p>
      {children && <div className="mt-6">{children}</div>}
    </div>
  );
};

export { EmptyState };
