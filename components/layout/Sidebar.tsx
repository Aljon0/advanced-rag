// src/components/layout/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Upload,
  MessageSquare,
  FileText,
  Brain,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Upload",    href: "/upload",    icon: Upload           },
  { label: "Chat",      href: "/chat",      icon: MessageSquare    },
  { label: "Documents", href: "/documents", icon: FileText         },
];

/** Left sidebar — persistent navigation */
export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 h-screen bg-white border-r border-gray-100 flex flex-col fixed left-0 top-0 z-20">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-gray-100">
        <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
          <Brain className="w-4 h-4 text-white" />
        </div>
        <span className="font-semibold text-gray-900 text-sm tracking-tight">
          KnowledgeAI
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150",
                isActive
                  ? "bg-gray-900 text-white"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer hint */}
      <div className="px-5 py-4 border-t border-gray-100">
        <p className="text-xs text-gray-400">Private Knowledge Base</p>
        <p className="text-xs text-gray-300">v0.1.0</p>
      </div>
    </aside>
  );
}