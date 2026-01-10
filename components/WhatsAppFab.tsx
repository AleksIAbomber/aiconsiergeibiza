"use client";

import React from "react";

export default function WhatsAppFab() {
  const num = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";
  const href = num
    ? `https://wa.me/${num}?text=${encodeURIComponent(
        "Hola! Quiero anunciar mi negocio en AICONSIERGE Ibiza. ¿Me pasas opciones y precios?"
      )}`
    : "#";

  return (
    <a
      className="waFab"
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Anúnciate aquí por WhatsApp"
      title="Anúnciate aquí"
      onClick={(e) => {
        if (!num) {
          e.preventDefault();
          alert("Falta NEXT_PUBLIC_WHATSAPP_NUMBER en .env.local");
        }
      }}
    >
      <div className="waFabInner">
        <div className="waFabTitle">Anúnciate aquí</div>
        <div className="waFabSub">Partnership</div>
      </div>
    </a>
  );
}
