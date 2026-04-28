// src/components/upload/FileUploader.tsx
"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileWarning } from "lucide-react";
import { cn } from "@/lib/utils";
import { ACCEPTED_FILE_TYPES, MAX_FILE_SIZE, MAX_FILES } from "@/lib/constants";

interface FileUploaderProps {
  onFilesAdded: (files: File[]) => void;
  disabled?: boolean;
}

/** Drag & drop zone — accepts PDF files only */
export function FileUploader({ onFilesAdded, disabled }: FileUploaderProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFilesAdded(acceptedFiles);
      }
    },
    [onFilesAdded]
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      accept: ACCEPTED_FILE_TYPES,
      maxSize: MAX_FILE_SIZE,
      maxFiles: MAX_FILES,
      disabled,
    });

  return (
    <div
      {...getRootProps()}
      className={cn(
        // Base styles
        "relative flex flex-col items-center justify-center",
        "w-full min-h-55 rounded-xl border-2 border-dashed",
        "transition-all duration-150 cursor-pointer",
        // State styles
        isDragActive && !isDragReject && "border-gray-700 bg-gray-50 scale-[1.01]",
        isDragReject  && "border-red-400 bg-red-50",
        !isDragActive && !isDragReject && "border-gray-200 bg-white hover:border-gray-400 hover:bg-gray-50",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      <input {...getInputProps()} />

      {/* Icon */}
      <div className={cn(
        "w-12 h-12 rounded-xl flex items-center justify-center mb-3",
        isDragReject ? "bg-red-100" : "bg-gray-100"
      )}>
        {isDragReject ? (
          <FileWarning className="w-6 h-6 text-red-500" />
        ) : (
          <Upload className={cn("w-6 h-6", isDragActive ? "text-gray-800" : "text-gray-400")} />
        )}
      </div>

      {/* Label */}
      {isDragReject ? (
        <p className="text-sm font-medium text-red-600">Only PDF files are allowed</p>
      ) : isDragActive ? (
        <p className="text-sm font-medium text-gray-800">Drop to upload</p>
      ) : (
        <>
          <p className="text-sm font-medium text-gray-700">
            Drag & drop PDF files here
          </p>
          <p className="text-xs text-gray-400 mt-1">
            or <span className="underline">browse files</span>
          </p>
          <p className="text-xs text-gray-300 mt-3">
            PDF only · Max {MAX_FILES} files · Up to 50MB each
          </p>
        </>
      )}
    </div>
  );
}