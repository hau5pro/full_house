import { defineCollection, z } from "astro:content";

import { glob } from "astro/loaders";

const recipes = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/recipes" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    image: z.string(),
    portraitImage: z.boolean().optional(),
    tags: z.array(z.string()).default([]),
    meta: z
      .object({
        prepTime: z.string().optional(),
        cookTime: z.string().optional(),
        fermentTime: z.string().optional(),
        marinadeTime: z.string().optional(),
        servings: z.string().optional(),
      })
      .optional(),
    nutrition: z
      .object({
        servingSize: z.string().optional(),
        calories: z.number().optional(),
        protein: z.string().optional(),
        carbs: z.string().optional(),
        fat: z.string().optional(),
      })
      .optional(),
  }),
});

export const collections = { recipes };
