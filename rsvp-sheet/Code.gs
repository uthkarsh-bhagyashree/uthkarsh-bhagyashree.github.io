/**
 * RSVP collector for the Uthkarsh & Bhagyashree invitation.
 * Paste this into Extensions > Apps Script of a Google Sheet, then deploy it as a web app.
 */
const SHEET_NAME = 'RSVPs';
const HEADERS = ['Received', 'Name', 'Guests', 'Wedding (28 Dec)', 'Reception (30 Dec)', 'Note', 'Language'];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const sheet = getSheet_();
    const p = (e && e.parameter) || {};
    const name = String(p.name || '').trim().slice(0, 120);
    if (!name) return reply_('missing name');
    sheet.appendRow([
      new Date(),
      name,
      Number(p.guests) || p.guests || '',
      p.wed === '1' ? 'Yes' : 'No',
      p.rec === '1' ? 'Yes' : 'No',
      String(p.note || '').slice(0, 1000),
      p.lang === 'kn' ? 'Kannada' : 'English'
    ]);
    return reply_('ok');
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return reply_('RSVP endpoint is running.');
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold').setBackground('#7A1022').setFontColor('#FFF3D6');
    sheet.setColumnWidths(1, HEADERS.length, 150);
    sheet.setColumnWidth(6, 320);
  }
  return sheet;
}

function reply_(text) {
  return ContentService.createTextOutput(text).setMimeType(ContentService.MimeType.TEXT);
}
