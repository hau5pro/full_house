# Full House

A personal cookbook built with [Astro](https://astro.build). Recipes are written in Markdown and organized by category.

## Project Structure

```
src/
  config.ts              # CDN and site configuration
  content/
    recipes/             # Markdown recipe files, grouped by category
      basics/
        boiled-eggs.md
  layouts/
    base-layout.astro    # Shared page layout
  pages/
    index.astro          # Homepage — lists all recipes by category
    recipes/
      [...slug].astro    # Individual recipe page
  styles/
    global.css           # Design tokens and base styles
    recipe.css           # Recipe page styles
```

## Adding a Recipe

Create a new `.md` file under `src/content/recipes/<category>/`:

```md
---
title: "Recipe Name"
description: "A short description of the dish."
image: "filename.webp"
prepTime: "10 min"
cookTime: "30 min"
tags: ["tag1", "tag2"]
---

## Ingredients

- Item one
- Item two

## Directions

1. Step one
2. Step two

## Notes

- Optional tips
```

Images are served from the CDN configured in `src/config.ts`.

## Commands

| Command          | Action                                  |
| :--------------- | :-------------------------------------- |
| `npm install`    | Install dependencies                    |
| `npm run dev`    | Start dev server at `localhost:4321`    |
| `npm run build`  | Build production site to `./dist/`      |
| `npm run preview`| Preview the build locally               |
