import React from "react";

export default function Loading() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "24px" }}>
      {[1, 2, 3].map((i) => (
        <div key={i} style={{
          padding: "16px",
          borderRadius: "var(--radius-lg)",
          backgroundColor: "var(--color-bg-secondary)",
          borderLeft: "4px solid var(--color-border-pink)",
          animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        }}>
          <div style={{ display: "flex", gap: "16px", alignItems: "center", marginBottom: "16px" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "50%", backgroundColor: "var(--color-border)" }} />
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
              <div style={{ height: "16px", width: "50%", backgroundColor: "var(--color-border)", borderRadius: "4px" }} />
              <div style={{ height: "12px", width: "30%", backgroundColor: "var(--color-border)", borderRadius: "4px" }} />
            </div>
          </div>
          <div style={{ height: "8px", width: "100%", backgroundColor: "var(--color-border)", borderRadius: "4px" }} />
        </div>
      ))}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: .5; }
        }
      `}</style>
    </div>
  );
}
