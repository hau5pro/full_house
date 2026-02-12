# Full House

A personal cookbook built with [Astro](https://astro.build). Recipes are written in Markdown and organized by category.

## Authoring Workflow

### 1. Create the recipe file

Copy the template into the appropriate category folder:

```sh
cp src/content/template.md src/content/recipes/<category>/<recipe-name>.md
```

Fill in the frontmatter (title, description, image, tags, meta) and write the recipe content following the section order: **Ingredients, Directions, Notes**.

### 2. Optimize the image

Drop the raw image into `scripts/media/`, then run:

```sh
npm run optimize
```

This converts images to WebP (quality 80, max 1280px wide) with an `opt-` prefix and removes the originals. Update the recipe's `image` field to match (e.g. `image: "opt-my-dish.webp"`).

### 3. Push to CDN

```sh
npm run r2 -- push
```

Only changed files are uploaded. Use `npm run r2 -- ls` to check what's already on remote, or push specific files with `npm run r2 -- push file.webp`.

Requires [rclone](https://rclone.org/) configured with a remote named `r2` pointing to the R2 bucket.

### 4. Audit the recipe

Run the Claude Code slash command:

```
/audit <category>/<recipe-name>.md
```

This checks the recipe against project conventions — frontmatter fields, ingredient formatting, direction conciseness, and note structure — then shows issues and applies fixes.

### 5. Build and verify

```sh
npm run build
```

## Commands

| Command            | Action                               |
| :----------------- | :----------------------------------- |
| `npm install`      | Install dependencies                 |
| `npm run dev`      | Start dev server at `localhost:4321` |
| `npm run build`    | Build production site to `./dist/`   |
| `npm run preview`  | Preview the build locally            |
| `npm run optimize` | Optimize images in `scripts/media/`  |
| `npm run r2`       | Sync images with Cloudflare R2       |

## Project Structure

```
src/
  config.ts              # CDN and site configuration
  content/
    template.md          # Copy this to start a new recipe
    recipes/             # Markdown recipe files, grouped by category
  components/            # Reusable Astro components
  layouts/
    base-layout.astro    # Shared page layout
  pages/
    index.astro          # Homepage — lists all recipes by category
    recipes/
      [...slug].astro    # Individual recipe page
  styles/
    global.css           # Design tokens and base styles
    recipe.css           # Recipe page styles
scripts/
  optimize-images.ts     # Image optimization with sharp
  r2-media.sh            # R2 push/pull/ls
```
