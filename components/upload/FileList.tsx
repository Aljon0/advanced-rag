// src/components/upload/FileList.tsx
"use client";

import { CheckCircle, XCircle, X, FileText, AlertCircle } from "lucide-react";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { formatFileSize } from "@/lib/utils";
import type { UploadFileItem } from "@/types/document";

interface FileListProps {
  files: UploadFileItem[];
  onRemove: (id: string) => void;
}

const statusIcon = {
  uploading:  null,                                                        // Shows progress bar instead
  processing: <AlertCircle className="w-4 h-4 text-yellow-500" />,
  ready:      <CheckCircle className="w-4 h-4 text-green-500" />,
  error:      <XCircle className="w-4 h-4 text-red-500" />,
};

/** List of files currently being or recently uploaded */
export function FileList({ files, onRemove }: FileListProps) {
  if (files.length === 0) return null;

  return (
    <ul className="space-y-2 mt-4">
      {files.map((item) => (
        <li
          key={item.id}
          className="flex items-start gap-3 bg-white border border-gray-100 rounded-lg px-4 py-3 shadow-soft animate-fadeIn"
        >
          {/* File icon */}
          <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 mt-0.5">
            <FileText className="w-4 h-4 text-gray-500" />
          </div>

          {/* File info */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-800 truncate">
              {item.file.name}
            </p>
            <p className="text-xs text-gray-400">{formatFileSize(item.file.size)}</p>

            {/* Progress bar — only while uploading */}
            {item.status === "uploading" && (
              <ProgressBar
                value={item.progress}
                showLabel
                className="mt-2"
              />
            )}

            {/* Error message */}
            {item.status === "error" && item.error && (
              <p className="text-xs text-red-500 mt-1">{item.error}</p>
            )}

            {/* Processing label */}
            {item.status === "processing" && (
              <p className="text-xs text-yellow-600 mt-1">Processing…</p>
            )}
          </div>

          {/* Status icon */}
          <div className="flex items-center gap-2 shrink-0">
            {statusIcon[item.status]}
            {/* Remove button */}
            <button
              onClick={() => onRemove(item.id)}
              className="w-6 h-6 flex items-center justify-center rounded text-gray-300 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Remove file"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}