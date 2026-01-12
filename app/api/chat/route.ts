import { renderConciergeReply } from "@/lib/renderConciergeReply";
import { NextResponse } from "next/server";
import { detectIntent, pickRecommendations } from "@/lib/recommender";
import type { Place } from "@/data/places.types";
import OpenAI from "openai";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

type ClientBody = {
  lang: string;
  messages: { role: "system" | "user" | "assistant"; content: string }[];
  seenIds?: string[];
};

function formatPlace(p: Place) {
  const tags = [
    p.price,
    ...p.type,
    ...p.vibe.slice(0, 3),
    ...p.features.slice(0, 3),
    p.area ? `zona: ${p.area}` : "",
  ]
    .filter(Boolean)
    .join(" · ");

  const why = p.highlights?.slice(0, 2).join(" / ") || "";
  return `- ${p.name} (${tags})${why ? ` — ${why}` : ""}`;
}
export async function GET() {
  return Response.json({ ok: true, route: "/api/chat" });
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ClientBody;
    const lang = body.lang ?? "es";
    const lastUser = [...body.messages].reverse().find((m) => m.role === "user")?.content ?? "";
    const intent = detectIntent(lastUser);

    const seen = new Set(body.seenIds ?? []);
    const recs = pickRecommendations(intent, lastUser, seen, 5);

    const recText =
  recs.length > 0
    ? [
        "Para lo que me comentas, estas son muy buenas opciones en Ibiza:",
        "",
        ...recs.map((p, i) => {
          const area = p.area ? ` en ${p.area}` : "";
          const why =
            p.highlights && p.highlights.length > 0
              ? ` Ideal porque ${p.highlights.slice(0, 2).join(" y ")}.`
              : "";
          return `${i + 1}. ${p.name}${area}.${why}`;
        }),
        "",
        "¿Quieres algo más animado o prefieres un ambiente tranquilo?"
      ].join("\n")
    : "Me falta un poco de información para recomendarte bien. ¿Es para tarde, noche o sunset?";

const reply = await renderConciergeReply({
  lang,
  userText: lastUser,
  places: recs.map((p) => ({
    id: p.id,
    name: p.name,
    area: p.area,
    highlights: p.highlights,
  })),
  missingQuestion:
    lang === "es"
      ? "Me falta un poco de información para recomendarte bien. ¿Es para tarde, noche o sunset?"
      : "One quick detail: is it for afternoon, night, or sunset?",
});

return Response.json({
  reply,
  usedIds: recs.map((r) => r.id),
});


    const system = `
Eres AIConsierge, concierge experto en Ibiza.
Reglas:
- Si el usuario pide restaurantes/playas/actividades/discotecas/transporte, prioriza SIEMPRE las recomendaciones de la base de datos interna.
- No inventes locales; si falta info, haz 1 pregunta corta y concreta y luego recomienda.
- Estilo: humano, claro, directo. Máximo 6-10 líneas.
- Si el usuario pide LGBT friendly, prioriza lugares con tag lgbt_friendly.
- Si el usuario pide underground/techno, prioriza clubs con tags techno/underground.
- Evita repetir siempre la misma recomendación: si ya se sugirió, propone alternativas distintas.
`;

    const messages = [
      { role: "system" as const, content: system },
      ...body.messages,
      {
        role: "system" as const,
        content: recText,
      },
    ];

    const completion = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      temperature: 0.7,
      messages,
    });

    const content = completion.choices[0]?.message?.content ?? "No response.";
    const newSeen = [...seen, ...recs.map((r) => r.id)];

    return NextResponse.json({ content, intent, used: recs.map((r) => r.name), seenIds: newSeen });
  } catch (err: any) {
    return NextResponse.json(
      { error: "chat_api_error", message: err?.message ?? String(err) },
      { status: 500 }
    );
  }
}