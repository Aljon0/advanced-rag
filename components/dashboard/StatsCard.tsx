// src/components/dashboard/StatsCard.tsx
import { type LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
}

export function StatsCard({ label, value, icon: Icon, trend, trendUp }: StatsCardProps) {
  return (
    // Your original setup here was already perfect! I just tightened up text sizing slightly for small screens.
    <Card className="flex items-start justify-between p-4 sm:p-5">
      <div className="min-w-0 pr-2">
        <p className="text-[11px] sm:text-xs font-medium text-gray-500 mb-1 truncate">{label}</p>
        <p className="text-xl sm:text-2xl font-bold text-gray-900 truncate">{value}</p>
        {trend && (
          <p
            className={cn(
              "text-[10px] sm:text-xs mt-1 font-medium truncate",
              trendUp ? "text-green-600" : "text-red-500"
            )}
          >
            {trend}
          </p>
        )}
      </div>
      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
      </div>
    </Card>
  );
}