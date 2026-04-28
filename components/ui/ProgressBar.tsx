// src/components/ui/ProgressBar.tsx
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;       // 0–100
  className?: string;
  showLabel?: boolean;
  color?: "gray" | "green" | "red";
}

const colorStyles = {
  gray:  "bg-gray-800",
  green: "bg-green-500",
  red:   "bg-red-500",
};

/** Animated progress bar for upload tracking */
export function ProgressBar({
  value,
  className,
  showLabel = false,
  color = "gray",
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="flex justify-between mb-1">
          <span className="text-xs text-gray-500">Uploading</span>
          <span className="text-xs font-medium text-gray-700">{clamped}%</span>
        </div>
      )}
      {/* Track */}
      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
        {/* Fill */}
        <div
          className={cn(
            "h-full rounded-full transition-all duration-300 ease-out",
            colorStyles[color]
          )}
          style={{ width: `${clamped}%` }}
          role="progressbar"
          aria-valuenow={clamped}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}