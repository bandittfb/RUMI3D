# RUMI 3D — words on a spinning solid

A crossword that lives on the surface of a rotating 3D solid. Every **edge** of the shape is a word; every glowing **corner** is a single letter shared by all the words that meet there. Solve the surface, open the faces, and follow the words as they spiral inward to a center that was holding something the whole time.

It's a single self-contained HTML file. No build, no dependencies, no network. Open `index.html` in any modern browser and play.

## How it plays

RUMI 3D is a three-layer dig:

1. **Edges** — solve the words on the cage of the solid. Shared corners hand letters to their neighbors, just like a flat crossword, but wrapped around a shape you can spin.
2. **Faces** — once a face's three edges are solved, a word stretches across it, hung off corners you already filled. The face lights up in its color.
3. **The core** — each solved face releases a *spoke* word that grows from a corner and drives inward. Every spoke converges on the same hidden letter at the center.

Reach the center and it **decodes** into the thing all those words were circling — a short authored poem, quip, or tiny story.

Before each puzzle, RUMI asks what you're bringing to the center; your answer shapes which reward waits there.

## Controls

- **Drag** to rotate · **scroll / pinch** to zoom · **+ / −** buttons or keys to zoom
- **Click** a corner or edge to select a word, then **type** to fill it
- **Tab** — next word · **Space** — rotate the selected word to face you
- **Arrows** — move along the current word · **Backspace** — clear

## Shapes

Five all-triangle solids (the deltahedron family), from quick to epic:

| Shape | Faces | Words |
|-------|------:|------:|
| Tetra | 4 | 14 |
| Hexa  | 6 | ~19 |
| Octa  | 8 | 28 |
| Deca  | 10 | ~35 |
| Icosa | 20 | 70 |

## Running it

- **Locally:** double-click `index.html` (or open it in a browser).
- **On the web:** drop `index.html` on any static host (GitHub Pages, Netlify, Cloudflare Pages). On a phone, open the link and choose *Add to Home Screen* for an app-like icon.

## Credits

Designed by **Frank Brannen**. Built collaboratively with Claude.

`extras/` holds two earlier experiments from the same project: a 2D relational-crossword (`rumi-2d.html`) and the original procedural crossword (`crossword.html`).
