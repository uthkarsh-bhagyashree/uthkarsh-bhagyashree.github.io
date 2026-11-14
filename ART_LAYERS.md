# Illustration layers: painted-art swap guide

Every illustration in `index.html` sits in its own slot (`data-slot="…"`) and is generated as paper-cut SVG.
To replace one with a painting, add its path to `CONFIG.art` at the top of the script:

```js
art: { gopuram: "art/gopuram.png", hallBack: "art/hall-back.jpg" }
```

The slot then renders `<img>` instead of the SVG. Images fill the slot with `object-fit: cover`.
Export transparent layers as PNG or WebP at 2× the listed long edge.

**Shared style prefix** (put it before every prompt below):
> Hand-painted gouache and watercolour illustration, South Indian Dravidian temple art, layered paper-cut depth with soft inner shadows between layers, visible paper grain, crisp edges, rich ornamental detail, palette of deep sky blue, warm marigold gold, ivory cream, rose pink, teal and antique gold, deep plum accents, elegant and refined, no text, no gradients of flat vector style, no cartoon look —

---

## A. Opening scene (sky → gopuram → palms)

> **3D tower:** the opening now renders the gopuram as a real 3D model (three.js / WebGL, section 5b `G3D` in `index.html`). Its painted statue friezes, bay panels, gable medallions and guardian statues are textures generated at load time (`tierFaceSVG`, `baySVG`, `medallionSVG`, `stoneStatueSVG`). To use painted art on the 3D tower, replace those generators' canvases with your images (one per tier face: wide 7:1 front/back friezes and 4:1 side friezes). The `gopuram` slot below is used only by the flat fallback (shown when WebGL isn't available) and in the closing section.

> **Corridor:** after the doorway the camera walks down a sunlit pillared corridor (also 3D, `buildCorridor` in section 5b), and the carved inner doors swing open in 3D onto the hall. Its painted wall murals (`muralSVG`), latticed jali windows (`jaliC`), coffered ceiling (`ceilingC`), kolam runner (`kolamC`) and carved pillar blocks (`reliefC`) are generated textures too. The 3D doors reuse the `doorLeft` artwork; the full-screen `doorLeft`/`doorFrame` slots are only shown by the flat fallback.

The sky itself is a flat colour (`--sky` in CSS), not an image.

| # | Slot | Aspect | Transparency | Notes |
|---|------|--------|--------------|-------|
| 1 | `cloudsFar` | 16:9 | **Yes** | Small, pale clouds. Keep the centre-top clear for the names. |
| 2 | `cloudsNear` | 16:9 | **Yes** | Big white clouds at the left and right edges, plus two small ones low in the centre. |
| 3 | `gopuram` | **5:7 (1000×1400)** | **Yes** | The hero. It rises, leans back in 3D, then the camera flies into its doorway. Keep the kalasha tips at **y ≈ 9.5%** and the doorway centre at **x 50%, y 89.9%**, because the zoom targets that point. |
| 3b | `palmsLeft` | 1:2 | **Yes** | Foreground coconut trees with banana plants in front, bottom-left corner. `palmsRight` is a mirrored second set. |

**1 · cloudsFar**: *[prefix]* a few small distant fluffy clouds in soft powder blue and white, gentle paper-cut layers, sparse, transparent background, empty top centre.

**2 · cloudsNear**: *[prefix]* large bright white cumulus clouds with soft blue-grey undersides, stacked paper-cut layers, gathered at the far left and far right edges plus two small clouds low in the centre, transparent background.

**3 · gopuram**: *[prefix]* a towering Meenakshi-style South Indian temple gopuram seen straight-on against open sky, symmetrical, a carved grey granite base storey with stone guardian figures in niches and a tall stepped stone doorway glowing with warm golden light, above it nine painted stucco tiers tapering on a gentle concave curve, each crowded with hundreds of brightly painted free-standing deity statues in blue, green, pink, gold and white, a small arched opening at the centre of every tier, deep ochre cornices, parapets of miniature domed and barrel-roofed shrines, a rose barrel-vault crown with sunburst gable medallions and eleven golden kalasha finials, realistic sculptural light and shade, transparent background, portrait 5:7.

**3b · palmsLeft**: *[prefix]* two or three tall natural coconut palms rising from the bottom-left corner, slender curved ringed trunks leaning gently, full crowns of drooping feathery fronds in deep and sunlit greens, a few dry brown fronds hanging below, clusters of green and golden coconuts, and in front of them at the bottom two lush banana plants with huge torn arching leaves (a few yellowing), one with a hanging bunch of green bananas and a deep purple flower bud, transparent background, tall portrait.

---

## B. The doors

| # | Slot | Aspect | Transparency | Notes |
|---|------|--------|--------------|-------|
| 4 | `doorLeft` | 1:2 (portrait leaf) | No | Fills half the screen. `doorRight` is the same image mirrored. Keep the ring knocker near the inner edge. |
| 5 | `doorFrame` | 16:9 | **Yes (centre must be empty)** | Stone surround: carved lintel at the top and thin posts at the sides. |

**4 · doorLeft**: *[prefix]* one leaf of a massive carved teak temple door, deep reddish-brown wood, a grid of recessed panels each holding a gilded eight-petal lotus medallion, rows of round brass studs along the rails, a brass ring knocker near the right (inner) edge, warm golden light grazing the surface, front view, portrait.

**5 · doorFrame**: *[prefix]* an ornate cream-stone temple doorway surround seen from inside the threshold, a carved lintel with a row of rose and teal lotus buds and small hanging brass bells, slim side posts with teal diamond inlays, a fully transparent centre opening, landscape.

