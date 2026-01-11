import type { Place } from "./places.types";

function p(input: Omit<Place, "validated"> & Partial<Pick<Place, "seasonality" | "sources">>): Place {
  return {
    ...input,
    seasonality: input.seasonality ?? "unknown",
    validated: true,
    sources: input.sources ?? ["https://www.ibiza-spotlight.com/restaurant_guide_i.htm"],
  };
}

export const RESTAURANTS_ALL: Place[] = [

/* =====================================================
   1) LUXURY / FINE DINING / MICHELIN
===================================================== */
p({
    id: "la-gaia", name: "La Gaia", island: "ibiza", area: "Ibiza Town", type: ["restaurant", "fine_dining"], price: "€€€€", cuisine: ["Mediterranean", "Gourmet"], vibe: ["luxury", "gourmet"], features: [], highlights: ["Fine dining Michelin", "Alta gastronomía"],
    seasonality: "all_year",
    sources: []
}),
p({
    id: "es-tragon", name: "Es Tragón", island: "ibiza", area: "San Antonio", type: ["restaurant", "fine_dining"], price: "€€€€", cuisine: ["Creative"], vibe: ["gourmet", "exclusive"], features: [], highlights: ["Michelin", "Alta cocina creativa"],
    seasonality: "all_year",
    sources: []
}),
p({
    id: "1742", name: "1742", island: "ibiza", area: "Ibiza Town", type: ["restaurant", "fine_dining"], price: "€€€€", cuisine: ["Gourmet"], vibe: ["luxury", "exclusive"], features: [], highlights: ["Experiencia gastronómica", "Muy exclusivo"],
    seasonality: "all_year",
    sources: []
}),
p({
    id: "jondal", name: "Jondal", island: "ibiza", area: "Porroig", type: ["restaurant", "fine_dining"], price: "€€€€", cuisine: ["Seafood"], vibe: ["luxury", "exclusive"], features: ["sea_view"], highlights: ["Marisco premium", "Clientela high-end"],
    seasonality: "all_year",
    sources: []
}),

/* =====================================================
   2) BEACH CLUBS / SEAFRONT
===================================================== */
p({
    id: "blue-marlin", name: "Blue Marlin Ibiza", island: "ibiza", area: "Cala Jondal", type: ["restaurant", "beach_club"], price: "€€€€", cuisine: ["Mediterranean", "Seafood"], vibe: ["luxury", "tardeo", "beach"], features: ["sea_view", "music", "lgbt_friendly"], highlights: ["Tardeo potente", "Beach club icónico"],
    seasonality: "all_year",
    sources: []
}),
p({
    id: "nassau", name: "Nassau Beach Club", island: "ibiza", area: "Playa d'en Bossa", type: ["restaurant", "beach_club"], price: "€€€€", cuisine: ["Mediterranean"], vibe: ["luxury", "beach"], features: ["sea_view", "music"], highlights: ["Ambiente premium", "Clientela internacional"],
    seasonality: "all_year",
    sources: []
}),
p({
    id: "cotton", name: "Cotton Beach Club", island: "ibiza", area: "Cala Tarida", type: ["restaurant", "beach_club"], price: "€€€€", cuisine: ["Mediterranean"], vibe: ["luxury", "sunset"], features: ["sea_view"], highlights: ["Vistas top", "Muy elegante"],
    seasonality: "all_year",
    sources: []
}),
p({
    id: "amante", name: "Amante", island: "ibiza", area: "Sol d'en Serra", type: ["restaurant", "beach_club"], price: "€€€€", cuisine: ["Mediterranean"], vibe: ["romantic", "luxury"], features: ["sea_view"], highlights: ["Escenario espectacular", "Citas y ocasiones especiales"],
    seasonality: "all_year",
    sources: []
}),

/* =====================================================
   3) SUNSET / TARDEO
===================================================== */
p({
    id: "cafe-mambo", name: "Café Mambo", island: "ibiza", area: "San Antonio", type: ["restaurant", "sunset_restaurant"], price: "€€€", cuisine: ["Mediterranean"], vibe: ["sunset", "tardeo"], features: ["sea_view", "music"], highlights: ["Sunset clásico", "Pre-noche"],
    seasonality: "all_year",
    sources: []
}),
p({
    id: "cafe-del-mar", name: "Café del Mar", island: "ibiza", area: "San Antonio", type: ["restaurant", "sunset_restaurant"], price: "€€€", cuisine: ["Mediterranean"], vibe: ["sunset", "iconic"], features: ["sea_view", "music"], highlights: ["Icono mundial", "Atardecer"],
    seasonality: "all_year",
    sources: []
}),
p({
    id: "experimental-beach", name: "Experimental Beach", island: "ibiza", area: "Cap des Falcó", type: ["restaurant", "sunset_restaurant"], price: "€€€", cuisine: ["Mediterranean"], vibe: ["sunset", "chill"], features: ["sea_view"], highlights: ["Atardecer tranquilo", "Menos masificado"],
    seasonality: "all_year",
    sources: []
}),

/* =====================================================
   4) PARTY DINNER / CABARET
===================================================== */
p({
    id: "lio", name: "Lío Ibiza", island: "ibiza", area: "Marina Botafoch", type: ["restaurant", "cabaret_dinner"], price: "€€€€", cuisine: ["Mediterranean"], vibe: ["cabaret", "luxury", "party_dinner"], features: ["music", "lgbt_friendly"], highlights: ["Cena + espectáculo", "Muy internacional"],
    seasonality: "all_year",
    sources: []
}),
p({
    id: "pacha-restaurant", name: "Pacha Restaurant", island: "ibiza", area: "Marina Botafoch", type: ["restaurant"], price: "€€€€", cuisine: ["Mediterranean"], vibe: ["party_dinner"], features: ["music"], highlights: ["Antes de discoteca", "Flujo noche"],
    seasonality: "all_year",
    sources: []
}),

/* =====================================================
   5) FAMILY / KIDS FRIENDLY
===================================================== */
p({
    id: "beachouse", name: "Beachouse Ibiza", island: "ibiza", area: "Playa d'en Bossa", type: ["restaurant", "beach_club"], price: "€€€", cuisine: ["Mediterranean"], vibe: ["family", "relaxed"], features: ["sea_view", "kids_friendly"], highlights: ["Familias", "Ambiente tranquilo"],
    seasonality: "all_year",
    sources: []
}),
p({
    id: "sa-caleta", name: "Sa Caleta", island: "ibiza", area: "San José", type: ["restaurant"], price: "€€€", cuisine: ["Seafood"], vibe: ["family", "traditional"], features: ["sea_view", "kids_friendly"], highlights: ["Pescado fresco", "Clásico ibicenco"],
    seasonality: "all_year",
    sources: []
}),

/* =====================================================
   6) LOCAL / TRADITIONAL
===================================================== */
p({
    id: "can-pujol", name: "Can Pujol", island: "ibiza", area: "San Antonio", type: ["restaurant"], price: "€€€", cuisine: ["Seafood", "Ibicenco"], vibe: ["local", "traditional"], features: ["sea_view"], highlights: ["Muy auténtico", "Producto top"],
    seasonality: "all_year",
    sources: []
}),
p({
    id: "can-domingo", name: "Can Domingo", island: "ibiza", area: "San José", type: ["restaurant"], price: "€€€", cuisine: ["Mediterranean"], vibe: ["local", "romantic"], features: [], highlights: ["Encanto rural", "Cena tranquila"],
    seasonality: "all_year",
    sources: []
}),

/* =====================================================
   7) ITALIAN / PIZZA
===================================================== */
p({
    id: "las-dos-lunas", name: "Las Dos Lunas", island: "ibiza", area: "San Rafael", type: ["restaurant"], price: "€€€", cuisine: ["Italian"], vibe: ["romantic", "classic"], features: [], highlights: ["Italiano histórico", "Ambiente jardín"],
    seasonality: "all_year",
    sources: []
}),
p({
    id: "es-tanco", name: "Es Tancó", island: "ibiza", area: "Sant Jordi", type: ["restaurant"], price: "€€", cuisine: ["Pizza", "Italian"], vibe: ["casual"], features: [], highlights: ["Pizza fiable", "Buen precio"],
    seasonality: "all_year",
    sources: []
}),

/* =====================================================
   8) ASIAN / SUSHI
===================================================== */
p({
    id: "nobu", name: "Nobu Ibiza Bay", island: "ibiza", area: "Talamanca", type: ["restaurant", "fine_dining"], price: "€€€€", cuisine: ["Japanese", "Fusion"], vibe: ["luxury", "gourmet"], features: ["lgbt_friendly"], highlights: ["Sushi de lujo", "Marca internacional"],
    seasonality: "all_year",
    sources: []
}),
p({
    id: "minami", name: "Minami", island: "ibiza", area: "Playa d'en Bossa", type: ["restaurant"], price: "€€€€", cuisine: ["Japanese"], vibe: ["night_out"], features: [], highlights: ["Pre-party sushi", "Moderno"],
    seasonality: "all_year",
    sources: []
}),

/* =====================================================
   9) VEGAN / HEALTHY
===================================================== */
p({
    id: "aubergine", name: "Aubergine", island: "ibiza", area: "Santa Gertrudis", type: ["restaurant"], price: "€€€", cuisine: ["Vegetarian", "Mediterranean"], vibe: ["healthy", "romantic"], features: [], highlights: ["Cocina natural", "Muy cuidada"],
    seasonality: "all_year",
    sources: []
}),
p({
    id: "wild-beets", name: "Wild Beets", island: "ibiza", area: "Santa Gertrudis", type: ["restaurant"], price: "€€", cuisine: ["Vegan", "Healthy"], vibe: ["healthy", "casual"], features: [], highlights: ["Vegano", "Muy popular"],
    seasonality: "all_year",
    sources: []
}),

/* =====================================================
   10) BRUNCH / CAFÉ
===================================================== */
p({
    id: "passion", name: "Passion Café", island: "ibiza", area: "Multiple", type: ["restaurant"], price: "€€", cuisine: ["Healthy", "Brunch"], vibe: ["casual", "daytime"], features: [], highlights: ["Desayunos y brunch", "Varias ubicaciones"],
    seasonality: "all_year",
    sources: []
}),

/* =====================================================
   11) STEAK / GRILL
===================================================== */
p({
    id: "cas-costas", name: "Cas Costas Grill", island: "ibiza", area: "Sant Jordi", type: ["restaurant"], price: "€€€", cuisine: ["Grill", "Meat"], vibe: ["classic", "family"], features: [], highlights: ["Carne top", "Muy fiable"],
    seasonality: "all_year",
    sources: []
}),

/* =====================================================
   12) TAPAS / SPANISH
===================================================== */
p({
    id: "can-terra", name: "Can Terra", island: "ibiza", area: "Ibiza Town", type: ["restaurant"], price: "€€", cuisine: ["Tapas", "Spanish"], vibe: ["casual", "local"], features: [], highlights: ["Tapas auténticas", "Centro"],
    seasonality: "all_year",
    sources: []
}),
p({
    id: "la-brasa", name: "La Brasa", island: "ibiza", area: "Ibiza Town", type: ["restaurant"], price: "€€€", cuisine: ["Mediterranean"], vibe: ["romantic"], features: [], highlights: ["Patio bonito", "Clásico"],
    seasonality: "all_year",
    sources: []
}),

];
