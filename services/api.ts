// src/services/api.ts
import { API_BASE_URL } from "@/lib/constants";
import type {
  AskQuestionRequest,
  AskQuestionResponse,
  GetDocumentsResponse,
  UploadFileResponse,
} from "@/types/api";
import axios, { AxiosError, AxiosProgressEvent, AxiosResponse } from "axios";

// Axios instance with base config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000, // 30 second timeout
});

// ─── Response Interceptor — normalize errors ──────────────────────────────────
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<{ message?: string }>) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      "An unexpected error occurred";
    return Promise.reject(new Error(message));
  },
);

// ─── Upload a PDF file to the backend ────────────────────────────────────────
export async function uploadFile(
  file: File,
  onProgress?: (percent: number) => void,
): Promise<UploadFileResponse> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await apiClient.post<UploadFileResponse>(
    "/documents/upload",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (event: AxiosProgressEvent) => {
        if (event.total && onProgress) {
          const percent = Math.round((event.loaded / event.total) * 100);
          onProgress(percent);
        }
      },
    },
  );

  return response.data;
}

// ─── Send a question to the AI ────────────────────────────────────────────────
export async function askQuestion(
  payload: AskQuestionRequest,
): Promise<AskQuestionResponse> {
  const response = await apiClient.post<AskQuestionResponse>(
    "/chat/ask",
    payload,
  );
  return response.data;
}

// ─── Fetch all uploaded documents ────────────────────────────────────────────
export async function getDocuments(): Promise<GetDocumentsResponse> {
  const response = await apiClient.get<GetDocumentsResponse>("/documents");
  return response.data;
}

// ─── Delete a document by ID ─────────────────────────────────────────────────
export async function deleteDocument(id: string): Promise<void> {
  await apiClient.delete(`/documents/${id}`);
}

export interface DashboardData {
  stats: {
    totalDocuments: number;
    totalChunks: number;
    knowledgeBaseSize: string;
    avgConfidence: number;
  };
  recentActivity: {
    id: string;
    type: "upload" | "query";
    label: string;
    date: string;
  }[];
}

export async function getDashboardStats(): Promise<DashboardData> {
  const response = await apiClient.get("/dashboard/stats");
  const raw = response.data;

  // Reshape flat backend response → nested frontend shape
  return {
    stats: {
      totalDocuments: raw.totalDocuments,
      totalChunks: raw.totalChunks,
      knowledgeBaseSize: `${((raw.totalChunks * 2.5) / 1024).toFixed(1)} MB`,
      avgConfidence: raw.avgConfidence,
    },
    recentActivity: raw.recentActivity,
  };
}
