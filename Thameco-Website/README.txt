THAMECO GROUP — COMPLETE STATIC WEBSITE
Exported from the current published design (version 22), 29 October 2026.

START
1. Extract the ZIP completely.
2. Open index.html in a current desktop browser, or upload this folder's contents to any static web host. index.html opens pages/index/index.html.
3. Keep pages/ beside index.html. Each page folder holds that page's HTML, CSS, and JS. Shared styles, scripts, fonts, and maps live in pages/shared/. Images live in pages/images/.
No installation, package manager, compilation, backend, Python, Node.js, database, or API key is needed. JavaScript must be enabled.

INCLUDED
Home, About Us, Our Services, Contact Us; English, Turkish and Arabic with RTL support; responsive headers and mobile menu; original photography and fonts; four-stage scrolling hero; pinned coverage text and map with seven routes; scroll-synced country highlights; doctor robot emerging from the Aevum logo and walking; page transitions, hover effects and navigation.

EDITING
Each page is ordinary HTML. Visible text is English. Translations sit on the same element as data-en, data-tr, and data-ar (and data-en-aria-label, data-en-title, data-en-alt where those attributes change). pages/shared/site.js reads those attributes and switches language from the header buttons. Language choice is stored as thameco-lang.
Edit a page's wording or layout in its HTML file. Put page-only styles in that folder's CSS file and page-only behavior in its JS file. Shared header, menu, language, reveal, and footer behavior stays in pages/shared/site.js.
The home page also loads the hero, shipping journey, coverage map, and footer mascot from pages/shared/. Those scripts are only used by the home page except the mascot, which every page loads.

CONTENTS
index.html — opens the home page.
pages/index/ — home page HTML, CSS, and JS. index.js mounts the hero and map and switches the expedition photos and delivery-process chapters.
pages/about/ — about page HTML, CSS, and JS.
pages/services/ — services page HTML, CSS, and JS.
pages/contact/ — contact page HTML, CSS, and JS.
pages/images/ — photography, logos, favicon, and the transparent doctor sprite. The reference design's embedded images have been extracted into site-visual-*.jpg/png files for easier editing.
pages/shared/site.js — language, menu, scroll header, reveal, back-to-top, and mascot mount.
pages/shared/saved-v3-hero.js — translated hero markup and isolated styles.
pages/shared/immersive-shipping.js — scroll-controlled photographic journey.
pages/shared/accurate-routes.js — geographic renderer, embedded map data and scroll progression.
pages/shared/footer-mascot.js — walking doctor animation.
pages/shared/reference-site.js — the earlier compiled React bundle. The pages no longer load it. It is kept only as a reference of the previous single-file app.
pages/shared/fonts/ — local font files.
pages/shared/maps/ — editable geographic and destination source JSON plus source note. The map uses an embedded copy in accurate-routes.js to avoid local-file fetch restrictions; update that embedded copy if changing the JSON.

PORTABILITY
Navigation uses pages/index/index.html, pages/about/about.html, pages/services/services.html, and pages/contact/contact.html. No server rewrite rules are needed. Assets use relative paths; there are no external CDN dependencies. The original design/text/translations and latest footer/map changes are preserved. The CSS adapts layouts to phones, portrait tablets, landscape screens and desktops. Reduced-motion preferences are respected.
The pages are static HTML. The hero, map, and mascot scripts still contain their own markup. pages/shared/reference-site.js is the previous React bundle and is not loaded by the pages.

CONTACT AND EXTERNAL LINKS
Email and telephone links open the visitor's configured apps. The Aevum logo links to aevumjo.com. There is no contact submission service or database in this export. Social links retain their current site targets.

CHECKS
All four routes were checked at 320px, 768px and desktop browser widths: no horizontal overflow and no broken loaded images. Hero photographs, pinned mobile/tablet coverage, seven destination reveals and the footer doctor were checked in the exported copy. JavaScript syntax and local asset references were checked. The ZIP includes no Python files, server scripts, credentials, repository history, development tools or obsolete saved-design assets.
Browser animation performance varies by device. A current Chrome, Edge, Firefox or Safari is recommended. Mobile OS file viewers may restrict executable web content; static hosting provides normal browser access on those devices.

RIGHTS AND PROVENANCE
Branding and supplied imagery retain their existing ownership. Bundled third-party library copyright/license notices are retained in the JavaScript. Geographic boundary attribution is in assets/maps/SOURCE.txt. This package exports the user's current Thameco design, not the old source website or a previous saved design.
