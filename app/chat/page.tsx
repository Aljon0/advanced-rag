// src/app/chat/page.tsx
import { AppShell } from "@/components/layout/AppShell";
import { ChatBox } from "@/components/chat/ChatBox";

export default function ChatPage() {
  return (
    <AppShell>
      <ChatBox />
    </AppShell>
  );
}