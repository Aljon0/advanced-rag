// src/components/documents/DocumentCard.tsx
import { FileText, Trash2, CheckCircle, AlertCircle, Loader } from "lucide-react";
import { formatDate, formatFileSize } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import type { Document } from "@/types/document";

interface DocumentCardProps {
  document: Document;
  onDelete: (id: string) => void;
}

const statusConfig = {
  uploading:  { icon: <Loader className="w-3.5 h-3.5 text-gray-400 animate-spin" />,   label: "Uploading",  color: "text-gray-500"  },
  processing: { icon: <AlertCircle className="w-3.5 h-3.5 text-yellow-500" />,          label: "Processing", color: "text-yellow-600" },
  ready:      { icon: <CheckCircle className="w-3.5 h-3.5 text-green-500" />,           label: "Ready",      color: "text-green-600"  },
  error:      { icon: <AlertCircle className="w-3.5 h-3.5 text-red-500" />,             label: "Error",      color: "text-red-600"    },
};

/** Single document row in the documents list */
export function DocumentCard({ document, onDelete }: DocumentCardProps) {
  const status = statusConfig[document.status];

  return (
    <div className="flex items-center gap-4 px-5 py-4 bg-white border border-gray-100 rounded-xl shadow-soft hover:border-gray-200 transition-colors duration-150 animate-fadeIn">
      {/* File icon */}
      <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
        <FileText className="w-4 h-4 text-gray-500" />
      </div>

      {/* File details */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-800 truncate">{document.name}</p>
        <div className="flex items-center gap-3 mt-0.5">
          <span className="text-xs text-gray-400">{formatFileSize(document.size)}</span>
          <span className="text-gray-200">·</span>
          <span className="text-xs text-gray-400">{formatDate(document.uploadedAt)}</span>
          {document.pageCount && (
            <>
              <span className="text-gray-200">·</span>
              <span className="text-xs text-gray-400">{document.pageCount} pages</span>
            </>
          )}
        </div>
      </div>

      {/* Status */}
      <div className={`flex items-center gap-1.5 shrink-0 ${status.color}`}>
        {status.icon}
        <span className="text-xs font-medium">{status.label}</span>
      </div>

      {/* Delete button */}
      <Button
        variant="danger"
        size="sm"
        onClick={() => onDelete(document.id)}
        aria-label={`Delete ${document.name}`}
        className="cursor-pointer"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </Button>
    </div>
  );
}