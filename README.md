# RUMI 3D — words on a spinning solid

A crossword that lives on the surface of a rotating 3D solid. Every **edge** of the shape is a word; every glowing **corner** is a single letter shared by all the words that meet there. Solve the surface, open the faces, and follow the words as they spiral inward to a center that was holding something the whole time.

It's a single self-contained HTML file. No build, no dependencies, no network. Open `index.html` in any modern browser and play.

## How it plays

RUMI 3D is a three-layer dig:

1. **Edges** — solve the words on the cage of the solid. Shared corners hand letters to their neighbors, just like a flat crossword, but wrapped around a shape you can spin.
2. **Faces** — once a face's three edges are solved, a word stretches across it, hung off corners you already filled. The face lights up in its color.
3. **The core** — each solved face releases a *spoke* word that grows from a corner and drives inward. Every spoke converges on the same hidden letter at the center.

Reach the center and it **decodes** into the thing all those words were circling — a short authored poem, quip, or tiny story. The words on the surface are drawn from that theme, so the reveal is something the puzzle was quietly pointing at.

Before each puzzle, RUMI asks what you're bringing to the center; your answer shapes which reward waits there.

## Daily puzzle and free play

- **Daily** — one seeded solid everyone gets on the same day (by local date). Solving it keeps a streak; the share text is spoiler-free.
- **Free play** — pick a mood and a shape. Every puzzle is seeded, so an unfinished game is saved in your browser and resumes when you come back.
- **Hints** — *Hint letter* and *Reveal corner* fill a letter and count as assists. Best times are recorded only for clean solves; *Reveal* records nothing.

## Controls

- **Drag** to rotate · **scroll / pinch** to zoom · **+ / −** buttons or keys to zoom
- **Click** a corner or edge to select a word, then **type** to fill it · click the corner again to switch between the words that share it
- **Tab / Enter / ↑ ↓** — previous or next word · **Space** — rotate the selected word to face you
- **← →** — move along the current word · **Backspace** — clear · **Esc** — close a dialog

On a phone the on-screen keyboard has *‹ word* / *word ›* keys and a *face it* key.

## Shapes

Five all-triangle solids (the deltahedron family), from quick to epic:

| Shape | Faces | Edges | Words |
|-------|------:|------:|------:|
| Tetra | 4 | 6 | 14 |
| Hexa  | 6 | 9 | 21 |
| Octa  | 8 | 12 | 28 |
| Deca  | 10 | 15 | 35 |
| Icosa | 20 | 30 | 70 |

Words = edges + one face word per face + one spoke word per face.

## Running it

- **Locally:** double-click `index.html` (or open it in a browser).
- **On the web:** drop the files on any static host (GitHub Pages, Netlify, Cloudflare Pages). On a phone, open the link and choose *Add to Home Screen* for an app-like icon; the service worker keeps it playable offline.
- When you deploy, bump `CACHE` in `sw.js` if you changed the icons or manifest (the page itself is always fetched network-first).

## Editing the words

Everything lives in `index.html`:

- `RAW` is the word bank: `["WORD","Clue"]` pairs. The same word may appear more than once with different clues; all of its clues are kept and one is drawn per puzzle.
- `PAYOFFS` holds the center rewards. Each has a `near` list, the theme words the puzzle is built from. Keep those lists long (30+) and drawn from `RAW`.
- `MOODS` maps the intent buttons to payoff words.

## Credits

Designed by **Frank Brannen**. Built collaboratively with Claude.
