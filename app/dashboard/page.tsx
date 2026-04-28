// src/app/dashboard/page.tsx
"use client";

import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/Button";
import { useDashboard } from "@/hooks/useDashboard";
import { Database, FileText, MessageSquare, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { data, isLoading, error, fetchStats } = useDashboard();

  // ── Build stats from real data ──────────────────────────────────────────
  const stats = data
    ? [
        {
          label: "Documents",
          value: data.stats.totalDocuments,
          icon: FileText,
          trend: `${data.stats.totalDocuments} uploaded`,
          trendUp: true,
        },
        {
          label: "Knowledge Chunks",
          value: data.stats.totalChunks,
          icon: MessageSquare,
          trend: "indexed & searchable",
          trendUp: true,
        },
        {
          label: "Knowledge Base",
          value: data.stats.knowledgeBaseSize,
          icon: Database,
          trend: `${data.stats.totalDocuments} PDFs indexed`,
          trendUp: true,
        },
        {
          label: "Avg Confidence",
          value: `${data.stats.avgConfidence}%`,
          icon: TrendingUp,
          trend: "based on recent answers",
          trendUp: true,
        },
      ]
    : [];

  return (
    <AppShell>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Welcome back 👋</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Your knowledge base is ready. Ask anything.
          </p>
        </div>
        <Link href="/chat">
          <Button size="md" className="cursor-pointer">
            <MessageSquare className="w-4 h-4" />
            Ask a Question
          </Button>
        </Link>
      </div>

      {/* Error state */}
      {error && (
        <div
          className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg
          flex items-center justify-between"
        >
          <p className="text-sm text-red-600">{error}</p>
          <button
            onClick={fetchStats}
            className="text-xs text-red-500 underline ml-4"
          >
            Retry
          </button>
        </div>
      )}

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {isLoading
          ? // ── Loading skeletons ──────────────────────────────────────────
            Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-28 bg-gray-100 rounded-xl animate-pulse"
              />
            ))
          : stats.map((stat) => <StatsCard key={stat.label} {...stat} />)}
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent activity */}
        {isLoading ? (
          <div className="h-64 bg-gray-100 rounded-xl animate-pulse" />
        ) : (
          <RecentActivity items={data?.recentActivity ?? []} />
        )}

        {/* Quick actions */}
        <div
          className="bg-white border border-gray-100 rounded-xl
          shadow-soft p-5"
        >
          <h3 className="text-sm font-semibold text-gray-800 mb-4">
            Quick Actions
          </h3>
          <div className="space-y-2">
            <Link href="/upload">
              <Button
                variant="secondary"
                size="md"
                className="w-full justify-start cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                Upload a new document
              </Button>
            </Link>
            <Link href="/chat">
              <Button
                variant="secondary"
                size="md"
                className="w-full justify-start mt-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                Start a new chat
              </Button>
            </Link>
            <Link href="/documents">
              <Button
                variant="secondary"
                size="md"
                className="w-full justify-start mt-2 cursor-pointer"
              >
                <Database className="w-4 h-4" />
                Manage documents
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
