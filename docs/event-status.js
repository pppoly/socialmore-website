(() => {
  const parseDate = (value, endOfDay = false) => {
    if (!value) return null;
    const [year, month, day] = value.split('-').map(Number);
    if (!year || !month || !day) return null;
    const date = new Date(year, month - 1, day);
    if (endOfDay) date.setHours(23, 59, 59, 999);
    return date;
  };

  const today = (() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  })();

  const getEventDates = (card) => ({
    applicationStart: parseDate(card.dataset.applicationStart),
    applicationEnd: parseDate(card.dataset.applicationEnd, true),
    eventStart: parseDate(card.dataset.eventStart),
    eventEnd: parseDate(card.dataset.eventEnd, true),
  });

  const resolvePhase = (card) => {
    const { applicationStart, eventStart, eventEnd } = getEventDates(card);
    const startDate = applicationStart || eventStart;

    if (eventEnd && today > eventEnd) return 'past';
    if (startDate && today < startDate) return 'upcoming';
    return 'current';
  };

  const resolveStatus = (card) => {
    const { applicationStart, applicationEnd, eventStart, eventEnd } = getEventDates(card);

    if (applicationStart && today < applicationStart) {
      return { label: '募集前', tone: 'upcoming' };
    }

    if (applicationStart && applicationEnd && today >= applicationStart && today <= applicationEnd) {
      return { label: '募集中', tone: 'open' };
    }

    if (eventStart && eventEnd && today >= eventStart && today <= eventEnd) {
      return { label: '実施中', tone: 'active' };
    }

    if (eventStart && today < eventStart) {
      return { label: '募集終了', tone: 'closed' };
    }

    return { label: '終了', tone: 'closed' };
  };

  const eventCards = Array.from(document.querySelectorAll('[data-event-card]'));
  const eventLists = new Map(
    Array.from(document.querySelectorAll('[data-event-list]')).map((list) => [list.dataset.eventList, list])
  );

  eventCards.forEach((card) => {
    const phase = resolvePhase(card);
    const status = resolveStatus(card);
    const visiblePhases = (card.dataset.showIn || '').split(/\s+/).filter(Boolean);
    const statusBadge = card.querySelector('[data-event-status]');
    const eventId = card.dataset.eventId;

    card.dataset.eventPhase = phase;

    if (statusBadge) {
      statusBadge.textContent = status.label;
      statusBadge.dataset.status = status.tone;
    }

    if (eventId) {
      document.querySelectorAll(`[data-event-status-for="${eventId}"]`).forEach((badge) => {
        badge.textContent = status.label;
        badge.dataset.status = status.tone;
      });
    }

    if (visiblePhases.length) {
      card.hidden = !visiblePhases.includes(phase);
    } else {
      card.hidden = false;
    }

    const targetList = eventLists.get(phase);
    if (!card.hidden && targetList && card.dataset.autoPlace !== 'false') {
      if (phase === 'past') {
        targetList.insertBefore(card, targetList.firstElementChild);
      } else {
        targetList.appendChild(card);
      }
    }
  });

  document.querySelectorAll('[data-event-section]').forEach((section) => {
    const emptyNote = section.querySelector('[data-empty-note]');
    const visibleCards = Array.from(section.querySelectorAll('.event-card')).filter((card) => !card.hidden);

    if (emptyNote) {
      emptyNote.hidden = visibleCards.length > 0;
    }
  });
})();
