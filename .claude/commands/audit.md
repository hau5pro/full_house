Audit the recipe file at src/content/recipes/$ARGUMENTS against the CLAUDE.md conventions. Read the recipe file and check each of the following:

## Frontmatter
- All required fields present (title, image, tags, meta)
- description is a short hook, not generic filler
- tags are relevant and lowercase
- meta times are realistic for the recipe

## Ingredients
- All lowercase
- Ingredient names italicized with *asterisks* (not underscores)
- Quantities use fractions where appropriate

## Directions
- Short and direct — no filler words or over-explanation
- Each step is one clear action
- No "your", "you should", "you want to", or similar padding
- Rewrite any wordy steps to be concise

## Notes
- Use bold labels (e.g. **Storage:**)
- Keep each note to 1-2 sentences max
- Cut filler and redundancy

## Section order
- Ingredients, Directions, Notes (in that order)

## Output
For each issue found, show the original line and your suggested fix. Then apply all fixes to the file.
