"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import TypingText from "./TypingText";
type Role = "user" | "assistant";

type Msg = {
  id: string;
  role: Role;
  content: string;
};

function uid() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

// Indicador humano de escritura (3 puntitos animados)
function TypingIndicator({ lang }: { lang: string }) {
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const i = setInterval(() => {
      setDots((d) => (d.length >= 3 ? "." : d + "."));
    }, 400);
    return () => clearInterval(i);
  }, []);

  return (
    <div
      style={{
        maxWidth: "70%",
        padding: "10px 12px",
        borderRadius: 14,
        background: "rgba(0,0,0,0.06)",
        color: "black",
        fontStyle: "italic",
      }}
    >
      {lang === "es"
        ? `Pensando para darte la mejor respuesta${dots}`
        : `Thinking to give you the best answer${dots}`}
    </div>
  );
}

export default function ChatClient() {
  const sp = useSearchParams();
  const lang = useMemo(() => sp.get("lang") ?? "es", [sp]);

  const [messages, setMessages] = useState<Msg[]>([
    {
      id: uid(),
      role: "assistant",
      content:
        lang === "es"
          ? "Hola, soy tu concierge virtual de Ibiza. Dime cuántas personas sois, presupuesto aproximado y qué tipo de plan buscas."
          : "Hi! I’m your Ibiza concierge. Tell me group size, budget and what kind of plan you want.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    setInput("");
    setMessages((prev) => [...prev, { id: uid(), role: "user", content: text }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lang,
          messages: [...messages, { id: uid(), role: "user", content: text }],
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = (await res.json()) as { reply: string };

      setMessages((prev) => [
        ...prev,
        {
          id: uid(),
          role: "assistant",
          content: data.reply || "OK",
        },
      ]);
    } catch (e: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: uid(),
          role: "assistant",
          content:
            lang === "es"
              ? "Ha habido un error. Inténtalo de nuevo."
              : "There was an error. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <main
      style={{
        maxWidth: 980,
        margin: "0 auto",
        padding: 24,
      }}
    >
      <div
        style={{
          border: "1px solid rgba(0,0,0,0.08)",
          borderRadius: 16,
          padding: 18,
          background: "rgba(255,255,255,0.7)",
        }}
      >
        <div style={{ marginBottom: 12 }}>
          <h1 style={{ fontSize: 20, fontWeight: 800 }}>
            AIConcierge Ibiza
          </h1>
          <div style={{ fontSize: 12, opacity: 0.6 }}>
            Lang: {lang}
          </div>
        </div>

        <div
          style={{
            border: "1px solid rgba(0,0,0,0.08)",
            borderRadius: 14,
            padding: 14,
            minHeight: 420,
            maxHeight: "60vh",
            overflow: "auto",
            background: "rgba(250,250,250,0.9)",
          }}
        >
          {messages.map((m) => (
            <div
              key={m.id}
              style={{
                display: "flex",
                justifyContent:
                  m.role === "user" ? "flex-end" : "flex-start",
                marginBottom: 10,
              }}
            >
              <div
  className="chat-bubble"
  style={{
    maxWidth: "78%",
    padding: "10px 12px",
    borderRadius: 14,
    background: m.role === "user" ? "#111" : "rgba(0,0,0,0.06)",
    color: m.role === "user" ? "white" : "black",
    lineHeight: 1.35,
    whiteSpace: "pre-wrap",
  }}
>
              
                {m.role === "assistant" ? (
  <TypingText text={m.content} />
) : (
  m.content
)}
              </div>
            </div>
          ))}

          {loading && (
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <TypingIndicator lang={lang} />
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        <div style={{ marginTop: 12, display: "flex", gap: 10 }}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            rows={2}
            placeholder={
              lang === "es"
                ? "Escribe aquí… (Enter para enviar)"
                : "Type here… (Enter to send)"
            }
            style={{
              flex: 1,
              resize: "none",
              borderRadius: 12,
              border: "1px solid rgba(0,0,0,0.2)",
              padding: 12,
              fontSize: 14,
            }}
          />

          <button
            onClick={send}
            disabled={loading || !input.trim()}
            style={{
              borderRadius: 12,
              padding: "12px 16px",
              border: "none",
              background:
                loading || !input.trim() ? "#ccc" : "#111",
              color: "white",
              fontWeight: 700,
              cursor:
                loading || !input.trim()
                  ? "not-allowed"
                  : "pointer",
            }}
          >
            {lang === "es" ? "Enviar" : "Send"}
          </button>
        </div>
      </div>
    </main>
  );
}