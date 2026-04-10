"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../ui/Button";

interface RedemptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  businessName: string;
  onConfirmRedeem: () => Promise<void>;
}

export function RedemptionModal({ isOpen, onClose, businessName, onConfirmRedeem }: RedemptionModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConfirm = async () => {
    setIsProcessing(true);
    await onConfirmRedeem();
    // Assuming success closes modal dynamically from parent logic or reloads data
    setIsProcessing(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           style={{
             position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
             backgroundColor: "var(--color-bg-primary)",
             zIndex: 200, display: "flex", flexDirection: "column",
             padding: "24px", paddingTop: "max(24px, env(safe-area-inset-top))"
           }}
        >
           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "48px" }}>
             <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "var(--color-text-primary)" }}>Redeem Reward</h2>
             <button onClick={onClose} style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "var(--color-bg-secondary)", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid var(--color-border)", cursor: "pointer" }}>
               <FontAwesomeIcon icon={faTimes} style={{ color: "var(--color-text-primary)" }} />
             </button>
           </div>
           
           <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "24px" }}>
              <div style={{ textAlign: "center" }}>
                <h3 style={{ fontSize: "20px", color: "var(--color-text-secondary)", marginBottom: "8px" }}>Show this code at</h3>
                <h1 style={{ fontSize: "32px", fontWeight: "bold", color: "var(--color-pink-500)", textAlign: "center" }}>{businessName}</h1>
              </div>

              {/* Mock PIN Code */}
              <div style={{
                backgroundColor: "var(--color-bg-secondary)",
                padding: "32px",
                borderRadius: "var(--radius-xl)",
                border: "2px dashed var(--color-pink-500)",
                boxShadow: "0 0 32px rgba(233,30,140,0.2)",
                fontSize: "48px",
                fontWeight: 800,
                letterSpacing: "12px",
                textAlign: "center",
                color: "var(--color-text-primary)"
              }}>
                 4928
              </div>

              <p style={{ color: "var(--color-text-secondary)", textAlign: "center", maxWidth: "280px" }}>
                Let the cashier confirm this pin or mark it redeemed physically.
              </p>
           </div>

           <Button onClick={handleConfirm} disabled={isProcessing} isLoading={isProcessing} style={{ padding: "20px", fontSize: "18px" }}>
             Mark as Redeemed
           </Button>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
