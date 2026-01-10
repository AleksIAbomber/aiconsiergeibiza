import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE_NAME = "AICONSIERGE Ibiza";
const SITE_DESC =
  "Tu concierge virtual para Ibiza: restaurantes, playas, fiesta y barco. Recomendaciones rápidas, humanas y útiles.";
const SITE_URL = "https://aiconsiergeibiza.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESC,
  applicationName: SITE_NAME,
  keywords: [
    "Ibiza",
    "concierge Ibiza",
    "planes Ibiza",
    "restaurantes Ibiza",
    "playas Ibiza",
    "discotecas Ibiza",
    "boat party Ibiza",
    "AI concierge",
    "AICONSIERGE",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: SITE_NAME,
    description: SITE_DESC,
    siteName: SITE_NAME,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "AICONSIERGE Ibiza",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESC,
    images: ["/og.png"],
  },
  icons: {
    icon: [{ url: "/favicon.ico" }],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#111111",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
