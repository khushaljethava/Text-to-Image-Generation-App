"use node";

import { v } from "convex/values";
import { action } from "./_generated/server";
import { internal } from "./_generated/api";
import { Client } from "@gradio/client";

interface FileData {
  path: string;
  url: string;
  size: number | null;
  orig_name: string;
  mime_type: string | null;
  is_stream: boolean;
  meta: {
    _type: string;
  };
}

export const generate = action({
  args: {
    prompt: v.string(),
    width: v.number(),
    height: v.number(),
    guidance: v.number(),
    numSteps: v.number(),
    seed: v.number(),
    refImage1: v.optional(v.string()),
    refImage2: v.optional(v.string()),
    refImage3: v.optional(v.string()),
    refImage4: v.optional(v.string()),
  },
  returns: v.union(v.string(), v.null()),
  handler: async (ctx, args) => {
    try {
      console.log("Starting image generation with args:", args);

      // Connect to the Gradio client
      const client = await Client.connect("bytedance-research/UNO-FLUX");

      // Prepare the input data
      const input = {
        prompt: args.prompt,
        width: args.width,
        height: args.height,
        guidance: args.guidance,
        num_steps: args.numSteps,
        seed: args.seed,
        image_prompt1: args.refImage1 ? await (await fetch(args.refImage1)).blob() : null,
        image_prompt2: args.refImage2 ? await (await fetch(args.refImage2)).blob() : null,
        image_prompt3: args.refImage3 ? await (await fetch(args.refImage3)).blob() : null,
        image_prompt4: args.refImage4 ? await (await fetch(args.refImage4)).blob() : null,
      };

      console.log("Sending request to Gradio API...");
      const result = await client.predict("/gradio_generate", input);
      console.log("Received response from Gradio API:", result);

      if (!result.data || !Array.isArray(result.data) || !result.data[0]) {
        throw new Error("Invalid response from image generation API");
      }

      const fileData = result.data[0] as FileData;
      console.log("Successfully generated image:", fileData);

      if (!fileData.url) {
        throw new Error("No URL in the generated image response");
      }

      // Save the image to the database
      try {
        await ctx.runMutation(internal.images.saveImage, {
          prompt: args.prompt,
          imageUrl: fileData.url,
          width: args.width,
          height: args.height,
        });
      } catch (error) {
        console.error("Failed to save image to database:", error);
        // Don't throw here - we still want to return the image URL even if saving fails
      }

      return fileData.url;
    } catch (error) {
      console.error("Image generation failed:", error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Image generation failed: ${errorMessage}`);
    }
  },
});
