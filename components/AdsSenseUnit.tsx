"use client";

export default function AdSenseUnit({
  label = "Publicidad",
  height = 90,
}: {
  label?: string;
  height?: number;
}) {
  return (
    <div
      style={{
        border: "1px dashed rgba(0,0,0,.25)",
        borderRadius: 14,
        padding: 12,
        background: "rgba(255,255,255,.6)",
        minHeight: height,
      }}
    >
      <div style={{ fontSize: 12, opacity: 0.65 }}>{label}</div>
      <div style={{ marginTop: 6, fontWeight: 600 }}>Banner (AdSense)</div>
    </div>
  );
}
