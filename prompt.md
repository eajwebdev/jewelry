# LUCKY JEWELRY — Upgrade Existing Website with Scroll-Controlled Cinematic Experience

## IMPORTANT: MODIFY THE EXISTING WEBSITE ONLY

The Lucky Jewelry website already exists.

**Do not create a new project, rebuild the application, replace the existing design system unnecessarily, or remove existing functionality.**

Work directly within the current Laravel 12 + React + Inertia.js + Vite application.

Before making changes:

1. Inspect the existing homepage, components, layouts, routes, and styling.
2. Identify existing product, collection, navigation, cart, and authentication functionality.
3. Reuse existing components and actual product photographs wherever possible.
4. Preserve all working backend functionality and database relationships.
5. Upgrade the frontend into a cohesive, premium jewelry experience.

The most important improvement is the homepage's scroll-controlled cinematic video experience.

---

# 1. PRIMARY FEATURE — VIDEO CONTROLLED BY SCROLLING

The cinematic video already exists at:

`public/luxury-model.mp4`

Reference it in the frontend as:

`/luxury-model.mp4`

**Do not generate, replace, or download another video. Use this exact existing file.**

The video is approximately 8 seconds long, with a portrait orientation and scenes featuring a sophisticated woman wearing luxury jewelry.

## Required Interaction

When a visitor enters the homepage, show the first frame of the video.

Do not autoplay the video.

Instead, the video must be controlled by the visitor's scroll position.

**Scrolling down = video progresses forward.**

**Scrolling up = video plays backward through the same frames.**

**Stopping scrolling = video holds on the corresponding frame.**

This behavior must work in both directions, including when the visitor scrolls back into the cinematic section from the store.

Use GSAP ScrollTrigger to create a pinned cinematic sequence.

The video must fill the viewport while remaining stationary as the visitor scrolls through approximately 500vh of cinematic storytelling.

The video playback timeline must follow scroll progress:

| Scroll Progress | Video Position |
|---|---|
| 0% | 0 seconds |
| 10% | 0.8 seconds |
| 25% | 2 seconds |
| 50% | 4 seconds |
| 75% | 6 seconds |
| 90% | 7.2 seconds |
| 100% | Video ends |

Use the actual video duration dynamically from metadata instead of hardcoding 8 seconds.

## Critical Technical Requirements

- Use GSAP and ScrollTrigger.
- Pin the cinematic viewport throughout the animation.
- Use `scrub` for scroll-linked synchronization.
- Map scroll progress to `video.currentTime`.
- Use `requestAnimationFrame` to coalesce frequent updates where appropriate.
- Avoid uncontrolled seeking and multiple competing animation loops.
- Never trigger normal continuous autoplay.
- Set `muted`, `playsInline`, and an appropriate `preload` strategy.
- Wait until the video has sufficient metadata and seekable data before enabling the cinematic experience.
- Display a minimal, elegant loading state when necessary.
- Do not cause React state updates on every scroll frame.
- Use refs for video and animation state.
- Clean up ScrollTrigger instances, event listeners, and animation frames on unmount.
- Handle mobile browser seeking limitations gracefully.
- Support smooth scrolling in reverse without snapping to scene boundaries.
- Avoid reinitializing the entire animation on viewport resize.
- Respect `prefers-reduced-motion` by showing a static hero with functional navigation and CTAs.

**Very important:** The video must be tied to the scroll position, not the scrolling direction alone. The visitor must be able to scrub precisely backward and forward through every frame.

If the supplied MP4's encoding makes seeking noticeably choppy, inspect its codec and keyframe interval. Recommend an optimized, fast-seeking web version only when necessary while preserving the original visual content. Do not silently replace the source.

---

# 2. CINEMATIC TEXT OVERLAYS

The video is the visual centerpiece.

Layer all typography using real HTML and CSS above the video.

The text should appear and disappear at carefully selected scroll intervals.

Use GSAP timelines tied to the same ScrollTrigger sequence so that video and text remain synchronized.

**The typography must also reverse naturally when scrolling backward.**

Do not use independent autoplay animations or timers for scene changes.

Text must be positioned around the subject, never covering the woman's face, necklace, hands, or rings.

