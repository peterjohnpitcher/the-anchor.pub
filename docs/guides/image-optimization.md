# Image Optimisation Workflow

This project now ships with a repeatable, scriptable image optimisation flow that keeps the blog bundle well below Vercel’s serverless limits.

## TL;DR

- Optimise everything after adding or updating media:  
  ```bash
  npm run optimize:images
  ```
- The script automatically walks `content/blog` and `public/images`, resizing any over-sized assets and re-encoding JPEG/PNG/WebP files with efficient settings.
- Pass extra directories to the script if you need to process other folders:  
  ```bash
  npm run optimize:images -- path/to/custom-assets another/folder
  ```

## What the script does

| Step | Behaviour |
| ---- | --------- |
| Discovery | Recurses through the target directories, ignoring build artefacts (`.next`, `node_modules`, `.backup`, etc.). |
| File filter | Processes only `.jpg`, `.jpeg`, `.png`, and `.webp` files larger than 40 KB. Smaller files are assumed to be already efficient. |
| Resizing | Blog imagery is capped at 1600 × 1000 px, all other assets at 1920 × 1080 px. Images are resized with `fit: inside`, so smaller assets are never enlarged. |
| Re-encoding | JPEG: quality 78 with mozJPEG + progressive scan. PNG: maximum compression with palette quantisation. WebP: quality 80. |
| Safety check | The optimised buffer must be at least 2 % smaller before the file is overwritten; otherwise the original is preserved. |
| Reporting | Console output shows every optimised file plus a summary (counts, total bytes saved, run time). The script exits non-zero on fatal errors. |

## Recommended workflow

1. **Before committing media**  
   Run `npm run optimize:images` to ensure nothing bulky slips into git. The script is idempotent, so feel free to run it repeatedly.

2. **Pre-commit enforcement (optional)**  
   Add a Husky hook or lint-staged rule that runs the script when images are staged. Example snippet:
   ```jsonc
   // package.json
   {
     "lint-staged": {
       "*.{png,jpg,jpeg,webp}": "npm run optimize:images --"
     }
   }
   ```
   Combine with a Husky `pre-commit` hook to keep the repo clean automatically.

3. **CI guardrail**  
   Trigger the script inside your CI workflow (GitHub Actions, etc.) and fail the build if changes are detected. Pairing this with a `git diff --exit-code` step ensures pull requests can’t add large, unoptimised files.

4. **Monitoring**  
   Keep an eye on the Vercel build output for “Max serverless function size” warnings. If they reappear, re-run the optimiser and check for unusually large new assets.

## Customising the optimiser

Edit `scripts/optimize-images.js` to tweak thresholds:

- `maxWidth` / `maxHeight` – default cap for non-blog assets.
- `blogMaxWidth` / `blogMaxHeight` – tighter bounds for blog imagery.
- `sizeThreshold` – minimum file size that triggers optimisation (40 KB by default).
- `jpegQuality`, `pngCompressionLevel`, `webpQuality` – format-specific settings.
- `minSavingRatio` – percentage of minimum savings required before overwriting (2 %).

Run the script with alternative directories or integrate it into other tooling as needed. Since the optimiser only writes when there’s a measurable win, it’s safe to include in automated pipelines.
