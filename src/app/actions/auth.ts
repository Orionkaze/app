"use server";

import { createClient } from "../../lib/supabase/server";
import { redirect } from "next/navigation";

export type AuthState = { error: string | null };

export async function loginAction(prevState: AuthState, formData: FormData): Promise<AuthState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and Password are required." };
  }

  // MOCK VALIDATION: simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  // Determine redirection based on mock business account detection
  const isBusinessMock = email.includes("business");
  
  if (isBusinessMock) {
    redirect("/business/dashboard"); 
  } else {
    redirect("/home"); 
  }
}

export async function signupAction(prevState: AuthState, formData: FormData): Promise<AuthState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  const name = formData.get("name") as string;
  const role = formData.get("role") as string; // 'customer' or 'business'
  
  if (password !== confirmPassword) {
    return { error: "Passwords do not match." };
  }

  if (!email || !password || !name) {
    return { error: "Please fill in all required fields." };
  }

  // MOCK VALIDATION: simulate network delay avoiding "fetch failed" on invalid keys
  await new Promise(resolve => setTimeout(resolve, 800));

  if (role === 'business') {
    redirect("/business/dashboard");
  } else {
    redirect("/home");
  }
}
