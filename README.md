# GSoC 2025 — SU2 GUI: Static Site

This repo serves a static website built from `GSoC.md` content. It’s a zero-build site that works on GitHub Pages.

## Preview locally (Windows PowerShell)

```powershell
# From the repo root
$port = 5500; python -m http.server $port -b 127.0.0.1
```
Then open http://127.0.0.1:5500 in your browser and click `index.html`.

If `python` isn’t available, use Node instead:
```powershell
npx serve@14 . -l 5500
```

## Deploy to GitHub Pages

1. Create a new public repo (or push this folder to one).
2. Commit and push:
```powershell
git init
git add .
git commit -m "Add GSoC static site"
git branch -M main
# Set your repo URL
$REPO = "https://github.com/<your-username>/<your-repo>.git"
git remote add origin $REPO
git push -u origin main
```
3. In GitHub: Settings → Pages → Build and deployment → Source: `Deploy from a branch`, Branch: `main` `/ (root)`.
4. Wait ~1 minute, your site will be available at:
   - https://<your-username>.github.io/<your-repo>/

If you prefer the special `gh-pages` branch:
```powershell
# Publish current root to gh-pages (or use GitHub Actions below)
git switch --orphan gh-pages
# keep only site files
Remove-Item -Recurse -Force .git
# Re-init and push site-only branch
git init; git add .; git commit -m "Publish site"; git branch -M gh-pages
$REPO = "https://github.com/<your-username>/<your-repo>.git"
git remote add origin $REPO
git push -f origin gh-pages
```
Then set GitHub Pages to use branch `gh-pages`, folder `/ (root)`.

## Optional: GitHub Actions auto-deploy (from main to gh-pages)

Create `.github/workflows/pages.yml`:
```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: .
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## Notes
- The `index.html` reads directly from your curated content; `GSoC.md` is linked for reference.
- Add a `CNAME` file at the project root if you’re using a custom domain.
- Add a `.nojekyll` file to disable Jekyll processing on Pages if needed.
