// src/components/layout/Navbar.tsx
"use client";

import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";

interface NavbarProps {
  onMenuClick: () => void;
}

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/upload": "Upload Documents",
  "/chat": "Ask Questions",
  "/documents": "My Documents",
};

export function Navbar({ onMenuClick }: NavbarProps) {
  const pathname = usePathname();
  const title = pageTitles[pathname] ?? "KnowledgeAI";

  return (
    // left-0 on mobile, lg:left-56 on desktop
    <header className="h-14 bg-white border-b border-gray-100 flex items-center justify-between px-4 sm:px-6 fixed top-0 right-0 left-0 lg:left-56 z-10 transition-all duration-200">
      <div className="flex items-center gap-3">
        {/* Hamburger menu button - Hidden on desktop */}
        <button
          onClick={onMenuClick}
          className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <h1 className="text-sm font-semibold text-gray-800">{title}</h1>
      </div>
    </header>
  );
}
