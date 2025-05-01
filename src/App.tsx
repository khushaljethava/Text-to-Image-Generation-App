import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { SignInForm } from "./SignInForm";
import { SignOutButton } from "./SignOutButton";
import { ImageGenerator } from "./ImageGenerator";
import { Toaster } from "sonner";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <header className="sticky top-0 z-10 bg-black/80 backdrop-blur-sm p-4 flex justify-between items-center border-b border-gray-800">
        <h2 className="text-xl font-semibold text-blue-400">AI Image Generator</h2>
        <SignOutButton />
      </header>
      <main className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-4xl mx-auto">
          <Content />
        </div>
      </main>
      <Toaster />
    </div>
  );
}

function Content() {
  const loggedInUser = useQuery(api.auth.loggedInUser);

  if (loggedInUser === undefined) {
    return (
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="text-center">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent mb-4">
          AI Image Generator
        </h1>
        <Authenticated>
          <p className="text-xl text-gray-400">
            Welcome back, {loggedInUser?.email ?? "creator"}!
          </p>
        </Authenticated>
        <Unauthenticated>
          <p className="text-xl text-gray-400">Sign in to start creating</p>
        </Unauthenticated>
      </div>

      <Authenticated>
        <ImageGenerator />
      </Authenticated>
      
      <Unauthenticated>
        <SignInForm />
      </Unauthenticated>
    </div>
  );
}
