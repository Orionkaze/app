"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { Button } from "../ui/Button";

interface ReceiptSheetProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    businessName: string;
    visitNumber: number;
    targetVisits: number;
    rewardEarned?: string;
  } | null;
}

export function ReceiptSheet({ isOpen, onClose, data }: ReceiptSheetProps) {
  useEffect(() => {
    if (isOpen && data?.rewardEarned) {
      // Fire confetti
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#E91E8C', '#FFF0F7', '#FF85C0']
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#E91E8C', '#FFF0F7', '#FF85C0']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      // Short delay for the animation of the modal to finish
      setTimeout(frame, 600);
    }
  }, [isOpen, data]);

  return (
    <AnimatePresence>
      {isOpen && data && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(4px)",
            zIndex: 100,
            display: "flex",
            alignItems: "flex-end",
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              backgroundColor: "var(--color-bg-secondary)",
              borderTopLeftRadius: "var(--radius-xl)",
              borderTopRightRadius: "var(--radius-xl)",
              padding: "32px 24px",
              boxShadow: "0 -8px 32px rgba(0,0,0,0.5)",
              borderTop: "1px solid var(--color-border-pink)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "24px"
            }}
          >
            {/* Grab handle */}
            <div style={{ width: "40px", height: "4px", backgroundColor: "var(--color-border)", borderRadius: "2px", margin: "-16px auto 16px auto" }} />

            <h3 style={{ fontSize: "20px", color: "var(--color-text-secondary)", fontWeight: 500 }}>
              {data.businessName}
            </h3>

            {/* Visit Number animate scale in */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              style={{
                fontSize: "48px",
                fontWeight: 800,
                color: "var(--color-text-primary)",
                background: "linear-gradient(135deg, #FFC2E0 0%, #E91E8C 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Visit #{data.visitNumber}
            </motion.div>

            {/* Progress */}
            <div style={{ width: "100%", maxWidth: "320px", marginTop: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "14px" }}>
                <span style={{ color: "var(--color-text-secondary)" }}>Progress to reward</span>
                <span style={{ color: "var(--color-pink-400)", fontWeight: 600 }}>{data.visitNumber} / {data.targetVisits}</span>
              </div>
              <div style={{ width: "100%", height: "12px", backgroundColor: "var(--color-bg-primary)", borderRadius: "var(--radius-full)", overflow: "hidden" }}>
                <motion.div 
                  initial={{ width: `${Math.max(0, ((data.visitNumber - 1) / data.targetVisits) * 100)}%` }}
                  animate={{ width: `${Math.min(100, (data.visitNumber / data.targetVisits) * 100)}%` }}
                  transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                  style={{ height: "100%", backgroundColor: "var(--color-pink-500)", borderRadius: "var(--radius-full)" }}
                />
              </div>
            </div>

            {/* Reward Earned Notice */}
            {data.rewardEarned && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                style={{
                  marginTop: "8px",
                  padding: "16px",
                  backgroundColor: "rgba(233,30,140,0.15)",
                  border: "1px solid var(--color-pink-500)",
                  borderRadius: "var(--radius-md)",
                  textAlign: "center",
                  width: "100%",
                }}
              >
                <div style={{ fontSize: "18px", fontWeight: "bold", color: "var(--color-pink-400)", marginBottom: "4px" }}>🎉 Reward Unlocked!</div>
                <div style={{ fontSize: "14px", color: "var(--color-text-primary)" }}>{data.rewardEarned}</div>
              </motion.div>
            )}

            <Button onClick={onClose} style={{ marginTop: "16px" }}>
              Awesome!
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
