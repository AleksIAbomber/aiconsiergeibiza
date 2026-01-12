import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "InfoPoint Ibiza | Qué hacer en Ibiza hoy",
  description:
    "InfoPoint Ibiza te recomienda restaurantes, playas, discotecas y planes en Ibiza según tu presupuesto, horario y estilo.",
  keywords: [
    "Ibiza",
    "qué hacer en Ibiza",
    "restaurantes Ibiza",
    "playas Ibiza",
    "discotecas Ibiza",
    "Ibiza concierge",
  ],
  openGraph: {
    title: "InfoPoint Ibiza",
    description:
      "Tu punto de información inteligente de Ibiza con recomendaciones reales y personalizadas.",
    url: "https://infopointibiza.com",
    siteName: "InfoPoint Ibiza",
    locale: "es_ES",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}