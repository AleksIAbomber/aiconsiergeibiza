import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AICONSIERGE Ibiza",
    short_name: "AICONSIERGE",
    description: "Tu concierge virtual para Ibiza. Recomendaciones rápidas, humanas y útiles.",
    start_url: "/",
    display: "standalone",
    background_color: "#f3efe6",
    theme_color: "#111111",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
