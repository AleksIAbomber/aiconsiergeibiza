"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import LanguagePicker from "@/components/LanguagePicker";
import WhatsAppFab from "@/components/WhatsAppFab";
import { Lang, t } from "@/components/i18n";

export default function HomePage() {
  const router = useRouter();
  const [lang, setLang] = useState<Lang>("es");

  useEffect(() => {
    const saved = (localStorage.getItem("aiconsierge_lang") as Lang) || "es";
    setLang(saved);
  }, []);

  const copy = useMemo(() => t(lang), [lang]);

  const goChat = (direct = false) => {
    localStorage.setItem("aiconsierge_lang", lang);
    router.push(`/chat?lang=${lang}&direct=${direct ? "1" : "0"}`);
  };

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

        <section className="card hero">
          <h2>{copy.heroTitle}</h2>
          <p>{copy.heroDesc}</p>

          <div className="ctaRow">
            <button className="btn btnPrimary" onClick={() => goChat(false)}>
              {copy.startChat}
            </button>
            <button className="btn btnGhost" onClick={() => goChat(true)}>
              {copy.goDirect}
            </button>
          </div>

          <div style={{ marginTop: 12 }}>
            <a
              href="/faq"
              style={{
                fontSize: 14,
                opacity: 0.75,
                textDecoration: "underline",
              }}
            >
              {copy.faqLink}
            </a>
          </div>

          <div className="adBox">
            <div>{copy.adLabel}</div>
            <strong>{copy.adBox}</strong>
          </div>
        </section>

        <div className="sectionTitle">{copy.cardsTitle}</div>
        <section className="grid4">
          <article className="card tile">
            <h3>{copy.restaurants}</h3>
            <p>{copy.restaurantsDesc}</p>
          </article>

          <article className="card tile">
            <h3>{copy.beaches}</h3>
            <p>{copy.beachesDesc}</p>
          </article>

          <article className="card tile">
            <h3>{copy.party}</h3>
            <p>{copy.partyDesc}</p>
          </article>

          <article className="card tile">
            <h3>{copy.boat}</h3>
            <p>{copy.boatDesc}</p>
          </article>
        </section>
      </main>

      <WhatsAppFab />
    </>
  );
}