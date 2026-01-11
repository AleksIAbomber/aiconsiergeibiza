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

function p(input: Omit<Place, "validated"> & Partial<Pick<Place, "seasonality" | "sources">>): Place {
  return {
    ...input,
    seasonality: input.seasonality ?? "all_year",
    validated: true,
    sources: input.sources ?? ["https://www.ibiza-spotlight.com/beaches_i.htm"],
  };
}

function beach(
  name: string,
  area: string,
  vibe: string[],
  features: string[],
  highlights: string[],
  price: Place["price"] = "€"
): Place {
  return p({
      id: slugId(name),
      name,
      island: "ibiza",
      area,
      type: ["beach"],
      price,
      cuisine: [],
      vibe,
      features,
      highlights,
      sources: ["https://www.ibiza-spotlight.com/beaches_i.htm"],
      seasonality: "all_year"
  });
}

/**
 * Beaches Ibiza (MVP)
 * - Tags útiles para el concierge: party, family, hidden, snorkeling, sunset, easy_access, parking, etc.
 */
export const BEACHES_ALL: Place[] = [
  beach(
    "Cala Bassa",
    "San Antonio",
    ["crystal_water", "popular", "beach_day"],
    ["easy_access", "parking", "family_friendly"],
    ["Agua turquesa", "Muy buena para pasar el día", "Cala icónica en costa oeste"]
  ),
  beach(
    "Cala Conta (Platges de Comte)",
    "San Antonio",
    ["sunset", "scenic", "popular"],
    ["parking", "sunset_spot"],
    ["De las más bonitas", "Varias calitas en la zona", "Atardecer top"]
  ),
  beach(
    "Cala Tarida",
    "San José",
    ["family", "scenic"],
    ["easy_access", "parking"],
    ["Buena para familias", "Agua clara", "Acceso relativamente fácil"]
  ),
  beach(
    "Cala Saladeta",
    "San Antonio",
    ["scenic", "instagrammable", "popular"],
    ["hike_access"],
    ["Muy bonita", "Suele llenarse en temporada", "Recomendado ir temprano"]
  ),
  beach(
    "Cala Salada",
    "San Antonio",
    ["family", "popular"],
    ["parking", "easy_access"],
    ["Cala clásica", "Buen plan de día", "Suele tener buen ambiente"]
  ),
  beach(
    "Cala Gració",
    "San Antonio",
    ["family", "calm"],
    ["easy_access", "parking"],
    ["Tranquila", "Buena para ir en familia", "Ideal si no quieres demasiado ruido"]
  ),
  beach(
    "Cala Gracioneta",
    "San Antonio",
    ["romantic", "small_cove", "chill"],
    ["easy_access"],
    ["Pequeña y bonita", "Muy buen vibe para pareja", "Ideal para tarde tranquila"]
  ),
  beach(
    "Benirràs (Cala Benirrás)",
    "San Lorenzo",
    ["sunset", "bohemian", "iconic"],
    ["parking"],
    ["Famosa por el ambiente al atardecer", "Vibe bohemio", "Ir con tiempo en verano"]
  ),
  beach(
    "Cala d'Hort",
    "Es Cubells",
    ["scenic", "sunset", "nature"],
    ["parking"],
    ["Vistas a Es Vedrà", "Muy fotogénica", "Plan de tarde + atardecer"]
  ),
  beach(
    "Es Cavallet",
    "San José",
    ["lgbt_friendly", "beach_day"],
    ["parking"],
    ["Muy LGBTQ+ friendly", "Arena amplia", "Buen beach day"]
  ),
  beach(
    "Ses Salines",
    "San José",
    ["party", "popular", "beach_day"],
    ["parking", "music_nearby"],
    ["Zona muy conocida", "Ambiente animado en temporada", "Ideal si quieres beach con movimiento"]
  ),
  beach(
    "Cala Jondal",
    "San José",
    ["luxury", "beach_day"],
    ["parking", "beach_clubs_nearby"],
    ["Zona beach clubs", "Ambiente premium", "Ideal para tardeo con estilo"]
  ),
  beach(
    "Talamanca",
    "Ibiza Town",
    ["easy", "close_to_city", "family"],
    ["easy_access", "parking"],
    ["Cerca de Ibiza ciudad", "Cómoda si vas sin coche", "Buen plan tranquilo"]
  ),
  beach(
    "Figueretas",
    "Ibiza Town",
    ["easy", "close_to_city"],
    ["easy_access"],
    ["Práctica y céntrica", "Bien si estás por Ibiza Town", "Paseo marítimo agradable"]
  ),
  beach(
    "Playa d'en Bossa",
    "Playa d'en Bossa",
    ["party", "popular"],
    ["easy_access"],
    ["Larga y con mucho ambiente", "Beach clubs y hoteles", "Ideal si quieres movimiento"]
  ),
  beach(
    "Cala Llonga",
    "Santa Eulalia",
    ["family", "calm"],
    ["easy_access", "parking"],
    ["Bahía cómoda", "Buen acceso", "Ideal para familias"]
  ),
  beach(
    "Cala Nova",
    "Santa Eulalia",
    ["surf_vibe", "chill"],
    ["parking"],
    ["Vibe joven", "Bonita cala", "Buen plan de día tranquilo"]
  ),
  beach(
    "Aigües Blanques",
    "San Lorenzo",
    ["nature", "quiet", "scenic"],
    ["parking", "hike_access"],
    ["Naturaleza y tranquilidad", "Buen amanecer", "Mejor para desconectar"]
  ),
  beach(
    "Portinatx",
    "Portinatx",
    ["north", "scenic", "family"],
    ["parking"],
    ["Norte, más tranquilo", "Agua muy clara", "Buen plan si quieres escapar del sur"]
  ),
];