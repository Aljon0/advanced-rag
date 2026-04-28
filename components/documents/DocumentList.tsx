// src/components/documents/DocumentList.tsx
import { FileText, RefreshCw } from "lucide-react";
import { DocumentCard } from "./DocumentCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { Loader } from "@/components/ui/Loader";
import { Button } from "@/components/ui/Button";
import type { Document } from "@/types/document";

interface DocumentListProps {
  documents: Document[];
  isLoading: boolean;
  error: string | null;
  onDelete: (id: string) => void;
  onRefresh: () => void;
}

/** Full document list with loading, error, and empty states */
export function DocumentList({
  documents,
  isLoading,
  error,
  onDelete,
  onRefresh,
}: DocumentListProps) {
  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader size="lg" label="Loading documents..." />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <EmptyState
        icon={RefreshCw}
        title="Failed to load documents"
        description={error}
        action={
          <Button variant="secondary" size="sm" onClick={onRefresh}>
            <RefreshCw className="w-3.5 h-3.5" />
            Try again
          </Button>
        }
      />
    );
  }

  // Empty state
  if (documents.length === 0) {
    return (
      <EmptyState
        icon={FileText}
        title="No documents yet"
        description="Upload PDF files to start building your knowledge base."
      />
    );
  }

  // Document list
  return (
    <div className="space-y-2">
      {documents.map((doc) => (
        <DocumentCard key={doc.id} document={doc} onDelete={onDelete} />
      ))}
    </div>
  );
}