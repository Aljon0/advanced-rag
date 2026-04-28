// src/hooks/useChat.ts
"use client";

import { askQuestion } from "@/services/api";
import type { Message } from "@/types/chat";
import { useCallback, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sessionIdRef = useRef<string | undefined>(undefined);

  // Append a message to the chat
  const addMessage = useCallback((msg: Message) => {
    setMessages((prev) => [...prev, msg]);
  }, []);

  // Update a specific message by id
  const updateMessage = useCallback((id: string, patch: Partial<Message>) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...patch } : m)),
    );
  }, []);

  // Send a user question and get AI response
  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isLoading) return;

      setError(null);

      // Add user message immediately
      const userMsg: Message = {
        id: uuidv4(),
        role: "user",
        content: content.trim(),
        timestamp: new Date(),
      };
      addMessage(userMsg);

      // Add placeholder AI message with loading state
      const aiMsgId = uuidv4();
      const loadingMsg: Message = {
        id: aiMsgId,
        role: "assistant",
        content: "",
        timestamp: new Date(),
        isLoading: true,
      };
      addMessage(loadingMsg);
      setIsLoading(true);

      try {
        const response = await askQuestion({
          question: content.trim(),
          sessionId: sessionIdRef.current,
        });

        // Persist session ID for multi-turn conversation
        sessionIdRef.current = response.sessionId;

        // Replace loading message with actual response
        updateMessage(aiMsgId, {
          content: response.answer,
          citations: response.citations,
          isLoading: false,
          timestamp: new Date(),
        });
      } catch (err) {
        updateMessage(aiMsgId, {
          content: "Sorry, something went wrong. Please try again.",
          isLoading: false,
        });
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, addMessage, updateMessage],
  );

  // Reset the entire chat
  const clearChat = useCallback(() => {
    setMessages([]);
    setError(null);
    sessionIdRef.current = undefined;
  }, []);

  return { messages, isLoading, error, sendMessage, clearChat };
}