## SCENE 01 — THE ENTRANCE

**Approximate scroll progress: 0–20%**

Show the opening portrait from the cinematic video.

Text:

LUCKY JEWELRY

# MORE THAN
# JEWELRY

Jewelry created for the moments you never want to forget.

Animation:
- Soft text masking reveal
- Opacity 0 → 1
- Translate Y approximately 28px → 0
- Elegant staggered heading animation
- Subtle champagne-gold line detail

As the visitor continues scrolling, gradually fade the text away.

## SCENE 02 — THE NECKLACE

**Approximate scroll progress: 20–40%**

As the video reveals the woman's necklace, introduce:

01 / NECKLACES

# Elegance
# in Every Detail

Designed to become part of your story.

Keep the text to the side of the composition.

The necklace must remain completely visible.

Use understated serif typography with champagne-gold accents.

The previous scene must be fully gone before this text becomes dominant.

## SCENE 03 — THE RING REVEAL

**Approximate scroll progress: 40–60%**

As the woman lifts her hand and reveals the ring, transition the text into:

02 / SIGNATURE

# A Symbol
# of Forever

Discover the Ring →

The Discover the Ring link must navigate to the actual existing ring product or signature ring collection.

Place the typography away from the hand and ring.

Animate the text with subtle opacity and masked transitions.

## SCENE 04 — THE RING MACRO

**Approximate scroll progress: 60–80%**

As the camera focuses on the close-up ring details, remove most interface elements.

Only display:

THE SIGNATURE COLLECTION

Explore ↓

The ring itself must dominate.

Use minimal gold typography and allow the video to carry the experience.

## SCENE 05 — THE FINAL PORTRAIT

**Approximate scroll progress: 80–100%**

As the woman appears again wearing the jewelry, reveal:

# TIMELESS BEAUTY.
# FOREVER YOURS.

Celebrate the moments that deserve to last forever.

Primary button:

SHOP COLLECTION

Secondary button:

BOOK A PRIVATE CONSULTATION

The buttons must link to functional destinations within the existing application.

The final portrait should remain visible as the last part of the pinned video sequence.

---

# 3. IMPORTANT: MATCH TEXT TO THE REAL VIDEO

The scroll percentages above are initial guidance, not fixed assumptions.

Inspect the actual scenes in:

`public/luxury-model.mp4`

Determine the approximate timestamps at which the following appear:

1. Woman's entrance
2. Necklace close-up
3. Ring appearing on her hand
4. Ring macro close-up
5. Final portrait

Use those timestamps to synchronize the text overlays with the actual film.

Do not blindly assign arbitrary timings if the cinematic scenes occur at different points.

The overall sequence must feel like one professionally directed jewelry advertisement.

## Scroll behavior example

User scrolls down:

Woman appears → opening message → necklace reveal → necklace typography → ring reveal → ring typography → ring macro → signature message → final portrait → shopping experience.

User scrolls up:

Shopping experience → final portrait → ring macro → ring on hand → necklace → opening portrait.

Everything must reverse seamlessly.

---

# 4. CINEMATIC VIEWPORT AND DESKTOP COMPOSITION

The supplied video is portrait-oriented.

For desktop:

- Use a full-viewport cinematic container.
- Maintain the original video aspect ratio.
- Never distort or stretch the video.
- Use a dark background matching the film.
- Keep the subject properly positioned.
- Allow subtle black negative space around the film when that produces a better composition.
- Do not aggressively crop out the necklace, ring, hands, or face.

If full-screen `object-fit: cover` crops important jewelry details, use a refined cinematic layout with the portrait video centered and a dark backdrop, optionally reusing the same video as a blurred, heavily darkened background layer.

Keep the main visible video sharp and undistorted.

For mobile:

- Allow the portrait video to fill the screen naturally.
- Ensure the model is centered.
- Scale text responsively.
- Use safe areas for mobile controls.
- Ensure overlays remain readable.
- Keep all buttons accessible.

Use a responsive video source architecture that can support a landscape version in the future without requiring a full rewrite.

---

# 5. PREMIUM SCROLL INDICATOR

