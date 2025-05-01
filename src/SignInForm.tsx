"use client";
import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";
import { toast } from "sonner";

export function SignInForm() {
  const { signIn } = useAuthActions();
  const [flow, setFlow] = useState<"signIn" | "signUp">("signIn");
  const [submitting, setSubmitting] = useState(false);

  return (
    <div className="w-full max-w-md mx-auto">
      <form
        className="flex flex-col gap-4 bg-blue-900/20 backdrop-blur-sm p-8 rounded-2xl border border-blue-500/20"
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitting(true);
          const formData = new FormData(e.target as HTMLFormElement);
          formData.set("flow", flow);
          void signIn("password", formData).catch((_error) => {
            const toastTitle =
              flow === "signIn"
                ? "Could not sign in, did you mean to sign up?"
                : "Could not sign up, did you mean to sign in?";
            toast.error(toastTitle);
            setSubmitting(false);
          });
        }}
      >
        <input
          className="w-full px-4 py-3 rounded-lg bg-blue-950/50 border-2 border-blue-500/30 focus:border-blue-400 focus:outline-none text-white placeholder-blue-300/50 transition-all"
          type="email"
          name="email"
          placeholder="Email"
          required
        />
        <input
          className="w-full px-4 py-3 rounded-lg bg-blue-950/50 border-2 border-blue-500/30 focus:border-blue-400 focus:outline-none text-white placeholder-blue-300/50 transition-all"
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <button
          className="w-full py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20"
          type="submit"
          disabled={submitting}
        >
          {flow === "signIn" ? "Sign in" : "Sign up"}
        </button>
        <div className="text-center text-sm text-blue-200/70">
          <span>
            {flow === "signIn"
              ? "Don't have an account? "
              : "Already have an account? "}
          </span>
          <button
            type="button"
            className="text-blue-400 hover:text-blue-300 cursor-pointer font-medium"
            onClick={() => setFlow(flow === "signIn" ? "signUp" : "signIn")}
          >
            {flow === "signIn" ? "Sign up instead" : "Sign in instead"}
          </button>
        </div>
      </form>
      <div className="flex items-center justify-center my-6">
        <hr className="grow border-blue-500/20" />
        <span className="mx-4 text-blue-300/50">or</span>
        <hr className="grow border-blue-500/20" />
      </div>
      <button
        className="w-full py-3 rounded-lg bg-blue-900/40 hover:bg-blue-900/60 text-white font-medium transition-all duration-200 border border-blue-500/20 hover:border-blue-500/40"
        onClick={() => void signIn("anonymous")}
      >
        Continue as Guest
      </button>
    </div>
  );
}