"use client";

import { motion } from "framer-motion";
import { CATEGORIES } from "../../lib/design-tokens";
import React from "react";

export function CategoryFilter({ selected = "All", onSelect }: { selected?: string, onSelect?: (c: string) => void }) {
  return (
    <div style={{
      display: "flex",
      overflowX: "auto",
      paddingBottom: "8px",
      scrollbarWidth: "none", // Firefox
      msOverflowStyle: "none", // IE
      gap: "8px",
    }}>
      <style>{`
        ::-webkit-scrollbar { display: none; }
      `}</style>
      {CATEGORIES.map((cat) => {
        const isActive = selected === cat.name;
        return (
          <motion.button
            key={cat.name}
            onClick={() => onSelect?.(cat.name)}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: "8px 16px",
              borderRadius: "var(--radius-full)",
              whiteSpace: "nowrap",
              fontSize: "14px",
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: "6px",
              backgroundColor: isActive ? "var(--color-pink-500)" : "var(--color-bg-secondary)",
              color: isActive ? "#FFF" : "var(--color-text-secondary)",
              border: isActive ? "none" : "1px solid var(--color-border)",
              transition: "background 0.2s ease",
            }}
          >
            <span>{cat.emoji}</span>
            <span>{cat.name}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
