// src/components/ui/Loader.tsx
import { cn } from "@/lib/utils";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  label?: string;        // Optional accessible label
}

const sizeStyles = {
  sm: "w-4 h-4 border-2",
  md: "w-6 h-6 border-2",
  lg: "w-8 h-8 border-[3px]",
};

/** Circular spinner — minimal & neutral */
export function Loader({ size = "md", className, label = "Loading..." }: LoaderProps) {
  return (
    <div
      role="status"
      aria-label={label}
      className={cn("inline-flex items-center justify-center", className)}
    >
      <span
        className={cn(
          "rounded-full border-gray-300 border-t-gray-700 animate-spin",
          sizeStyles[size]
        )}
      />
      <span className="sr-only">{label}</span>
    </div>
  );
}

/** Three-dot typing indicator for AI responses */
export function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-1" aria-label="AI is typing">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse"
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </div>
  );
}