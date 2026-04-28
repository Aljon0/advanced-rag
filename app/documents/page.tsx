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
      {/* Page header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">My Documents</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            {isLoading
              ? "Loading..."
              : `${documents.length} document${documents.length !== 1 ? "s" : ""} in your knowledge base`}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Refresh button */}
          <Button
            variant="secondary"
            size="sm"
            onClick={fetchDocuments}
            disabled={isLoading}
            className="cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>

          {/* Upload shortcut */}
          <Link href="/upload">
            <Button size="sm" className="cursor-pointer">Upload PDF</Button>
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