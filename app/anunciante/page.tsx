"use client";

import { useMemo } from "react";

export default function AnunciatePage() {
  const phone = "34673057966";
  const waBase = `https://wa.me/${phone}`;
  const waLink = (pack: string) =>
    `${waBase}?text=${encodeURIComponent(
      `Hola, quiero anunciar mi negocio en AiConsierge Ibiza. Me interesa el paquete: ${pack}. Mi negocio es: ____ (restaurante/club/barco/actividad). Zona: ____. Fechas: ____.`
    )}`;

  const packs = useMemo(
    () => [
      {
        name: "Starter Local",
        price: "149€/mes (399€/3 meses)",
        items: ["Rotación en Sponsors", "Banner discreto", "Enlace oficial", "Reporte mensual básico"],
      },
      {
        name: "Premium Placement",
        price: "299€/mes (799€/3 meses)",
        items: ["Placement premium", "Card destacada", "1 cambio/mes", "Reporte mensual completo"],
      },
      {
        name: "Video Gate Sponsor",
        price: "499€/mes (1.299€/3 meses)",
        items: ["Vídeo 3–6s en botón", "CTA a tu web/WhatsApp", "Opción exclusividad", "Reporte mensual"],
      },
      {
        name: "Chat Sponsor Contextual",
        price: "349€/mes (999€/3 meses)",
        items: ["Recomendación contextual", "Máx 1 por conversación", "Solo si encaja", "Transparencia 'Patrocinado'"],
      },
    ],
    []
  );

  return (
    <div className="container">
      <div className="hero">
        <h1>Anúnciate en AiConsierge Ibiza</h1>
        <p>
          Accede a usuarios con intención real: buscan restaurantes, playas, fiesta y experiencias en Ibiza.
          Publicidad elegante, no invasiva y medible.
        </p>

        <div className="ctaRow" style={{ marginTop: 10 }}>
          <a className="btnPrimary" href={waLink("Consulta general")} target="_blank" rel="noreferrer">
            Hablar por WhatsApp
          </a>
          <a className="btnGhost" href="/">
            Volver a Home
          </a>
        </div>

        <div style={{ marginTop: 14, fontSize: 13, color: "rgba(17,17,17,0.72)" }}>
          Beta lanzamiento: reportamos métricas reales y optimizamos. Sin permanencia si no ves valor.
        </div>
      </div>

      <div className="cards" style={{ marginTop: 14 }}>
        {packs.map((p) => (
          <div key={p.name} className="card" style={{ cursor: "default" }}>
            <div className="cardTitle">{p.name}</div>
            <div className="cardMeta" style={{ marginBottom: 10 }}>
              <strong>{p.price}</strong>
            </div>
            <ul style={{ margin: 0, paddingLeft: 18, color: "rgba(17,17,17,0.78)", lineHeight: 1.45 }}>
              {p.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>

            <div className="ctaRow" style={{ marginTop: 12 }}>
              <a className="btnPrimary" href={waLink(p.name)} target="_blank" rel="noreferrer">
                Solicitar este paquete
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="hero" style={{ marginTop: 14 }}>
        <div style={{ fontWeight: 800, marginBottom: 8 }}>Qué necesito de ti</div>
        <ul style={{ margin: 0, paddingLeft: 18, color: "rgba(17,17,17,0.78)", lineHeight: 1.45 }}>
          <li>Logo o banner (PNG/JPG)</li>
          <li>Si eliges vídeo: MP4 (3–6s)</li>
          <li>Texto corto (máx 120 caracteres) + oferta</li>
          <li>Enlace destino (web, WhatsApp, reservas)</li>
        </ul>
      </div>
    </div>
  );
}
