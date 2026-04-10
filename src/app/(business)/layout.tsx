"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faTags, faChartLine, faCog, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

export default function BusinessLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Dashboard", href: "/business/dashboard", icon: faHome },
    { label: "Settings", href: "/business/settings", icon: faCog },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", width: "100%", backgroundColor: "var(--color-bg-primary)" }}>
      
      {/* Mobile Header Toggle */}
      <div className="md-hidden-nav" style={{ position: "fixed", top: 0, left: 0, right: 0, height: "60px", backgroundColor: "var(--color-bg-secondary)", borderBottom: "1px solid var(--color-border)", zIndex: 50, display: "flex", alignItems: "center", padding: "0 16px", justifyContent: "space-between" }}>
        <h1 style={{ fontWeight: "bold", color: "#FFF", fontSize: "18px" }}>Merchant Portal</h1>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} style={{ color: "#FFF", fontSize: "24px", background: "none", border: "none", cursor: "pointer" }}>
           <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} />
        </button>
      </div>

      {/* Styled class injection for sidebar media queries */}
      <style>{`
        .biz-sidebar {
          width: 260px;
          height: 100vh;
          position: fixed;
          left: 0;
          top: 0;
          background-color: var(--color-bg-secondary);
          border-right: 1px solid var(--color-border);
          transition: transform 0.3s ease;
          z-index: 60;
          display: flex;
          flex-direction: column;
        }
        .biz-content {
          margin-left: 0;
          padding-top: 60px; 
          width: 100%;
        }
        @media (min-width: 768px) {
          .biz-sidebar {
             transform: translateX(0) !important;
          }
          .md-hidden-nav {
             display: none !important;
          }
          .biz-content {
             margin-left: 260px;
             padding-top: 0;
          }
        }
      `}</style>
      
      {/* Sidebar Navigation */}
      <aside className="biz-sidebar" style={{ transform: isMobileMenuOpen ? "translateX(0)" : "translateX(-100%)" }}>
        <div style={{ padding: "24px", borderBottom: "1px solid var(--color-border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
           <h2 style={{ fontSize: "20px", fontWeight: 800, color: "var(--color-pink-500)", letterSpacing: "1px", margin: 0 }}>
             LOYALTY<span style={{ color: "#FFF" }}>PRO</span>
           </h2>
           <button className="md-hidden-nav" onClick={() => setIsMobileMenuOpen(false)} style={{ background: "none", border: "none", color: "#FFF", fontSize: "20px" }}>
               <FontAwesomeIcon icon={faTimes} />
           </button>
        </div>
        
        <nav style={{ flex: 1, padding: "24px 16px", display: "flex", flexDirection: "column", gap: "8px" }}>
          {navItems.map(item => {
             const isActive = pathname?.startsWith(item.href);
             return (
               <Link key={item.href} href={item.href} onClick={() => setIsMobileMenuOpen(false)} style={{
                 display: "flex", alignItems: "center", gap: "16px",
                 padding: "12px 16px", borderRadius: "var(--radius-md)",
                 backgroundColor: isActive ? "var(--color-pink-900)" : "transparent",
                 color: isActive ? "var(--color-pink-300)" : "var(--color-text-secondary)",
                 transition: "all 0.2s"
               }}>
                  <FontAwesomeIcon icon={item.icon} style={{ width: "20px" }} />
                  <span style={{ fontWeight: 600 }}>{item.label}</span>
               </Link>
             );
          })}
        </nav>
      </aside>

      {/* Main Content Pane */}
      <main className="biz-content" style={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "var(--color-bg-primary)" }}>
        {children}
      </main>

    </div>
  );
}
