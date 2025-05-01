import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { SignInForm } from "./SignInForm";
import { SignOutButton } from "./SignOutButton";
import { ImageGenerator } from "./ImageGenerator";
import { Toaster } from "sonner";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-black via-blue-950 to-black text-white">
      <header className="sticky top-0 z-10 bg-black/20 backdrop-blur-lg p-6 flex justify-between items-center border-b border-blue-900/30">
        <h2 className="text-2xl font-bold">
          <span className="text-blue-400">AI</span>
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Vision</span>
        </h2>
        <SignOutButton />
      </header>
      <main className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-6xl mx-auto">
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
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-12">
      <Unauthenticated>
        <div className="text-center space-y-12">
          <div className="space-y-6">
            <h1 className="text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Transform Your Words
              </span>
              <br />
              <span className="text-white">into</span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-blue-500 to-blue-400 bg-clip-text text-transparent">
                Stunning Visuals
              </span>
            </h1>
            <p className="text-xl text-blue-200/80 max-w-3xl mx-auto leading-relaxed">
              Experience the future of creative expression with our cutting-edge AI image generation technology. 
              Turn your imagination into breathtaking visuals with unprecedented precision and artistic flair.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="group relative overflow-hidden rounded-2xl">
              <img 
                src="https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg" 
                alt="AI Technology" 
                className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-blue-400">Instant Creation</h3>
                  <p className="text-blue-100/90">Transform your ideas into stunning images in seconds with our state-of-the-art AI technology</p>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl">
              <img 
                src="https://images.pexels.com/photos/8386422/pexels-photo-8386422.jpeg" 
                alt="High Quality Results" 
                className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-blue-400">Unmatched Quality</h3>
                  <p className="text-blue-100/90">Generate ultra-high resolution images with incredible detail and artistic sophistication</p>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl">
              <img 
                src="https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg" 
                alt="Creative Control" 
                className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-blue-400">Complete Control</h3>
                  <p className="text-blue-100/90">Fine-tune every aspect of your creation with advanced parameters and reference images</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-blue-900/30"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 text-sm text-blue-400 bg-[#020617]">Ready to Create?</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto items-center">
            <div className="space-y-6 text-left">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Start Your Creative Journey
              </h2>
              <div className="space-y-4 text-blue-200/80">
                <p className="flex items-center gap-2">
                  <span className="text-blue-500">✓</span>
                  Access to cutting-edge AI image generation
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-blue-500">✓</span>
                  Create unlimited unique visuals
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-blue-500">✓</span>
                  Advanced customization options
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-blue-500">✓</span>
                  Personal image gallery
                </p>
              </div>
            </div>
            
            <div className="backdrop-blur-xl bg-blue-950/20 rounded-2xl border border-blue-500/20 p-8">
              <SignInForm />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            <img 
              src="https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg" 
              alt="AI Generated Art Example 1" 
              className="w-full h-32 object-cover rounded-lg"
            />
            <img 
              src="https://images.pexels.com/photos/8386422/pexels-photo-8386422.jpeg" 
              alt="AI Generated Art Example 2" 
              className="w-full h-32 object-cover rounded-lg"
            />
            <img 
              src="https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg" 
              alt="AI Generated Art Example 3" 
              className="w-full h-32 object-cover rounded-lg"
            />
            <img 
              src="https://images.pexels.com/photos/8386424/pexels-photo-8386424.jpeg" 
              alt="AI Generated Art Example 4" 
              className="w-full h-32 object-cover rounded-lg"
            />
          </div>
        </div>
      </Unauthenticated>
      
      <Authenticated>
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent mb-4">
            AI Image Studio
          </h1>
          <p className="text-xl text-blue-200/80 max-w-2xl mx-auto">
            Welcome back, {loggedInUser?.email ?? "creator"}! Your creative canvas awaits. 
            Transform your ideas into stunning visuals with our advanced AI technology.
          </p>
        </div>
        <ImageGenerator />
      </Authenticated>
    </div>
  );
}