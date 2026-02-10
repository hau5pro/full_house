import { defineCollection, z } from "astro:content";

import { glob } from "astro/loaders";

const recipes = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/recipes" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    image: z.string(),
    tags: z.array(z.string()).default([]),
    prepTime: z.string().optional(),
    cookTime: z.string().optional(),
  }),
});

export const collections = { recipes };