---

## C. Inside the temple (hall)

All four hall layers stack on top of each other and get cropped with `cover`. Keep the important content in the centre 60%.

| # | Slot | Aspect | Transparency | Notes |
|---|------|--------|--------------|-------|
| 6 | `hallBack` | 16:10 | No | Back wall, wall pattern, sanctum arch, tiled floor and coffered ceiling. |
| 7 | `hallPillarsFar` | 16:10 | **Yes** | Four slim pillars on either side of the centre. |
| 8 | `hallLamps` | 16:10 | **Yes** | Hanging bell lamps with flames. |
| 9 | `hallPillarsNear` | 16:10 | **Yes** | Big pillars at the far edges, plus the ceiling beam, **carved frieze** and marigold swags. |
| 10 | `curtainLeft` | 3:8 | No | Silk curtain over the invitation arch. `curtainRight` is the same image mirrored. |
| 11 | `paperEdge` | ~40:1 strip | **Yes** | Scalloped cream paper edge where the hall meets the page. |

**6 · hallBack**: *[prefix]* the interior back wall of a lamp-lit South Indian temple mandapa bathed in warm golden light, a wall covered in a repeating small lotus stencil pattern, a tall arched sanctum doorway in the centre glowing with soft cream light, a dark coffered wooden ceiling with gilded lotus bosses, a floor of rose and teal diamond tiles receding in perspective, symmetrical, landscape.

**7 · hallPillarsFar**: *[prefix]* four slender carved stone temple pillars in pale warm gold, with square carved blocks and lotus medallions and flower-bud (pushpa potika) bracket capitals, softly lit as if seen in the middle distance, transparent background, symmetrical around an empty centre.

**8 · hallLamps**: *[prefix]* four traditional brass hanging bell lamps (thooku vilakku) on long thin chains, each with three stacked bowls and five small flickering flames, a soft warm glow around each, placed left and right of an empty centre, transparent background.

**9 · hallPillarsNear**: *[prefix]* two massive richly carved foreground temple pillars at the far left and far right edges in deep amber and bronze tones, inlaid rose and teal medallions, a heavy wooden ceiling beam across the top with a carved frieze of gilded lotuses and small rose and teal diamonds, drooping marigold garlands, transparent centre, landscape.

**10 · curtainLeft**: *[prefix]* a heavy rose-magenta silk curtain hanging straight with deep vertical pleats, a gold zari border along the inner edge and the hem, a short gold fringe, front view, tall portrait.

**11 · paperEdge**: *[prefix]* a decorative scalloped edge of handmade cream paper with a thin antique-gold rule along the scallops, a soft shadow above, a long seamless horizontal strip, transparent above.

---

## D. Invitation page

| # | Slot | Aspect | Transparency | Notes |
|---|------|--------|--------------|-------|
| 12 | border tile (CSS `--tile`) | 3:4, seamless vertical repeat | No | Side borders of the cream page. To swap it, set `--tile: url(art/tile.png)` in `:root`. |
| 13 | `emblem_reception` | 1:1 | **Yes** | Round medallion, timeline node. |
| 14 | `emblem_wedding` | 1:1 | **Yes** | Round medallion, timeline node. |
| 15 | `map` | 16:10 | No | Stylised venue map. The pin is a separate layer at about 50% / 46%. |
| 16 | `pin` | 3:4 | **Yes** | Map pin. |
| 17 | `deepa` | 5:7 | **Yes** | Interactive brass lamp. To keep the tap-to-light effect, leave the SVG; to paint it, supply both an unlit and a lit image and switch them on `.lit`. |
| 18 | `closingGopuram` | 7:10 | **Yes** | Small gopuram vignette in the closing section. |
| — | `doorRight`, `curtainRight` | — | — | Mirrors of slots 4 and 10 unless you give them their own art. |

**12 · border tile**: *[prefix]* a seamless vertical repeating temple-tile border motif, a rose diamond with an ivory centre and a teal dot, small teal corner squares, an antique-gold outline, on warm cream, flat front view, must tile top-to-bottom.

**13 · emblem_reception**: *[prefix]* a circular medallion with a gold beaded rim on deep teal, a crescent moon, a few golden stars and a hanging brass lantern with a rose glass panel glowing softly, evening celebration mood, transparent outside the circle.

**14 · emblem_wedding**: *[prefix]* a circular medallion with a gold beaded rim on rose pink, a golden kalasha pot topped with five mango leaves and a coconut resting on a pink lotus, kumkum dot, auspicious wedding symbol, transparent outside the circle.

**15 · map**: *[prefix]* a charming hand-painted stylised town map seen from above, cream paper ground, gold roads, a teal river winding across, rose and mint blocks of houses, round trees, a tiny temple at the centre, a small compass rose top-right, no readable text, landscape.

**16 · pin**: *[prefix]* a single map pin in deep plum with a gold ring and an ivory centre, painted with a soft shadow, transparent background.

**17 · deepa**: *[prefix]* a traditional South Indian brass standing oil lamp (kuthuvilakku) with a round base, a ringed stem, a wide bowl with three wicks and a tall finial, warm polished brass, unlit version and lit version with small golden flames and a soft glow, transparent background, portrait.

**18 · closingGopuram**: *[prefix]* a small elegant South Indian gopuram vignette, symmetrical, colourful tiers of deity niches, a rose crown with gold kalashas, a softly glowing doorway, sitting on a thin ground line, transparent background, portrait.
