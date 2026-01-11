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
    seasonality: input.seasonality ?? "summer",
    validated: true,
    sources: input.sources ?? ["https://www.ibiza-spotlight.com/night/events/2025/07"],
  };
}

function club(
  name: string,
  area: string,
  vibe: string[],
  features: string[],
  highlights: string[]
): Place {
  return p({
      id: slugId(name),
      name,
      island: "ibiza",
      area,
      type: ["club"],
      price: "€€€€",
      cuisine: [],
      vibe,
      features,
      highlights,
      sources: [
          "https://www.ibiza-spotlight.com/night/events/2025/07",
          "https://www.ibiza-spotlight.com/night/events/2025/08",
          "https://www.ibiza-spotlight.com/night/events/2025/09",
      ],
      seasonality: "all_year"
  });
}

/**
 * Clubs Ibiza (MVP)
 * No line-ups; solo “vibe matching” (techno, open-air, mainstream, cabaret, etc.)
 */
export const DISCOS_ALL: Place[] = [
  club(
    "Hï Ibiza",
    "Playa d'en Bossa",
    ["tech_house", "mainstream", "big_production", "night"],
    ["lgbt_friendly"],
    ["Producción top", "Muy alta energía", "Ideal para noche"]
  ),
  club(
    "Ushuaïa Ibiza",
    "Playa d'en Bossa",
    ["open_air", "mainstream", "day_to_night"],
    ["open_air"],
    ["Open-air icónico", "Tardeo y noche", "Perfecto si quieres show grande"]
  ),
  club(
    "Amnesia",
    "San Rafael",
    ["techno", "classic", "night"],
    ["iconic"],
    ["Clásico de Ibiza", "Techno y noches largas", "Ambiente clubbing puro"]
  ),
  club(
    "Pacha Ibiza",
    "Ibiza Town",
    ["iconic", "house", "night"],
    ["iconic", "lgbt_friendly"],
    ["Icono histórico", "Muy Ibiza", "Buena mezcla de públicos"]
  ),
  club(
    "DC10",
    "San Jordi",
    ["underground", "techno", "raw"],
    ["underground"],
    ["Más underground", "Para amantes techno", "Vibe clubbing auténtico"]
  ),
  club(
    "Lío Ibiza",
    "Marina Botafoch",
    ["cabaret", "party_dinner", "night"],
    ["lgbt_friendly", "dressy_optional"],
    ["Restaurante-cabaret + fiesta", "Más social y elegante", "Muy ‘night out’"]
  ),
  club(
    "Eden Ibiza",
    "San Antonio",
    ["club", "night", "uk_friendly"],
    ["uk_friendly"],
    ["Muy popular para público UK", "Buena opción si estás en San Antonio"]
  ),
  club(
    "Es Paradis",
    "San Antonio",
    ["club", "night", "classic", "uk_friendly"],
    ["uk_friendly"],
    ["Clásico en San Antonio", "Público UK", "Ambiente de club tradicional"]
  ),
];