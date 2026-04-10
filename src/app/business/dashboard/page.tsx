"use client";

import React, { useState } from "react";
import { SetupWizard } from "../../../components/business/SetupWizard";
import { QRCodeDisplay } from "../../../components/business/QRCodeDisplay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faQrcode, faGift, faToggleOn, faToggleOff } from "@fortawesome/free-solid-svg-icons";

export default function BusinessDashboardPage() {
  // Developer Toggle feature to visualize mock DB states independently 
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  if (!isSetupComplete) {
    return (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
        
        {/* Testing Toggle Header */}
        <div style={{ padding: "16px", display: "flex", justifyContent: "flex-end", borderBottom: "1px solid var(--color-border)" }}>
           <button 
             onClick={() => setIsSetupComplete(true)} 
             style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--color-pink-400)", background: "transparent", border: "none", cursor: "pointer", fontWeight: "bold" }}
           >
             Force Dashboard Mock <FontAwesomeIcon icon={faToggleOff} />
           </button>
        </div>

        <SetupWizard onComplete={() => setIsSetupComplete(true)} />
      </div>
    );
  }

  return (
    <div style={{ width: "100%", padding: "24px" }}>
      
      {/* Testing Toggle Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px", flexWrap: "wrap", gap: "16px" }}>
         <h1 style={{ fontSize: "28px", fontWeight: "bold", color: "#FFF", margin: 0 }}>Dashboard Overview</h1>
         <button 
           onClick={() => setIsSetupComplete(false)} 
           style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--color-pink-500)", background: "transparent", border: "none", cursor: "pointer", fontWeight: "bold" }}
         >
           Reset to Wizard <FontAwesomeIcon icon={faToggleOn} />
         </button>
      </div>

      {/* Metrics Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px", marginBottom: "48px" }}>
         
         <div className="glass-panel" style={{ padding: "24px", borderRadius: "16px", borderLeft: "4px solid #3b82f6" }}>
           <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px", color: "#3b82f6" }}>
              <FontAwesomeIcon icon={faUsers} style={{ fontSize: "24px" }} />
              <h3 style={{ fontSize: "16px", fontWeight: 600, color: "var(--color-text-secondary)", margin: 0 }}>Total Enrollments</h3>
           </div>
           <div style={{ fontSize: "36px", fontWeight: "bold", color: "#FFF" }}>1,204</div>
         </div>

         <div className="glass-panel" style={{ padding: "24px", borderRadius: "16px", borderLeft: "4px solid var(--color-pink-500)" }}>
           <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px", color: "var(--color-pink-500)" }}>
              <FontAwesomeIcon icon={faQrcode} style={{ fontSize: "24px" }} />
              <h3 style={{ fontSize: "16px", fontWeight: 600, color: "var(--color-text-secondary)", margin: 0 }}>Scans This Week</h3>
           </div>
           <div style={{ fontSize: "36px", fontWeight: "bold", color: "#FFF" }}>487</div>
         </div>

         <div className="glass-panel" style={{ padding: "24px", borderRadius: "16px", borderLeft: "4px solid #10b981" }}>
           <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px", color: "#10b981" }}>
              <FontAwesomeIcon icon={faGift} style={{ fontSize: "24px" }} />
              <h3 style={{ fontSize: "16px", fontWeight: 600, color: "var(--color-text-secondary)", margin: 0 }}>Rewards Redeemed</h3>
           </div>
           <div style={{ fontSize: "36px", fontWeight: "bold", color: "#FFF" }}>112</div>
         </div>

      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "48px", alignItems: "start" }}>
        
         {/* Store Activation Area */}
         <div>
            <h2 style={{ fontSize: "20px", fontWeight: "bold", color: "#FFF", marginBottom: "8px" }}>Scan to check-in</h2>
            <p style={{ color: "var(--color-text-secondary)", marginBottom: "32px", maxWidth: "600px" }}>
               Display this QR code physically at your checkout counter. Customers using the Loyalty Platform scanner will instantly log their visits.
            </p>
            <QRCodeDisplay businessId="mock_business_993" />
         </div>

      </div>

    </div>
  );
}
