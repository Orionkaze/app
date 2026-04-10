import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMugHot } from "@fortawesome/free-solid-svg-icons";

export function EmptyState() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "48px 24px",
      textAlign: "center",
      backgroundColor: "var(--color-bg-secondary)",
      borderRadius: "var(--radius-md)",
      border: "1px dashed var(--color-border)",
      marginTop: "24px",
    }}>
      <FontAwesomeIcon icon={faMugHot} style={{ fontSize: "48px", color: "var(--color-pink-900)", marginBottom: "16px" }} />
      <h3 style={{ fontSize: "18px", fontWeight: 600, color: "var(--color-text-primary)", marginBottom: "8px" }}>
        Discover local loyalty
      </h3>
      <p style={{ fontSize: "14px", color: "var(--color-text-secondary)", maxWidth: "260px" }}>
        Find businesses near you and start earning premium rewards. We couldn't find any right now!
      </p>
    </div>
  );
}
