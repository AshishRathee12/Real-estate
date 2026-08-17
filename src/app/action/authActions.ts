// src/app/actions/authActions.ts
"use server";

import { signIn } from "@/src/app/auth";

export async function docredentilas(data: { email: string; password: string }) {
  try {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    return {
      success: true,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.cause?.err?.message || error.message || "Login failed",
    };
  }
}
