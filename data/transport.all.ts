import type { Place } from "./places.types";

function slugId(name: string) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function transport(
  name: string,
  area: string,
  price: Place["price"],
  vibe: string[],
  features: string[],
  highlights: string[],
  seasonality: Place["seasonality"] = "all_year",
  sources: string[] = []
): Place {
  return {
    id: slugId(name),
    name,
    island: "ibiza",
    area,
    type: ["activity"], // usamos "activity" como categoría genérica para MVP (luego si quieres creamos "transport")
    price,
    seasonality,
    cuisine: [],
    vibe,
    features,
    highlights,
    validated: true,
    sources,
  };
}

/**
 * TRANSPORT Ibiza (MVP)
 * Objetivo: información práctica + conexiones principales.
 * NO guardamos horarios exactos (cambian por temporada).
 * Luego conectamos a fuentes oficiales si quieres.
 */
export const TRANSPORT_ALL: Place[] = [
  // ===== TAXI (general) =====
  transport(
    "Taxi en Ibiza (consejos rápidos)",
    "Ibiza Town",
    "€€€",
    ["taxi", "practical"],
    ["24h_in_season", "cash_or_card"],
    [
      "En temporada alta hay mucha demanda: pide taxi con antelación si puedes.",
      "Usa paradas oficiales (aeropuerto, puertos, centros) para reducir espera.",
      "De noche y a la salida de clubs, la espera puede ser larga: sal antes o reserva traslado si el plan es ajustado.",
      "Asegura punto de recogida claro (pin/ubicación) y confirma el destino.",
    ],
    "all_year"
  ),

  // ===== BUS (general) =====
  transport(
    "Autobuses en Ibiza (cómo usarlo)",
    "Ibiza Town",
    "€",
    ["bus", "practical", "budget"],
    ["all_year", "summer_more_frequent"],
    [
      "En verano suelen aumentar frecuencias y hay más opciones nocturnas en zonas turísticas.",
      "Rutas principales conectan Ibiza Town con Aeropuerto, San Antonio y Santa Eulalia (según temporada).",
      "Para planes de playa/remotos: revisa última salida para no quedarte tirado.",
    ],
    "all_year"
  ),

  // ===== CONEXIONES PRINCIPALES (sin horarios, solo “qué conecta con qué”) =====
  transport(
    "Conexión: Aeropuerto ↔ Ibiza Town",
    "Ibiza Town",
    "€",
    ["bus", "airport", "essential"],
    ["all_year", "frequent_in_summer"],
    [
      "Ruta clave para llegar a la isla sin coche.",
      "En temporada suele haber más frecuencia.",
      "Alternativa: taxi directo si vas con maletas / llegas tarde.",
    ],
    "all_year"
  ),
  transport(
    "Conexión: Ibiza Town ↔ San Antonio",
    "San Antonio",
    "€",
    ["bus", "essential"],
    ["all_year", "summer_more_frequent"],
    [
      "Conecta la capital con la zona oeste (sunset/tardeo).",
      "En verano suele haber más frecuencia y servicios extra.",
    ],
    "all_year"
  ),
  transport(
    "Conexión: Ibiza Town ↔ Santa Eulalia",
    "Santa Eulalia",
    "€",
    ["bus", "essential"],
    ["all_year", "summer_more_frequent"],
    [
      "Conexión importante hacia el este (zona más familiar y tranquila).",
      "En verano suele reforzarse.",
    ],
    "all_year"
  ),
  transport(
    "Conexión: San Antonio ↔ Cala Bassa / Cala Conta (zona playas oeste)",
    "San Antonio",
    "€",
    ["bus", "beach", "summer"],
    ["summer_only_or_more_frequent"],
    [
      "En temporada suelen existir buses lanzadera o rutas reforzadas a calas populares del oeste.",
      "Si vas tarde, valora taxi o coche para no depender del último bus.",
    ],
    "summer"
  ),

  // ===== TRUCOS DE MOVILIDAD (útiles para concierge) =====
  transport(
    "Consejo: salir de un club (Hï, Ushuaïa, Amnesia, DC10)",
    "Playa d'en Bossa",
    "€€€",
    ["night_out", "taxi"],
    ["peak_hours"],
    [
      "A la salida hay picos fuertes: si tu plan es ajustado, intenta salir 10–20 min antes del cierre o acordar punto exacto.",
      "Considera transfer privado si sois grupo grande o queréis cero espera.",
    ],
    "summer"
  ),
];