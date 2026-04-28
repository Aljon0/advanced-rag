// src/types/document.ts

/** Represents a document stored in the knowledge base */
export interface Document {
    id: string;
    name: string;
    size: number;         // in bytes
    uploadedAt: string;   // ISO date string
    status: DocumentStatus;
    pageCount?: number;
    mimeType: string;
  }
  
  /** Upload states for a file */
  export type DocumentStatus =
    | "uploading"
    | "processing"
    | "ready"
    | "error";
  
  /** File item tracked locally during upload */
  export interface UploadFileItem {
    id: string;           // local uuid
    file: File;
    progress: number;     // 0–100
    status: DocumentStatus;
    error?: string;
  }