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
      <div className="max-w-2xl mx-auto">
        {/* Page header */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900">Upload Documents</h2>
          <p className="text-sm text-gray-500 mt-1">
            Add PDF files to your knowledge base. The AI will index them for Q&A.
          </p>
        </div>

        {/* Drop zone */}
        <FileUploader onFilesAdded={addFiles} />

        {/* File list + actions */}
        {hasFiles && (
          <>
            <div className="flex items-center justify-between mt-5 mb-1">
              <p className="text-sm font-medium text-gray-700">
                {files.length} file{files.length !== 1 ? "s" : ""} queued
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFiles}
                className="text-gray-400 hover:text-red-500"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear all
              </Button>
            </div>
            <FileList files={files} onRemove={removeFile} />
          </>
        )}

        {/* Tips section */}
        <div className="mt-8 p-4 bg-gray-50 border border-gray-100 rounded-xl">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Tips
          </p>
          <ul className="text-xs text-gray-500 space-y-1 list-disc list-inside">
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