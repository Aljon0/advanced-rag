// src/components/chat/ChatInput.tsx
"use client";

import { useState, useRef, type KeyboardEvent } from "react";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading?: boolean;
  disabled?: boolean;
}

/** Message input bar with send button — Cmd/Ctrl+Enter or button to send */
export function ChatInput({ onSend, isLoading, disabled }: ChatInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || isLoading || disabled) return;
    onSend(trimmed);
    setValue("");
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  // Send on Enter (without Shift)
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Auto-grow textarea up to ~5 lines
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    const el = e.target;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 130)}px`;
  };

  const isEmpty = !value.trim();

  return (
    <div className="flex items-end gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-soft focus-within:border-gray-400 transition-colors duration-150">
      {/* Auto-resizing textarea */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Ask a question about your documents…"
        rows={1}
        disabled={disabled || isLoading}
        className={cn(
          "flex-1 resize-none text-sm text-gray-800 placeholder-gray-400",
          "bg-transparent outline-none leading-relaxed max-h-32.5",
          "disabled:opacity-50"
        )}
      />

      {/* Send button */}
      <button
        onClick={handleSend}
        disabled={isEmpty || isLoading || disabled}
        aria-label="Send message"
        className={cn(
          "w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-150 shrink-0",
          isEmpty || isLoading || disabled
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-gray-900 text-white hover:bg-gray-700 cursor-pointer"
        )}
      >
        <Send className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}