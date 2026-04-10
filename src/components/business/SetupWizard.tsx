"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { CATEGORIES } from "../../lib/design-tokens";

export function SetupWizard({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    category: CATEGORIES[0].name as string,
    brandColor: "#E91E8C",
    targetVisits: 10,
    offerText: "Free 10th item"
  });

  const nextStep = () => setStep(s => Math.min(s + 1, 3));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", padding: "24px", width: "100%" }}>
      <h2 style={{ fontSize: "28px", fontWeight: "bold", color: "#FFF", marginBottom: "8px" }}>
        {step === 1 ? "Business Profile" : step === 2 ? "Configure Mechanics" : "Define Reward"}
      </h2>
      <p style={{ color: "var(--color-text-secondary)", marginBottom: "32px" }}>
        Step {step} of 3
      </p>

      <div style={{ position: "relative", minHeight: "340px", backgroundColor: "var(--color-bg-secondary)", borderRadius: "var(--radius-xl)", padding: "32px", border: "1px solid var(--color-border)" }}>
        <AnimatePresence mode="popLayout">
          
          {step === 1 && (
            <motion.div key="step1" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} transition={{ duration: 0.2 }} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <Input label="Business Name" placeholder="e.g. Neon Beans Cafe" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
              
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
                <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                   <input type="color" value={formData.brandColor} onChange={e => setFormData({ ...formData, brandColor: e.target.value })} style={{ width: "48px", height: "48px", padding: 0, border: "none", borderRadius: "8px", cursor: "pointer" }} />
                   <span style={{ color: "#FFF" }}>{formData.brandColor}</span>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} transition={{ duration: 0.2 }} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
               <div>
                  <h3 style={{ fontSize: "18px", color: "#FFF", marginBottom: "16px" }}>How many visits unlock a reward?</h3>
                  <div style={{ fontSize: "48px", fontWeight: "bold", color: "var(--color-pink-500)", textAlign: "center", marginBottom: "24px" }}>
                    {formData.targetVisits}
                  </div>
                  <input 
                    type="range" min="3" max="20" step="1" 
                    value={formData.targetVisits} 
                    onChange={e => setFormData({ ...formData, targetVisits: parseInt(e.target.value) })}
                    style={{ width: "100%", accentColor: "var(--color-pink-500)" }}
                  />
                  <div style={{ display: "flex", justifyContent: "space-between", color: "var(--color-text-secondary)", fontSize: "12px", marginTop: "8px" }}>
                    <span>Fast (3)</span>
                    <span>Standard (10)</span>
                    <span>Grind (20)</span>
                  </div>
               </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} transition={{ duration: 0.2 }} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
               <Input 
                 label="What is the reward?" 
                 placeholder="e.g. Free pastry of your choice" 
                 value={formData.offerText} 
                 onChange={e => setFormData({ ...formData, offerText: e.target.value })} 
               />
               
               <div style={{ padding: "16px", backgroundColor: "rgba(233, 30, 140, 0.1)", border: "1px dashed var(--color-pink-500)", borderRadius: "var(--radius-md)", color: "var(--color-pink-300)", marginTop: "16px" }}>
                 <strong>Pro Tip:</strong> Direct and highly visible rewards result in a 400% increase in customer retention.
               </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "24px" }}>
         {step > 1 ? (
           <Button variant="ghost" onClick={prevStep}>Back</Button>
         ) : <div />}
         
         {step < 3 ? (
           <Button onClick={nextStep}>Continue</Button>
         ) : (
           <Button onClick={onComplete}>Complete Setup</Button>
         )}
      </div>
    </div>
  );
}
