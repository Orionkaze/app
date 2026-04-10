"use client";

import { motion } from "framer-motion";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt } from "@fortawesome/free-solid-svg-icons";

export interface WalletCardData {
  id: string;
  businessName: string;
  category: string;
  brandColor: string; 
  avatarUrl?: string;
  visitCount: number;
  targetVisits: number;
}

interface LoyaltyCardProps {
  data: WalletCardData;
  isActive: boolean;
  onRedeemClick?: () => void;
}

export function LoyaltyCard({ data, isActive, onRedeemClick }: LoyaltyCardProps) {
  const isEligibleForReward = data.visitCount >= data.targetVisits;

  // Compute dynamic gradient mapping
  const gradient = `linear-gradient(135deg, ${data.brandColor} 0%, #1A1A2E 100%)`;

  return (
    <motion.div
      animate={{ 
        scale: isActive ? 1 : 0.9, 
        opacity: isActive ? 1 : 0.6 
      }}
      transition={{ duration: 0.3 }}
      style={{
        width: "320px",
        height: "180px",
        borderRadius: "var(--radius-xl)",
        background: gradient,
        boxShadow: "var(--shadow-card)",
        scrollSnapAlign: "center",
        flexShrink: 0,
        position: "relative",
        overflow: "hidden",
        border: isEligibleForReward ? "2px solid var(--color-pink-500)" : "1px solid rgba(255,255,255,0.1)",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Target Glow Background if Eligible */}
      {isEligibleForReward && (
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            position: "absolute",
            top: 0, left: 0, right: 0, bottom: 0,
            background: "radial-gradient(circle at 50% 50%, rgba(233, 30, 140, 0.5) 0%, transparent 70%)",
            pointerEvents: "none"
          }}
        />
      )}

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", zIndex: 1 }}>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <div style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.2)", display: "flex", justifyContent: "center", alignItems: "center", overflow: "hidden" }}>
             {data.avatarUrl ? (
               <img src={data.avatarUrl} alt={data.businessName} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
             ) : (
               <span style={{ fontSize: "16px", fontWeight: "bold", color: "#FFF" }}>{data.businessName.charAt(0)}</span>
             )}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#fff", textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>{data.businessName}</h3>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)" }}>{data.category}</span>
          </div>
        </div>

        <div style={{
          backgroundColor: "rgba(0,0,0,0.4)",
          padding: "4px 8px",
          borderRadius: "var(--radius-sm)",
          fontSize: "12px",
          fontWeight: 600,
          color: "#fff",
          border: "1px solid rgba(255,255,255,0.1)"
        }}>
          {data.visitCount} / {data.targetVisits}
        </div>
      </div>

      {/* Grid of Stamps */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center", zIndex: 1, marginTop: "16px" }}>
        {Array.from({ length: Math.min(data.targetVisits, 12)}).map((_, i) => {
          const isFilled = i < data.visitCount;
          return (
            <div key={i} style={{
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              backgroundColor: isFilled ? "var(--color-pink-500)" : "rgba(255, 255, 255, 0.1)",
              border: isFilled ? "none" : "1px solid rgba(255,255,255,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: isFilled ? "0 0 10px rgba(233, 30, 140, 0.5)" : "none",
              transition: "all 0.3s ease"
            }}>
              {isFilled && <FontAwesomeIcon icon={faBolt} style={{ fontSize: "10px", color: "#FFF" }} />}
            </div>
          );
        })}
        {data.targetVisits > 12 && (
          <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", alignSelf: "center" }}>
            +{data.targetVisits - 12}
          </div>
        )}
      </div>

      {/* Redeem Overlay */}
      {isEligibleForReward && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRedeemClick}
          style={{
             position: "absolute",
             top: 0, left: 0, right: 0, bottom: 0,
             backgroundColor: "rgba(0,0,0,0.6)",
             backdropFilter: "blur(4px)",
             display: "flex",
             flexDirection: "column",
             alignItems: "center",
             justifyContent: "center",
             cursor: "pointer",
             zIndex: 10,
             border: "none",
             outline: "none"
          }}
        >
          <div style={{
            backgroundColor: "var(--color-pink-500)",
            color: "#FFF",
            padding: "8px 24px",
            borderRadius: "var(--radius-full)",
            fontWeight: "bold",
            fontSize: "14px",
            boxShadow: "0 4px 16px rgba(233,30,140,0.6)"
          }}>
            Redeem Now
          </div>
        </motion.button>
      )}
    </motion.div>
  );
}
