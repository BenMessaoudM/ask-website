/* Source: user-supplied ASK autumn event poster, 2026.
   Dates are Helsinki calendar days. For multi-day events, end is inclusive.
   Use null for an unannounced date; never guess a date or a venue. */
(() => {
  'use strict';
  const events = [
    {start:'2026-09-02', sv:'Kick Off Party', en:'Kick Off Party', venue:'Apollo Live Club'},
    {start:'2026-09-09', sv:'Gulisintagning', en:'Freshers’ initiation'},
    {start:'2026-09-16', sv:'ASK Group', en:'ASK Group'},
    {start:'2026-09-22', end:'2026-09-25', sv:'Gulis Sitz', en:'Gulis Sitz'},
    {start:'2026-09-30', sv:'Metro Style', en:'Metro Style'},
    {start:'2026-10-06', sv:'Cor Night', en:'Cor Night'},
    {start:'2026-10-20', sv:'Cor Night', en:'Cor Night'},
    {start:'2026-11-17', sv:'Cor Night', en:'Cor Night'},
    {start:'2026-11-21', sv:'Årsfest', en:'Annual Ball'},
    {start:'2026-12-01', sv:'Cor Night', en:'Cor Night'},
    {start:'2026-12-09', sv:'Årsavslutningsfest', en:'End of the Year Party'},
    {start:'2026-12-15', sv:'Cor Night', en:'Cor Night'},
    {start:null, sv:'Internationell sitz', en:'International Sitz'}
  ];
  function helsinkiDay(now = new Date()) {
    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone:'Europe/Helsinki',year:'numeric',month:'2-digit',day:'2-digit'
    }).formatToParts(now);
    const value = type => parts.find(part => part.type === type).value;
    return `${value('year')}-${value('month')}-${value('day')}`;
  }
  function upcoming(now = new Date()) {
    const today = helsinkiDay(now);
    return events.filter(event => !event.start || (event.end || event.start) >= today)
      .sort((a,b) => (a.start || '9999').localeCompare(b.start || '9999'));
  }
  globalThis.ASKCalendar = {events, helsinkiDay, upcoming};
})();
