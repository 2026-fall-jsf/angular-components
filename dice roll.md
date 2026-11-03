# Dice Roll Component

## Prompts (exact words)

1. lets plan to create a dice rolling component. initially im thinking about rolling a single d6, what else should i consider?
2. Start implementation
3. i dont like just the number. can we use some sort of icon, emoji, or some sort of visual element to show its a dice
4. why is the alignment off? lets have button and ice graphic on the same vertical line
5. move it to the start of the component not the middle.
6. can you add animations to the dice roll? starting fast then slowing before showing final result. maybe even confetti at the end
7. can you create a dice roll.md file with all my prompts, exact words and a brief summary of what you built

## Summary of what was built

A standalone Angular component, `DiceRoller` (`src/app/dice-roller/`), registered in `app.ts` and rendered in `app.html` as `<app-dice-roller>`.

- **Structure:** Material card with a title, a die graphic, a status label and a Roll button. Inputs: `title` (default "Dice Roller") and `sides` (default 6).
- **Rolling:** Uses signals. The final value is chosen up front; the die then cycles through random faces, starting fast (~50 ms) and slowing down each step before landing on the result.
- **Visuals:** Unicode die faces (⚀–⚅), a 🎲 placeholder before the first roll or for non-d6 values, and a shake effect while rolling.
- **Confetti:** A CSS-only burst of 30 coloured pieces after the roll finishes.
- **Layout:** Die, label and button are left-aligned on a shared vertical line.
- **Accessibility:** The status label is an `aria-live` region, the glyphs are hidden from screen readers, the button is disabled while rolling, and `prefers-reduced-motion` gives an instant result with no animation.
- **Cleanup:** Timers are cleared when the component is destroyed.
