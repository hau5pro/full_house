Audit the recipe file at src/content/recipes/$ARGUMENTS against the CLAUDE.md conventions. Read the recipe file and check each of the following:

## Frontmatter
- All required fields present (title, image, tags, meta)
- description is a short hook, not generic filler
- tags are relevant and lowercase — add missing tags but don't remove existing ones unless they're obvious placeholders
- Don't use the category folder name as a tag (e.g. a recipe in `sides/` should not have a "side" or "sides" tag)
- Tag order: cuisine/culture first (e.g. "thai", "greek"), then dietary (e.g. "vegetarian", "gluten-free"), then key ingredients (e.g. "tofu", "rice"), then everything else
- meta times are realistic for the recipe
- Never change the image field

## Ingredients
- All lowercase
- Ingredient names italicized with _underscores_ (not asterisks)
- Substitute/optional ingredient names inside parentheses are also italicized (e.g. `(or _vegetable oil_)`, `(sub 1 cup jarred _salsa_)`)
- Quantities use fractions where appropriate
- Units abbreviated (tsp, tbsp, oz, lb, g, kg, ml, L, qt, gal)

## Directions
- Short and direct — no filler words or over-explanation
- Each step is one clear action
- No "your", "you should", "you want to", or similar padding
- Rewrite any wordy steps to be concise

## Notes
- Use bold labels (e.g. **Storage:**)
- Keep each note to 1-2 sentences max
- Cut filler and redundancy

## List formatting
- Ingredients and Notes use unordered lists (`-`)
- Directions use ordered lists with ascending numbers (`1.`, `2.`, `3.`, etc.)

## Section order
- Ingredients, Directions, Notes (in that order)

## Spelling & grammar
- Check all text for spelling and grammar errors (description, ingredients, directions, notes)

## Output
For each issue found, show the original line and your suggested fix. Then apply all fixes to the file.
