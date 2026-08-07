import { useState } from 'react';
import './Events.css';
import { now, addDays, toISO } from '@/src/lib/dateUtils';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const eventData = {
  [toISO(now)]: [{ title: 'Anti-Rabies Vaccination', time: '7:00am to 9:00am', type: 'vaccination' }],
  [toISO(addDays(now, 1))]: [{ title: 'Blood Donation Program', time: '3:00pm to 5:00pm', type: 'donation' }],
  [toISO(addDays(now, 2))]: [{ title: 'Mental Health Screening', time: '3:00pm to 5:00pm', type: 'screening' }],
  [toISO(addDays(now, 4))]: [
    { title: 'Basic Consultation', time: '8:00am to 5:00pm', type: 'consultation' },
    { title: 'Maternal and Child Care', time: '8:00am to 12:00pm', type: 'maternal' },
  ],
  [toISO(addDays(now, 6))]: [{ title: 'Dental Care', time: '8:00am to 5:00pm', type: 'dental' }],
  [toISO(addDays(now, 8))]: [{ title: 'Immunization and Vaccination', time: '8:00am to 5:00pm', type: 'vaccination' }],
  [toISO(addDays(now, 10))]: [{ title: 'Family Planning & Reproductive Health', time: '8:00am to 5:00pm', type: 'family' }],
  [toISO(addDays(now, 14))]: [{ title: 'Blood Donation Program', time: '3:00pm to 5:00pm', type: 'donation' }],
  [toISO(addDays(now, 18))]: [{ title: 'Anti-Rabies Vaccination', time: '7:00am to 9:00am', type: 'vaccination' }],
  [toISO(addDays(now, 24))]: [{ title: 'Mental Health Screening', time: '3:00pm to 5:00pm', type: 'screening' }],
};

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

const typeColors = {
  vaccination: { bg: '#E8EAF6', color: '#5B7FD6', label: 'Vaccination' },
  donation: { bg: '#FEE2E2', color: '#E53E3E', label: 'Blood Donation' },
  screening: { bg: '#E6FFFA', color: '#319795', label: 'Screening' },
  consultation: { bg: '#FEFCBF', color: '#975A16', label: 'Consultation' },
  maternal: { bg: '#F3E8FF', color: '#7C3AED', label: 'Maternal Care' },
  dental: { bg: '#FFE4E6', color: '#BE185D', label: 'Dental' },
  family: { bg: '#DBEAFE', color: '#1D4ED8', label: 'Family Planning' },
};

function Events() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState(
    `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
  );

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  const prevMonth = () => {
    if (month === 0) { setYear(y => y - 1); setMonth(11); }
    else setMonth(m => m - 1);
  };

  const nextMonth = () => {
    if (month === 11) { setYear(y => y + 1); setMonth(0); }
    else setMonth(m => m + 1);
  };

  const selectDate = (day) => {
    setSelectedDate(`${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`);
  };

  const selectedEvents = eventData[selectedDate] || [];

  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(<div key={`empty-${i}`} className="ev-cal-day ev-cal-day-empty" />);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const hasEvent = !!eventData[dateStr];
    const isToday = dateStr === todayStr;
    const isSelected = dateStr === selectedDate;
    calendarDays.push(
      <div
        key={d}
        className={`ev-cal-day ${isToday ? 'ev-cal-day-today' : ''} ${isSelected ? 'ev-cal-day-selected' : ''} ${hasEvent ? 'ev-cal-day-event' : ''}`}
        onClick={() => selectDate(d)}
      >
        <span className="ev-cal-day-num">{d}</span>
        {hasEvent && <span className="ev-cal-dot" />}
      </div>
    );
  }

  return (
    <div className="ev-page">
      <h1 className="ev-heading">Events Calendar</h1>

      <div className="ev-layout">
        <div className="ev-calendar">
          <div className="ev-cal-header">
            <button className="ev-cal-nav" onClick={prevMonth}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <span className="ev-cal-title">{months[month]} {year}</span>
            <button className="ev-cal-nav" onClick={nextMonth}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>

          <div className="ev-cal-day-names">
            {daysOfWeek.map(d => <div key={d} className="ev-cal-day-name">{d}</div>)}
          </div>

          <div className="ev-cal-grid">
            {calendarDays}
          </div>
        </div>

        <div className="ev-sidebar">
          <div className="ev-selected-date">
            {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>

          {selectedEvents.length === 0 ? (
            <div className="ev-no-events">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#CBD5E0" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              <p>No events scheduled for this day</p>
            </div>
          ) : (
            <div className="ev-event-list">
              {selectedEvents.map((ev, i) => {
                const tc = typeColors[ev.type] || { bg: '#F7FAFC', color: '#718096', label: 'Event' };
                return (
                  <div key={i} className="ev-event-card">
                    <div className="ev-event-type" style={{ background: tc.bg, color: tc.color }}>{tc.label}</div>
                    <h3 className="ev-event-title">{ev.title}</h3>
                    <div className="ev-event-time">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      {ev.time}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="ev-upcoming-section">
            <h3 className="ev-upcoming-title">Upcoming Events</h3>
            {Object.entries(eventData).slice(0, 4).map(([date, events]) => (
              <div key={date} className="ev-upcoming-item" onClick={() => setSelectedDate(date)}>
                <div className="ev-upcoming-date">
                  <span className="ev-upcoming-day">{new Date(date + 'T00:00:00').getDate()}</span>
                  <span className="ev-upcoming-month">{months[new Date(date + 'T00:00:00').getMonth()].slice(0, 3)}</span>
                </div>
                <div className="ev-upcoming-info">
                  <span className="ev-upcoming-name">{events[0].title}</span>
                  <span className="ev-upcoming-time">{events[0].time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Events;
