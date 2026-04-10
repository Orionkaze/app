"use client";

import { motion } from "framer-motion";
import React, { useState, forwardRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  containerStyle?: React.CSSProperties;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", id, required, style, containerStyle, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const inputId = id || label.replace(/\s+/g, "-").toLowerCase();

    const mergedContainerStyle = {
      display: "flex",
      flexDirection: "column" as const,
      gap: "8px",
      marginBottom: "16px",
      width: "100%",
      ...containerStyle,
    };

    const labelStyle = {
      fontSize: "14px",
      fontWeight: 500,
      color: error ? "var(--color-error)" : isFocused ? "var(--color-pink-400)" : "var(--color-text-secondary)",
      transition: "color 0.2s ease",
    };

    const inputStyle = {
      width: "100%",
      backgroundColor: "var(--color-bg-secondary)",
      border: `1px solid ${error ? "var(--color-error)" : isFocused ? "var(--color-pink-500)" : "var(--color-border)"}`,
      borderRadius: "var(--radius-md)",
      padding: "16px",
      fontSize: "16px",
      color: "var(--color-text-primary)",
      outline: "none",
      boxShadow: isFocused ? (error ? "0 0 0 3px rgba(239, 68, 68, 0.2)" : "var(--shadow-glow)") : "none",
      transition: "all 0.2s ease",
      ...style,
    };

    return (
      <div style={mergedContainerStyle}>
        <label htmlFor={inputId} style={labelStyle}>
          {label} {required && <span style={{ color: "var(--color-pink-500)" }}>*</span>}
        </label>
        <div style={{ position: "relative" }}>
          <input
            id={inputId}
            ref={ref}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            style={inputStyle}
            required={required}
            {...props}
          />
          {error && (
            <div style={{ position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)", color: "var(--color-error)" }}>
              <FontAwesomeIcon icon={faExclamationCircle} />
            </div>
          )}
        </div>
        {error && (
          <motion.span
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ color: "var(--color-error)", fontSize: "12px" }}
          >
            {error}
          </motion.span>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';
