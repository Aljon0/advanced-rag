// src/types/api.ts
import type { Document } from "./document";
import type { Citation } from "./chat";

/** Request payload for asking a question */
export interface AskQuestionRequest {
  question: string;
  sessionId?: string;    // Optional: for multi-turn conversation
}

/** Response from the AI question endpoint */
export interface AskQuestionResponse {
  answer: string;
  citations: Citation[];
  sessionId: string;
  confidence: number;    // Overall confidence score 0–100
}

/** Response from the documents list endpoint */
export interface GetDocumentsResponse {
  documents: Document[];
  total: number;
}

/** Response from the upload endpoint */
export interface UploadFileResponse {
  document: Document;
  message: string;
}

/** Generic API error shape */
export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}