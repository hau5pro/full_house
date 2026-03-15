Audit the recipe file at src/content/recipes/$ARGUMENTS against the CLAUDE.md conventions. Read the recipe file and check each of the following:

## Frontmatter
- All required fields present (title, image, tags, meta)
- If a `draft` field is present, set it to `false`
- description is a short hook, not generic filler
- tags are relevant and lowercase — add missing tags but don't remove existing ones unless they're obvious placeholders
- Don't use the category folder name as a tag (e.g. a recipe in `sides/` should not have a "side" or "sides" tag)
- Tag order: cuisine/culture first (e.g. "thai", "greek"), then dietary (e.g. "vegetarian", "gluten-free"), then key ingredients (e.g. "tofu", "rice"), then everything else
- meta times are realistic for the recipe
- `servings` must be a single integer (e.g. `"4"`), not a range (e.g. `"4-6"`) — pick the most representative value
- Never change the image field

## Ingredients
- All lowercase
- Ingredient names italicized with _underscores_ (not asterisks)
- Substitute/optional ingredient names inside parentheses are also italicized (e.g. `(or _vegetable oil_)`, `(sub 1 cup jarred _salsa_)`)
- Quantities use fractions where appropriate — write them as plain text (e.g. `1/2`, `3/4`, `1 1/2`), never unicode characters (e.g. `½`, `¾`) — a remark plugin handles the conversion at build time
- Units abbreviated (tsp, tbsp, oz, lb, g, kg, ml, L, qt, gal)
- Prep state must be declared in the ingredient line, not discovered mid-directions (e.g. `2 cloves _garlic_, minced` — not "mince the garlic" in step 1 with plain `2 cloves _garlic_` in the list)
- Proteins and produce where quantity varies should use weight over count (e.g. `1.5 lb _chicken breast_` not `2 _chicken breasts_`)
- Baking recipes (tagged `baking` or `bread`) should use gram weights for dry ingredients, either exclusively or alongside volume (e.g. `1 cup (120g) _flour_`)

## Directions
- No italicized ingredient names — italics are for the ingredients list only, never in directions
- Short and direct — no filler words or over-explanation
- Each step is one clear action
- No "your", "you should", "you want to", or similar padding
- Rewrite any wordy steps to be concise
- Steps that only give a time with no visual or tactile cue should be flagged — add what to look for (e.g. "cook 5 minutes, until golden at the edges" not just "cook 5 minutes")
- Use precise technique verbs: mix, fold, whisk, and stir are not interchangeable

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
