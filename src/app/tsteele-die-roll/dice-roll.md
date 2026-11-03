# Dice Roll Component

## Prompts

1. lets build a new component at the bottom of this app, how about a button to roll a six sided die, on a material design card , b, b, blah
2. how about a dice icon, or emoji, and animated while rolling, drama, drama, drama, material design theme and icons, simplest animation possible, no external deps
3. just spinning icon, not whatever you have there with color, also don't need dice icon, and big number for the result, just the dice icon
4. no spinning icon next to button, not on button, then result is the dice icon, not a number
5. can it just spin, not get bigger, in fact spin the icon of the last result, then when it stops, see new result
6. can the spin slow down before ending, drama
7. hmm, maybe the dice should change its value when spinning
8. how about a dice-roll.md file with all my prompts exactly, and a brief brief summary of what you did

## Summary

Added `TsteeleDieRoll` (`app-tsteele-die-roll`), a Material card at the bottom of the app with a "Roll the die" button and a large Unicode die face (⚀–⚅) beside it. On click the die spins four turns over 2 seconds with a CSS ease-out, cycling through random faces that slow down with the spin; the face it stops on is the result. No external dependencies.
