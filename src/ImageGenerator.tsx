import { useState, useRef } from "react";
import { useAction, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { toast } from "sonner";

export function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [width, setWidth] = useState(512);
  const [height, setHeight] = useState(512);
  const [guidance, setGuidance] = useState(4);
  const [numSteps, setNumSteps] = useState(25);
  const [seed, setSeed] = useState(-1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [refImages, setRefImages] = useState<string[]>([]);
  
  const fileInputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];
  
  const generate = useAction(api.imageGeneration.generate);
  const images = useQuery(api.images.listUserImages);

  const handleImageUpload = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const newRefImages = [...refImages];
      newRefImages[index] = reader.result as string;
      setRefImages(newRefImages);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = (index: number) => {
    const newRefImages = [...refImages];
    newRefImages[index] = "";
    setRefImages(newRefImages);
    if (fileInputRefs[index].current) {
      fileInputRefs[index].current!.value = "";
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Submit button clicked!"); // Debug log

    if (!prompt) {
      toast.error("Please enter a prompt");
      return;
    }

    try {
      const params = {
        prompt,
        width,
        height,
        guidance,
        numSteps,
        seed,
        refImage1: refImages[0] || undefined,
        refImage2: refImages[1] || undefined,
        refImage3: refImages[2] || undefined,
        refImage4: refImages[3] || undefined,
      };
      
      console.log("Starting image generation with params:", params); // Debug log
      
      setIsGenerating(true);
      toast.info("Starting image generation...");
      
      const result = await generate(params);
      console.log("Generation result:", result); // Debug log

      if (!result) {
        throw new Error("No result from image generation");
      }

      toast.success("Image generated successfully!");
      setPrompt("");
    } catch (error) {
      console.error("Image generation failed:", error);
      toast.error(error instanceof Error ? error.message : "Failed to generate image");
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <div className="space-y-8 p-4 max-w-4xl mx-auto">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
          AI Image Generator
        </h1>
        <p className="text-gray-400">
          Create unique images from text descriptions
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-gray-900 p-6 rounded-xl shadow-xl">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Prompt
          </label>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your image..."
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Width: {width}px
            </label>
            <input
              type="range"
              min="256"
              max="1024"
              step="64"
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Height: {height}px
            </label>
            <input
              type="range"
              min="256"
              max="1024"
              step="64"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Guidance: {guidance}
            </label>
            <input
              type="range"
              min="1"
              max="20"
              value={guidance}
              onChange={(e) => setGuidance(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Steps: {numSteps}
            </label>
            <input
              type="range"
              min="1"
              max="50"
              value={numSteps}
              onChange={(e) => setNumSteps(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="space-y-2 col-span-2">
            <label className="block text-sm font-medium text-gray-300">
              Seed ({seed === -1 ? "random" : seed})
            </label>
            <input
              type="number"
              value={seed}
              onChange={(e) => setSeed(Number(e.target.value))}
              min="-1"
              placeholder="Enter seed (-1 for random)"
              className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-200">Reference Images (Optional)</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[0, 1, 2, 3].map((index) => (
              <div key={index} className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  Reference Image {index + 1}
                </label>
                <div className="relative">
                  {refImages[index] ? (
                    <div className="relative">
                      <img
                        src={refImages[index]}
                        alt={`Reference ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload(index)}
                      ref={fileInputRefs[index]}
                      className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isGenerating || !prompt}
          onClick={() => console.log("Button clicked!")} // Extra debug log
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
        >
          {isGenerating ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Generating...</span>
            </div>
          ) : (
            "Generate Image"
          )}
        </button>
      </form>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-200">Your Generations</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images?.map((image) => (
            <div key={image._id} className="relative group">
              <img
                src={image.imageUrl}
                alt={image.prompt}
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-end p-3">
                <p className="text-sm text-white line-clamp-2">{image.prompt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
