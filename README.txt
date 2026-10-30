THAMECO GROUP — COMPLETE STATIC WEBSITE
Exported from the current published design (version 22), 29 October 2026.

START
1. Extract the ZIP completely.
2. Upload this folder's contents to the site root (public_html), including the hidden .htaccess file. The address bar then shows https://thamecogroup.com/ , /about , /services , and /contact .
3. Shared styles, scripts, fonts, and maps live in shared/. Images live in images/. Each page is a file in this folder: index.html, about.html, services.html, and contact.html. The server shows those files without the .html ending.
No installation, package manager, compilation, backend, Python, Node.js, database, or API key is needed. JavaScript must be enabled.

INCLUDED
Home, About Us, Our Services, Contact Us; English, Turkish and Arabic with RTL support; responsive headers and mobile menu; original photography and fonts; four-stage scrolling hero; pinned coverage text and map with seven routes; scroll-synced country highlights; doctor robot emerging from the Aevum logo and walking; page transitions, hover effects and navigation.

EDITING
Each page is ordinary HTML. Visible text is English. Translations sit on the same element as data-en, data-tr, and data-ar (and data-en-aria-label, data-en-title, data-en-alt where those attributes change). shared/site.js reads those attributes and switches language from the header buttons. Language choice is stored as thameco-lang.
Edit a page's wording or layout in its HTML file. Put page-only styles in the matching CSS file and page-only behavior in its JS file. Shared header, menu, language, reveal, and footer behavior stays in shared/site.js.
The home page also loads the hero, shipping journey, coverage map, and footer mascot from shared/. Those scripts are only used by the home page except the mascot, which every page loads.

CONTENTS
index.html — home page, shown at /. index.js mounts the hero and map and switches the expedition photos and delivery-process chapters.
about.html — about page, shown at /about.
services.html — services page, shown at /services.
contact.html — contact page, shown at /contact.
.htaccess — tells Apache and LiteSpeed to use those short addresses and to send the old /pages/.../....html addresses there.
_redirects — the same addresses for Netlify and Cloudflare Pages.
images/ — photography, logos, favicon, and the transparent doctor sprite. The reference design's embedded images have been extracted into site-visual-*.jpg/png files for easier editing.
shared/site.js — language, menu, scroll header, reveal, back-to-top, and mascot mount.
shared/saved-v3-hero.js — translated hero markup and isolated styles.
shared/immersive-shipping.js — scroll-controlled photographic journey.
shared/accurate-routes.js — geographic renderer, embedded map data and scroll progression.
shared/footer-mascot.js — walking doctor animation.
shared/reference-site.js — the earlier compiled React bundle. The pages no longer load it. It is kept only as a reference of the previous single-file app.
shared/fonts/ — local font files.
shared/maps/ — editable geographic and destination source JSON plus source note. The map uses an embedded copy in accurate-routes.js to avoid local-file fetch restrictions; update that embedded copy if changing the JSON.

PORTABILITY
Navigation uses /, /about, /services, and /contact. .htaccess is required on the host so those addresses open the matching HTML files and the old /pages/index/index.html address redirects to /. Assets use paths from the site root; there are no external CDN dependencies. The original design/text/translations and latest footer/map changes are preserved. The CSS adapts layouts to phones, portrait tablets, landscape screens and desktops. Reduced-motion preferences are respected.
The pages are static HTML. The hero, map, and mascot scripts still contain their own markup. shared/reference-site.js is the previous React bundle and is not loaded by the pages.

CONTACT AND EXTERNAL LINKS
Email and telephone links open the visitor's configured apps. The Aevum logo links to aevumjo.com. There is no contact submission service or database in this export. Social links retain their current site targets.

CHECKS
All four routes were checked at 320px, 768px and desktop browser widths: no horizontal overflow and no broken loaded images. Hero photographs, pinned mobile/tablet coverage, seven destination reveals and the footer doctor were checked in the exported copy. JavaScript syntax and local asset references were checked. The ZIP includes no Python files, server scripts, credentials, repository history, development tools or obsolete saved-design assets.
Browser animation performance varies by device. A current Chrome, Edge, Firefox or Safari is recommended. Mobile OS file viewers may restrict executable web content; static hosting provides normal browser access on those devices.

RIGHTS AND PROVENANCE
Branding and supplied imagery retain their existing ownership. Bundled third-party library copyright/license notices are retained in the JavaScript. Geographic boundary attribution is in shared/maps/SOURCE.txt. This package exports the user's current Thameco design, not the old source website or a previous saved design.
