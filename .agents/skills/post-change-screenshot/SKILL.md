---
name: post-change-screenshot
description: Capture, inspect, and deliver a current screenshot after changing any user-visible website or application interface in this repository. Use after frontend layout, styling, content, responsive, or interaction changes. Do not use for backend-only or invisible refactors.
---

# Post Change Screenshot

After every user-visible UI change:

1. Run the relevant build or validation command.
2. Open the affected route in a real browser at a representative desktop viewport.
3. Capture the rendered page in `output/playwright/`.
4. Inspect the screenshot before finishing. Fix visible regressions when they are within the requested scope.
5. Include the screenshot as an embedded image in the final response using its absolute path.

Use the Playwright CLI workflow available in the environment. Capture the route that changed, not an unrelated homepage. If hover, focus, open, or selected state is the main change, also capture that state when practical.

Keep screenshot artifacts out of source and public asset directories. A screenshot is required even when the code compiles successfully because compilation does not verify visual output.
