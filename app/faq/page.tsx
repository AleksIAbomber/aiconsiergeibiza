"use client";

import { useEffect, useMemo, useState } from "react";
import LanguagePicker from "@/components/LanguagePicker";
import WhatsAppFab from "@/components/WhatsAppFab";
import { Lang, t } from "@/components/i18n";

export default function FAQPage() {
  const [lang, setLang] = useState<Lang>("es");

  useEffect(() => {
    const saved = (localStorage.getItem("aiconsierge_lang") as Lang) || "es";
    setLang(saved);
  }, []);

  const copy = useMemo(() => t(lang), [lang]);

  return (
    <>
      <main className="container">
        <div className="headerRow">
          <div className="brand">
            <h1>{copy.brandName}</h1>
            <p>{copy.brandTagline}</p>
          </div>
          <LanguagePicker lang={lang} onChange={setLang} />
        </div>

        <section className="card" style={{ padding: 18 }}>
          <h2 style={{ marginBottom: 8 }}>{copy.faq.title}</h2>
          <p style={{ opacity: 0.75, lineHeight: 1.6 }}>{copy.faq.intro}</p>
        </section>

        <section className="card" style={{ padding: 10 }}>
          {copy.faq.items.map((item) => (
            <details
              key={item.q}
              style={{
                padding: "10px 8px",
                borderBottom: "1px solid rgba(0,0,0,0.06)",
              }}
            >
              <summary style={{ cursor: "pointer", fontWeight: 800 }}>
                {item.q}
              </summary>
              <p style={{ marginTop: 8, opacity: 0.85, lineHeight: 1.6 }}>
                {item.a}
              </p>
            </details>
          ))}
        </section>

        <section style={{ marginTop: 14, opacity: 0.8, fontSize: 13 }}>
          <p>{copy.faq.cta}</p>
        </section>
      </main>

      <WhatsAppFab />
    </>
  );
}