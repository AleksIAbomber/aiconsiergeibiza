"use client";

export default function VideoAdGate({
  open,
  onClose,
  onContinue,
}: {
  open: boolean;
  onClose: () => void;
  onContinue: () => void;
}) {
  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.55)",
        display: "grid",
        placeItems: "center",
        zIndex: 9999,
        padding: 16,
      }}
    >
      <div
        style={{
          width: "min(720px, 100%)",
          background: "#fff",
          borderRadius: 18,
          overflow: "hidden",
          border: "1px solid rgba(0,0,0,.15)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 12,
            background: "#f6f1e7",
          }}
        >
          <div style={{ fontWeight: 700 }}>Anuncio corto (demo)</div>
          <button
            onClick={onClose}
            style={{
              border: "none",
              background: "transparent",
              fontSize: 18,
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        </div>

        <div style={{ padding: 12 }}>
          <div
            style={{
              aspectRatio: "16/9",
              background: "#111",
              borderRadius: 12,
              display: "grid",
              placeItems: "center",
              color: "#fff",
              fontWeight: 600,
            }}
          >
            VIDEO AD (placeholder)
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
            <button
              onClick={onContinue}
              style={{
                flex: 1,
                background: "#111",
                color: "#fff",
                border: "none",
                borderRadius: 12,
                padding: "12px 14px",
                cursor: "pointer",
                fontWeight: 700,
              }}
            >
              Continuar al chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
