import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://aiconsiergeibiza.com/sitemap.xml",
    host: "https://aiconsiergeibiza.com",
  };
}
