# Dr. Himani website

React 19 / Vite 8 website for Dr. Himani's professional profile and consultation enquiries.

## Local development

Use Node.js 24 LTS, then run `npm ci` and `npm run dev`.
Open http://localhost:5173/dr-himani/.

`npm run build` produces and verifies `dist/`, including separate HTML entry files for all four public pages, static route titles/descriptions/canonical URLs, a production Content Security Policy, sitemap and robots.txt. `npm run preview` serves that build locally. Run the full npm command; calling Vite directly skips the postbuild checks and hardening.

## Pages and contact behaviour

The four primary routes are `/`, `/specialties`, `/career`, and `/contact` under the `/dr-himani/` base path. Older profile routes redirect to the relevant current page. Unknown paths show a missing-page view.

The enquiry form posts JSON directly to FormSubmit at `https://formsubmit.co/ajax/drhimanigynae@gmail.com`. No visitor email application is required. It includes a honeypot, field validation, an in-flight submission lock, a 20-second timeout, accessible pending/success/error states, and direct phone/email fallbacks. It only shows success for an explicit provider acknowledgement; this confirms service acceptance, not inbox delivery or appointment booking. Failed requests preserve the visitor's entries.

FormSubmit processes the submitted contact details and message. The form links its privacy policy and asks visitors not to submit medical records or sensitive health information. No uploads, automatic replies, CC recipients or browser storage are used. Honeypots are a basic spam deterrent, not comprehensive abuse protection.

### One-time inbox activation and release check

1. Make a setup submission from the served website (not a local `file://` page).
2. The clinic inbox owner must open the FormSubmit confirmation email in `drhimanigynae@gmail.com` and approve activation. Check spam/junk if needed. Account/inbox access is not included in this project.
3. After publishing, submit a clearly labelled non-patient test from the production origin, confirm the on-page acknowledgement and verify actual inbox receipt. The provider may require confirmation for a new origin.
4. Reply to the received message to verify the visitor's Reply-To address before accepting real enquiries.

The frontend cannot certify inbox activation or email delivery. Handle provider outages or spam through the clinic's monitoring process. Official setup and AJAX documentation: https://formsubmit.co/ and https://formsubmit.co/ajax-documentation.

Run `npm test` for enquiry request/response validation tests. Tests use mocks and never send emails.

### Career and consultation visuals

The homepage includes a connected, date-free career milestone overview and a three-step consultation guide, also shown on Contact. Exact education/employment ranges are hidden from the career page; publication years remain part of the research references. Underlying supplied historical data is retained in `src/data/doctor.js`.

## Deployment

The existing GitHub Actions workflow builds on Node.js 24 and publishes `dist/` to GitHub Pages when `main` is pushed. The configured repository target is `https://drhimani.pixeltocloud.com/`; live deployment has not been verified in this redesign task.

Before changing to a custom domain, update Vite's `base`, favicon path, sitemap URLs, robots sitemap location, `src/data/site.js`, and the `base` path in `public/redirect-path.js`. The router derives its base from Vite, including the trailing slash for home links.

## Content review

Read [WEBSITE_AUDIT.md](WEBSITE_AUDIT.md) before release. Profile data is in `src/data/doctor.js`. Qualifications, dates, contact details, facilities and photograph provenance need client approval against original records. No star ratings or testimonials are currently displayed.


## Security and crawler checks

Read [SECURITY_REVIEW.md](SECURITY_REVIEW.md) for the latest findings and limits. `npm test` checks enquiry handling, same-origin legacy redirects and sitemap/route consistency. The build verifies entry files, metadata, policy and referenced HTML assets. The deployment workflow uses commit-pinned official actions, separates build/deployment permissions and rejects known high/critical dependency advisories with `npm audit --audit-level=high`.

The project sitemap lives at `/dr-himani/sitemap.xml`. The included project `robots.txt` is available under `/dr-himani/robots.txt`, but crawler rules are read from the origin root, `https://panbhav.github.io/robots.txt`; that URL currently returns 404. Place an origin-level file in the account's root Pages repository, or serve it at the root of the final custom domain. Missing robots.txt does not itself block crawling. Submit the sitemap in Search Console once the production domain is confirmed.

The production meta CSP restricts scripts to this origin and connections to this origin/FormSubmit. Inline styles remain permitted for React style attributes. Meta CSP cannot provide `frame-ancestors` clickjacking protection or replace HTTP security headers. Configure response headers at a suitable host/proxy if those controls are required. No header files are added that would falsely imply GitHub Pages supports them.
