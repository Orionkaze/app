"use client";

import { useActionState, useState } from "react";
import { signupAction, type AuthState } from "../../actions/auth";
import { Input } from "../../../components/ui/Input";
import { Button } from "../../../components/ui/Button";
import { motion } from "framer-motion";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faUser, faStore } from "@fortawesome/free-solid-svg-icons";

export default function SignupPage() {
  const [state, formAction, isPending] = useActionState(signupAction, { error: null } as AuthState);
  const [role, setRole] = useState<"customer" | "business">("customer");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "8px" }}>Create Account</h2>
      <p style={{ color: "var(--color-text-secondary)", marginBottom: "24px", lineHeight: 1.5 }}>
        Join the ecosystem to earn rewards or grow your audience!
      </p>

      {/* Role Selector */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "32px" }}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setRole("customer")}
          style={{
            flex: 1,
            padding: "16px",
            borderRadius: "var(--radius-md)",
            border: `1px solid ${role === "customer" ? "var(--color-pink-500)" : "var(--color-border)"}`,
            backgroundColor: role === "customer" ? "rgba(233, 30, 140, 0.1)" : "var(--color-bg-secondary)",
            cursor: "pointer",
            textAlign: "center",
            transition: "all 0.2s ease"
          }}
        >
          <FontAwesomeIcon icon={faUser} style={{ color: role === "customer" ? "var(--color-pink-400)" : "var(--color-text-secondary)", fontSize: "24px", marginBottom: "8px" }} />
          <div style={{ fontWeight: 600, color: role === "customer" ? "var(--color-text-primary)" : "var(--color-text-secondary)" }}>Customer</div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setRole("business")}
          style={{
            flex: 1,
            padding: "16px",
            borderRadius: "var(--radius-md)",
            border: `1px solid ${role === "business" ? "var(--color-pink-500)" : "var(--color-border)"}`,
            backgroundColor: role === "business" ? "rgba(233, 30, 140, 0.1)" : "var(--color-bg-secondary)",
            cursor: "pointer",
            textAlign: "center",
            transition: "all 0.2s ease"
          }}
        >
          <FontAwesomeIcon icon={faStore} style={{ color: role === "business" ? "var(--color-pink-400)" : "var(--color-text-secondary)", fontSize: "24px", marginBottom: "8px" }} />
          <div style={{ fontWeight: 600, color: role === "business" ? "var(--color-text-primary)" : "var(--color-text-secondary)" }}>Business</div>
        </motion.div>
      </div>

      <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {state?.error && (
          <div style={{ padding: "12px", backgroundColor: "rgba(239, 68, 68, 0.1)", borderLeft: "4px solid var(--color-error)", color: "var(--color-error)", fontSize: "14px", borderRadius: "4px", marginBottom: "16px" }}>
            {state.error}
          </div>
        )}

        <input type="hidden" name="role" value={role} />

        <Input 
          label={role === "business" ? "Business Name" : "Full Name"} 
          name="name" 
          type="text" 
          placeholder={role === "business" ? "Acme Corp" : "John Doe"} 
          required 
        />

        <Input 
          label="Email Address" 
          name="email" 
          type="email" 
          placeholder="you@example.com" 
          required 
        />
        
        <Input 
          label="Password" 
          name="password" 
          type="password" 
          placeholder="••••••••" 
          required 
        />

        <Input 
          label="Confirm Password" 
          name="confirmPassword" 
          type="password" 
          placeholder="••••••••" 
          required 
        />

        <Button type="submit" isLoading={isPending} style={{ marginTop: "16px" }}>
          Create Account
          <FontAwesomeIcon icon={faArrowRight} style={{ marginLeft: "8px" }} />
        </Button>
      </form>

      <div style={{ marginTop: "32px", textAlign: "center", fontSize: "14px", color: "var(--color-text-secondary)" }}>
        Already have an account?{" "}
        <Link href="/login" style={{ color: "var(--color-text-primary)", fontWeight: 500 }}>
          Log in
        </Link>
      </div>
    </motion.div>
  );
}
