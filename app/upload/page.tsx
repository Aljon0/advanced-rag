// src/app/upload/page.tsx
"use client";

import { AppShell } from "@/components/layout/AppShell";
import { FileUploader } from "@/components/upload/FileUploader";
import { FileList } from "@/components/upload/FileList";
import { Button } from "@/components/ui/Button";
import { useUpload } from "@/hooks/useUpload";
import { Trash2 } from "lucide-react";

export default function UploadPage() {
  const { files, addFiles, removeFile, clearFiles } = useUpload();

  const hasFiles = files.length > 0;

  return (
    <AppShell>
      {/* Added horizontal padding (px-4) for mobile screens so content doesn't touch the edges */}
      <div className="max-w-2xl mx-auto px-4 sm:px-0">
        
        {/* Page header */}
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Upload Documents</h2>
          <p className="text-sm text-gray-500 mt-1">
            Add PDF files to your knowledge base. The AI will index them for Q&A.
          </p>
        </div>

        {/* Drop zone */}
        <FileUploader onFilesAdded={addFiles} />

        {/* File list + actions */}
        {hasFiles && (
          <>
            <div className="flex items-center justify-between mt-6 mb-2">
              <p className="text-sm font-medium text-gray-700">
                {files.length} file{files.length !== 1 ? "s" : ""} queued
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFiles}
                // Enhanced touch target padding (p-2 sm:px-3) and alignment for mobile
                className="text-gray-400 hover:text-red-500 cursor-pointer flex items-center gap-1.5 p-2 sm:px-3"
              >
                <Trash2 className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                <span className="hidden sm:inline">Clear all</span>
                <span className="sm:hidden">Clear</span>
              </Button>
            </div>
            <FileList files={files} onRemove={removeFile} />
          </>
        )}

        {/* Tips section */}
        <div className="mt-8 p-4 sm:p-5 bg-gray-50 border border-gray-100 rounded-xl">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Tips
          </p>
          {/* Slightly larger text and line-height on mobile (text-sm) for better readability */}
          <ul className="text-sm sm:text-xs text-gray-600 sm:text-gray-500 space-y-2 sm:space-y-1 list-disc list-inside">
            <li>Only PDF files are supported at this time</li>
            <li>Max file size is 50MB per document</li>
            <li>You can upload up to 10 files at once</li>
            <li>Processing takes 10–30 seconds after upload</li>
          </ul>
        </div>
      </div>
    </AppShell>
  );
}