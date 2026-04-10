"use client";

import React, { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCircleNotch, faCamera } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import { ReceiptSheet } from "../../../components/scan/ReceiptSheet";
import { useRouter } from "next/navigation";

export default function ScanPage() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [receiptData, setReceiptData] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleScan = async (result: string) => {
    if (status !== "idle") return; // Prevent double-scans
    
    setStatus("processing");
    try {
      const res = await fetch("/api/visits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ qrData: result }),
      });
      const payload = await res.json();
      
      if (payload.success) {
        setStatus("success");
        setReceiptData(payload);
      } else {
        throw new Error(payload.error || "Failed to scan");
      }
    } catch (err: any) {
      setErrorMsg(err.message);
      setStatus("error");
      setTimeout(() => {
        setStatus("idle");
        setErrorMsg(null);
      }, 3000);
    }
  };

  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "#000", zIndex: 60 }}>
      {/* Header overlay */}
      <div style={{ position: "absolute", top: "env(safe-area-inset-top)", left: 0, right: 0, padding: "16px", zIndex: 10, display: "flex", alignItems: "center" }}>
        <button style={{ 
          width: "40px", height: "40px", borderRadius: "50%", 
          backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(10px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#FFF", border: "1px solid rgba(255,255,255,0.2)"
        }} onClick={() => router.back()}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <span style={{ marginLeft: "16px", fontSize: "16px", fontWeight: 600, color: "#FFF" }}>Point at QR Code</span>
      </div>

      <Scanner
        onScan={(result) => handleScan(result[0]?.rawValue || "")}
        onError={(err: any) => console.log(err)}
        styles={{
          container: { width: "100%", height: "100%" },
          video: { objectFit: "cover" }
        }}
      />

      {/* Vignette Overlay purely for aesthetic focus */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
        boxShadow: "inset 0 0 100px rgba(0,0,0,0.8)",
        pointerEvents: "none"
      }} />

      {/* Interactive Framer-Motion Scanning Reticle Box */}
      <div style={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        width: "240px", height: "240px",
        pointerEvents: "none",
        zIndex: 10
      }}>
        <motion.div
           animate={{ 
             scale: status === "processing" ? 0.9 : 1, 
             opacity: status === "processing" ? 0.5 : 1 
           }}
           transition={{ repeat: status === "idle" ? Infinity : 0, repeatType: "reverse", duration: 1 }}
           style={{ width: "100%", height: "100%", position: "relative" }}
        >
          {/* Top border brackets */}
          <div style={{ position: "absolute", top: 0, left: 0, width: "40px", height: "40px", borderTop: "4px solid var(--color-pink-500)", borderLeft: "4px solid var(--color-pink-500)", borderTopLeftRadius: "16px" }} />
          <div style={{ position: "absolute", top: 0, right: 0, width: "40px", height: "40px", borderTop: "4px solid var(--color-pink-500)", borderRight: "4px solid var(--color-pink-500)", borderTopRightRadius: "16px" }} />
          {/* Bottom border brackets */}
          <div style={{ position: "absolute", bottom: 0, left: 0, width: "40px", height: "40px", borderBottom: "4px solid var(--color-pink-500)", borderLeft: "4px solid var(--color-pink-500)", borderBottomLeftRadius: "16px" }} />
          <div style={{ position: "absolute", bottom: 0, right: 0, width: "40px", height: "40px", borderBottom: "4px solid var(--color-pink-500)", borderRight: "4px solid var(--color-pink-500)", borderBottomRightRadius: "16px" }} />
        </motion.div>
      </div>

      {/* Dynamic Processing States */}
      <AnimatePresence>
        {status === "processing" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.8)", zIndex: 20, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#FFF" }}
          >
            <FontAwesomeIcon icon={faCircleNotch} spin style={{ fontSize: "48px", color: "var(--color-pink-500)", marginBottom: "16px" }} />
            <h2 style={{ fontSize: "18px", fontWeight: 600 }}>Logging Visit...</h2>
          </motion.div>
        )}

        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{ position: "absolute", bottom: "100px", left: "24px", right: "24px", padding: "16px", backgroundColor: "var(--color-error)", color: "#FFF", borderRadius: "var(--radius-md)", textAlign: "center", zIndex: 20, fontWeight: 500, boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}
          >
            ❌ {errorMsg || "Invalid QR Code"}
          </motion.div>
        )}
      </AnimatePresence>

      <ReceiptSheet 
        isOpen={status === "success"} 
        data={receiptData}
        onClose={() => {
          setStatus("idle");
          setReceiptData(null);
        }} 
      />
    </div>
  );
}
