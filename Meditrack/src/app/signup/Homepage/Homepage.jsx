import { useState } from 'react';
import { now, addDays, toISO, fmtLong } from '@/src/lib/dateUtils';

function Homepage() {
  const today = [
    { name: 'RICHARDS, Alden P.', ptn: 'PTN-2610204', service: 'Basic Consultation', date: fmtLong(now), time: '7:00am to 8:00am' },
    { name: 'CRUZ, Dodong C.', ptn: 'PTN-2610215', service: 'Basic Consultation', date: fmtLong(now), time: '7:00am to 8:00am' },
    { name: 'SANTOS, Judith A.', ptn: 'PTN-2610205', service: 'Vaccination', date: fmtLong(now), time: '7:00am to 8:00am' }
  ];

  const upcoming = [
    { name: 'Patient 1', ptn: 'PTN-0001001', service: 'Vaccination', date: fmtLong(addDays(now, 5)), time: '7:00am to 8:00am' },
    { name: 'Patient 2', ptn: 'PTN-0001002', service: 'Vaccination', date: fmtLong(addDays(now, 5)), time: '7:00am to 8:00am' },
    { name: 'Patient 3', ptn: 'PTN-0001003', service: 'Vaccination', date: fmtLong(addDays(now, 5)), time: '7:00am to 8:00am' },
    { name: 'Patient 4', ptn: 'PTN-0001004', service: 'Vaccination', date: fmtLong(addDays(now, 5)), time: '7:00am to 8:00am' },
    { name: 'Patient 5', ptn: 'PTN-0001005', service: 'Vaccination', date: fmtLong(addDays(now, 5)), time: '7:00am to 8:00am' },
    { name: 'Patient 6', ptn: 'PTN-0001006', service: 'Vaccination', date: fmtLong(addDays(now, 5)), time: '7:00am to 8:00am' }
  ];

  const [notified, setNotified] = useState(new Set());
  const [showAppointmentList, setShowAppointmentList] = useState(false);
  const [selectedDateTab, setSelectedDateTab] = useState(0);
  const [pickerDate, setPickerDate] = useState(toISO(now));

  const dateToIso = {
    [fmtLong(now)]: toISO(now),
    [fmtLong(addDays(now, 5))]: toISO(addDays(now, 5)),
  };

  const serviceColors = {
    'Basic Consultation': { bg: '#E0F2FE', color: '#0369A1', label: 'Consultation' },
    'Vaccination': { bg: '#E8EAF6', color: '#4E69D3', label: 'Vaccination' },
    'Check-up': { bg: '#FEFCBF', color: '#975A16', label: 'Check-up' },
    'Pre-natal Care': { bg: '#F3E8FF', color: '#7C3AED', label: 'Pre-natal' },
    'Family Planning': { bg: '#DBEAFE', color: '#1D4ED8', label: 'Family Planning' },
  };

  const allAppointments = [...today, ...upcoming];
  const dateGroups = allAppointments.reduce((acc, p) => {
    if (!acc[p.date]) acc[p.date] = [];
    acc[p.date].push(p);
    return acc;
  }, {});
  const dateTabs = Object.keys(dateGroups);

  const events = [
    { title: 'Anti-Rabies Vaccination', subtitle: fmtLong(addDays(now, 2)), time: '7:00am to 9:00am', icon: '💉' },
    { title: 'Blood Donation Program', subtitle: fmtLong(addDays(now, 3)), time: '3:00pm to 5:00pm', icon: '🩸' },
    { title: 'Mental Health Screening', subtitle: fmtLong(addDays(now, 4)), time: '3:00pm to 5:00pm', icon: '🧠' }
  ];

  const services = [
    { title: 'Basic Consultation', subtitle: 'Monday to Friday', time: '8:00am - 5:00pm', icon: '👩‍⚕️' },
    { title: 'Pre-natal Care', subtitle: 'Tuesday', time: '8:00am - 5:00pm', icon: '🤰' },
    { title: 'National Immunization Program (NIP)', subtitle: 'Wednesday to Friday', time: '8:00am - 5:00pm', icon: '💉' },
    { title: 'Hypertension Detection and Management (HDM)', subtitle: 'Monday to Friday', time: '8:00am - 5:00pm', icon: '🩸' },
    { title: 'Visual Inspection with Acetic Acid (VIA)', subtitle: 'Thursday', time: '8:00am - 5:00pm', icon: '🔬' },
    { title: 'Family Planning', subtitle: 'Thursday', time: '8:00am - 5:00pm', icon: '🧬' },
    { title: 'Pills and Condoms', subtitle: 'Monday to Friday', time: '8:00am - 5:00pm', icon: '💊' },
    { title: 'Adolescent Health and Development Program', subtitle: 'Saturday', time: '8:00am - 12:00pm', icon: '🧑' }
  ];

  const majorServices = [
    { title: 'Diabetes Management', icon: '🩺', desc: 'Blood sugar screening, monitoring, medication, and lifestyle counseling.' },
    { title: 'Hypertension Control', icon: '❤️', desc: 'Regular blood pressure monitoring, maintenance medication, and dietary guidance.' },
    { title: 'TB Control Program', icon: '🔬', desc: 'Tuberculosis screening, diagnosis, directly observed therapy (DOTS), and patient support.' },
    { title: 'Cancer Screening', icon: '🎗️', desc: 'Early detection services including breast examination and cervical cancer screening.' },
    { title: 'Nutrition Program', icon: '🥗', desc: 'Nutritional assessment, supplementation, and counseling for all ages.' },
    { title: 'Mental Health Services', icon: '🧠', desc: 'Counseling, psychological support, and referral for mental health concerns.' },
    { title: 'Dental Care', icon: '🦷', desc: 'Basic dental services including check-ups, extractions, cleaning, and oral health education.' },
    { title: 'Wound Care & Minor Surgery', icon: '🏥', desc: 'Treatment of minor wounds, suturing, abscess drainage, and basic surgical procedures.' }
  ];

  const counts = today.reduce((acc, p) => {
    if (p.service === 'Basic Consultation') acc.consultation++;
    else if (p.service === 'Vaccination') acc.vaccination++;
    else acc.other++;
    return acc;
  }, { consultation: 0, vaccination: 0, other: 0 });

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
      <h1 className="greeting">Hello! Midwife Vivianne</h1>

        <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
          </div>
          <div className="stat-info">
            <span className="stat-number">{today.length}</span>
            <span className="stat-label">Today&apos;s Schedule</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
          </div>
          <div className="stat-info">
            <span className="stat-number">{upcoming.length}</span>
            <span className="stat-label">Upcoming Appointments</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{background: '#FFF9C4'}}>
            <svg viewBox="0 0 24 24" fill="#F6AD55" stroke="#F6AD55" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          </div>
          <div className="stat-info">
            <span className="stat-number">4.6 <span style={{color: '#F6AD55', fontSize: '14px', letterSpacing: '1px'}}>★★★★★</span></span>
            <span className="stat-label">Patient Feedback</span>
          </div>
        </div>
      </div>

      <div className="panel-white">
        <section className="schedule-section">
          <h2 className="section-title">Today&apos;s Schedule</h2>
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
          <div className="view-all-container">
            <button className="btn btn-view-all" onClick={() => setShowAppointmentList(true)}>View List of Appointees</button>
          </div>
        </section>
      </div>

      <div className="panel-white">
        <section className="schedule-section">
          <h2 className="section-title">Events</h2>
          <div className="cards-grid upcoming">
            {events.map((event, i) => (
              <div key={i} className="patient-card">
                <div className="card-header">
                  <div className="patient-avatar" style={{fontSize: '24px'}}>{event.icon}</div>
                  <div className="patient-info">
                    <h3 className="patient-name">{event.title}</h3>
                    <p className="service-type">{event.subtitle}</p>
                  </div>
                </div>
                <div className="card-details">
                  <span className="detail-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    {event.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="panel-white">
        <section className="schedule-section">
          <h2 className="section-title">Services</h2>
          <div className="cards-grid upcoming">
            {services.map((s, i) => (
              <div key={i} className="patient-card">
                <div className="card-header">
                  <div className="patient-avatar" style={{fontSize: '24px'}}>{s.icon}</div>
                  <div className="patient-info">
                    <h3 className="patient-name">{s.title}</h3>
                    <p className="service-type" style={{fontSize: '14px', color: '#718096', margin: '4px 0 0'}}>{s.subtitle}</p>
                  </div>
                </div>
                <div className="card-details">
                  <span className="detail-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    {s.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>


      {showAppointmentList && (
        <div style={{position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', zIndex: 1000, padding: '40px', overflowY: 'auto'}} onClick={() => setShowAppointmentList(false)}>
          <div style={{background: 'white', borderRadius: '16px', width: '100%', maxWidth: '960px', boxShadow: '0 20px 60px rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column', maxHeight: '90vh'}} onClick={e => e.stopPropagation()}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 28px', borderBottom: '1px solid #e5e7eb', position: 'sticky', top: 0, background: 'white', borderRadius: '16px 16px 0 0', zIndex: 10}}>
              <h2 style={{fontSize: '24px', fontWeight: 700, color: '#2A2E43', margin: 0}}>List of Appointees</h2>
              <button style={{width: '36px', height: '36px', border: 'none', background: '#f3f4f6', borderRadius: '50%', fontSize: '20px', color: '#6b7280', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'}} onClick={() => setShowAppointmentList(false)}>&times;</button>
            </div>

            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', padding: '20px 28px 12px', borderBottom: '1px solid #e5e7eb'}}>
              <button onClick={() => {
                const d = new Date(pickerDate + 'T12:00:00');
                d.setDate(d.getDate() - 1);
                setPickerDate(d.toISOString().split('T')[0]);
              }} style={{background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px', borderRadius: '8px', color: '#6b7280', display: 'flex', alignItems: 'center'}}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width: '20px', height: '20px'}}><polyline points="15 18 9 12 15 6" /></svg>
              </button>
              <button onClick={() => document.getElementById('appointment-date-picker')?.showPicker()} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '180px', background: 'transparent', border: 'none', cursor: 'pointer'}}>
                <span style={{fontSize: '16px', fontWeight: 700, color: '#2A2E43'}}>
                  {new Date(pickerDate + 'T12:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
                <span style={{fontSize: '11px', fontWeight: 500, color: '#9ca3af'}}>
                  {new Date(pickerDate + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long' })}
                </span>
              </button>
              <input id="appointment-date-picker" type="date" value={pickerDate} onChange={e => setPickerDate(e.target.value)} style={{width: 0, height: 0, padding: 0, border: 'none', opacity: 0}} />
              <button onClick={() => {
                const d = new Date(pickerDate + 'T12:00:00');
                d.setDate(d.getDate() + 1);
                setPickerDate(d.toISOString().split('T')[0]);
              }} style={{background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px', borderRadius: '8px', color: '#6b7280', display: 'flex', alignItems: 'center'}}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width: '20px', height: '20px'}}><polyline points="9 18 15 12 9 6" /></svg>
              </button>
            </div>

            <div style={{padding: '24px 28px', overflowY: 'auto', flex: 1, maxHeight: '70vh'}}>
              <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                {(() => {
                  const matchDate = Object.entries(dateToIso).find(([, iso]) => iso === pickerDate)?.[0];
                  const patients = matchDate ? dateGroups[matchDate] : [];
                  if (!patients || patients.length === 0) {
                    return <p style={{textAlign: 'center', padding: '40px 0', color: '#6b7280'}}>No appointments found for this date.</p>;
                  }
                  return patients.map(p => {
                    const sc = serviceColors[p.service] || { bg: '#F7FAFC', color: '#718096', label: p.service };
                    return (
                      <div key={p.ptn} style={{display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', borderRadius: '12px', background: '#f9fafb', border: '1px solid #f3f4f6'}}>
                        <div style={{width: '48px', height: '48px', borderRadius: '50%', background: '#dedede', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: 700, color: '#6b7280', flexShrink: 0}}>
                          {p.name.charAt(0)}
                        </div>
                        <div style={{flex: 1, minWidth: 0}}>
                          <p style={{fontSize: '16px', fontWeight: 600, margin: 0, color: '#111'}}>{p.name}</p>
                          <p style={{fontSize: '14px', margin: '2px 0 0', color: '#6b7280'}}>{p.ptn}</p>
                        </div>
                        <span style={{background: sc.bg, color: sc.color, padding: '4px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: 600, whiteSpace: 'nowrap'}}>{sc.label}</span>
                        <div style={{textAlign: 'right', flexShrink: 0}}>
                          <p style={{fontSize: '14px', fontWeight: 600, margin: 0, color: '#111'}}>{p.time}</p>
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>

            <div style={{display: 'flex', justifyContent: 'flex-end', gap: '12px', padding: '16px 28px', borderTop: '1px solid #e5e7eb', position: 'sticky', bottom: 0, background: 'white', borderRadius: '0 0 16px 16px'}}>
              <button style={{padding: '10px 24px', borderRadius: '8px', border: 'none', fontSize: '14px', fontWeight: 600, cursor: 'pointer', background: '#f3f4f6', color: '#374151'}} onClick={() => setShowAppointmentList(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Homepage;
