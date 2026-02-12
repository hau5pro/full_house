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

Copy `src/content/template.md` into `src/content/recipes/<category>/` and fill it in. Images are served from the CDN configured in `src/config.ts`.

## Images & CDN

Recipe images are stored in Cloudflare R2 and served via CDN. The local working directory is `scripts/media/`.

**Optimizing images:**

```sh
npm run optimize
```

This converts any `.png`, `.jpg`, `.jpeg`, `.webp` or `.gif` files in `scripts/media/` to WebP (quality 80, max 1280px wide) with an `opt-` prefix, then removes the originals. Reference the optimized filename in recipe frontmatter (e.g., `image: "opt-default.webp"`).

**Syncing with R2:**

```sh
npm run r2 -- push            # Upload all images in scripts/media/
npm run r2 -- push file.webp  # Upload specific file(s)
npm run r2 -- pull            # Download all images from R2
npm run r2 -- pull file.webp  # Download specific file(s)
npm run r2 -- ls              # List remote files
```

Requires [rclone](https://rclone.org/) configured with a remote named `r2` pointing to the R2 bucket.

**Typical workflow:** drop a source image into `scripts/media/`, run `npm run optimize`, then `npm run r2 -- push`.

## Commands

| Command            | Action                               |
| :----------------- | :----------------------------------- |
| `npm install`      | Install dependencies                 |
| `npm run dev`      | Start dev server at `localhost:4321` |
| `npm run build`    | Build production site to `./dist/`   |
| `npm run preview`  | Preview the build locally            |
| `npm run optimize` | Optimize images in `scripts/media/`  |
| `npm run r2`       | Sync images with Cloudflare R2       |