At the beginning of the experience, show a small, elegant indicator:

SCROLL TO DISCOVER

Add a thin vertical champagne-gold line or understated animated marker.

The indicator should become less prominent as the film progresses.

Optionally add a very subtle cinematic progress indicator showing movement through the five scenes.

Avoid bulky scrollbars, dots, or excessive controls.

---

# 6. TRANSITION FROM CINEMATIC FILM TO EXISTING STORE

When the video reaches its final frame and the user continues scrolling, the pinned cinematic section should release naturally.

Transition smoothly into the existing shopping homepage.

Use a deep-black section transition with subtle champagne-gold detailing.

Immediately introduce:

DISCOVER YOUR STORY

Then show the existing Lucky Jewelry categories:

- Rings — Symbols of Forever
- Necklaces — Made to Be Remembered
- Earrings — The Finishing Detail
- Bracelets — Modern Icons

Reuse real category photography and existing collection links.

Do not create decorative placeholders when genuine Lucky Jewelry photography already exists.

The transition should feel like moving from a luxury film into an editorial jewelry catalogue.

---

# 7. UPGRADE THE EXISTING HOMEPAGE

Preserve the current homepage sections where possible, but refine their layout, spacing, typography, photography, and animations.

The preferred storytelling order is:

1. Scroll-controlled cinematic video
2. Discover Your Story — collection categories
3. Curated for You — real featured products
4. Signature Oval Halo Ring — editorial product feature
5. Our Craft — craftsmanship storytelling
6. Made for Your Moments — brand editorial section
7. Private Consultation
8. Premium Footer

Use the existing product database and real product records.

Do not hardcode fake product pricing, availability, discounts, or inventory.

## Collection Panels

Create generous image-led editorial panels featuring the actual ring, necklace, earring, and bracelet collections.

Use refined hover zoom and minimalist text overlays.

## Featured Products

Display existing products with:

- Product photograph
- Product name
- Material
- Price
- Wishlist action
- Quick view where supported
- Add to bag

Do not replace working commerce actions with decorative buttons.

## Signature Oval Halo Ring

Use the real product photography of Lucky Jewelry's oval halo ring if available in the existing project.

Present it as an important hero product.

Heading:

THE OVAL HALO

Description:

A radiant oval centre framed by a brilliant halo, designed to capture light from every angle.

CTA:

DISCOVER THE PIECE →

Link to the actual corresponding product page.

---

# 8. NAVIGATION UPDATE

Retain the website's existing navigation functionality.

Restyle the header for a cinematic luxury appearance.

At the top of the video, the navigation should be transparent.

Logo on the left.

Navigation links:

Home / Rings / Necklaces / Earrings / Bracelets / Collections / Our Story

Utilities:

Search / Account / Wishlist / Shopping Bag

While the visitor is viewing the cinematic section, ensure the navigation remains legible without dominating the video.

After the cinematic section, transition the navigation to a black or deep-charcoal background with subtle blur and refined borders.

For mobile, use an elegant drawer menu.

Do not break existing routes, login functionality, shopping cart state, or wishlist interactions.

---

# 9. VISUAL DESIGN LANGUAGE

Use Lucky Jewelry's existing logo and brand assets.

Primary colors:

- Black: `#080808`
- Charcoal: `#171717`
- Champagne Gold: `#C8AD78`
- Soft Gold: `#D7C3A0`
- Ivory: `#F5F1E9`

These values may be adjusted to align with the existing project.

Typography:

- Elegant, high-contrast serif for cinematic headings
- Refined sans-serif for navigation, products, and supporting text
- Wide letter spacing for small uppercase labels
- Restrained font weights and generous line heights

The design should feel luxurious, cinematic, editorial, and composed.

Avoid:

- Generic rounded cards
- SaaS-style interfaces
- Excessive gradients
- Random floating decorations
- Oversized pill buttons
- Excessive shadows
- Artificial-looking product imagery
- Overly animated text
- Distracting scroll effects in every section

The quality of the photography and typography should define the design.

---

# 10. GSAP IMPLEMENTATION REQUIREMENTS

Create a reusable React component such as:

`resources/js/Sections/CinematicHero.jsx`

