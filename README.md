# Uthkarsh & Bhagyashree · wedding invitation

A paper-cut, 2.5D scrolling invitation. Everything it needs is in this folder (art, fonts, scripts), so it works offline and on GitHub Pages without any build step.

## Put it live on GitHub Pages

1. Create a new public repository on GitHub (for example `uthkarsh-bhagyashree`).
2. Upload everything in this folder to the repository root, keeping the `assets`, `css`, `fonts`, `js` and `vendor` folders as they are. Include the empty `.nojekyll` file.
3. In the repository, open Settings, then Pages. Under "Build and deployment", choose "Deploy from a branch", pick `main` and `/ (root)`, and save.
4. After a minute the site is live at `https://<your-username>.github.io/<repository-name>/`.

## Editing text

All English text is in `index.html`. The Kannada versions used by the ಕನ್ನಡ toggle are at the top of `js/app.js` in the `KN` list, matched by the same `data-i18n` names.

The countdown target (12:24 PM IST on 28 December 2026) is `TARGET` in `js/app.js`.

The page asks search engines not to index it (`robots` meta tag in `index.html`).

## Optional extra art

The page already has slots for a few extra layers. Drop these into `assets` and they appear automatically, with nothing else to change: `a34-grove-l.webp` and `a35-grove-r.webp` (palm and banana groves beside the gopuram), `a36-flagstaff.webp` (the brass dhwaja stambha by the door) and `a37-bird1.webp` to `a37-bird7.webp` (birds crossing the sky). If a file is missing, its slot simply stays empty.

## Music

To use your own song, save it as `music.mp3` and put it in the `assets` folder. It loops, fades in when the invitation is opened, and the bell button turns it on and off. If there is no `music.mp3`, the built-in temple tanpura and bells play instead. To use a different file name or format (for example `.m4a`), change `MUSIC_FILE` near the music section of `js/app.js`, and change `MUSIC_VOLUME` there to make it louder or softer. Keep the file small (a 128 kbps mp3 of 3 to 4 minutes is about 4 MB) so the page loads quickly on phones.

## RSVP responses

RSVPs are saved straight to a Google Sheet; guests just see a thank-you message. The web app link is already set in `RSVP_ENDPOINT` in `js/app.js`, and the setup steps are in `rsvp-sheet/README.md`.
