"use client";

export default function LogoCloud() {
  const tags = ["Ibiza ciudad", "San Antonio", "Santa Eulària", "Formentera"];
  return (
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
      {tags.map((t) => (
        <span
          key={t}
          style={{
            padding: "8px 12px",
            borderRadius: 999,
            background: "rgba(0,0,0,.06)",
            border: "1px solid rgba(0,0,0,.10)",
            fontSize: 13,
          }}
        >
          {t}
        </span>
      ))}
    </div>
  );
}
