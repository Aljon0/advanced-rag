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

/** Recent uploads and queries list on dashboard */
export function RecentActivity({ items }: RecentActivityProps) {
  return (
    <Card>
      <h3 className="text-sm font-semibold text-gray-800 mb-4">Recent Activity</h3>

      {items.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-6">No recent activity</p>
      ) : (
        <ul className="space-y-3">
          {items.map((item) => {
            const { icon: Icon, color } = typeConfig[item.type];
            return (
              <li key={item.id} className="flex items-center gap-3">
                {/* Type icon */}
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${color}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                {/* Label */}
                <p className="flex-1 text-sm text-gray-700 truncate">{item.label}</p>
                {/* Date */}
                <span className="text-xs text-gray-400 shrink-0">
                  {formatDate(item.date)}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
}