// src/app/page.tsx
// Root route — redirect to dashboard
import { redirect } from "next/navigation";

export default function RootPage() {
  redirect("/dashboard");
}