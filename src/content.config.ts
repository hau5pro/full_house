import { defineCollection, z } from "astro:content";

import { glob } from "astro/loaders";

const recipes = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/recipes" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    image: z.string(),
    tags: z.array(z.string()).default([]),
    meta: z.object({
      prepTime: z.string().optional(),
      cookTime: z.string().optional(),
      servings: z.string().optional(),
    }).optional(),
    nutrition: z.object({
      servingSize: z.string(),
      calories: z.number(),
      protein: z.string(),
      carbs: z.string(),
      fat: z.string(),
    }).optional(),
  }),
});

export const collections = { recipes };
