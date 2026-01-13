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
      <main className="container magazine">
        {/* Header */}
        <div className="magHeader">
          <div className="magBrand">
            <h1>{copy.brandName}</h1>
            <p style={{ marginTop: 6, opacity: 0.75 }}>{copy.brandTagline}</p>
          </div>

          <LanguagePicker lang={lang} onChange={setLang} compact />
        </div>

        <div className="magRule" />

        {/* Hero collage */}
        <section className="heroCollage">
          <div className="heroImg heroLeft" />
          <div className="heroImg heroCenter" />
          <div className="heroImg heroRight" />

          <div className="heroOverlay">
            <div className="heroKicker">
              {lang === "es" ? "Descubre la esencia de Ibiza." : copy.heroTitle}
            </div>
            <div className="heroSub">
              {lang === "es"
                ? "Donde el mar cristalino se encuentra con noches vibrantes."
                : copy.heroDesc}
            </div>

            <div className="heroCtas">
              <button className="btn btnPrimary" onClick={() => goChat(false)}>
                {copy.startChat}
              </button>
              <button className="btn btnGhost" onClick={() => goChat(true)}>
                {copy.goDirect}
              </button>
            </div>
          </div>
        </section>

        {/* Magazine grid: Sponsor | Chat Preview | Sponsor */}
        <section className="magGrid">
          {/* Sponsor left */}
          <aside className="sponsorCard">
            <div className="sponsorLabel">{lang === "es" ? "PARTNER" : "SPONSOR"}</div>
            <div className="sponsorImg sponsorLeft" />
            <div className="sponsorText">
              <div className="sponsorTitle">{lang === "es" ? "Recomendado" : "Featured"}</div>
              <div className="sponsorDesc">
                {lang === "es"
                  ? "Experiencias seleccionadas para tu viaje."
                  : "Curated experiences for your trip."}
              </div>
            </div>
          </aside>

          {/* Chat preview (central) */}
          <div className="chatPreview card">
            <div className="chatTop">
              <div className="chatDots">
                <span />
                <span />
                <span />
              </div>
            </div>

            <div className="chatBody">
              <div className="chatRow left">
                <div className="avatar" />
                <div className="bubble light">
                  {lang === "es"
                    ? "¿Qué es lo mejor para cenar hoy en Ibiza?"
                    : "What are the best restaurants in Ibiza today?"}
                </div>
              </div>

              <div className="chatRow right">
                <div className="bubble dark">
                  {lang === "es"
                    ? "Perfecto. Dime presupuesto por persona, zona y si quieres ambiente tranquilo o animado."
                    : "Sure. Tell me budget per person, area and the vibe you want."}
                </div>
                <div className="avatar small" />
              </div>

              <div className="chatList">
                <div className="line" />
                <div className="line w80" />
                <div className="line w60" />
                <div className="line" />
              </div>

              <div className="chatFooterHint">
                {lang === "es"
                  ? "Respuestas rápidas, claras y a tu estilo."
                  : "Fast, clear recommendations tailored to you."}
              </div>

              <div style={{ marginTop: 12, textAlign: "center" }}>
                <a
                  href="/faq"
                  style={{
                    fontSize: 13,
                    opacity: 0.75,
                    textDecoration: "underline",
                  }}
                >
                  {copy.faqLink}
                </a>
              </div>
            </div>

            <div className="chatBottomIcons">
              <span />
              <span />
              <span />
            </div>
          </div>

          {/* Sponsor right */}
          <aside className="sponsorCard">
            <div className="sponsorLabel">{lang === "es" ? "PARTNER" : "SPONSOR"}</div>
            <div className="sponsorImg sponsorRight" />
            <div className="sponsorText">
              <div className="sponsorTitle">{lang === "es" ? "Reserva fácil" : "Easy booking"}</div>
              <div className="sponsorDesc">
                {lang === "es"
                  ? "Lugares top, sin perder tiempo buscando."
                  : "Top spots without endless searching."}
              </div>
            </div>
          </aside>
        </section>

        {/* Ad box (demo) */}
        <section className="adBox" style={{ marginTop: 16 }}>
          <div>{copy.adLabel}</div>
          <strong>{copy.adBox}</strong>
        </section>

        {/* Quick tiles */}
        <div className="sectionTitle" style={{ marginTop: 18 }}>
          {copy.cardsTitle}
        </div>

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

        {/* Partners row */}
        <section className="partnersRow">
          <span>Partner1</span>
          <span>Partner2</span>
          <span>Partner3</span>
          <span>Partner4</span>
        </section>
      </main>

      <WhatsAppFab />
    </>
  );
}