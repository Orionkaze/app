"use client";

import { HTMLMotionProps, motion } from "framer-motion";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "style" | "disabled" | "size" | "children"> {
  variant?: "primary" | "ghost";
  size?: "default" | "small";
  isLoading?: boolean;
  style?: React.CSSProperties;
  disabled?: boolean;
  children?: React.ReactNode;
}

export function Button({
  className = "",
  variant = "primary",
  size = "default",
  isLoading = false,
  children,
  disabled,
  style,
  ...props
}: ButtonProps) {
  const baseStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    fontFamily: "var(--font-dm-sans)",
    fontWeight: 600,
    outline: "none",
    transition: "background 0.2s ease, opacity 0.2s ease",
    position: "relative" as const,
    width: "100%", // Default to full width for auth forms mostly
  };

  const variants = {
    primary: {
      backgroundColor: "var(--color-pink-500)",
      color: "#FFFFFF",
      border: "none",
    },
    ghost: {
      backgroundColor: "transparent",
      color: "var(--color-pink-400)",
      border: "1px solid var(--color-border-pink)",
    },
  };

  const sizes = {
    default: {
      padding: "16px 24px",
      borderRadius: "var(--radius-md)",
      fontSize: "16px",
    },
    small: {
      padding: "8px 16px",
      borderRadius: "var(--radius-sm)",
      fontSize: "14px",
    },
  };

  const dynamicStyles = {
    ...baseStyles,
    ...variants[variant],
    ...sizes[size],
    opacity: disabled || isLoading ? 0.6 : 1,
    cursor: disabled || isLoading ? "not-allowed" : "pointer",
    ...style,
  };

  return (
    <motion.button
      whileHover={!disabled && !isLoading ? { scale: 1.02 } : {}}
      whileTap={!disabled && !isLoading ? { scale: 0.96 } : {}}
      transition={{ duration: 0.1 }}
      style={dynamicStyles}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <FontAwesomeIcon icon={faCircleNotch} spin />
      ) : null}
      {children}
    </motion.button>
  );
}
