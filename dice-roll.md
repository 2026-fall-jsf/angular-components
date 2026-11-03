# Dice Roll Component

## Prompts

1. lets plan to create a dice rolling component, initially i am thinking about rolling a single d6, what else should i consider
2. Start implementation
3. i dont like the number, can we use an icon or emoji or unicode char to represent the dice rolled
4. why is alignment off, lets have button and dice result on same line
5. cool, but button to the left of dice result
6. how about center vertical alignment
7. but what happened to left margin
8. can the dice animate while rolling, starting fast, then slowing before showing final result, drama, maybe even confetti at the end
9. can you create a dice-roll.md file with all my prompts, exact words, and a brief brief summary of what you built

## Summary

Built `TsteeleDice` (`app-tsteele-dice`) in `src/app/tsteele-dice/`, a standalone Angular Material card registered in `app.ts` and `app.html`.

- A "Roll d6" button sits to the left of the die result, vertically centered.
- The result is shown as a Unicode die face (⚀–⚅), with a number fallback for non-d6 dice via the `sides` input (default 6).
- Rolling animates through random faces, starting fast and slowing down, then lands on the final result with a tumble effect and CSS confetti.
- The button is disabled while rolling. Reduced-motion preferences skip the animation. Timers are cleaned up on destroy.
- The die has an `aria-label` and `aria-live` for accessibility.
- No tests were added, because the project has no test runner installed.
