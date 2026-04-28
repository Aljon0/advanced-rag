// src/hooks/useDocuments.ts
"use client";

import { useState, useEffect, useCallback } from "react";
import { getDocuments, deleteDocument } from "@/services/api";
import type { Document } from "@/types/document";

export function useDocuments() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch documents from backend
  const fetchDocuments = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getDocuments();
      setDocuments(data.documents);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load documents");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Delete a document by ID
  const removeDocument = useCallback(async (id: string) => {
    try {
      await deleteDocument(id);
      // Optimistic UI — remove immediately
      setDocuments((prev) => prev.filter((d) => d.id !== id));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete document"
      );
    }
  }, []);

  // Auto-fetch on mount
  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  return { documents, isLoading, error, fetchDocuments, removeDocument };
}