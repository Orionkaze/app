import React from "react";
import { BottomTabBar } from "../../components/navigation/BottomTabBar";

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`
        .customer-layout {
          min-height: 100vh;
          width: 100%;
          background-color: var(--color-bg-primary);
          padding-bottom: 80px; 
          display: flex;
          flex-direction: column;
        }
        .desktop-sidebar {
          display: none;
        }
        @media (min-width: 768px) {
          .customer-layout {
            padding-bottom: 0;
            flex-direction: row;
          }
          .mobile-tab-bar {
            display: none;
          }
          .desktop-sidebar {
            display: flex;
            width: 240px;
            border-right: 1px solid var(--color-border);
            height: 100vh;
            position: sticky;
            top: 0;
            background-color: var(--color-bg-secondary);
          }
        }
      `}</style>
      <div className="customer-layout">
        
        {/* Desktop Sidebar Fallback (Hidden on Mobile) */}
        <div className="desktop-sidebar border-r border-gray-800">
           {/* Detailed desktop sidebar can be implemented later */}
        </div>

        {/* Dynamic Content */}
        <main style={{ flex: 1, position: "relative" }}>
          <div style={{ maxWidth: "600px", margin: "0 auto", padding: "16px", width: "100%", minHeight: "100vh" }}>
            {children}
          </div>
        </main>

        {/* Persistent Mobile Tab Bar */}
        <div className="mobile-tab-bar">
          <BottomTabBar />
        </div>
      </div>
    </>
  );
}
