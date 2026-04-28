// src/components/dashboard/StatsCard.tsx
import { type LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;       // e.g. "+12% this week"
  trendUp?: boolean;    // Green if up, red if down
}

/** Summary stat card for the dashboard */
export function StatsCard({ label, value, icon: Icon, trend, trendUp }: StatsCardProps) {
  return (
    <Card className="flex items-start justify-between">
      <div>
        <p className="text-xs font-medium text-gray-500 mb-1">{label}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {trend && (
          <p
            className={cn(
              "text-xs mt-1 font-medium",
              trendUp ? "text-green-600" : "text-red-500"
            )}
          >
            {trend}
          </p>
        )}
      </div>
      {/* Icon area */}
      <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-gray-600" />
      </div>
    </Card>
  );
}