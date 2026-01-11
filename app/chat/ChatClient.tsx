"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

type Role = "user" | "assistant";
type Msg = { role: Role; content: string };

export default function ChatClient() {
  const sp = useSearchParams();
  const lang = useMemo(() => sp.get("lang") ?? "es", [sp]);

  const initialAssistant = useMemo(() => {
    if (lang === "es")
      return "Hola, soy tu concierge virtual de Ibiza. Dime: sexo, cuántas personas, rango de edad, qué buscas (discoteca/playa/restaurante/barco/actividades), presupuesto, vestuario y si quieres lugares LGBT-friendly.";
    if (lang === "en")
      return "Hi! I'm your Ibiza concierge. Tell me: gender, group size, age range, what you want (club/beach/restaurant/boat/activities), budget, outfit style, and whether you want LGBT-friendly places.";
    if (lang === "it")
      return "Ciao! Sono il tuo concierge virtuale di Ibiza. Dimmi: sesso, quante persone, età, cosa cerchi (club/spiaggia/ristorante/barca/attività), budget, abbigliamento e se vuoi posti LGBT-friendly.";
    if (lang === "fr")
      return "Salut ! Je suis ton concierge virtuel d’Ibiza. Dis-moi : sexe, nombre de personnes, âge, ce que tu veux (club/plage/restaurant/bateau/activités), budget, tenue et si tu veux des lieux LGBT-friendly.";
    return "Hi! I'm your Ibiza concierge. Tell me what you’re looking for.";
  }, [lang]);

  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: initialAssistant },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const endRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    const nextMessages: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages, lang }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessages([
          ...nextMessages,
          {
            role: "assistant",
            content:
              (lang === "es" ? "Error del servidor: " : "Server error: ") +
              (data?.error ?? "Unknown error"),
          },
        ]);
      } else {
        setMessages([
          ...nextMessages,
          { role: "assistant", content: data?.reply ?? "" },
        ]);
      }
    } catch {
      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content:
            lang === "es"
              ? "Error de red. Revisa que el servidor esté corriendo."
              : "Network error. Check that the server is running.",
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
        minHeight: "100vh",
        background: "#F6F1E6",
        color: "#111",
        display: "flex",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 760,
          display: "flex",
          flexDirection: "column",
          border: "1px solid rgba(0,0,0,0.12)",
          borderRadius: 16,
          overflow: "hidden",
          background: "rgba(255,255,255,0.6)",
          backdropFilter: "blur(6px)",
        }}
      >
        <div
          style={{
            padding: "14px 16px",
            borderBottom: "1px solid rgba(0,0,0,0.10)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 10,
          }}
        >
          <div style={{ fontWeight: 800, letterSpacing: 0.5 }}>
            AIConsierge Ibiza
          </div>
          <div style={{ fontSize: 12, opacity: 0.7 }}>Lang: {lang}</div>
        </div>

        <div
          style={{
            flex: 1,
            padding: 16,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {messages.map((m, idx) => {
            const isUser = m.role === "user";
            return (
              <div
                key={idx}
                style={{
                  display: "flex",
                  justifyContent: isUser ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    maxWidth: "86%",
                    padding: "10px 12px",
                    borderRadius: 14,
                    border: "1px solid rgba(0,0,0,0.10)",
                    background: isUser ? "#111" : "rgba(255,255,255,0.75)",
                    color: isUser ? "#F6F1E6" : "#111",
                    whiteSpace: "pre-wrap",
                    lineHeight: 1.35,
                  }}
                >
                  {m.content}
                </div>
              </div>
            );
          })}

          {loading && (
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <div
                style={{
                  maxWidth: "86%",
                  padding: "10px 12px",
                  borderRadius: 14,
                  border: "1px solid rgba(0,0,0,0.10)",
                  background: "rgba(255,255,255,0.75)",
                }}
              >
                {lang === "es" ? "Escribiendo…" : "Typing…"}
              </div>
            </div>
          )}

          <div ref={endRef} />
        </div>

        <div
          style={{
            padding: 12,
            borderTop: "1px solid rgba(0,0,0,0.10)",
            display: "flex",
            gap: 10,
            alignItems: "flex-end",
          }}
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={
              lang === "es"
                ? "Escribe aquí… (Enter para enviar, Shift+Enter para salto de línea)"
                : "Type here… (Enter to send, Shift+Enter for newline)"
            }
            style={{
              flex: 1,
              resize: "none",
              minHeight: 46,
              maxHeight: 140,
              padding: "10px 12px",
              borderRadius: 12,
              border: "1px solid rgba(0,0,0,0.18)",
              outline: "none",
              background: "rgba(255,255,255,0.9)",
              color: "#111",
              lineHeight: 1.35,
            }}
          />
          <button
            onClick={send}
            disabled={loading || !input.trim()}
            style={{
              padding: "11px 14px",
              borderRadius: 12,
              border: "1px solid rgba(0,0,0,0.18)",
              background: loading || !input.trim() ? "rgba(0,0,0,0.35)" : "#111",
              color: "#F6F1E6",
              cursor: loading || !input.trim() ? "not-allowed" : "pointer",
              fontWeight: 700,
            }}
          >
            {lang === "es" ? "Enviar" : "Send"}
          </button>
        </div>
      </div>
    </main>
  );
}
