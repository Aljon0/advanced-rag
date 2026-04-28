// src/types/chat.ts

/** A single citation source returned by the AI */
export interface Citation {
  documentId: string;
  documentName: string;
  snippet: string;        // Relevant text excerpt
  pageNumber?: number;
  confidence: number;     // 0–100
}

/** A single message in the chat */
export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  citations?: Citation[];  // Only on assistant messages
  timestamp: Date;
  isLoading?: boolean;     // True while AI is responding
}

/** Chat session */
export interface ChatSession {
  id: string;
  messages: Message[];
  createdAt: Date;
}