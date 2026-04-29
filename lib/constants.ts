// src/lib/constants.ts

// Base API URL from environment variable
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

// Accepted file types for upload
export const ACCEPTED_FILE_TYPES = {
  "application/pdf": [".pdf"],
};

// Max file size: 50MB
export const MAX_FILE_SIZE = 50 * 1024 * 1024;

// Max files per upload batch
export const MAX_FILES = 10;

// Navigation items for sidebar
export const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
  { label: "Upload",    href: "/upload",    icon: "Upload"          },
  { label: "Chat",      href: "/chat",      icon: "MessageSquare"   },
  { label: "Documents", href: "/documents", icon: "FileText"        },
] as const;

// Confidence score color thresholds
export const CONFIDENCE_LEVELS = {
  high:   { min: 80, color: "green" },
  medium: { min: 50, color: "yellow" },
  low:    { min: 0,  color: "red" },
} as const;