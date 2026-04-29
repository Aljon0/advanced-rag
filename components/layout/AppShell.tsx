// src/components/layout/AppShell.tsx
"use client";

import { useState, useCallback } from "react";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // By using useCallback, this function reference stays stable and 
  // prevents the Sidebar's useEffect from accidentally triggering.
  const handleCloseSidebar = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={handleCloseSidebar} 
      />

      <Navbar onMenuClick={() => setIsSidebarOpen(true)} />

      {/* Main content area */}
      <main className="lg:ml-56 pt-14 min-h-screen transition-all duration-200">
        <div className="p-4 sm:p-6">{children}</div>
      </main>
    </div>
  );
}