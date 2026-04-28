// src/hooks/useUpload.ts
"use client";

import { useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { uploadFile } from "@/services/api";
import type { UploadFileItem } from "@/types/document";

export function useUpload() {
  const [files, setFiles] = useState<UploadFileItem[]>([]);

  // Update a single file item's fields by id
  const updateFile = useCallback(
    (id: string, patch: Partial<UploadFileItem>) => {
      setFiles((prev) =>
        prev.map((f) => (f.id === id ? { ...f, ...patch } : f))
      );
    },
    []
  );

  // Add files and start uploading each one
  const addFiles = useCallback(
    async (newFiles: File[]) => {
      const items: UploadFileItem[] = newFiles.map((file) => ({
        id: uuidv4(),
        file,
        progress: 0,
        status: "uploading",
      }));

      // Append to list immediately for UI feedback
      setFiles((prev) => [...prev, ...items]);

      // Upload each file concurrently
      await Promise.all(
        items.map(async (item) => {
          try {
            await uploadFile(item.file, (percent) => {
              updateFile(item.id, { progress: percent });
            });
            // Mark as ready on success
            updateFile(item.id, { status: "ready", progress: 100 });
          } catch (err) {
            // Mark as error on failure
            updateFile(item.id, {
              status: "error",
              error: err instanceof Error ? err.message : "Upload failed",
            });
          }
        })
      );
    },
    [updateFile]
  );

  // Remove a file from the list
  const removeFile = useCallback((id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }, []);

  // Clear all files
  const clearFiles = useCallback(() => setFiles([]), []);

  return { files, addFiles, removeFile, clearFiles };
}