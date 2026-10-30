# Wilson Counseling — Redesign Concept

A modern redesign concept for Wilson Counseling, prepared by [@sebastianswebdev](https://github.com/sebastianswebdev) for review by the practice owner.

**[View the live demo](https://sebastianswebdev.github.io/wilson-counseling-redesign/)**

The site retains Wilson Counseling's aqua and coral branding, original imagery, and source content, with a new responsive layout and subtle motion.

- 46 imported content pages, including service descriptions and five therapist biographies
- Searchable services directory and nine journal articles
- FAQ accordions and provider rates
- Responsive phone, tablet, and desktop layouts
- Keyboard navigation and reduced-motion support
- Local images and fonts; no build step, analytics, or external JavaScript dependencies

## Run locally

Open `index.html` directly, double-click `Start.command` on macOS, or run:

```sh
python3 start.py
```

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Page shell, navigation, and appointment dialog |
| `styles.css` | Responsive styling and motion |
| `app.js` | Page rendering, routing, filters, and search |
| `data.js` | Imported source content |
| `assets/` | Original website imagery and local fonts |

## Publishing

GitHub Pages serves the root of the `main` branch. The `.nojekyll` file enables plain static hosting. Updates pushed to `main` are published automatically.

## Scope

This is a redesign proposal, separate from the practice's official website. Original content and imagery belong to their respective owners and are included to demonstrate the proposed design. Source: [wilsoncounseling.org](https://www.wilsoncounseling.org/), retrieved October 30, 2026.

Appointment links open the original Jane booking site. Email, phone, text, video, assessment, referral, and legal links retain their original destinations. The preview does not submit contact forms or process bookings itself.
