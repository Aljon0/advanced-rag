// src/components/chat/MessageBubble.tsx
import { TypingIndicator } from "@/components/ui/Loader";
import { cn, formatTime } from "@/lib/utils";
import type { Message } from "@/types/chat";
import { Brain, User } from "lucide-react";
import { CitationCard } from "./CitationCard";

interface MessageBubbleProps {
  message: Message;
}

/** Renders a single chat message — user or AI */
export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex gap-3 animate-fadeIn",
        isUser ? "flex-row-reverse" : "flex-row",
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          "w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5",
          isUser ? "bg-gray-800" : "bg-white border border-gray-200",
        )}
      >
        {isUser ? (
          <User className="w-3.5 h-3.5 text-white" />
        ) : (
          <Brain className="w-3.5 h-3.5 text-gray-600" />
        )}
      </div>

      <div
        className={cn("flex flex-col gap-2 max-w-[78%]", isUser && "items-end")}
      >
        {/* Bubble */}
        <div
          className={cn(
            "px-4 py-3 rounded-2xl text-sm leading-relaxed",
            isUser
              ? "bg-gray-900 text-white rounded-tr-sm"
              : "bg-white border border-gray-100 text-gray-800 rounded-tl-sm shadow-soft",
          )}
        >
          {/* Loading indicator or actual content */}
          {message.isLoading ? (
            <TypingIndicator />
          ) : (
            <span className="whitespace-pre-wrap">{message.content}</span>
          )}
        </div>

        {/* Timestamp */}
        {!message.isLoading && (
          <span className="text-[11px] text-gray-400 px-1">
            {formatTime(message.timestamp)}
          </span>
        )}

        {/* Citations — only for AI messages */}
        {!isUser && message.citations && message.citations.length > 0 && (
          <div className="w-full space-y-1.5 mt-1">
            <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wide px-1">
              Sources
            </p>
            {Array.from(
              new Map(message.citations.map((c) => [c.documentId, c])).values(),
            ).map((citation, i) => (
              <CitationCard
                key={`${citation.documentId}-${i}`}
                citation={citation}
                index={i}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
