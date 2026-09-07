# AGENTS.md

This repository is for building a personal website against provided visual references.

## Core Rule

Do not stop at implementation. Do not stop at "looks close." Do not stop at "good enough."

The task is only complete when you have verified with high confidence that the website matches the provided reference design exactly, including layout, spacing, sizing, typography, colors, hierarchy, alignment, section order, visual density, and responsive behavior.

If you cannot verify an exact match, do not claim success.

## Required Workflow

1. Build the website to match the provided design image or images as closely as possible.
2. Run the website locally.
3. Use the Codex in-app Browser for browser-based verification.
4. Open the local site in the browser.
5. Capture screenshots of the implemented page at the relevant viewport sizes.
6. Compare the implementation screenshots against the provided reference image or images.
7. Identify every visible mismatch, including small spacing, sizing, alignment, font, color, radius, padding, margin, image, icon, and responsive differences.
8. Fix the mismatches.
9. Repeat this loop until there are no visible differences left.

## Verification Standard

You must verify all of the following before considering the task complete:

- The visual structure matches the reference exactly.
- The spacing and alignment match the reference exactly.
- The typography scale, weight, line length, and line spacing match the reference exactly.
- Colors, borders, shadows, and visual emphasis match the reference exactly.
- Images, illustrations, icons, and decorative elements are placed and sized correctly.
- Desktop and mobile behavior match the intent of the reference.
- The final implementation screenshot is effectively indistinguishable from the reference.

## Required Tools

- Use the Codex in-app Browser whenever browser interaction, screenshot capture, or visual checking is needed.
- Use any additional available tools needed to run the project, inspect the code, and iterate on fixes.
- If helpful, take multiple screenshots at different scroll positions or viewport sizes.
- If helpful, zoom in and inspect suspicious areas rather than assuming they are correct.

## Comparison Rules

- Do not rely on memory alone.
- Do not assume a section is correct without checking it.
- Do not stop after one screenshot pass.
- Do side-by-side comparison against the reference image.
- Check the whole page, not just the hero section.
- Re-check after every meaningful visual change.

## Failure Rules

- Never say the page is finished if you have not visually verified it.
- Never say the page matches if there are still visible differences.
- Never stop because the page is "very close" or "close enough."
- Never stop because most sections look right.
- Never stop without screenshot-based verification.

## Persistence Rule

Keep iterating until one of these is true:

- You can honestly confirm the implementation matches the reference exactly.
- A concrete blocker prevents further progress, and you clearly describe that blocker.

Do not end the task while unresolved visual mismatches remain.

## Completion Requirement

Before declaring success, explicitly confirm that:

- The website was run locally.
- The page was opened in the browser.
- Screenshots were taken.
- The screenshots were compared against the provided reference.
- Any detected differences were fixed and re-verified.
- You are fully confident the final result matches the reference.

If any of the above did not happen, the task is not complete.
