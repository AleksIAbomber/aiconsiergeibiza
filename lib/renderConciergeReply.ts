import { openai } from "./openai";

type PlaceLite = {
  id: string;
  name: string;
  area?: string;
  highlights?: string[];
};

export async function renderConciergeReply(params: {
  lang: string;
  userText: string;
  places: PlaceLite[];
  missingQuestion?: string | null;
}) {
  const { lang, userText, places, missingQuestion } = params;

  // Si no hay recomendaciones, devolvemos una pregunta corta (sin OpenAI)
  if (places.length === 0) {
    return (
      missingQuestion ||
      (lang === "es"
        ? "Me falta un dato para afinar. ¿Prefieres zona (Ibiza Town / San Antonio / Santa Eulalia) y presupuesto por persona?"
        : "One quick detail: preferred area (Ibiza Town / San Antonio / Santa Eulalia) and budget per person?")
    );
  }

  const list = places
    .map((p, i) => {
      const area = p.area ? ` (${p.area})` : "";
      const why = (p.highlights || []).slice(0, 2).join(" · ");
      return `${i + 1}. ${p.name}${area}${why ? ` — ${why}` : ""}`;
    })
    .join("\n");

  const system =
    lang === "es"
      ? `Eres AIConcierge Ibiza. Redacta como un concierge humano (natural, cálido, directo).
REGLAS CRÍTICAS:
- NO inventes sitios. SOLO usa los de la lista.
- NO cambies nombres.
- Devuelve: 1 frase corta de intro + lista numerada (1..N) + 1 pregunta final para afinar.
- Si el usuario pide "atardecer", prioriza sunset / vistas / tardeo si aparece en highlights.
`
      : `You are AIConcierge Ibiza. Write like a human concierge (warm, natural, concise).
CRITICAL RULES:
- Do NOT invent places. Use ONLY the given list.
- Do NOT change names.
- Output: 1 short intro sentence + numbered list + 1 final question to refine.
`;

  const user =
    lang === "es"
      ? `Mensaje del usuario: "${userText}"
Lugares disponibles (no inventar):
${list}`
      : `User message: "${userText}"
Available places (do not invent):
${list}`;

  const resp = await openai.responses.create({
    model: "gpt-4.1-mini",
    input: [
      { role: "system", content: system },
      { role: "user", content: user },
    ],
  });

  // Texto final
  const text =
    resp.output_text?.trim() ||
    (lang === "es" ? "Perfecto. Aquí van mis opciones:" : "Great. Here are my picks:");

  return text;
}