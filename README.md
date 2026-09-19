# kuranix® — monochrome portfolio

Portfolio site in black & white editorial style. No build step — ready for **GitHub Pages**.

## Structure

```
index.html      — hero · selected works · about · stack · journey · contact
css/style.css   — monochrome theme + animations + work covers
js/main.js      — cursor, canvas network, typer, reveal, tilt, active nav
404.html        — custom 404
.nojekyll       — disable Jekyll on Pages
```

## Sections

- **Hero** — identity card, typing lines, stats
- **01 / Work** — 4 featured works: Cardinal (container runtime, Go), GHOST (custom AI/LLM), Minecraft systems, Devtools & bots — each with CSS-only cover art
- **02 / About** — bio + "what I can do for you" services
- **03 / Stack** — languages · AI/ML · infrastructure · web/data/minecraft with focus dots
- **04 / Journey** — current fronts timeline + philosophy quote
- **05 / Contact** — giant CTA + link cards

## Effects

Preloader with rotating words · custom cursor + magnetic buttons · particle network canvas · scramble title · typing lines · scroll reveal · 3D tilt cards · animated work covers · marquee · scroll progress · active nav highlight · invert theme (◐, saved) · animated counters · film-grain noise

## Publish on GitHub Pages (2 min)

**Option A — user site `kuranix.github.io`:**
1. Create repo named exactly `kuranix.github.io`
2. Upload all files to repo root (`index.html` must be in root)
3. `Settings → Pages → Deploy from a branch → main / (root)`
4. Open `https://kuranix.github.io`

**Option B — project site:**
1. Create any repo, e.g. `portfolio`, upload files to root
2. `Settings → Pages → Deploy from a branch → main / (root)`
3. Open `https://kuranix.github.io/portfolio/`

Via terminal:
```bash
git init
git add .
git commit -m "feat: portfolio v4"
git branch -M main
git remote add origin https://github.com/kuranix/kuranix.github.io.git
git push -u origin main
```

## Links (already wired)

- https://github.com/kuranix
- https://cardinal.work.gd/

## Edit your links

Open `index.html`, find block `EDIT ME` in the contact section and replace `#` with your Telegram / Discord / email.

## Local preview

Just open `index.html` in browser, or:

```bash
python -m http.server 8000
# → http://localhost:8000
```

Strictly B/W: only `#000/#fff` + grays, no accent colors.
