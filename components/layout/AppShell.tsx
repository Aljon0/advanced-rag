// src/components/layout/AppShell.tsx
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";

interface AppShellProps {
  children: React.ReactNode;
}

/**
 * Root layout wrapper — wraps every page with Sidebar + Navbar.
 * Content area has left padding to account for fixed sidebar.
 */
export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed left sidebar */}
      <Sidebar />

      {/* Fixed top navbar — offset by sidebar width */}
      <Navbar />

      {/* Scrollable content area */}
      <main className="ml-56 pt-14 min-h-screen">
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}