// src/components/ui/Badge.tsx
import { cn } from "@/lib/utils";
import { getConfidenceColor } from "@/lib/utils";

interface BadgeProps {
  label?: string;
  score?: number;       // Confidence score 0–100
  color?: "green" | "yellow" | "red" | "gray" | "blue";
  className?: string;
}

const colorStyles = {
  green:  "bg-green-50 text-green-700 border-green-200",
  yellow: "bg-yellow-50 text-yellow-700 border-yellow-200",
  red:    "bg-red-50 text-red-700 border-red-200",
  gray:   "bg-gray-100 text-gray-600 border-gray-200",
  blue:   "bg-blue-50 text-blue-700 border-blue-200",
};

/** Badge for confidence scores or status labels */
export function Badge({ label, score, color, className }: BadgeProps) {
  // Derive color from score if not explicitly provided
  const resolvedColor =
    color ?? (score !== undefined ? getConfidenceColor(score) : "gray");

  const displayLabel =
    label ?? (score !== undefined ? `${score}% confidence` : "");

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border",
        colorStyles[resolvedColor as keyof typeof colorStyles],
        className
      )}
    >
      {displayLabel}
    </span>
  );
}