Or use the existing equivalent structure already present in the application.

Do not unnecessarily reorganize the entire project.

Use GSAP `ScrollTrigger` with proper plugin registration and React lifecycle management.

Preferred architecture:

- Video element ref
- Pinned section ref
- Scene text refs
- One coordinated master cinematic timeline
- ScrollTrigger linked to the timeline
- Video seek controller linked to scroll progress
- Proper cleanup on component unmount

Keep video frame synchronization separate from text presentation logic, but ensure both follow the same scroll progress.

Use a small time-update threshold and coalesce redundant seeks to improve performance.

Avoid fighting between `video.currentTime` updates, React rerenders, and GSAP timeline updates.

Test multiple scroll speeds, including trackpad scrolling, mouse wheels, rapid upward scrolling, and touch scrolling.

Do not add a third-party smooth-scroll library unless the existing application already uses one or there is a demonstrated need.

---

# 11. PERFORMANCE AND ACCESSIBILITY

Implement:

- Intelligent video preload
- Loading indicator
- Responsive video layout
- Stable section dimensions
- No layout jumps
- Lazy-loading for below-the-fold photographs
- Proper image aspect ratios
- Reduced-motion fallback
- Keyboard-accessible navigation
- Semantic headings
- Accessible buttons and links
- Visible keyboard focus states
- Appropriate contrast for text over video
- Correct GSAP cleanup

The application must remain responsive throughout the pinned cinematic sequence.

Do not sacrifice actual frame responsiveness just to make the page look animated.

---

# 12. PRESERVE EXISTING E-COMMERCE FUNCTIONALITY

The existing website is already implemented.

Do not delete or rebuild working functionality for:

- Product listings
- Product details
- Product categories
- Collections
- Cart
- Wishlist
- Authentication
- Checkout
- Orders
- Inventory
- Admin tools
- Database models
- Laravel routes
- Inertia page props

Only modify these components when necessary for the requested luxury design upgrade.

All visible shopping CTAs must connect to real routes.

Preserve the existing project structure and styling conventions unless a change is necessary.

---

# 13. EXPECTED IMPLEMENTATION

This is an implementation request, not just a visual concept.

Make the changes directly in the existing codebase.

Install GSAP if it is not already installed.

Implement the actual functioning scroll-controlled video and synchronized typography.

Update the homepage sections and necessary reusable components.

Keep the work compatible with the installed Laravel, React, Inertia, Vite, and CSS setup.

Run available build and validation commands and resolve errors.

Do not create an unrelated standalone HTML demo or a second Laravel project.

---

# 14. FINAL ACCEPTANCE TEST

The result is only complete when the following behaviors work:

- The homepage begins with the actual `public/luxury-model.mp4`.
- The video does not automatically play.
- Scrolling down advances the video.
- Scrolling up reverses the video.
- Stopping scrolling stops video progression.
- The video remains pinned during the cinematic storytelling.
- The five cinematic text scenes appear at the correct moments.
- Text transitions reverse when scrolling backward.
- Text does not obstruct the model's face or important jewelry details.
- The first and final video frames are reachable.
- The final frame transitions naturally into the product collections.
- Navigation remains functional throughout.
- The experience works on desktop and mobile.
- Reduced-motion preferences are respected.
- Existing product listings, cart, wishlist, and checkout continue functioning.
- No unnecessary replacement of existing Laravel or React components occurs.
- The application builds without errors.

## HIGHEST PRIORITY

**The experience must feel like the user is directing a luxury jewelry fashion film simply by scrolling.**

Scrolling forward moves through the film and its synchronized typography.

Scrolling backward rewinds the film and reverses the storytelling.

The user must remain in control of the exact video position at all times.

The video must be the dominant visual element, with interface typography appearing only when appropriate.

**Final creative goal:**

A visitor opens Lucky Jewelry and enters a cinematic jewelry campaign. Every scroll reveals another moment of the film, until the campaign transforms naturally into a beautiful, fully functional jewelry shopping experience.

**Do not settle for a normal autoplay video, a standard parallax banner, or a sequence of static images. Implement genuine bidirectional, scroll-scrubbed video playback.**