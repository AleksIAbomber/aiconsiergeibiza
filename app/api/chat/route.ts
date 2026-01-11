import { NextResponse } from "next/server";
import { detectIntent, pickRecommendations } from "@/lib/recommender";
import type { Place } from "@/data/places.types";
import OpenAI from "openai";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

type ClientBody = {
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

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ClientBody;

    const lastUser = [...body.messages].reverse().find((m) => m.role === "user")?.content ?? "";
    const intent = detectIntent(lastUser);

    const seen = new Set(body.seenIds ?? []);
    const recs = pickRecommendations(intent, lastUser, seen, 5);

    const recText =
      recs.length > 0
        ? `RECOMENDACIONES (desde base de datos interna):\n${recs.map(formatPlace).join("\n")}`
        : `No tengo suficientes datos para recomendar con seguridad.`;

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