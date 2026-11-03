# Dice Roll

## Prompts

1. lets pnal to create a dice rolling component, initially i am thinking about rolling a single d6, what else should i consider
2. Add it to the end of the components and also use some icons or unidcodes make it actually look like a dice
3. Can the dice animate while rolling starting fast and the slowing before showing the final result, drama, maybe even confetti at the end
4. Can you create a dice-roll.md with all my prompts word of word, including this one and a short summary of the component

## Component summary

`EgaritaDiceRoller` (`src/app/egarita-dice-roller/`, selector `app-egarita-dice-roller`) is a standalone Angular component that rolls a single six-sided die.

- Shows the result as a large Unicode die face (⚀–⚅) with the number below; a faded 🎲 is shown before the first roll.
- Rolling animates the face, starting fast and slowing down before landing on the final result, with a wobble effect.
- The Roll button is disabled while rolling.
- A CSS-only confetti burst plays after each roll.
- Respects `prefers-reduced-motion` and announces results via `aria-live`.
- Built with a signal for state, Angular Material card and button, and placed last in `app.html`.
