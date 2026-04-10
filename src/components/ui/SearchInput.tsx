"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export function SearchInput({ onSearch, placeholder = "Search..." }: { onSearch?: (val: string) => void, placeholder?: string }) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      backgroundColor: "var(--color-bg-secondary)",
      border: `1px solid ${isFocused ? "var(--color-pink-500)" : "var(--color-border)"}`,
      borderRadius: "var(--radius-full)",
      padding: "12px 20px",
      gap: "12px",
      transition: "all 0.2s ease",
      boxShadow: isFocused ? "var(--shadow-glow)" : "none",
      width: "100%",
    }}>
      <FontAwesomeIcon icon={faSearch} style={{ color: isFocused ? "var(--color-pink-400)" : "var(--color-text-secondary)" }} />
      <input
        type="text"
        placeholder={placeholder}
        onChange={(e) => onSearch?.(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{
          flex: 1,
          backgroundColor: "transparent",
          border: "none",
          color: "var(--color-text-primary)",
          fontSize: "16px",
          outline: "none",
        }}
      />
    </div>
  );
}
