# Full House

Personal cookbook built with Astro 5. Recipes are markdown files with structured frontmatter.

## Commands

- `npm run dev` — dev server at localhost:4321
- `npm run build` — production build to ./dist/
- `npm run optimize` — convert images in scripts/media/ to WebP
- `npm run r2 -- push` — upload images to Cloudflare R2

## Project Structure

- `src/content/recipes/<category>/<recipe>.md` — recipe files grouped by category
- `src/content/template.md` — copy this to create new recipes
- `src/content.config.ts` — Zod schema for recipe frontmatter
- `src/components/` — reusable Astro components (e.g. TagChips)
- `src/pages/index.astro` — homepage, lists recipes by category
- `src/pages/recipes/[...slug].astro` — individual recipe page
- `src/styles/global.css` — design tokens and shared styles
- `src/styles/recipe.css` — recipe detail page styles
- `src/config.ts` — CDN base URL
- `src/infrastructure/constants.ts` — shared constants (use these, don't hardcode)
- `scripts/r2-media.sh` — R2 push/pull/ls
- `scripts/optimize-images.ts` — image optimization with sharp

## Recipe Frontmatter Schema

```yaml
title: "Recipe Name"
description: "Short hook about the dish."
image: "opt-filename.webp"
tags: ["tag1", "multi-word-tag"]
meta:
  prepTime: "10 min"
  cookTime: "30 min"
  servings: "4"
nutrition:          # optional
  servingSize: "1 cup"
  calories: 200
  protein: "10g"
  carbs: "20g"
  fat: "8g"
```

- `meta` groups servings, prepTime, cookTime, fermentTime, marinadeTime, and authentic (optional boolean)
- `nutrition` is optional, all other top-level fields are required (except description)
- Images reference optimized filenames from the CDN (prefixed with `opt-`)
- Never change the `image` field during audits — image names are managed manually

## Recipe Content

- Ingredients are lowercase (e.g. `- 1/2 cup flour`, not `- 1/2 Cup Flour`)
- Ingredient names are italicized for amber accent (e.g. `- 1/2 cup _flour_`)
- Use abbreviations for units (tsp, tbsp, oz, lb, g, kg, ml, L, qt, gal)
- Sections follow the order: Ingredients, Directions, Notes
- Ingredients and Notes use unordered lists (`-`), Directions use ordered lists (`1.`)
- Directions should be short and direct — no filler or over-explanation
- Notes use bold labels (e.g. `**Storage:**`, `**Substitution:**`)
- Tags are lowercase and use hyphens as delimiters (e.g. `hash-brown`, not `hash_brown` or `hashBrown`)
- Check for spelling and grammar errors in all text (description, ingredients, directions, notes)

## Conventions

- No inline styles — use CSS classes
- No inline `<style>` or `<script>` tags — keep styles in `src/styles/` and scripts in `src/scripts/`
- Shared constants live in `src/infrastructure/constants.ts`
- Tag chips use the `TagChips` component (supports `limit` prop for cards)
- Tag chip styles live in global.css since they're used on multiple pages
- Verify changes build cleanly with `npm run build`
