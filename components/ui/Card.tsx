// src/components/ui/Card.tsx
import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: "none" | "sm" | "md" | "lg";
}

const paddingStyles = {
  none: "",
  sm:   "p-3",
  md:   "p-5",
  lg:   "p-7",
};

/** Generic card wrapper with soft shadow */
export function Card({
  padding = "md",
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-xl border border-gray-100 shadow-soft",
        paddingStyles[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}