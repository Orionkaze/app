"use client";

import { motion } from "framer-motion";
import React from "react";
import { CATEGORIES } from "../../lib/design-tokens";

export interface BusinessData {
  id: string;
  name: string;
  category: string;
  avatarUrl?: string;
  visitCount: number;
  triggerVisitCount: number;
  offerTeaser: string;
}

export function BusinessCard({ business }: { business: BusinessData }) {
  const { name, category, avatarUrl, visitCount, triggerVisitCount, offerTeaser } = business;
  
  const categoryData = CATEGORIES.find(c => c.name === category) || { emoji: "📌", name: category };
  
  const progressPercent = Math.min((visitCount / triggerVisitCount) * 100, 100);

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      className="glass-panel"
      style={{
        padding: "16px",
        borderRadius: "var(--radius-lg)",
        borderLeft: "4px solid var(--color-pink-500)",
        marginBottom: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        cursor: "pointer",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {/* Avatar */}
        <div style={{
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          backgroundColor: "var(--color-bg-secondary)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          border: "1px solid var(--color-border)",
          overflow: "hidden"
        }}>
          {avatarUrl ? (
            <img src={avatarUrl} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <span style={{ fontSize: "20px", fontWeight: "bold", color: "var(--color-text-secondary)" }}>
              {name.charAt(0)}
            </span>
          )}
        </div>

        {/* Info */}
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: "16px", fontWeight: 600, color: "var(--color-text-primary)", marginBottom: "4px" }}>{name}</h3>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
            backgroundColor: "var(--color-pink-900)",
            color: "var(--color-pink-300)",
            padding: "2px 8px",
            borderRadius: "4px",
            fontSize: "12px",
            fontWeight: 500,
          }}>
            <span>{categoryData.emoji}</span> {categoryData.name}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", fontSize: "12px" }}>
          <span style={{ color: "var(--color-text-secondary)" }}>Visits</span>
          <span style={{ color: "var(--color-text-primary)", fontWeight: 600 }}>{visitCount} / {triggerVisitCount}</span>
        </div>
        <div style={{ width: "100%", height: "8px", backgroundColor: "var(--color-bg-secondary)", borderRadius: "var(--radius-full)", overflow: "hidden" }}>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ height: "100%", backgroundColor: "var(--color-pink-500)", borderRadius: "var(--radius-full)" }}
          />
        </div>
      </div>

      {/* Footer Teaser */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "8px", borderTop: "1px solid var(--color-border)" }}>
        <p style={{ fontSize: "12px", color: "var(--color-text-secondary)", fontStyle: "italic" }}>
          {offerTeaser}
        </p>
        <button style={{
          backgroundColor: "transparent",
          border: "1px solid var(--color-pink-500)",
          color: "var(--color-pink-400)",
          padding: "6px 12px",
          borderRadius: "var(--radius-sm)",
          fontSize: "12px",
          fontWeight: 600,
        }}>
          View Offer
        </button>
      </div>
    </motion.div>
  );
}
