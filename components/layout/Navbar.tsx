// src/components/layout/Navbar.tsx
"use client";

import { usePathname } from "next/navigation";
import { Search, Bell } from "lucide-react";

// Map routes to readable page titles
const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/upload":    "Upload Documents",
  "/chat":      "Ask Questions",
  "/documents": "My Documents",
};

/** Top navbar — shows current page title */
export function Navbar() {
  const pathname = usePathname();
  const title = pageTitles[pathname] ?? "KnowledgeAI";

  return (
    <header className="h-14 bg-white border-b border-gray-100 flex items-center justify-between px-6 fixed top-0 right-0 left-56 z-10">
      {/* Page title */}
      <h1 className="text-sm font-semibold text-gray-800">{title}</h1>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        {/* Search icon — placeholder for future search */}
        <button
          className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
          aria-label="Search"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Notification bell — placeholder */}
        <button
          className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
        </button>

        {/* Avatar placeholder */}
        <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center ml-1">
          <span className="text-xs font-medium text-gray-600">U</span>
        </div>
      </div>
    </header>
  );
}