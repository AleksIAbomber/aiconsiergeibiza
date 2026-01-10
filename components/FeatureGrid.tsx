"use client";

const items = [
  { title: "Restaurantes", desc: "Romántico, vegano, sushi, lujo o barato." },
  { title: "Playas", desc: "Tranquilas, bonitas, fiesteras, parking y vibe." },
  { title: "Fiesta", desc: "Clubs, entradas, dress code y energía." },
  { title: "Barco", desc: "Sunset, party boat, calas y experiencias." },
];

export default function FeatureGrid() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 12,
      }}
    >
      {items.map((x) => (
        <div
          key={x.title}
          style={{
            background: "rgba(255,255,255,.65)",
            border: "1px solid rgba(0,0,0,.10)",
            borderRadius: 18,
            padding: 14,
          }}
        >
          <div style={{ fontWeight: 800, marginBottom: 6 }}>{x.title}</div>
          <div style={{ fontSize: 14, opacity: 0.75, lineHeight: 1.45 }}>
            {x.desc}
          </div>
        </div>
      ))}
    </div>
  );
}
