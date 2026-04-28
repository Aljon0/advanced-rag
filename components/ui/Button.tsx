// src/components/ui/Button.tsx
import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

const variantStyles = {
  primary:   "bg-gray-900 text-white hover:bg-gray-700 border border-gray-900",
  secondary: "bg-white text-gray-800 hover:bg-gray-100 border border-gray-200",
  ghost:     "bg-transparent text-gray-600 hover:bg-gray-100 border border-transparent",
  danger:    "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200",
};

const sizeStyles = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          // Base styles
          "inline-flex items-center justify-center gap-2 rounded-lg font-medium",
          "transition-colors duration-150 focus:outline-none focus-visible:ring-2",
          "focus-visible:ring-gray-400 focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {/* Loading spinner */}
        {isLoading && (
          <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";