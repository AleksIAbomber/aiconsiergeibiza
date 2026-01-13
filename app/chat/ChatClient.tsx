"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { t, Lang } from "@/components/i18n";

type Role = "user" | "assistant";

type Msg = {
  id: string;
  role: Role;
  content: string;
};

function uid() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

const API_URL = "/api/chat";

// Indicador humano de escritura (3 puntitos animados)
function TypingIndicator({ label }: { label: string }) {
  const [dots, setDots] = useState("");
  useEffect(() => {
    const id = setInterval(() => {
      setDots((d) => (d.length >= 3 ? "" : d + "."));
    }, 350);
    return () => clearInterval(id);
  }, []);
  return (
    <span style={{ display: "inline-flex", gap: 6, alignItems: "center" }}>
      <span>{label}</span>
      <span aria-hidden="true" style={{ fontWeight: 700 }}>
        {dots}
      </span>
    </span>
  );
}

export default function ChatClient() {
  const sp = useSearchParams();

  const lang = useMemo<Lang>(() => {
    return (sp.get("lang") as Lang) || "es";
  }, [sp]);

  const copy = useMemo(() => t(lang), [lang]);

  // Rotación (anti-repetición)
  const storageKey = useMemo(() => `infopoint_seenIds_${lang}`, [lang]);
  const [seenIds, setSeenIds] = useState<string[]>([]);

  // Mensajes
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Typewriter del assistant (para que no salga “todo de golpe”)
  const [typingReply, setTypingReply] = useState<string | null>(null);
  const [typingIndex, setTypingIndex] = useState(0);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Texto parcial que se está “escribiendo”
  const assistantTypingText = useMemo(() => {
    if (typingReply == null) return null;
    return typingReply.slice(0, typingIndex);
  }, [typingReply, typingIndex]);

  // Cargar seenIds
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        setSeenIds(parsed.filter((x) => typeof x === "string"));
      }
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

  // Insertar welcome message (multi-idioma) una sola vez
  useEffect(() => {
    if (messages.length > 0) return;
    setMessages([
      {
        id: uid(),
        role: "assistant",
        content: (copy as any).chatWelcome ?? (lang === "es" ? "Hola, ¿en qué te ayudo hoy?" : "Hi! How can I help today?"),
      },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [copy]);

  // Scroll al final
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, assistantTypingText]);

  function resetSeenIds() {
    setSeenIds([]);
  }

  function pushMessage(role: Role, content: string) {
    setMessages((prev) => [...prev, { id: uid(), role, content }]);
  }

  // Typewriter: escribe y cuando termina, lo convierte en mensaje real
  useEffect(() => {
    if (typingReply == null) return;

    // Más lento y natural, estilo ChatGPT
  const speedMs = 38;

    const id = window.setInterval(() => {
      setTypingIndex((i) => {
        const next = i + 1;

        // terminó
        if (next >= typingReply.length) {
          window.clearInterval(id);
          pushMessage("assistant", typingReply);
          setTypingReply(null);
          return 0;
        }

        return next;
      });
    }, speedMs);

    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typingReply]);

  async function send() {
    const text = input.trim();
    // bloquea si está cargando o si el assistant está “escribiendo”
    if (!text || loading || typingReply != null) return;

    setInput("");
    pushMessage("user", text);
    setLoading(true);

    try {
      // Backend espera: { lang, messages, seenIds }
      const payload = {
        lang,
        messages: [...messages, { id: "tmp", role: "user", content: text }].map((m) => ({
          role: m.role,
          content: m.content,
        })),
        seenIds,
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
        reply?: string;
        usedIds?: string[];
      };

      const fullReply = data.reply || (lang === "es" ? "Listo." : "Done.");

      // en vez de mostrar todo de golpe -> activamos typewriter
      setTypingReply(fullReply);
      setTypingIndex(0);

      const used = Array.isArray(data.usedIds) ? data.usedIds : [];
      if (used.length) {
        setSeenIds((prev) => {
          const merged = [...prev];
          for (const id of used) if (typeof id === "string" && !merged.includes(id)) merged.push(id);
          return merged.slice(-300);
        });
      }
    } catch (e: any) {
      const errMsg =
        lang === "es"
          ? `Error del servidor: ${e?.message ?? "desconocido"}`
          : `Server error: ${e?.message ?? "unknown"}`;

      // errores también con typewriter (queda más humano)
      setTypingReply(errMsg);
      setTypingIndex(0);
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

  // Estilo “plano” (sin burbujas ni contornos)
  const rowStyle = (role: Role): React.CSSProperties => ({
    display: "flex",
    justifyContent: role === "user" ? "flex-end" : "flex-start",
    marginBottom: 12,
  });

  // Detalle mínimo para distinguir: user un pelín más “oscuro” en texto
  const bubbleStyle = (role: Role): React.CSSProperties => ({
    maxWidth: "78%",
    padding: "8px 4px",
    borderRadius: 0,
    background: "transparent",
    border: "none",
    color: role === "user" ? "rgba(0,0,0,0.92)" : "rgba(0,0,0,0.86)",
    lineHeight: 1.6,
    whiteSpace: "pre-wrap",
    fontSize: 15,
    letterSpacing: "0.1px",
    textAlign: "left",
    boxShadow: "none",
  });

  // Tipografía más cálida: system font + fallback “friendly”
  const fontFamily =
    'ui-serif, "Iowan Old Style", "Palatino Linotype", Palatino, Georgia, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial';

  return (
    <main style={{ maxWidth: 980, margin: "0 auto", padding: 24, fontFamily }}>
      {/* Panel exterior sin borde duro */}
      <div
        style={{
          border: "none",
          borderRadius: 18,
          padding: 18,
          background: "rgba(255,255,255,0.88)",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 10 }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: "0.2px" }}>
              {(copy as any).chatBrandTitle ?? copy.brandName ?? "InfoPoint Ibiza"}
            </div>
            <div style={{ fontSize: 13, opacity: 0.72, fontWeight: 600 }}>
              {(copy as any).chatBrandSubtitle ?? (lang === "es" ? "Tu guía local, aquí para ayudarte" : "")}
            </div>
          </div>

          <button
            onClick={resetSeenIds}
            type="button"
            style={{
              borderRadius: 999,
              padding: "8px 12px",
              border: "1px solid rgba(0,0,0,0.10)",
              background: "rgba(255,255,255,0.85)",
              cursor: "pointer",
              height: 36,
              fontSize: 12,
              fontWeight: 800,
              fontFamily,
            }}
            title="Reiniciar rotación (anti repetición)"
          >
            {(copy as any).resetRotation ?? (lang === "es" ? "Reset rotación" : "Reset")}
          </button>
        </div>

        {/* Chat: sin borde, mismo fondo */}
        <div
          style={{
            border: "none",
            borderRadius: 16,
            padding: 10,
            minHeight: 420,
            maxHeight: "60vh",
            overflow: "auto",
            background: "transparent",
          }}
        >
          {messages.map((m) => (
            <div key={m.id} style={rowStyle(m.role)}>
              <div style={bubbleStyle(m.role)}>{m.content}</div>
            </div>
          ))}

          {/* Texto “en proceso” letra a letra */}
          {assistantTypingText != null && (
            <div style={rowStyle("assistant")}>
              <div style={bubbleStyle("assistant")}>{assistantTypingText}</div>
            </div>
          )}

          {/* Indicador de “pensando…” solo cuando no está el typewriter en marcha */}
          {loading && typingReply == null && (
            <div style={rowStyle("assistant")}>
              <div style={bubbleStyle("assistant")}>
                <TypingIndicator
                  label={(copy as any).thinkingLabel ?? (lang === "es" ? "Pensando la mejor opción" : "Thinking")}
                />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div style={{ marginTop: 14, display: "flex", gap: 10, alignItems: "flex-end" }}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={(copy as any).chatPlaceholder ?? (lang === "es" ? "Escribe aquí…" : "Type here…")}
            rows={2}
            style={{
              flex: 1,
              resize: "none",
              borderRadius: 14,
              border: "1px solid rgba(0,0,0,0.12)",
              padding: 12,
              fontSize: 14,
              outline: "none",
              background: "rgba(255,255,255,0.9)",
              fontFamily,
              lineHeight: 1.5,
            }}
          />

          <button
            onClick={() => void send()}
            disabled={loading || !input.trim() || typingReply != null}
            style={{
              borderRadius: 14,
              padding: "12px 16px",
              border: "1px solid rgba(0,0,0,0.12)",
              background: loading || !input.trim() || typingReply != null ? "rgba(0,0,0,0.08)" : "rgba(0,0,0,0.86)",
              color: loading || !input.trim() || typingReply != null ? "rgba(0,0,0,0.45)" : "white",
              cursor: loading || !input.trim() || typingReply != null ? "not-allowed" : "pointer",
              fontWeight: 900,
              minWidth: 120,
              fontFamily,
            }}
          >
            {lang === "es" ? "Enviar" : "Send"}
          </button>
        </div>

        <div style={{ marginTop: 10, fontSize: 12, opacity: 0.6, fontWeight: 600 }}>
          seenIds guardados: {seenIds.length}
        </div>
      </div>
    </main>
  );
}