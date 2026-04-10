"use client";

import React, { useState } from "react";
import { Input } from "../../../components/ui/Input";
import { Button } from "../../../components/ui/Button";
import { CATEGORIES } from "../../../lib/design-tokens";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faSignOutAlt, faStore } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

export default function BusinessSettingsPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    businessName: "Neon Beans Coffee",
    category: "Cafe",
    brandColor: "#A31264",
    email: "admin@neonbeans.com",
    visitTarget: 10,
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Mock save delay
    await new Promise(r => setTimeout(r, 800));
    setIsSaving(false);
  };

  const handleLogout = () => {
    // In a real app we'd call Supabase auth.signOut()
    router.push("/login");
  };

  return (
    <div style={{ padding: "32px", maxWidth: "800px", margin: "0 auto", width: "100%" }}>
      <div style={{ marginBottom: "32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "bold", color: "#FFF", margin: 0 }}>
          <FontAwesomeIcon icon={faStore} style={{ marginRight: "12px", color: "var(--color-pink-500)" }} />
          Store Settings
        </h1>
        <Button variant="ghost" onClick={handleLogout} style={{ color: "var(--color-error)", border: "1px solid var(--color-error)" }}>
          <FontAwesomeIcon icon={faSignOutAlt} style={{ marginRight: "8px" }} />
          Logout
        </Button>
      </div>

      <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
        
        {/* Profile Section */}
        <section className="glass-panel" style={{ padding: "24px", borderRadius: "var(--radius-xl)" }}>
          <h2 style={{ fontSize: "18px", fontWeight: 600, color: "#FFF", marginBottom: "24px", borderBottom: "1px solid var(--color-border)", paddingBottom: "12px" }}>
            Public Profile
          </h2>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <Input 
              label="Business Name" 
              value={formData.businessName}
              onChange={(e) => setFormData({...formData, businessName: e.target.value})}
            />

            <div>
              <label style={{ display: "block", fontSize: "14px", fontWeight: 500, color: "var(--color-text-secondary)", marginBottom: "8px" }}>Category</label>
              <select 
                value={formData.category} 
                onChange={e => setFormData({ ...formData, category: e.target.value })}
                style={{ width: "100%", padding: "12px", borderRadius: "var(--radius-md)", backgroundColor: "rgba(0,0,0,0.2)", border: "1px solid var(--color-border)", color: "#FFF", outline: "none" }}
              >
                {CATEGORIES.map(c => <option key={c.name} value={c.name}>{c.emoji} {c.name}</option>)}
              </select>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "14px", fontWeight: 500, color: "var(--color-text-secondary)", marginBottom: "8px" }}>Brand Color</label>
              <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                 <input 
                   type="color" 
                   value={formData.brandColor} 
                   onChange={e => setFormData({ ...formData, brandColor: e.target.value })} 
                   style={{ width: "64px", height: "48px", padding: 0, border: "none", borderRadius: "8px", cursor: "pointer", backgroundColor: "transparent" }} 
                 />
                 <span style={{ color: "var(--color-text-secondary)", fontFamily: "monospace", fontSize: "16px" }}>{formData.brandColor.toUpperCase()}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Account Section */}
        <section className="glass-panel" style={{ padding: "24px", borderRadius: "var(--radius-xl)" }}>
          <h2 style={{ fontSize: "18px", fontWeight: 600, color: "#FFF", marginBottom: "24px", borderBottom: "1px solid var(--color-border)", paddingBottom: "12px" }}>
            Account Security
          </h2>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <Input 
              label="Admin Email Address" 
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            
            <div>
              <Button variant="secondary" type="button" style={{ fontSize: "14px" }}>
                Send Password Reset Email
              </Button>
            </div>
          </div>
        </section>

        {/* Action Bar */}
        <div style={{ display: "flex", justifyContent: "flex-end", borderTop: "1px solid var(--color-border)", paddingTop: "24px" }}>
          <Button type="submit" isLoading={isSaving} style={{ minWidth: "200px" }}>
             <FontAwesomeIcon icon={faSave} style={{ marginRight: "8px" }} />
             Save Changes
          </Button>
        </div>

      </form>
    </div>
  );
}
