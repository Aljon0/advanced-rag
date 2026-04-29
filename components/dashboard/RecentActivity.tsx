// src/components/dashboard/RecentActivity.tsx
import { FileText, MessageSquare } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { formatDate } from "@/lib/utils";

interface ActivityItem {
  id: string;
  type: "upload" | "query";
  label: string;
  date: string;
}

interface RecentActivityProps {
  items: ActivityItem[];
}

const typeConfig = {
  upload: {
    icon: FileText,
    color: "bg-gray-100 text-gray-600",
  },
  query: {
    icon: MessageSquare,
    color: "bg-blue-50 text-blue-600",
  },
};

export function RecentActivity({ items }: RecentActivityProps) {
  return (
    <Card>
      <h3 className="text-sm font-semibold text-gray-800 mb-4">Recent Activity</h3>

      {items.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-6">No recent activity</p>
      ) : (
        <ul className="space-y-3 sm:space-y-4">
          {items.map((item) => {
            const { icon: Icon, color } = typeConfig[item.type];
            return (
              // Adjusted gap and flex-wrap for extremely narrow screens
              <li key={item.id} className="flex items-start sm:items-center gap-2.5 sm:gap-3">
                <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 sm:mt-0 ${color}`}>
                  <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </div>
                {/* Changed to flex-col on mobile to let date fall under the text naturally if needed */}
                <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-[13px] sm:text-sm text-gray-700 truncate sm:pr-4">{item.label}</p>
                  <span className="text-[10px] sm:text-xs text-gray-400 shrink-0 mt-0.5 sm:mt-0">
                    {formatDate(item.date)}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
}