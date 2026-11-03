# Dice Roll Component

## Prompts (exact words)

1. lets plan to create a dice rolling component, initially i am thinking about rolling a single d6, what else should i consider
2. Start implementation
3. i dont like the number, can we use an icon or emoji or unicode char to represent dice rolled
4. why is the alignment off, lets have button and dice result on same line
5. how about center vertical alignment
6. can the dice animate while rolling, starting fast, then slowing before showing final result, drama, maybe even confetti at the end
7. can you create a dice-roll.md file with all my prompts, exact words, and a brief brief summary of what you built

## Summary

Built a standalone Angular component, `app-dice-roller` (`src/app/dice-roller/`), using Angular Material and signals, and added it to `app.ts` and `app.html`.

- Rolls a die with a configurable `sides` input (default 6) and a `title` input.
- Shows Unicode die faces (⚀–⚅) for a d6, 🎲 before the first roll, and plain numbers for other die sizes.
- Roll button and die sit on one vertically centered row.
- Rolling animation: random faces start fast and slow down before landing on the final result, with a wobble. The button is disabled while rolling.
- CSS confetti burst on landing.
- Respects `prefers-reduced-motion`. Screen readers hear only the final result.
