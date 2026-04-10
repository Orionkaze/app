"use client";

import React, { useState, useRef } from "react";
import { LoyaltyCard, type WalletCardData } from "../../../components/wallet/LoyaltyCard";
import { BusinessDetailPanel } from "../../../components/wallet/BusinessDetailPanel";
import { RedemptionModal } from "../../../components/wallet/RedemptionModal";

// Mock Data representing active tracking cards
const initialMockWalletData: WalletCardData[] = [
  {
    id: "bus_1",
    businessName: "Neon Beans Coffee",
    category: "Cafe",
    brandColor: "#A31264", 
    visitCount: 10,
    targetVisits: 10,
  },
  {
    id: "bus_2",
    businessName: "Cyber Fit Gym",
    category: "Gym",
    brandColor: "#0284c7", 
    visitCount: 3,
    targetVisits: 10,
  },
  {
    id: "bus_3",
    businessName: "Glamour Salon",
    category: "Salon",
    brandColor: "#9333ea", 
    visitCount: 4,
    targetVisits: 5,
  }
];

export default function WalletPage() {
  const [walletCards, setWalletCards] = useState(initialMockWalletData);
  const [activeIndex, setActiveIndex] = useState(0);
  const [redeemTarget, setRedeemTarget] = useState<WalletCardData | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft } = scrollContainerRef.current;
    
    // Calculate which card is roughly in center. Card width 320px + gap 16px (336 total scroll unit width)
    const index = Math.round(scrollLeft / 336); 
    setActiveIndex(Math.min(walletCards.length - 1, Math.max(0, index)));
  };

  const handleRedeemAction = async () => {
    if (!redeemTarget) return;

    // Simulate redemption hit
    const res = await fetch("/api/offers/redeem", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ businessId: redeemTarget.id }),
    });

    if (res.ok) {
      // Optimistically clear the visit progress threshold representing success
      setWalletCards(prev => prev.map(c => 
        c.id === redeemTarget.id ? { ...c, visitCount: c.visitCount - c.targetVisits } : c
      ));
      setRedeemTarget(null);
    }
  };

  const activeCard = walletCards[activeIndex];

  return (
    <div style={{ paddingTop: "16px", paddingBottom: "32px", display: "flex", flexDirection: "column" }}>
      <div style={{ marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "var(--color-text-primary)" }}>
          My Wallet
        </h1>
      </div>

      {walletCards.length > 0 ? (
        <>
          {/* Snap Container Carousel */}
          <div 
            ref={scrollContainerRef}
            onScroll={handleScroll}
            style={{
              display: "flex",
              overflowX: "auto",
              scrollSnapType: "x mandatory",
              gap: "16px",
              paddingBottom: "24px",
              paddingLeft: "calc(50% - 160px)", // Centers exactly first 320px card!
              paddingRight: "calc(50% - 160px)",
              margin: "0 -16px", 
              scrollbarWidth: "none", // Firefox cleanup
            }}
          >
            <style>{`
              ::-webkit-scrollbar { display: none; }
            `}</style>
            
            {walletCards.map((card, idx) => (
              <LoyaltyCard 
                key={card.id} 
                data={card} 
                isActive={idx === activeIndex}
                onRedeemClick={() => setRedeemTarget(card)}
              />
            ))}
          </div>

          {/* Dots Indicator */}
          <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "8px" }}>
            {walletCards.map((_, i) => (
              <div 
                key={i} 
                style={{ 
                  width: "8px", height: "8px", borderRadius: "50%", 
                  backgroundColor: i === activeIndex ? "var(--color-pink-500)" : "var(--color-border)",
                  transition: "background 0.3s ease"
                }} 
              />
            ))}
          </div>

          {activeCard && <BusinessDetailPanel data={activeCard} />}
        </>
      ) : (
        <p style={{ color: "var(--color-text-secondary)", textAlign: "center", marginTop: "40px" }}>No active loyalty tracking found.</p>
      )}

      {/* Independent Overlay Portal Logic */}
      <RedemptionModal 
        isOpen={!!redeemTarget}
        onClose={() => setRedeemTarget(null)}
        businessName={redeemTarget?.businessName || ""}
        onConfirmRedeem={handleRedeemAction}
      />
      
    </div>
  );
}
