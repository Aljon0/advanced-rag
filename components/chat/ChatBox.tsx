// src/components/chat/ChatBox.tsx
"use client";

import { useEffect, useRef } from "react";
import { MessageSquare, Trash2 } from "lucide-react";
import { MessageBubble } from "./MessageBubble";
import { ChatInput } from "./ChatInput";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { useChat } from "@/hooks/useChat";

/** Full chat interface — message list + input bar */
export function ChatBox() {
  const { messages, isLoading, sendMessage, clearChat } = useChat();
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-[calc(100vh-7rem)] bg-white border border-gray-100 rounded-xl shadow-soft overflow-hidden">
      {/* Chat header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
        <div>
          <h2 className="text-sm font-semibold text-gray-800">Chat</h2>
          <p className="text-xs text-gray-400">
            {messages.length === 0
              ? "Ask anything about your uploaded documents"
              : `${messages.filter((m) => m.role === "user").length} question(s) asked`}
          </p>
        </div>
        {/* Clear chat button */}
        {messages.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearChat}
            className="text-gray-400 hover:text-red-500"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear
          </Button>
        )}
      </div>

      {/* Message list */}
      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
        {messages.length === 0 ? (
          <EmptyState
            icon={MessageSquare}
            title="No messages yet"
            description="Start by asking a question. The AI will search through your uploaded documents to find the answer."
          />
        ) : (
          messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))
        )}
        {/* Scroll anchor */}
        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div className="px-5 py-4 border-t border-gray-100">
        <ChatInput onSend={sendMessage} isLoading={isLoading} />
        <p className="text-[11px] text-gray-300 text-center mt-2">
          Press Enter to send · Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}