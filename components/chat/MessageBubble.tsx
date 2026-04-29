// src/components/chat/MessageBubble.tsx
import { TypingIndicator } from "@/components/ui/Loader";
import { cn, formatTime } from "@/lib/utils";
import type { Message } from "@/types/chat";
import { Brain, User } from "lucide-react";
import { CitationCard } from "./CitationCard";

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex gap-2 sm:gap-3 animate-fadeIn",
        isUser ? "flex-row-reverse" : "flex-row",
      )}
    >
      {/* Avatar - slightly smaller on mobile to maximize chat width */}
      <div
        className={cn(
          "w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5",
          isUser ? "bg-gray-800" : "bg-white border border-gray-200",
        )}
      >
        {isUser ? (
          <User className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
        ) : (
          <Brain className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-600" />
        )}
      </div>

      <div
        // CRITICAL: Increased max-w to 88% on mobile, back to 78% on desktop
        className={cn("flex flex-col gap-1.5 sm:gap-2 max-w-[88%] sm:max-w-[78%]", isUser && "items-end")}
      >
        {/* Bubble */}
        <div
          className={cn(
            "px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl text-[13px] sm:text-sm leading-relaxed",
            isUser
              ? "bg-gray-900 text-white rounded-tr-sm"
              : "bg-white border border-gray-100 text-gray-800 rounded-tl-sm shadow-soft",
          )}
        >
          {message.isLoading ? (
            <TypingIndicator />
          ) : (
            <span className="whitespace-pre-wrap">{message.content}</span>
          )}
        </div>

        {/* Timestamp */}
        {!message.isLoading && (
          <span className="text-[10px] sm:text-[11px] text-gray-400 px-1">
            {formatTime(message.timestamp)}
          </span>
        )}

        {/* Citations */}
        {!isUser && message.citations && message.citations.length > 0 && (
          <div className="w-full space-y-1.5 mt-1">
            <p className="text-[10px] sm:text-[11px] font-medium text-gray-400 uppercase tracking-wide px-1">
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