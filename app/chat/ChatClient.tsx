"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

// Ajusta este import a tu estructura real.
// En tu screenshot tienes data/index.ts y data/places.types.ts
import { places } from "@/data";

// Si tu endpoint real es /api/api/chat (porque tienes app/api/api/chat/route.ts)
const API_URL = "/api/api/chat";
// Si lo limpias a app/api/chat/route.ts, entonces usa:
// const API_URL = "/api/chat";

type Role = "user" | "assistant" | "system";

type Msg = {
  id: string;
  role: Role;
  content: string;
};

function uid() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export default function ChatClient() {
  const sp = useSearchParams();

  // Lang desde query (?lang=es). Default es.
  const lang = useMemo(() => sp.get("lang") ?? "es", [sp]);

  // UI state
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Punto 5: memoria de “seen ids” para rotación controlada (anti repetición)
  // Se persiste en localStorage por idioma, así cada lang tiene su rotación.
  const storageKey = useMemo(() => `aicons_seenIds_${lang}`, [lang]);
  const [seenIds, setSeenIds] = useState<string[]>([]);

  const [messages, setMessages] = useState<Msg[]>([
    {
      id: uid(),
      role: "assistant",
      content:
        lang === "es"
          ? "Hola, soy tu concierge virtual de Ibiza. Dime: cuántas personas, edad aproximada, qué buscas (discoteca/playa/restaurante/barco/actividades), vestuario y si quieres lugares LGBT-friendly."
          : "Hi! I’m your Ibiza concierge. Tell me: group size, approx age, what you want (clubs/beach/restaurant/boat/activities), dress code and whether you want LGBT-friendly options.",
    },
  ]);

  // Scroll abajo
  const bottomRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Cargar seenIds desde localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) setSeenIds(parsed.filter((x) => typeof x === "string"));
    } catch {
      // ignore
    }
  }, [storageKey]);

  // Guardar seenIds
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(seenIds));
    } catch {
      // ignore
    }
  }, [seenIds, storageKey]);

  function addUserMessage(text: string) {
    setMessages((prev) => [...prev, { id: uid(), role: "user", content: text }]);
  }

  function addAssistantMessage(text: string) {
    setMessages((prev) => [...prev, { id: uid(), role: "assistant", content: text }]);
  }

  function resetSeenIds() {
    setSeenIds([]);
  }

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    setInput("");
    addUserMessage(text);
    setLoading(true);

    try {
      // Aquí pasamos:
      // - messages recientes (historial)
      // - lang
      // - seenIds (punto 5)
      // - places (tu DB local)
      //
      // IMPORTANTE: el backend decidirá qué recomendar usando places + seenIds.
      const payload = {
        lang,
        userText: text,
        history: messages.map((m) => ({ role: m.role, content: m.content })).slice(-12),
        seenIds,
        places, // DB
      };

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errText = await res.text().catch(() => "");
        throw new Error(errText || `HTTP ${res.status}`);
      }

      const data = (await res.json()) as {
        reply: string;
        usedIds?: string[];
        // opcional: si tu backend devuelve recomendaciones estructuradas
        // picks?: { id: string; name: string; why: string }[];
      };

      // Mensaje del bot
      addAssistantMessage(data.reply || "OK");

      // Punto 5: actualizar seenIds con los ids usados en esta respuesta (si backend los devuelve)
    const usedIds = Array.isArray(data.usedIds) ? data.usedIds : [];

if (usedIds.length > 0) {
  setSeenIds((prev) => {
    const merged = [...prev];
    for (const id of usedIds) {
      if (typeof id === "string" && !merged.includes(id)) merged.push(id);
    }
    return merged.slice(-300);
  });
}
    } catch (e: any) {
      addAssistantMessage(
        lang === "es"
          ? `Error del servidor: ${e?.message ?? "desconocido"}`
          : `Server error: ${e?.message ?? "unknown"}`
      );
    } finally {
      setLoading(false);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void send();
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
          background: "rgba(255,255,255,0.6)",
          backdropFilter: "blur(8px)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 12 }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800 }}>AIConcierge Ibiza</div>
            <div style={{ fontSize: 12, opacity: 0.65 }}>Lang: {lang}</div>
          </div>

          <button
            onClick={resetSeenIds}
            type="button"
            style={{
              borderRadius: 999,
              padding: "8px 12px",
              border: "1px solid rgba(0,0,0,0.14)",
              background: "white",
              cursor: "pointer",
              height: 36,
              fontSize: 12,
              fontWeight: 700,
            }}
            title="Reiniciar rotación (anti repetición)"
          >
            Reset rotación
          </button>
        </div>

        <div
          style={{
            border: "1px solid rgba(0,0,0,0.08)",
            borderRadius: 14,
            padding: 14,
            minHeight: 420,
            maxHeight: "60vh",
            overflow: "auto",
            background: "rgba(250,250,250,0.85)",
          }}
        >
          {messages.map((m) => (
            <div
              key={m.id}
              style={{
                display: "flex",
                justifyContent: m.role === "user" ? "flex-end" : "flex-start",
                marginBottom: 10,
              }}
            >
              <div
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
                {m.content}
              </div>
            </div>
          ))}

          {loading && (
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <div
                style={{
                  maxWidth: "78%",
                  padding: "10px 12px",
                  borderRadius: 14,
                  background: "rgba(0,0,0,0.06)",
                  color: "black",
                }}
              >
                {lang === "es" ? "Pensando..." : "Thinking..."}
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        <div style={{ marginTop: 12, display: "flex", gap: 10, alignItems: "flex-end" }}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={lang === "es" ? "Escribe aquí… (Enter para enviar, Shift+Enter salto)" : "Type here…"}
            rows={2}
            style={{
              flex: 1,
              resize: "none",
              borderRadius: 12,
              border: "1px solid rgba(0,0,0,0.16)",
              padding: 12,
              fontSize: 14,
              outline: "none",
              background: "white",
            }}
          />

          <button
            onClick={() => void send()}
            disabled={loading || !input.trim()}
            style={{
              borderRadius: 12,
              padding: "12px 16px",
              border: "1px solid rgba(0,0,0,0.14)",
              background: loading || !input.trim() ? "rgba(0,0,0,0.08)" : "#111",
              color: loading || !input.trim() ? "rgba(0,0,0,0.5)" : "white",
              cursor: loading || !input.trim() ? "not-allowed" : "pointer",
              fontWeight: 800,
              minWidth: 110,
            }}
          >
            {lang === "es" ? "Enviar" : "Send"}
          </button>
        </div>

        <div style={{ marginTop: 10, fontSize: 12, opacity: 0.65 }}>
          seenIds guardados: {seenIds.length}
        </div>
      </div>
    </main>
  );
}