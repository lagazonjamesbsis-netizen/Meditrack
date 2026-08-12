function Services() {
  const services = [
    { title: 'Basic Consultation', subtitle: 'Monday to Friday', time: '8:00am - 5:00pm', icon: '👩‍⚕️', desc: 'General medical consultation for patients of all ages. Includes check-ups, diagnosis, and treatment recommendations.' },
    { title: 'Pre-natal Care', subtitle: 'Tuesday', time: '8:00am - 5:00pm', icon: '🤰', desc: 'Comprehensive care for pregnant women including check-ups, nutritional counseling, and monitoring of fetal development.' },
    { title: 'National Immunization Program (NIP)', subtitle: 'Wednesday to Friday', time: '8:00am - 5:00pm', icon: '💉', desc: 'Routine immunization for infants, children, and adults following the national vaccination schedule.' },
    { title: 'Hypertension Detection and Management (HDM)', subtitle: 'Monday to Friday', time: '8:00am - 5:00pm', icon: '🩸', desc: 'Blood pressure screening, monitoring, and treatment for hypertensive patients.' },
    { title: 'Visual Inspection with Acetic Acid (VIA)', subtitle: 'Thursday', time: '8:00am - 5:00pm', icon: '🔬', desc: 'Cervical cancer screening procedure for early detection of abnormalities.' },
    { title: 'Family Planning', subtitle: 'Thursday', time: '8:00am - 5:00pm', icon: '🧬', desc: 'Counseling and services for various family planning methods, reproductive health education, and informed choice.' },
    { title: 'Pills and Condoms', subtitle: 'Monday to Friday', time: '8:00am - 5:00pm', icon: '💊', desc: 'Distribution and counseling on oral contraceptive pills and condoms for safe and responsible family planning.' },
    { title: 'Adolescent Health and Development Program', subtitle: 'Saturday', time: '8:00am - 12:00pm', icon: '🧑', desc: 'Health services and education tailored for adolescents including reproductive health, mental health, and life skills.' },
  ];

  const majorServices = [
    { title: 'Diabetes Management', icon: '🩺', desc: 'Blood sugar screening, monitoring, medication, and lifestyle counseling for diabetic patients.' },
    { title: 'Hypertension Control', icon: '❤️', desc: 'Regular blood pressure monitoring, maintenance medication, and dietary guidance for hypertensive patients.' },
    { title: 'TB Control Program', icon: '🔬', desc: 'Tuberculosis screening, diagnosis, directly observed therapy (DOTS), and patient support.' },
    { title: 'Cancer Screening', icon: '🎗️', desc: 'Early detection services including breast examination, cervical cancer screening, and health education.' },
    { title: 'Nutrition Program', icon: '🥗', desc: 'Nutritional assessment, supplementation, and counseling for children, pregnant women, and malnourished patients.' },
    { title: 'Mental Health Services', icon: '🧠', desc: 'Counseling, psychological support, and referral for patients experiencing mental health concerns.' },
    { title: 'Dental Care', icon: '🦷', desc: 'Basic dental services including check-ups, extractions, cleaning, and oral health education.' },
    { title: 'Wound Care & Minor Surgery', icon: '🏥', desc: 'Treatment of minor wounds, suturing, abscess drainage, and basic surgical procedures.' },
  ];

  return (
    <>
      <h1 className="ev-heading">Services</h1>
      <div className="panel-white">
        <section className="schedule-section">
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
                  <p style={{fontSize: '13px', color: '#718096', lineHeight: '1.5', margin: '0 0 10px'}}>{s.desc}</p>
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

      <h2 className="ev-heading" style={{marginTop: '40px'}}>Major Services</h2>
      <div style={{background: 'linear-gradient(to right, #EEF0FB, white)', borderLeft: '4px solid #4E69D3', borderRadius: '14px', padding: '10px 16px 16px',           display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.06)'}}>
        <div style={{width: '32px', height: '32px', borderRadius: '50%', background: '#4E69D3', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px'}}>
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" style={{width: '16px', height: '16px'}}><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
        </div>
        <div style={{paddingTop: '2px'}}>
          <p style={{fontSize: '20px', fontWeight: 600, margin: 0, color: '#1d4662'}}>RHU-Exclusive Services</p>
          <p style={{fontSize: '17px', margin: '4px 0 0', lineHeight: '1.5', color: '#4a5568'}}>These major services are exclusively available at Rural Health Units (RHUs) and are not offered here in our Barangay Sumapang Matanda Health Center.</p>
        </div>
      </div>
      <div className="panel-white">
        <section className="schedule-section">
          <div className="cards-grid upcoming">
            {majorServices.map((s, i) => (
              <div key={i} className="patient-card">
                <div className="card-header">
                  <div className="patient-avatar" style={{fontSize: '24px'}}>{s.icon}</div>
                  <div className="patient-info">
                    <h3 className="patient-name">{s.title}</h3>
                  </div>
                </div>
                <div className="card-details">
                  <p style={{fontSize: '13px', color: '#718096', lineHeight: '1.5', margin: 0}}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

export default Services;
