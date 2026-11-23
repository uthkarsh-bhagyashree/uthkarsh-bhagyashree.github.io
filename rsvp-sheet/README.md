# Saving RSVPs to a Google Sheet

When a guest fills in the RSVP and taps "Send RSVP", the site saves their name, guest count, which events they are coming to and their note into a Google Sheet. Nothing opens on the guest's phone; they simply see a thank-you message. Setting this up takes about five minutes and is free.

1. Open Google Sheets and create a new blank sheet. Name it something like "Wedding RSVPs".
2. In that sheet, open Extensions, then Apps Script. Delete what is in the editor, paste in everything from `Code.gs` in this folder, and save.
3. Click Deploy, then New deployment. Click the gear next to "Select type" and choose Web app.
4. Set "Execute as" to Me, and "Who has access" to Anyone. Click Deploy, and allow the permissions Google asks for (it may say the app is unverified; choose Advanced, then Go to the project).
5. Copy the Web app URL. It ends in `/exec`.
6. Open `js/app.js`, find the line that starts with `const RSVP_ENDPOINT =`, and paste the URL between the quotes. (Your link is already in place, so you only need this step if you ever make a new deployment with a different URL.)
Note that the Claude preview of the site blocks all requests to other websites, so RSVPs sent from the preview never reach the sheet. Test from the live GitHub Pages site instead.

7. Push the change to GitHub. Open the site, send a test RSVP, and a new row should appear in a tab called "RSVPs" within a few seconds. Delete the test row afterwards.

The sheet keeps a row per response with the time it arrived. Guests can send an update later (the button changes to "Send an update"), so if someone appears twice, keep their latest row. You can sort, filter, or add a total at the bottom of the Guests column (for example `=SUM(C2:C)`) to see your headcount.

If you later edit `Code.gs`, use Deploy, then Manage deployments, then edit the existing deployment and choose a new version, so the URL stays the same.
