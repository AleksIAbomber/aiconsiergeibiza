export type PriceTier = "€" | "€€" | "€€€" | "€€€€";

export type Seasonality = "all_year" | "summer" | "unknown";

export type PlaceType =
  | "restaurant"
  | "beach"
  | "beach_club"
  | "sunset_restaurant"
  | "cabaret_dinner"
  | "rooftop"
  | "fine_dining"
  | "activity"
  | "club"
  | "transport";

export type Place = {
  id: string;
  name: string;

  island: "ibiza" | "formentera";

  /**
   * IMPORTANTE:
   * Para MVP y datasets grandes, area debe ser string (flexible).
   * Más adelante lo convertimos a union de zonas “limpias”.
   */
  area: string;

  type: PlaceType[];
  price: PriceTier;
  seasonality: Seasonality;

  cuisine: string[];
  vibe: string[];
  features: string[];

  highlights: string[];

  validated: true;

  sources: string[];
};
