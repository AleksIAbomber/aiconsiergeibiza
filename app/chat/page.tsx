"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import LanguagePicker from "@/components/LanguagePicker";
import WhatsAppFab from "@/components/WhatsAppFab";
import { Lang, t } from "@/components/i18n";

type Msg = { role: "user" | "assistant"; content: string };

export default function ChatPage() {
  const params = useSearchParams();
  const qLang = (params.get("lang") as Lang) || "es";
  const [lang, setLang] = useState<Lang>("es");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const saved = (localStorage.getItem("aiconsierge_lang") as Lang) || qLang || "es";
    setLang(saved);
  }, [qLang]);

  const copy = useMemo(() => t(lang), [lang]);

  useEffect(() => {
    // Mensaje inicial en el idioma seleccionado
    setMessages([
      {
        role: "assistant",
        content: copy.chatHint,
      },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next, lang }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Error en /api/chat");

      setMessages([...next, { role: "assistant", content: data.text }]);
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
    } catch (e: any) {
      setMessages([
        ...next,
        {
          role: "assistant",
          content: "No he podido conectar con la IA. Revisa la API key y el backend.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main className="container">
        <section className="card chatShell">
          <div className="chatTop">
            <div>
              <h2>{copy.chatTitle}</h2>
              <p>{copy.chatSub}</p>
            </div>
            <LanguagePicker
              lang={lang}
              onChange={(l) => {
                localStorage.setItem("aiconsierge_lang", l);
                setLang(l);
              }}
              compact
            />
          </div>

          <div className="chatBody">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`bubble ${m.role === "user" ? "bubbleUser" : ""}`}
              >
                <div className={m.role === "user" ? "bubbleMeta" : "bubbleLabel"}>
                  {m.role === "user" ? "Tú" : "Concierge"}
                </div>
                {m.content}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <div className="adBox">
            <div>{copy.adLabel}</div>
            <strong>{copy.adBox}</strong>
          </div>

          <div className="chatComposer">
            <textarea
              className="textarea"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={copy.chatHint}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
            />
            <button className="sendBtn" onClick={send} disabled={!input.trim() || loading}>
              {copy.send}
            </button>
          </div>
        </section>
      </main>

      <WhatsAppFab />
    </>
  );
}
