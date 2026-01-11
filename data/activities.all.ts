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
    sources: input.sources ?? ["https://www.ibiza-spotlight.com/things-to-do"],
  };
}

function act(
  name: string,
  area: string,
  vibe: string[],
  features: string[],
  highlights: string[],
  price: Place["price"] = "€€"
): Place {
  return p({
      id: slugId(name),
      name,
      island: "ibiza",
      area,
      type: ["activity"],
      price,
      cuisine: [],
      vibe,
      features,
      highlights,
      sources: ["https://www.ibiza-spotlight.com/things-to-do"],
      seasonality: "all_year"
  });
}

/**
 * Activities Ibiza (MVP)
 * Basadas en el hub de “things to do” de Ibiza Spotlight (categorías: tours, cultura, arte, naturaleza, etc.).
 */
export const ACTIVITIES_ALL: Place[] = [
  act(
    "Sunset boat trip (West Coast)",
    "San Antonio",
    ["romantic", "sunset", "scenic"],
    ["boat", "photo_spots"],
    ["Atardecer desde el mar", "Ideal para parejas o grupos", "Plan muy Ibiza"],
    "€€€"
  ),
  act(
    "Day boat charter (private)",
    "Ibiza Town",
    ["luxury", "exclusive"],
    ["boat", "private"],
    ["Plan premium", "Personalizable", "Ideal para grupos"],
    "€€€€"
  ),
  act(
    "Snorkeling in calas (guided)",
    "San José",
    ["nature", "active"],
    ["snorkeling", "guided"],
    ["Aguas claras", "Ideal si te gusta explorar", "Buen plan de mañana"],
    "€€"
  ),
  act(
    "Kayak / SUP route (guided)",
    "Santa Eulalia",
    ["active", "nature"],
    ["kayak", "sup", "guided"],
    ["Plan físico suave", "Ver calas desde el agua", "Ideal en grupo o pareja"],
    "€€"
  ),
  act(
    "Dalt Vila walking (Ibiza Old Town)",
    "Ibiza Town",
    ["culture", "history", "scenic"],
    ["walking", "photo_spots"],
    ["Paseo histórico", "Muy fotogénico", "Perfecto al atardecer"],
    "€"
  ),
  act(
    "Hippie Market visit (Las Dalias / Punta Arabí)",
    "Other",
    ["bohemian", "shopping", "daytime"],
    ["market", "souvenirs"],
    ["Mercados famosos", "Ambiente bohemio", "Plan de día"],
    "€"
  ),
  act(
    "Sunset viewpoint: Es Vedrà",
    "Es Cubells",
    ["sunset", "scenic", "nature"],
    ["photo_spots"],
    ["Uno de los sunset spots más icónicos", "Vistas increíbles", "Ir con tiempo"],
    "€"
  ),
  act(
    "Yoga / wellness session",
    "Santa Gertrudis",
    ["wellness", "relax"],
    ["yoga"],
    ["Plan tranquilo", "Ideal para recuperar energía", "Bueno para mañanas"],
    "€€"
  ),
  act(
    "Ibiza markets & local villages tour",
    "Other",
    ["culture", "local"],
    ["guided", "daytime"],
    ["Descubrir pueblos", "Plan relajado", "Ideal familia"],
    "€€"
  ),
  act(
    "Scenic drive: North coast beaches route",
    "Portinatx",
    ["nature", "scenic"],
    ["roadtrip"],
    ["Norte más salvaje", "Menos masificado", "Perfecto si quieres tranquilidad"],
    "€"
  ),
];