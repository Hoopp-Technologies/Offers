import { cn } from "@/lib/utils";
import { ChevronRight, Home } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

interface Breadcrumb {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: Breadcrumb[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav className="text-sm mb-4">
      <ol className="list-none p-0 inline-flex items-center">
        <Home className="mr-3" />
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <span className="mx-2">
                <ChevronRight />
              </span>
            )}
            <Link
              to={item.href}
              className="text-black hover:underline hover:text-(--color-primary) text-lg whitespace-nowrap"
            >
              <span
                className={cn("truncate w-48 block lg:w-auto", {
                  "hidden lg:block": index < 2,
                })}
              >
                {item.label}
              </span>
              {index < 2 && <span className="lg:hidden">...</span>}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
