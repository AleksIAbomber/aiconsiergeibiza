import type { Place } from "@/data/places.types";
import { DATASETS } from "@/data";

/**
 * Detecta intención (muy simple pero efectiva para MVP).
 */
export type Intent = "restaurant" | "beach" | "activity" | "club" | "transport" | "unknown";

export function detectIntent(text: string): Intent {
  const t = text.toLowerCase();

  if (/(taxi|uber|cabify|bus|autob[uú]s|linea|línea|parada|aeropuerto|airport|transfer)/.test(t)) return "transport";
  if (/(discoteca|club|fiesta|party|techno|house|entrada|ticket|djs|dj|after|tardeo)/.test(t)) return "club";
  if (/(playa|cala|beach|snorkel|arena|agua|sunset|atardecer|ba[ñn]o)/.test(t)) return "beach";
  if (/(actividad|excursi[oó]n|barco|boat|tour|yoga|mercado|market|kayak|sup|senderismo|ruta)/.test(t)) return "activity";
  if (/(restaurante|comer|cena|cenar|almuerzo|comida|brunch|desayuno|sushi|pizza|vegano|vegetariano|tapas)/.test(t)) return "restaurant";

  return "unknown";
}

/**
 * Extrae señales simples del texto.
 */
function hasAny(text: string, words: string[]) {
  const t = text.toLowerCase();
  return words.some((w) => t.includes(w));
}

type Signals = {
  wantsLuxury: boolean;
  wantsBudget: boolean;
  wantsSunset: boolean;
  wantsTechno: boolean;
  wantsFamily: boolean;
  wantsLgbt: boolean;
  wantsBeach: boolean;
  wantsRomantic: boolean;
};

export function extractSignals(text: string): Signals {
  const t = text.toLowerCase();
  return {
    wantsLuxury: hasAny(t, ["luxury", "lujo", "vip", "exclusivo", "premium"]),
    wantsBudget: hasAny(t, ["barato", "econ", "budget", "low cost", "€"]),
    wantsSunset: hasAny(t, ["sunset", "atardecer"]),
    wantsTechno: hasAny(t, ["techno", "underground"]),
    wantsFamily: hasAny(t, ["familia", "niños", "kids", "family"]),
    wantsLgbt: hasAny(t, ["lgbt", "gay", "lesb", "queer", "friendly"]),
    wantsBeach: hasAny(t, ["beach", "playa", "cala"]),
    wantsRomantic: hasAny(t, ["romant", "pareja", "couple"]),
  };
}

/**
 * Rotación controlada:
 * - Si el usuario ya vio algo, no lo repetimos.
 * - Si no, escogemos “variado” con un pseudo-random estable.
 */
export function pickRecommendations(
  intent: Intent,
  userText: string,
  seenIds: Set<string>,
  max = 5
): Place[] {
  const sig = extractSignals(userText);

  let pool: Place[] = [];
  if (intent === "restaurant") pool = DATASETS.restaurants;
  else if (intent === "beach") pool = DATASETS.beaches;
  else if (intent === "activity") pool = DATASETS.activities;
  else if (intent === "club") pool = DATASETS.discos;
  else if (intent === "transport") pool = DATASETS.transport;
  else pool = [...DATASETS.restaurants, ...DATASETS.beaches, ...DATASETS.activities, ...DATASETS.discos, ...DATASETS.transport];

  // 1) Filtrado básico por señales
  let filtered = pool.filter((x) => !seenIds.has(x.id));

  if (sig.wantsSunset) filtered = filtered.filter((x) => x.vibe.includes("sunset") || x.highlights.join(" ").toLowerCase().includes("atard"));
  if (sig.wantsFamily) filtered = filtered.filter((x) => x.vibe.includes("family") || x.features.includes("kids_friendly"));
  if (sig.wantsLgbt) filtered = filtered.filter((x) => x.features.includes("lgbt_friendly") || x.vibe.includes("lgbt_friendly"));
  if (sig.wantsTechno && intent === "club") filtered = filtered.filter((x) => x.vibe.includes("techno") || x.vibe.includes("underground"));
  if (sig.wantsLuxury) filtered = filtered.filter((x) => x.price === "€€€€" || x.vibe.includes("luxury"));
  if (sig.wantsBudget) filtered = filtered.filter((x) => x.price === "€" || x.price === "€€" || x.vibe.includes("good_value"));
  if (sig.wantsRomantic) filtered = filtered.filter((x) => x.vibe.includes("romantic") || x.highlights.join(" ").toLowerCase().includes("parej"));

  // 2) Diversity rules: no repetir “clones”
  // Evita devolver 3 opciones con misma cuisine principal y mismo “area”
  const picked: Place[] = [];
  const usedKeys = new Set<string>();

  // pseudo-random estable basado en texto
  const seed = hashToInt(userText);
  const shuffled = stableShuffle(filtered, seed);

  for (const item of shuffled) {
    const cuisineKey = (item.cuisine?.[0] ?? "none").toLowerCase();
    const key = `${item.area.toLowerCase()}|${cuisineKey}|${item.type.join(",")}`;

    // regla: máximo 1 por (area + cocina principal + tipo)
    if (usedKeys.has(key)) continue;

    picked.push(item);
    usedKeys.add(key);
    if (picked.length >= max) break;
  }

  // Si quedamos cortos, completa sin la regla de clones
  if (picked.length < max) {
    for (const item of shuffled) {
      if (picked.find((p) => p.id === item.id)) continue;
      picked.push(item);
      if (picked.length >= max) break;
    }
  }

  return picked;
}

function hashToInt(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) >>> 0;
  }
  return h;
}

function stableShuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  let s = seed || 1;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) >>> 0;
    const j = s % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}