"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faWallet, faCameraRetro, faSignOutAlt, faStar } from "@fortawesome/free-solid-svg-icons";

export function DesktopSidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: "Home Feed", href: "/home", icon: faHome },
    { label: "Check-in Scan", href: "/scan", icon: faCameraRetro },
    { label: "My Wallet", href: "/wallet", icon: faWallet },
  ];

  return (
    <div style={{ padding: "24px", display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between" }}>
      
      <div>
        {/* Logo Element */}
        <div style={{ marginBottom: "48px" }}>
           <h2 style={{ fontSize: "20px", fontWeight: 800, color: "var(--color-pink-500)", letterSpacing: "1px", margin: 0 }}>
             LOYALTY<span style={{ color: "#FFF" }}>PRO</span>
           </h2>
        </div>
        
        {/* Core Routes mapping matching Mobile Tab Bar */}
        <nav style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <h3 style={{ fontSize: "12px", textTransform: "uppercase", color: "var(--color-text-secondary)", letterSpacing: "1px", marginBottom: "8px", fontWeight: 700 }}>Menu</h3>
          {navItems.map(item => {
             const isActive = pathname?.startsWith(item.href);
             return (
               <Link key={item.href} href={item.href} style={{
                 display: "flex", alignItems: "center", gap: "16px",
                 padding: "12px 16px", borderRadius: "var(--radius-md)",
                 backgroundColor: isActive ? "var(--color-pink-900)" : "transparent",
                 color: isActive ? "var(--color-pink-300)" : "var(--color-text-secondary)",
                 transition: "all 0.2s ease"
               }}>
                  <FontAwesomeIcon icon={item.icon} style={{ width: "20px" }} />
                  <span style={{ fontWeight: 600 }}>{item.label}</span>
               </Link>
             );
          })}
        </nav>
      </div>

      <div>
        {/* Engagement Widget */}
        <div style={{ padding: "16px", backgroundColor: "rgba(0,0,0,0.3)", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)", marginBottom: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "var(--color-pink-500)", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <FontAwesomeIcon icon={faStar} style={{ color: "#FFF", fontSize: "12px" }} />
            </div>
            <div>
              <div style={{ fontSize: "14px", fontWeight: "bold", color: "#FFF" }}>Star Member</div>
              <div style={{ fontSize: "12px", color: "var(--color-text-secondary)" }}>3 Rewards Active</div>
            </div>
          </div>
          <p style={{ fontSize: "12px", color: "var(--color-text-secondary)", lineHeight: 1.4, margin: 0 }}>
             You are saving 15% more this month by tracking visits effectively!
          </p>
        </div>

        {/* User Profile Hook */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid var(--color-border)", paddingTop: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "var(--color-pink-800)", border: "2px solid var(--color-pink-500)", display: "flex", justifyContent: "center", alignItems: "center", fontWeight: "bold", color: "#FFF" }}>
              JD
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "14px", fontWeight: "bold", color: "#FFF", lineHeight: 1 }}>John Doe</span>
              <span style={{ fontSize: "12px", color: "var(--color-text-secondary)" }}>Customer</span>
            </div>
          </div>
          <Link href="/login" style={{ color: "var(--color-text-secondary)", transition: "color 0.2s ease" }} onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-error)")} onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-secondary)")}>
            <FontAwesomeIcon icon={faSignOutAlt} />
          </Link>
        </div>
      </div>

    </div>
  );
}
