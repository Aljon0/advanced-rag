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
  processing: { icon: <AlertCircle className="w-3.5 h-3.5 text-yellow-500" />,         label: "Processing", color: "text-yellow-600" },
  ready:      { icon: <CheckCircle className="w-3.5 h-3.5 text-green-500" />,          label: "Ready",      color: "text-green-600"  },
  error:      { icon: <AlertCircle className="w-3.5 h-3.5 text-red-500" />,            label: "Error",      color: "text-red-600"    },
};

export function DocumentCard({ document, onDelete }: DocumentCardProps) {
  const status = statusConfig[document.status];

  return (
    // Changed layout to allow stacking on very small screens, while maintaining row on tablet/desktop
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 px-4 sm:px-5 py-4 bg-white border border-gray-100 rounded-xl shadow-soft hover:border-gray-200 transition-colors duration-150 animate-fadeIn">
      
      {/* Top half (Mobile) / Left half (Desktop) */}
      <div className="flex items-start sm:items-center gap-3 sm:gap-4 flex-1 min-w-0">
        <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
          <FileText className="w-4 h-4 text-gray-500" />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-800 truncate">{document.name}</p>
          {/* Added flex-wrap so long metadata lines don't break the layout on narrow phones */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
            <span className="text-[11px] sm:text-xs text-gray-400">{formatFileSize(document.size)}</span>
            <span className="text-gray-200 hidden sm:inline">·</span>
            <span className="text-[11px] sm:text-xs text-gray-400">{formatDate(document.uploadedAt)}</span>
            {document.pageCount && (
              <>
                <span className="text-gray-200 hidden sm:inline">·</span>
                <span className="text-[11px] sm:text-xs text-gray-400">{document.pageCount} pages</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Bottom half (Mobile) / Right half (Desktop) */}
      <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 pl-12 sm:pl-0 mt-2 sm:mt-0">
        <div className={`flex items-center gap-1.5 ${status.color}`}>
          {status.icon}
          <span className="text-[11px] sm:text-xs font-medium">{status.label}</span>
        </div>

        <Button
          variant="danger"
          size="sm"
          onClick={() => onDelete(document.id)}
          aria-label={`Delete ${document.name}`}
          className="cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span className="sm:hidden ml-1">Delete</span>
        </Button>
      </div>
    </div>
  );
}