import { Suspense } from "react";
import ChatClient from "./ChatClient";

export const dynamic = "force-dynamic";

export default function ChatPage() {
  return (
    <Suspense fallback={<div style={{ padding: 24 }}>Cargando chat...</div>}>
      <ChatClient />
    </Suspense>
  );
}
