// src/app/documents/page.tsx
"use client";

import { RefreshCw } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { DocumentList } from "@/components/documents/DocumentList";
import { Button } from "@/components/ui/Button";
import { useDocuments } from "@/hooks/useDocuments";
import Link from "next/link";

export default function DocumentsPage() {
  const { documents, isLoading, error, fetchDocuments, removeDocument } =
    useDocuments();

  return (
    <AppShell>
      {/* Page header - Updated for mobile responsiveness */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">My Documents</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            {isLoading
              ? "Loading..."
              : `${documents.length} document${documents.length !== 1 ? "s" : ""} in your knowledge base`}
          </p>
        </div>

        {/* Buttons container - Stacks on mobile, side-by-side on desktop */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
          {/* Refresh button */}
          <Button
            variant="secondary"
            size="sm"
            onClick={fetchDocuments}
            disabled={isLoading}
            className="cursor-pointer w-full sm:w-auto flex items-center justify-center gap-2"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>

          {/* Upload shortcut */}
          <Link href="/upload" className="w-full sm:w-auto">
            <Button size="sm" className="cursor-pointer w-full sm:w-auto">
              Upload PDF
            </Button>
          </Link>
        </div>
      </div>

      {/* Document list */}
      <DocumentList
        documents={documents}
        isLoading={isLoading}
        error={error}
        onDelete={removeDocument}
        onRefresh={fetchDocuments}
      />
    </AppShell>
  );
}