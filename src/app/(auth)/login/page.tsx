"use client";

import { useActionState } from "react";
import { loginAction, type AuthState } from "../../actions/auth";
import { Input } from "../../../components/ui/Input";
import { Button } from "../../../components/ui/Button";
import { motion } from "framer-motion";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, { error: null } as AuthState);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "8px" }}>Welcome Back</h2>
      <p style={{ color: "var(--color-text-secondary)", marginBottom: "32px", lineHeight: 1.5 }}>
        Enter your details to access your account.
      </p>

      <form action={formAction} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {state?.error && (
          <div style={{ padding: "12px", backgroundColor: "rgba(239, 68, 68, 0.1)", borderLeft: "4px solid var(--color-error)", color: "var(--color-error)", fontSize: "14px", borderRadius: "4px", marginBottom: "16px" }}>
            {state.error}
          </div>
        )}

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

        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "-8px", marginBottom: "24px" }}>
          <a href="#" style={{ fontSize: "14px", color: "var(--color-pink-400)" }}>Forgot password?</a>
        </div>

        <Button type="submit" isLoading={isPending}>
          Sign In
          <FontAwesomeIcon icon={faArrowRight} style={{ marginLeft: "8px" }} />
        </Button>
      </form>

      <div style={{ marginTop: "32px", textAlign: "center", fontSize: "14px", color: "var(--color-text-secondary)" }}>
        Don't have an account?{" "}
        <Link href="/signup" style={{ color: "var(--color-text-primary)", fontWeight: 500 }}>
          Sign up
        </Link>
      </div>
    </motion.div>
  );
}
