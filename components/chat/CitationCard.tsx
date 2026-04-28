// src/components/chat/CitationCard.tsx
import { FileText, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { truncate } from "@/lib/utils";
import type { Citation } from "@/types/chat";

interface CitationCardProps {
  citation: Citation;
  index: number;
}

/** Card showing a single source citation from the AI response */
export function CitationCard({ citation, index }: CitationCardProps) {
  return (
    <div className="group flex gap-3 p-3 bg-gray-50 border border-gray-100 rounded-lg hover:border-gray-200 hover:bg-white transition-all duration-150">
      {/* Index indicator */}
      <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center shrink-0 mt-0.5">
        <span className="text-[10px] font-semibold text-gray-600">{index + 1}</span>
      </div>

      <div className="flex-1 min-w-0">
        {/* Document name */}
        <div className="flex items-center gap-1.5 mb-1">
          <FileText className="w-3 h-3 text-gray-400 shrink-0" />
          <span className="text-xs font-semibold text-gray-700 truncate">
            {citation.documentName}
          </span>
          {citation.pageNumber && (
            <span className="text-xs text-gray-400 shrink-0">
              · p.{citation.pageNumber}
            </span>
          )}
        </div>

        {/* Highlighted snippet */}
        <p className="text-xs text-gray-600 leading-relaxed border-l-2 border-gray-300 pl-2 italic">
          &ldquo;{truncate(citation.snippet, 160)}&rdquo;
        </p>
      </div>

      {/* Confidence badge */}
      <div className="flex flex-col items-end gap-1 shrink-0">
        <Badge score={citation.confidence} />
        <ExternalLink className="w-3 h-3 text-gray-300 group-hover:text-gray-500 transition-colors" />
      </div>
    </div>
  );
}