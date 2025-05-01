"use client";
import { useAuthActions } from "@convex-dev/auth/react";
import { useConvexAuth } from "convex/react";

export function SignOutButton() {
  const { isAuthenticated } = useConvexAuth();
  const { signOut } = useAuthActions();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <button
      className="px-6 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition-all duration-200 border border-blue-400/50 hover:border-blue-400 shadow-lg shadow-blue-500/20"
      onClick={() => void signOut()}
    >
      Sign out
    </button>
  );
}