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



