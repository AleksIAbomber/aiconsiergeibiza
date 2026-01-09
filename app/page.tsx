"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

const QUICK_STARTS = [
  { label: "Restaurantes", text: "Quiero cena. Presupuesto €€, vibe social, smart casual, zona Ibiza ciudad, hoy 21:30. Me gusta sushi o mediterráneo." },
  { label: "Playas", text: "Quiero una playa tranquila y bonita. Voy en coche, quiero parking fácil. Zona cerca de Santa Eulària o norte." },
  { label: "Fiesta", text: "Quiero fiesta potente. Música house/tech, presupuesto alto, outfit club-ready, grupo de 3, zona Playa d’en Bossa, hoy." },
  { label: "Barco", text: "Quiero experiencia en barco. Sunset, ambiente social, presupuesto €€–€€€, pareja, salida Ibiza ciudad o San Antonio." },
  { label: "Plan del día", text: "Hazme un plan para hoy completo (mañana/tarde/noche). Presupuesto €€, pareja, vibe romántico-social, smart casual. Zona Ibiza ciudad." },
];

export default function Home() {
  const [chatOpen, setChatOpen] = useState(false);

  // Video ad gate (antes de abrir chat)
  const [adOpen, setAdOpen] = useState(false);
  const [adSkippable, setAdSkippable] = useState(false);
  const [adSeconds, setAdSeconds] = useState(5);

  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Soy AICONSIERGE Ibiza. Dime qué buscas (restaurante, playa, actividad, fiesta o barco), tu presupuesto (€ / €€ / €€€), vibe y vestuario. Si me dices zona y hora, decido en 20 segundos.",
    },
  ]);

  const endRef = useRef<HTMLDivElement | null>(null);
  const canSend = useMemo(() => !!input.trim() && !loading, [input, loading]);

  // Control del “skip” del anuncio (muy corto, no invasivo)
  useEffect(() => {
    if (!adOpen) return;

    setAdSkippable(false);
    setAdSeconds(5);

    const t1 = setTimeout(() => setAdSkippable(true), 3000); // skip tras 3s
    const interval = setInterval(() => setAdSeconds((s) => (s > 0 ? s - 1 : 0)), 1000);

    return () => {
      clearTimeout(t1);
      clearInterval(interval);
    };
  }, [adOpen]);

  function openChatWithAd() {
    setAdOpen(true);
  }

  function closeAdAndOpenChat() {
    setAdOpen(false);
    setChatOpen(true);
    // scroll al final
    setTimeout(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  }

  async function send(textOverride?: string) {
    const text = (textOverride ?? input).trim();
    if (!text || loading) return;

    const nextMessages: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Error en /api/chat");

      setMessages([...nextMessages, { role: "assistant", content: data.text }]);
      setTimeout(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
    } catch (e: any) {
      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content:
            "No he podido responder ahora mismo. Revisa conexión/saldo y que el servidor esté operativo.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={styles.main}>
      {/* HOME */}
      <section style={styles.hero}>
        <div style={styles.card}>
          <div style={styles.brand}>AICONSIERGE</div>
          <h1 style={styles.h1}>Concierge IA de Ibiza</h1>
          <p style={styles.p}>
            Recomendaciones precisas según presupuesto, vibe, vestuario, zona y momento. Máximo 3 opciones.
            Servicio de consultoría gratuita. Publicidad no invasiva.
          </p>

          <button style={styles.primaryBtn} onClick={openChatWithAd}>
            Hablar con el concierge
          </button>

          <div style={styles.quickRow}>
            {QUICK_STARTS.map((q) => (
              <button
                key={q.label}
                style={styles.chip}
                onClick={() => {
                  openChatWithAd();
                  // al abrir chat, precargar input con ejemplo
                  setTimeout(() => setInput(q.text), 250);
                }}
              >
                {q.label}
              </button>
            ))}
          </div>

          {/* Ads slot HOME (AdSense) */}
          <div style={styles.adSlot}>
            <div style={styles.adLabel}>Publicidad</div>
            <div style={styles.adBody}>Banner no invasivo (AdSense)</div>
          </div>
        </div>
      </section>

      {/* VIDEO AD MODAL (antes de chat) */}
      {adOpen && (
        <div style={styles.backdrop} onMouseDown={() => setAdOpen(false)}>
          <div style={styles.adModal} onMouseDown={(e) => e.stopPropagation()}>
            <div style={styles.adHeader}>
              <div>
                <div style={{ fontWeight: 800 }}>Contenido patrocinado</div>
                <div style={{ fontSize: 12, opacity: 0.75 }}>
                  Se puede omitir en {adSkippable ? "0" : Math.max(0, adSeconds - 2)}s
                </div>
              </div>
              <button style={styles.close} onClick={() => setAdOpen(false)} aria-label="Cerrar">
                ×
              </button>
            </div>

            {/* Sustituye este bloque por tu embed de YouTube o Ad network */}
            <div style={styles.videoBox}>
              <div style={{ opacity: 0.85 }}>
                Aquí va un vídeo corto (YouTube/ads). MVP: placeholder.
              </div>
            </div>

            <div style={styles.adActions}>
              <button style={styles.secondaryBtn} onClick={() => setAdOpen(false)}>
                Volver
              </button>
              <button
                style={{
                  ...styles.primaryBtn,
                  opacity: adSkippable ? 1 : 0.6,
                  cursor: adSkippable ? "pointer" : "not-allowed",
                }}
                onClick={closeAdAndOpenChat}
                disabled={!adSkippable}
              >
                {adSkippable ? "Continuar al chat" : "Espera…"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CHAT MODAL */}
      {chatOpen && (
        <div style={styles.backdrop} onMouseDown={() => setChatOpen(false)}>
          <div style={styles.chatModal} onMouseDown={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <div style={styles.modalTitle}>Chat con AICONSIERGE</div>
                <div style={styles.modalSub}>Ibiza-only · Máx. 3 recomendaciones · Estilo PR humano</div>
              </div>
              <button style={styles.close} onClick={() => setChatOpen(false)} aria-label="Cerrar">
                ×
              </button>
            </div>

            {/* Chips para aumentar interacción (más clicks útiles) */}
            <div style={styles.topChips}>
              {QUICK_STARTS.slice(0, 4).map((q) => (
                <button key={q.label} style={styles.smallChip} onClick={() => send(q.text)} disabled={loading}>
                  {q.label}
                </button>
              ))}
            </div>

            <div style={styles.bodyGrid}>
              <div style={styles.chatCol}>
                <div style={styles.chat}>
                  {messages.map((m, i) => (
                    <div
                      key={i}
                      style={{
                        ...styles.bubble,
                        ...(m.role === "user" ? styles.userBubble : styles.assistantBubble),
                      }}
                    >
                      <div style={styles.role}>{m.role === "user" ? "Tú" : "Concierge"}</div>
                      <div style={styles.text}>{m.content}</div>
                    </div>
                  ))}
                  <div ref={endRef} />
                </div>

                <div style={styles.composer}>
                  <textarea
                    style={styles.input}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder='Ej.: "Cena €€, vibe social, smart casual, Ibiza ciudad, 21:30"'
                    rows={2}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        send();
                      }
                    }}
                  />
                  <button style={styles.send} onClick={() => send()} disabled={!canSend}>
                    {loading ? "Pensando…" : "Enviar"}
                  </button>
                </div>
              </div>

              {/* Ads laterales desktop (en móvil se verá estrecho: queda ok porque el grid colapsa por ancho) */}
              <aside style={styles.adsCol}>
                <div style={styles.sideAd}>
                  <div style={styles.adLabel}>Publicidad</div>
                  <div style={styles.adBody}>Banner lateral (AdSense)</div>
                </div>
                <div style={styles.sideAd}>
                  <div style={styles.adLabel}>Publicidad</div>
                  <div style={styles.adBody}>Banner lateral (AdSense)</div>
                </div>
              </aside>
            </div>

            {/* Footer ad: muy efectivo en móvil sin molestar */}
            <div style={styles.footerAd}>
              <div style={styles.adLabel}>Publicidad</div>
              <div style={styles.adBody}>Banner inferior (AdSense)</div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  main: {
    minHeight: "100vh",
    background: "#f6f0e6",
    color: "#111",
    display: "grid",
    placeItems: "center",
    padding: "22px 14px",
  },
  hero: { width: "100%", display: "flex", justifyContent: "center" },
  card: {
    width: "min(860px, 100%)",
    background: "rgba(255,255,255,0.58)",
    border: "1px solid rgba(0,0,0,0.10)",
    borderRadius: 24,
    padding: 18,
    boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
    textAlign: "center",
  },
  brand: { fontSize: 12, letterSpacing: "0.22em", opacity: 0.75, marginBottom: 6 },
  h1: { fontSize: 34, margin: "6px 0 10px", letterSpacing: "-0.02em" },
  p: { fontSize: 15.5, margin: "0 0 14px", opacity: 0.85, lineHeight: 1.5 },

  primaryBtn: {
    background: "#111",
    color: "#fff",
    border: "none",
    borderRadius: 16,
    padding: "14px 16px",
    fontSize: 16,
    cursor: "pointer",
    width: "100%",
  },
  secondaryBtn: {
    background: "rgba(255,255,255,0.55)",
    color: "#111",
    border: "1px solid rgba(0,0,0,0.18)",
    borderRadius: 16,
    padding: "12px 16px",
    fontSize: 15,
    cursor: "pointer",
    width: "100%",
  },

  quickRow: { display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginTop: 12 },
  chip: {
    border: "1px solid rgba(0,0,0,0.14)",
    background: "rgba(255,255,255,0.55)",
    borderRadius: 999,
    padding: "10px 12px",
    cursor: "pointer",
    fontSize: 14,
  },

  adSlot: {
    marginTop: 14,
    borderRadius: 18,
    border: "1px dashed rgba(0,0,0,0.22)",
    padding: 12,
    background: "rgba(246,240,230,0.65)",
    textAlign: "left",
  },
  adLabel: { fontSize: 12, opacity: 0.7, marginBottom: 6 },
  adBody: { fontSize: 14, opacity: 0.88 },

  backdrop: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.35)",
    display: "grid",
    placeItems: "center",
    padding: 10,
  },

  // Ad modal
  adModal: {
    width: "min(560px, 100%)",
    background: "rgba(246,240,230,0.98)",
    borderRadius: 20,
    border: "1px solid rgba(0,0,0,0.18)",
    boxShadow: "0 28px 70px rgba(0,0,0,0.25)",
    overflow: "hidden",
  },
  adHeader: {
    padding: 12,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid rgba(0,0,0,0.12)",
    background: "rgba(255,255,255,0.35)",
  },
  videoBox: {
    height: 280,
    display: "grid",
    placeItems: "center",
    padding: 14,
  },
  adActions: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
    padding: 12,
    borderTop: "1px solid rgba(0,0,0,0.12)",
  },

  // Chat modal (centrado y usable en móvil)
  chatModal: {
    width: "min(980px, 100%)",
    height: "min(86vh, 780px)",
    background: "rgba(246,240,230,0.98)",
    borderRadius: 22,
    border: "1px solid rgba(0,0,0,0.18)",
    boxShadow: "0 28px 70px rgba(0,0,0,0.25)",
    display: "grid",
    gridTemplateRows: "auto auto 1fr auto",
    overflow: "hidden",
  },
  modalHeader: {
    padding: "12px 14px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid rgba(0,0,0,0.12)",
  },
  modalTitle: { fontWeight: 800 },
  modalSub: { fontSize: 12, opacity: 0.7 },

  close: {
    width: 38,
    height: 38,
    borderRadius: 12,
    border: "1px solid rgba(0,0,0,0.18)",
    background: "rgba(255,255,255,0.55)",
    cursor: "pointer",
    fontSize: 22,
    lineHeight: "38px",
  },

  topChips: {
    display: "flex",
    gap: 8,
    padding: "10px 12px",
    overflowX: "auto",
    borderBottom: "1px solid rgba(0,0,0,0.10)",
    background: "rgba(255,255,255,0.25)",
  },
  smallChip: {
    border: "1px solid rgba(0,0,0,0.14)",
    background: "rgba(255,255,255,0.60)",
    borderRadius: 999,
    padding: "8px 10px",
    cursor: "pointer",
    fontSize: 13,
    whiteSpace: "nowrap",
  },

  bodyGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 260px",
    height: "100%",
    minHeight: 0,
  },
  chatCol: {
    display: "grid",
    gridTemplateRows: "1fr auto",
    minHeight: 0,
  },
  chat: {
    padding: 12,
    overflow: "auto",
    display: "flex",
    flexDirection: "column",
    gap: 10,
    minHeight: 0,
  },
  bubble: {
    maxWidth: "86%",
    padding: 12,
    borderRadius: 16,
    border: "1px solid rgba(0,0,0,0.12)",
    background: "rgba(255,255,255,0.55)",
  },
  userBubble: { marginLeft: "auto", background: "rgba(17,17,17,0.92)", color: "#fff" },
  assistantBubble: { marginRight: "auto" },
  role: { fontSize: 12, opacity: 0.75, marginBottom: 6 },
  text: { whiteSpace: "pre-wrap", lineHeight: 1.45, fontSize: 15 },

  composer: {
    borderTop: "1px solid rgba(0,0,0,0.12)",
    padding: 10,
    display: "grid",
    gridTemplateColumns: "1fr auto",
    gap: 10,
    alignItems: "end",
    background: "rgba(255,255,255,0.20)",
  },
  input: {
    width: "100%",
    resize: "none",
    padding: "10px 12px",
    borderRadius: 14,
    border: "1px solid rgba(0,0,0,0.18)",
    background: "rgba(255,255,255,0.65)",
    outline: "none",
  },
  send: {
    padding: "10px 14px",
    borderRadius: 14,
    border: "1px solid rgba(0,0,0,0.18)",
    background: "#111",
    color: "#fff",
    cursor: "pointer",
    minWidth: 110,
  },

  adsCol: {
    borderLeft: "1px solid rgba(0,0,0,0.10)",
    padding: 10,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    background: "rgba(255,255,255,0.10)",
  },
  sideAd: {
    borderRadius: 16,
    border: "1px dashed rgba(0,0,0,0.22)",
    padding: 12,
    background: "rgba(246,240,230,0.50)",
  },

  footerAd: {
    borderTop: "1px solid rgba(0,0,0,0.10)",
    padding: 10,
    background: "rgba(246,240,230,0.75)",
  },
};
