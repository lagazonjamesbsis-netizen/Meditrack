import { useState } from 'react';
import { now, addDays, fmtLong } from '@/src/lib/dateUtils';

function Appointment() {
  const today = [
    { name: 'RICHARDS, Alden P.', ptn: 'PTN-2610204', service: 'Basic Consultation', date: fmtLong(now), time: '7:00am to 8:00am' },
    { name: 'CRUZ, Dodong C.', ptn: 'PTN-2610215', service: 'Basic Consultation', date: fmtLong(now), time: '7:00am to 8:00am' },
    { name: 'SANTOS, Judith A.', ptn: 'PTN-2610205', service: 'Vaccination', date: fmtLong(now), time: '7:00am to 8:00am' }
  ];

  const [notified, setNotified] = useState(new Set());

  const upcoming = [
    { name: 'Patient 1', ptn: 'PTN-0001001', service: 'Vaccination', date: fmtLong(addDays(now, 5)), time: '7:00am to 8:00am' },
    { name: 'Patient 2', ptn: 'PTN-0001002', service: 'Vaccination', date: fmtLong(addDays(now, 5)), time: '7:00am to 8:00am' },
    { name: 'Patient 3', ptn: 'PTN-0001003', service: 'Vaccination', date: fmtLong(addDays(now, 5)), time: '7:00am to 8:00am' },
    { name: 'Patient 4', ptn: 'PTN-0001004', service: 'Vaccination', date: fmtLong(addDays(now, 5)), time: '7:00am to 8:00am' },
    { name: 'Patient 5', ptn: 'PTN-0001005', service: 'Vaccination', date: fmtLong(addDays(now, 5)), time: '7:00am to 8:00am' },
    { name: 'Patient 6', ptn: 'PTN-0001006', service: 'Vaccination', date: fmtLong(addDays(now, 5)), time: '7:00am to 8:00am' }
  ];

  const renderCard = (patient) => (
    <div key={patient.ptn} className="patient-card">
      <div className="card-header">
        <div className="patient-avatar" />
        <div className="patient-info">
          <h3 className="patient-name">{patient.name}</h3>
          <p className="patient-id">{patient.ptn}</p>
          <p className="service-type">{patient.service}</p>
        </div>
      </div>
      <div className="card-details">
        <span className="detail-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          {patient.date}
        </span>
        <span className="detail-item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          {patient.time}
        </span>
      </div>
      <div className="card-actions">
        <button className="btn btn-outline">View Record</button>
        <button
          className={`btn ${notified.has(patient.ptn) ? 'btn-sent' : 'btn-primary'}`}
          onClick={() => {
            setNotified(prev => new Set(prev).add(patient.ptn));
            setTimeout(() => setNotified(prev => {
              const next = new Set(prev);
              next.delete(patient.ptn);
              return next;
            }), 3000);
          }}
        >
          {notified.has(patient.ptn) ? 'Sent!' : 'Notify'}
        </button>
      </div>
    </div>
  );

  return (
    <>
      <h1 className="greeting">Appointment Schedule</h1>

      <div className="panel-white">
        <section className="schedule-section">
          <h2 className="section-title">Today's Schedule</h2>
          <div className="cards-grid today">
            {today.map((patient) => renderCard(patient))}
          </div>
        </section>
      </div>

      <div className="panel-white">
        <section className="schedule-section">
          <h2 className="section-title">Upcoming Appointments</h2>
          <div className="cards-grid upcoming">
            {upcoming.map((patient) => renderCard(patient))}
          </div>
        </section>
        <div className="view-all-container">
          <button className="btn btn-view-all">View List of Appointees</button>
        </div>
      </div>
    </>
  );
}

export default Appointment;
