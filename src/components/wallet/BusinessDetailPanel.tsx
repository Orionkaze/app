"use client";

import React from "react";
import type { WalletCardData } from "./LoyaltyCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faClock } from "@fortawesome/free-solid-svg-icons";

export function BusinessDetailPanel({ data }: { data: WalletCardData }) {
  // Mapping dynamic histories via iterations
  const mockHistoryList = Array.from({ length: Math.max(0, Math.min(data.visitCount, 5)) }).map((_, i) => ({
    id: i,
    date: new Date(Date.now() - (i * 86400000 * 3)).toLocaleDateString(), 
    type: i % 4 === 0 && i !== 0 ? "Reward Redeemed" : "Registered Visit",
  }));

  return (
    <div style={{ marginTop: "32px", display: "flex", flexDirection: "column", gap: "24px" }}>
      
      {/* Current Offer Status Section */}
      <div className="glass-panel" style={{ padding: "20px", borderRadius: "16px" }}>
        <h4 style={{ fontSize: "16px", fontWeight: 600, color: "var(--color-text-primary)", marginBottom: "8px" }}>
          Current Offer
        </h4>
        <p style={{ color: "var(--color-text-secondary)", fontSize: "14px", lineHeight: "1.5" }}>
          Unlocks after {data.targetVisits} total visits. Present this app in-store to claim.
        </p>
      </div>

      {/* History Log Section */}
      <div>
        <h4 style={{ fontSize: "16px", fontWeight: 600, color: "var(--color-text-primary)", marginBottom: "16px" }}>
          Recent Activity
        </h4>
        {mockHistoryList.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {mockHistoryList.map((entry) => (
              <div key={entry.id} style={{ 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "space-between",
                padding: "16px",
                backgroundColor: "var(--color-bg-secondary)",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--color-border)"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <FontAwesomeIcon 
                    icon={entry.type === "Reward Redeemed" ? faCheckCircle : faClock} 
                    style={{ color: entry.type === "Reward Redeemed" ? "var(--color-pink-500)" : "var(--color-text-secondary)", fontSize: "20px" }}
                  />
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: 500, color: "var(--color-text-primary)" }}>{entry.type}</div>
                  </div>
                </div>
                <div style={{ fontSize: "12px", color: "var(--color-text-secondary)" }}>{entry.date}</div>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: "var(--color-text-secondary)", fontSize: "14px" }}>
            No recent activity to display.
          </p>
        )}
      </div>

    </div>
  );
}
