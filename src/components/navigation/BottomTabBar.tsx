"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faQrcode, faWallet, faUser } from "@fortawesome/free-solid-svg-icons";

export function BottomTabBar() {
  const pathname = usePathname();

  const tabs = [
    { label: "Home", href: "/home", icon: faHome },
    { label: "Scan", href: "/scan", icon: faQrcode },
    { label: "Wallet", href: "/wallet", icon: faWallet },
    { label: "Profile", href: "/profile", icon: faUser },
  ];

  return (
    <div style={{
      position: "fixed",
      bottom: 0,
      left: 0,
      width: "100%",
      backgroundColor: "var(--color-bg-primary)",
      borderTop: "1px solid var(--color-border-pink)",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      padding: "12px 0 calc(12px + env(safe-area-inset-bottom)) 0",
      zIndex: 50,
      boxShadow: "0 -4px 24px rgba(0, 0, 0, 0.4)",
    }}>
      {tabs.map((tab) => {
        const isActive = pathname?.startsWith(tab.href);
        return (
          <Link key={tab.href} href={tab.href} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
            <motion.div
              whileTap={{ scale: 0.9 }}
              style={{
                color: isActive ? "var(--color-pink-400)" : "var(--color-text-secondary)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <FontAwesomeIcon icon={tab.icon} style={{ fontSize: "20px", marginBottom: "4px" }} />
              <span style={{ fontSize: "10px", fontWeight: isActive ? 600 : 500 }}>
                {tab.label}
              </span>
            </motion.div>
          </Link>
        );
      })}
    </div>
  );
}
