# Arcada studerandekår – ASK

A responsive, static website in Swedish and English. Swedish is the default at `index.html`; the English version is at `en.html`. Both pages work without JavaScript. There is no backend, build step, tracking, remote font or contact-form service.

## Preview

Open `index.html` in a browser, or run `python3 -m http.server 8080` from this directory and visit http://localhost:8080.

## Files

- `index.html`: Swedish content (primary language).
- `en.html`: equivalent English content.
- `css/style.css`: shared responsive design and ASK purple palette.
- `js/main.js`: mobile navigation, language-link section preservation and footer year.
- `images/`: existing ASK logos, Cor House photograph and legacy portraits.

## Updating content

Edit the corresponding section in **both** HTML files. Keep matching section IDs so language links preserve the visitor’s position. Use Swedish official terminology for organisational bodies; official Swedish statutes and regulations take precedence over translations.

The board and staff section deliberately links to ASK’s contact directory until the current names, roles and approved photos are supplied. Legacy 2025 portraits remain in the repository but are not displayed. Replace the `team-note` block on both pages when the new roster is confirmed. Do not infer current roles from old filenames.

Events and membership link to Kide.app, and updates link to ASK’s Instagram. This avoids advertising expired events or unverified fees. Cor House booking inquiries use email; there is no live availability calendar. Confirm hours, fees, booking terms and any named contacts before adding them.

## Hosting

Upload this directory’s HTML, CSS, JavaScript and images to any static host. Relative paths support GitHub Pages project URLs as well as a domain root. For GitHub Pages, select the intended publishing branch and `/ (root)` in repository Settings → Pages. Merging into an already configured publishing branch may publish immediately.

## Content references

Reviewed on 27 September 2026:

- https://start.arcada.fi/sv/stod-i-studierna/studieliv/arcada-studerandekar-ask — student union, tutoring, membership and Cor House.
- https://linktr.ee/askenfi — current ASK link directory.
- https://www.asken.fi/ — general contact email.
- Existing repository — ASK logos, Cor House photo, Kide.app community and Instagram URLs.

The page does not publish internal governance records, access codes or unconfirmed board details.
