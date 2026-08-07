import { useState, useEffect } from 'react';
import './Patient Record.css';

const puroks = [
  'Purok 1A', 'Purok 1B', 'Purok 2A & 2B', 'Purok 3A', 'Purok 3B',
  'Purok 4', 'Purok 5A', 'Purok 5B', 'Purok 6', 'Purok 7', 'Purok 8',
];

const RECORDS_PER_PAGE = 10;

const emptyForm = {
  lastName: '', givenName: '', middleName: '', suffix: '', maidenName: '',
  sex: '', bloodType: '', birthdate: '', age: '', placeOfBirth: '',
  civilStatus: '', religion: '', contactNumber: '',
  fatherLastName: '', fatherGivenName: '', fatherMiddleName: '',
  motherLastName: '', motherGivenName: '', motherMiddleName: '',
  region: 'Region 3', province: 'Bulacan', city: 'City of Malolos', barangay: 'Sumapang Matanda', street: '', postalCode: '3000',
  philHealthNo: '', memberName: '', spouseName: '', memberBirthdate: '',
  completeAddress: '', memberDependent: '', familyMemberRole: '', educationalAttainment: '',
  chiefComplaints: '', diagnosis: '', medications: '',
};

const emptyImmunization = {
  bcg: '', hepaB24: '', hepaBLess24: '', pentavalent1: '', mcv1: '',
  opv1: '', rota1: '', pcv1: '', hepaB2: '', pneumonia: '', influenza: '',
};

const emptyMedical = {
  date: '', bp: '', hr: '', rr: '', weight: '', height: '', temperature: '',
};

const rawRecords = [
  {
    id: 'PTN-2610204',
    purok: 'Purok 1A',
    date: '03-27-2026',
    form: {
      lastName: 'Richards', givenName: 'Alden', middleName: 'P.', suffix: '', maidenName: '',
      sex: 'Male', bloodType: 'O+', birthdate: '1990-05-15', age: '36', placeOfBirth: 'Manila',
      civilStatus: 'Married', religion: 'Roman Catholic', contactNumber: '09171234567',
      fatherLastName: 'Richards', fatherGivenName: 'Michael', fatherMiddleName: 'D.',
      motherLastName: 'Santos', motherGivenName: 'Maria', motherMiddleName: 'L.',
      region: 'Region 3', province: 'Bulacan', city: 'City of Malolos',
      barangay: 'Sumapang Matanda', street: 'Purok 1A', postalCode: '3000',
      philHealthNo: 'PHN-123456789', memberName: 'Alden P. Richards', spouseName: 'Sarah R. Richards',
      memberBirthdate: '1990-05-15', completeAddress: '123 Rizal Street, Poblacion, Manila',
      memberDependent: 'No', familyMemberRole: '', educationalAttainment: 'College Graduate',
      chiefComplaints: 'Patient complains of persistent headache and dizziness for the past 3 days.',
      diagnosis: 'Hypertension - Stage 1. Patient advised to monitor blood pressure regularly.',
      medications: 'Prescribed Losartan 50mg once daily. Follow-up in 2 weeks.',
    },
    immunizationRecords: [
      { bcg: '2026-01-15', hepaB24: '2026-01-15', hepaBLess24: '', pentavalent1: '2026-02-15', mcv1: '2026-03-15', opv1: '2026-02-15', rota1: '2026-02-15', pcv1: '2026-02-15', hepaB2: '2026-03-15', pneumonia: '', influenza: '2026-06-01' },
    ],
    medicalRecords: [
      { date: '2026-03-27', bp: '140/90', hr: '78', rr: '16', weight: '75', height: '5.8', temperature: '36.8' },
    ],
  },
  { id: 'PTN-2610215', purok: 'Purok 1B', date: '03-27-2026', form: { lastName: 'Cruz', givenName: 'Dodong', middleName: 'C.', sex: 'Male', region: 'Region 3', province: 'Bulacan', city: 'City of Malolos', barangay: 'Sumapang Matanda', street: 'Purok 1B', postalCode: '3000' } },
  { id: 'PTN-2610205', purok: 'Purok 2A & 2B', date: '03-27-2026', form: { lastName: 'Santos', givenName: 'Judith', middleName: 'A.', sex: 'Female', region: 'Region 3', province: 'Bulacan', city: 'City of Malolos', barangay: 'Sumapang Matanda', street: 'Purok 2A & 2B', postalCode: '3000' } },
  { id: 'PTN-2610206', purok: 'Purok 3A', date: '03-26-2026', form: { lastName: 'Reyes', givenName: 'Maria', middleName: 'L.', sex: 'Female', region: 'Region 3', province: 'Bulacan', city: 'City of Malolos', barangay: 'Sumapang Matanda', street: 'Purok 3A', postalCode: '3000' } },
  { id: 'PTN-2610207', purok: 'Purok 3B', date: '03-26-2026', form: { lastName: 'Gonzales', givenName: 'Pedro', middleName: 'M.', sex: 'Male', region: 'Region 3', province: 'Bulacan', city: 'City of Malolos', barangay: 'Sumapang Matanda', street: 'Purok 3B', postalCode: '3000' } },
  { id: 'PTN-2610208', purok: 'Purok 4', date: '03-25-2026', form: { lastName: 'Flores', givenName: 'Ana', middleName: 'B.', sex: 'Female', region: 'Region 3', province: 'Bulacan', city: 'City of Malolos', barangay: 'Sumapang Matanda', street: 'Purok 4', postalCode: '3000' } },
  { id: 'PTN-2610209', purok: 'Purok 5A', date: '03-25-2026', form: { lastName: 'Dela Cruz', givenName: 'Juan', middleName: 'T.', sex: 'Male', region: 'Region 3', province: 'Bulacan', city: 'City of Malolos', barangay: 'Sumapang Matanda', street: 'Purok 5A', postalCode: '3000' } },
  { id: 'PTN-2610210', purok: 'Purok 5B', date: '03-24-2026', form: { lastName: 'Villanueva', givenName: 'Sofia', middleName: 'D.', sex: 'Female', region: 'Region 3', province: 'Bulacan', city: 'City of Malolos', barangay: 'Sumapang Matanda', street: 'Purok 5B', postalCode: '3000' } },
  { id: 'PTN-2610211', purok: 'Purok 6', date: '03-24-2026', form: { lastName: 'Ramos', givenName: 'Carlos', middleName: 'S.', sex: 'Male', region: 'Region 3', province: 'Bulacan', city: 'City of Malolos', barangay: 'Sumapang Matanda', street: 'Purok 6', postalCode: '3000' } },
  { id: 'PTN-2610212', purok: 'Purok 7', date: '03-23-2026', form: { lastName: 'Mendoza', givenName: 'Lisa', middleName: 'G.', sex: 'Female', region: 'Region 3', province: 'Bulacan', city: 'City of Malolos', barangay: 'Sumapang Matanda', street: 'Purok 7', postalCode: '3000' } },
];

const today = new Date();
const DAY = 86400000;
const shiftDate = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const mdy = (d) => `${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}-${d.getFullYear()}`;
const parseMdy = (s) => { const [m, d, y] = s.split('-').map(Number); return new Date(y, m - 1, d); };
const parseIso = (s) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };

const recordDelta = Math.round((today.getTime() - new Date(2026, 2, 27).getTime()) / DAY);
const immunizationDelta = Math.round((today.getTime() - new Date(2026, 5, 1).getTime()) / DAY) - 7;

const shiftMdy = (s) => mdy(shiftDate(parseMdy(s), recordDelta));
const shiftIso = (s) => iso(shiftDate(parseIso(s), immunizationDelta));

const initialRecords = rawRecords.map((r) => ({
  ...r,
  date: shiftMdy(r.date),
  medicalRecords: (r.medicalRecords || []).map((m) => m.date ? { ...m, date: iso(shiftDate(parseIso(m.date), recordDelta)) } : m),
  immunizationRecords: (r.immunizationRecords || []).map((im) => {
    const next = { ...im };
    for (const k of Object.keys(next)) next[k] = shiftIso(next[k]);
    return next;
  }),
}));

function formatName(r) {
  const f = r.form;
  const last = f.lastName || '';
  const given = f.givenName || '';
  const mid = f.middleName ? ` ${f.middleName.charAt(0)}.` : '';
  return `${last}, ${given}${mid}`;
}

function PatientRecord() {
  const [patientRecords, setPatientRecords] = useState(initialRecords);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [viewingPatient, setViewingPatient] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [formData, setFormData] = useState({ ...emptyForm });
  const [immunizationRecords, setImmunizationRecords] = useState([]);
  const [medicalRecords, setMedicalRecords] = useState([]);

  useEffect(() => {
    if (formData.birthdate) {
      const birth = new Date(formData.birthdate);
      const today = new Date();
      let age = today.getFullYear() - birth.getFullYear();
      const m = today.getMonth() - birth.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
      setFormData((prev) => ({ ...prev, age: isNaN(age) ? '' : String(age) }));
    }
  }, [formData.birthdate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImmunizationChange = (index, field, value) => {
    setImmunizationRecords((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleMedicalChange = (index, field, value) => {
    setMedicalRecords((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const addImmunizationRecord = () => {
    setImmunizationRecords((prev) => [...prev, { ...emptyImmunization }]);
  };

  const addMedicalRecord = () => {
    setMedicalRecords((prev) => [...prev, { ...emptyMedical }]);
  };

  const resetForm = () => {
    setFormData({ ...emptyForm });
    setImmunizationRecords([]);
    setMedicalRecords([]);
    setEditingId(null);
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (record) => {
    setFormData({ ...record.form });
    setImmunizationRecords(record.immunizationRecords ? [...record.immunizationRecords] : []);
    setMedicalRecords(record.medicalRecords ? [...record.medicalRecords] : []);
    setEditingId(record.id);
    setShowModal(true);
  };

  const handleSave = () => {
    if (editingId) {
      setPatientRecords((prev) =>
        prev.map((r) =>
          r.id === editingId
            ? { ...r, form: { ...formData }, immunizationRecords: [...immunizationRecords], medicalRecords: [...medicalRecords] }
            : r
        )
      );
    } else {
      const newId = `PTN-${String(Date.now()).slice(-7)}`;
      setCurrentPage(1);
      setPatientRecords((prev) => [
        ...prev,
        {
          id: newId,
          purok: '',
          date: new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }).replace(/\//g, '-'),
          form: { ...formData },
          immunizationRecords: [...immunizationRecords],
          medicalRecords: [...medicalRecords],
        },
      ]);
    }
    setShowModal(false);
    resetForm();
  };

  const handlePrint = () => {
    if (!viewingPatient) return;
    const p = viewingPatient;
    const win = window.open('', '_blank');
    win.document.write(`
      <html>
        <head>
          <title>Patient Record - ${p.id}</title>
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; padding: 40px; color: #333; }
            h1 { font-size: 22px; margin-bottom: 4px; }
            .sub { color: #666; font-size: 13px; margin-bottom: 24px; }
            h2 { font-size: 15px; border-bottom: 2px solid #5B7FD6; padding-bottom: 4px; margin: 20px 0 12px; color: #2D3748; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 8px; }
            td { padding: 4px 12px 4px 0; font-size: 13px; vertical-align: top; }
            td:first-child { font-weight: 600; color: #555; white-space: nowrap; width: 180px; }
            .section { margin-bottom: 16px; }
            .no-data { color: #999; font-style: italic; font-size: 13px; }
            @media print { body { padding: 20px; } }
          </style>
        </head>
        <body>
          <h1>MediTrack - Patient Record</h1>
          <div class="sub">Record ID: ${p.id}</div>

          <h2>Personal Information</h2>
          <table>${[
            ['Name', `${p.form.lastName || ''}, ${p.form.givenName || ''} ${p.form.middleName || ''}`],
            ['Suffix', p.form.suffix || 'N/A'],
            ['Maiden Name', p.form.maidenName || 'N/A'],
            ['Sex', p.form.sex || 'N/A'],
            ['Blood Type', p.form.bloodType || 'N/A'],
            ['Birthdate', p.form.birthdate || 'N/A'],
            ['Age', p.form.age || 'N/A'],
            ['Place of Birth', p.form.placeOfBirth || 'N/A'],
            ['Civil Status', p.form.civilStatus || 'N/A'],
            ['Religion', p.form.religion || 'N/A'],
            ['Contact', p.form.contactNumber || 'N/A'],
          ].map(([l, v]) => `<tr><td>${l}</td><td>${v}</td></tr>`).join('')}</table>

          <h2>Father's Name</h2>
          <table><tr><td>Name</td><td>${p.form.fatherLastName || 'N/A'}, ${p.form.fatherGivenName || ''} ${p.form.fatherMiddleName || ''}</td></tr></table>

          <h2>Mother's Maiden Name</h2>
          <table><tr><td>Name</td><td>${p.form.motherLastName || 'N/A'}, ${p.form.motherGivenName || ''} ${p.form.motherMiddleName || ''}</td></tr></table>

          <h2>Address</h2>
          <table>${[
            ['Region', p.form.region || 'N/A'],
            ['Province', p.form.province || 'N/A'],
            ['City/Municipality', p.form.city || 'N/A'],
            ['Barangay', p.form.barangay || 'N/A'],
            ['Street/Purok', p.form.street || 'N/A'],
            ['Postal Code', p.form.postalCode || 'N/A'],
          ].map(([l, v]) => `<tr><td>${l}</td><td>${v}</td></tr>`).join('')}</table>

          <h2>PhilHealth Information</h2>
          <table>${[
            ['PhilHealth No.', p.form.philHealthNo || 'N/A'],
            ['Member Name', p.form.memberName || 'N/A'],
            ['Spouse', p.form.spouseName || 'N/A'],
            ['Member Birthdate', p.form.memberBirthdate || 'N/A'],
            ['Address', p.form.completeAddress || 'N/A'],
            ['Dependent', p.form.memberDependent || 'N/A'],
            ['Family Role', p.form.familyMemberRole || 'N/A'],
            ['Education', p.form.educationalAttainment || 'N/A'],
          ].map(([l, v]) => `<tr><td>${l}</td><td>${v}</td></tr>`).join('')}</table>

          <h2>Immunization Records</h2>
          ${(!p.immunizationRecords || p.immunizationRecords.length === 0) ? '<div class="no-data">No immunization records.</div>' : p.immunizationRecords.map((rec, i) => `
            <div class="section"><strong>Record #${i + 1}</strong>
            <table>${[
              ['BCG', rec.bcg], ['HEPA B (24h)', rec.hepaB24], ['HEPA B (<24h)', rec.hepaBLess24],
              ['PENTAVALENT 1', rec.pentavalent1], ['MCV 1 (AMV)', rec.mcv1], ['OPV 1', rec.opv1],
              ['ROTA 1', rec.rota1], ['PCV 1', rec.pcv1], ['HEPA B2', rec.hepaB2],
              ['PNEUMONIA', rec.pneumonia], ['INFLUENZA', rec.influenza],
            ].map(([l, v]) => `<tr><td>${l}</td><td>${v || '—'}</td></tr>`).join('')}</table></div>
          `).join('')}

          <h2>Medical Records</h2>
          ${(!p.medicalRecords || p.medicalRecords.length === 0) ? '<div class="no-data">No medical records.</div>' : p.medicalRecords.map((rec, i) => `
            <div class="section"><strong>Record #${i + 1}</strong>
            <table>${[
              ['Date', rec.date], ['BP', rec.bp], ['HR', rec.hr], ['RR', rec.rr],
              ['Weight', rec.weight], ['Height', rec.height], ['Temperature', rec.temperature],
            ].map(([l, v]) => `<tr><td>${l}</td><td>${v || '—'}</td></tr>`).join('')}</table></div>
          `).join('')}

          <h2>Chief Complaints</h2>
          <p>${p.form.chiefComplaints || 'None'}</p>

          <h2>Diagnosis</h2>
          <p>${p.form.diagnosis || 'None'}</p>

          <h2>Medications / Treatment</h2>
          <p>${p.form.medications || 'None'}</p>
        </body>
      </html>
    `);
    win.document.close();
    win.print();
  };

  const allPatients = patientRecords
    .map((r) => ({
      name: formatName(r),
      id: r.id,
      purok: r.purok,
      date: r.date,
    }))
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));

  const totalPages = Math.max(1, Math.ceil(allPatients.length / RECORDS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const patients = allPatients.slice((safePage - 1) * RECORDS_PER_PAGE, safePage * RECORDS_PER_PAGE);
  const firstShown = allPatients.length === 0 ? 0 : (safePage - 1) * RECORDS_PER_PAGE + 1;
  const lastShown = (safePage - 1) * RECORDS_PER_PAGE + patients.length;

  return (
    <>
      <div className="pr-panel">
        <h1 className="pr-heading">PATIENT RECORD LIST</h1>

        <div className="pr-controls">
          <div className="pr-controls-left">
            <div className="pr-search-field">
              <svg className="pr-field-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
              <input type="text" placeholder="Search by patient name or ID" />
            </div>
            <div className="pr-filter">
              <select>
                <option>All Puroks</option>
                <option>Purok 1A</option>
                <option>Purok 2A & 2B</option>
                <option>Purok 3A</option>
                <option>Purok 3B</option>
                <option>Purok 4</option>
                <option>Purok 5A</option>
                <option>Purok 5B</option>
                <option>Purok 6</option>
                <option>Purok 7</option>
                <option>Purok 8</option>
              </select>
              <svg className="pr-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
            </div>
          </div>
          <div className="pr-controls-right">
            <button className="pr-btn-add" onClick={openAddModal}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg>
              Add Patient
            </button>
          </div>
        </div>

        <div className="pr-table-wrap">
          <table className="pr-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>ID</th>
                <th>Purok</th>
                <th>Date Recorded</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((p) => (
                <tr key={p.id} className={selectedPatient?.id === p.id ? 'pr-row-selected' : ''} onClick={() => setSelectedPatient(p)}>
                  <td>
                    <div className="pr-cell-name">
                      <div className="pr-avatar">{p.name.charAt(0)}</div>
                      <span>{p.name}</span>
                    </div>
                  </td>
                  <td className="pr-cell-id">{p.id}</td>
                  <td>{p.purok}</td>
                  <td className="pr-cell-date">{p.date}</td>
                  <td>
                    <div className="pr-cell-actions">
                      <button className="pr-btn-view" onClick={(e) => {
                        e.stopPropagation();
                        const record = patientRecords.find((r) => r.id === p.id);
                        if (record) setViewingPatient(record);
                      }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                        View Record
                      </button>
                      <button className="pr-btn-edit" onClick={(e) => {
                        e.stopPropagation();
                        const record = patientRecords.find((r) => r.id === p.id);
                        if (record) openEditModal(record);
                      }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                        Edit Record
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pr-footer">
          <span className="pr-count">Showing {firstShown}-{lastShown} of {allPatients.length} records</span>
          {totalPages > 1 && (
            <div className="pr-pagination">
              <button className="pr-page-btn" disabled={safePage === 1} onClick={() => setCurrentPage(safePage - 1)}>&lsaquo; Prev</button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  className={`pr-page-btn${safePage === i + 1 ? ' pr-page-active' : ''}`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button className="pr-page-btn" disabled={safePage === totalPages} onClick={() => setCurrentPage(safePage + 1)}>Next &rsaquo;</button>
            </div>
          )}
        </div>
      </div>

      {/* VIEW RECORD MODAL */}
      {viewingPatient && (
        <div className="modal-overlay" onClick={() => setViewingPatient(null)}>
          <div className="modal-content view-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Patient Record — {viewingPatient.id}</h2>
              <button className="modal-close" onClick={() => setViewingPatient(null)}>&times;</button>
            </div>
            <div className="modal-body">
              <div className="view-section">
                <h3>Personal Information</h3>
                <div className="view-grid">
                  <div><span>Name:</span> {viewingPatient.form.lastName}, {viewingPatient.form.givenName} {viewingPatient.form.middleName}</div>
                  <div><span>Suffix:</span> {viewingPatient.form.suffix || 'N/A'}</div>
                  <div><span>Maiden Name:</span> {viewingPatient.form.maidenName || 'N/A'}</div>
                  <div><span>Sex:</span> {viewingPatient.form.sex}</div>
                  <div><span>Blood Type:</span> {viewingPatient.form.bloodType}</div>
                  <div><span>Birthdate:</span> {viewingPatient.form.birthdate}</div>
                  <div><span>Age:</span> {viewingPatient.form.age}</div>
                  <div><span>Place of Birth:</span> {viewingPatient.form.placeOfBirth || 'N/A'}</div>
                  <div><span>Civil Status:</span> {viewingPatient.form.civilStatus || 'N/A'}</div>
                  <div><span>Religion:</span> {viewingPatient.form.religion || 'N/A'}</div>
                  <div><span>Contact:</span> {viewingPatient.form.contactNumber || 'N/A'}</div>
                </div>
              </div>

              <div className="view-section">
                <h3>Father's Name</h3>
                <div className="view-grid">
                  <div><span>Name:</span> {viewingPatient.form.fatherLastName || 'N/A'}, {viewingPatient.form.fatherGivenName || ''} {viewingPatient.form.fatherMiddleName || ''}</div>
                </div>
              </div>

              <div className="view-section">
                <h3>Mother's Maiden Name</h3>
                <div className="view-grid">
                  <div><span>Name:</span> {viewingPatient.form.motherLastName || 'N/A'}, {viewingPatient.form.motherGivenName || ''} {viewingPatient.form.motherMiddleName || ''}</div>
                </div>
              </div>

              <div className="view-section">
                <h3>Address</h3>
                <div className="view-grid">
                  <div><span>Region:</span> {viewingPatient.form.region || 'N/A'}</div>
                  <div><span>Province:</span> {viewingPatient.form.province || 'N/A'}</div>
                  <div><span>City / Municipality:</span> {viewingPatient.form.city || 'N/A'}</div>
                  <div><span>Barangay:</span> {viewingPatient.form.barangay || 'N/A'}</div>
                  <div><span>Street / Purok:</span> {viewingPatient.form.street || 'N/A'}</div>
                  <div><span>Postal Code:</span> {viewingPatient.form.postalCode || 'N/A'}</div>
                </div>
              </div>

              <div className="view-section">
                <h3>PhilHealth Information</h3>
                <div className="view-grid">
                  <div><span>PhilHealth No.:</span> {viewingPatient.form.philHealthNo || 'N/A'}</div>
                  <div><span>Member Name:</span> {viewingPatient.form.memberName || 'N/A'}</div>
                  <div><span>Spouse:</span> {viewingPatient.form.spouseName || 'N/A'}</div>
                  <div><span>Member Birthdate:</span> {viewingPatient.form.memberBirthdate || 'N/A'}</div>
                  <div><span>Residential Address:</span> {viewingPatient.form.completeAddress || 'N/A'}</div>
                  <div><span>Member Dependent:</span> {viewingPatient.form.memberDependent || 'N/A'}</div>
                  <div><span>Family Role:</span> {viewingPatient.form.familyMemberRole || 'N/A'}</div>
                  <div><span>Education:</span> {viewingPatient.form.educationalAttainment || 'N/A'}</div>
                </div>
              </div>

              <div className="view-section">
                <h3>Immunization Records</h3>
                {(!viewingPatient.immunizationRecords || viewingPatient.immunizationRecords.length === 0) ? (
                  <p className="no-records">No immunization records.</p>
                ) : viewingPatient.immunizationRecords.map((rec, i) => (
                  <div key={i} className="sub-record">
                    <div className="sub-record-header">Record #{i + 1}</div>
                    <div className="view-grid">
                      <div><span>BCG:</span> {rec.bcg || '—'}</div>
                      <div><span>HEPA B (24h):</span> {rec.hepaB24 || '—'}</div>
                      <div><span>HEPA B (&lt;24h):</span> {rec.hepaBLess24 || '—'}</div>
                      <div><span>PENTAVALENT 1:</span> {rec.pentavalent1 || '—'}</div>
                      <div><span>MCV 1 (AMV):</span> {rec.mcv1 || '—'}</div>
                      <div><span>OPV 1:</span> {rec.opv1 || '—'}</div>
                      <div><span>ROTA 1:</span> {rec.rota1 || '—'}</div>
                      <div><span>PCV 1:</span> {rec.pcv1 || '—'}</div>
                      <div><span>HEPA B2:</span> {rec.hepaB2 || '—'}</div>
                      <div><span>PNEUMONIA:</span> {rec.pneumonia || '—'}</div>
                      <div><span>INFLUENZA:</span> {rec.influenza || '—'}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="view-section">
                <h3>Medical Records</h3>
                {(!viewingPatient.medicalRecords || viewingPatient.medicalRecords.length === 0) ? (
                  <p className="no-records">No medical records.</p>
                ) : viewingPatient.medicalRecords.map((rec, i) => (
                  <div key={i} className="sub-record">
                    <div className="sub-record-header">Record #{i + 1}</div>
                    <div className="view-grid">
                      <div><span>Date:</span> {rec.date || '—'}</div>
                      <div><span>BP:</span> {rec.bp || '—'}</div>
                      <div><span>HR:</span> {rec.hr || '—'}</div>
                      <div><span>RR:</span> {rec.rr || '—'}</div>
                      <div><span>Weight:</span> {rec.weight || '—'}</div>
                      <div><span>Height:</span> {rec.height || '—'}</div>
                      <div><span>Temperature:</span> {rec.temperature || '—'}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="view-section">
                <h3>Chief Complaints</h3>
                <p>{viewingPatient.form.chiefComplaints || 'None'}</p>
              </div>

              <div className="view-section">
                <h3>Diagnosis</h3>
                <p>{viewingPatient.form.diagnosis || 'None'}</p>
              </div>

              <div className="view-section">
                <h3>Medications / Treatment</h3>
                <p>{viewingPatient.form.medications || 'None'}</p>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-print" onClick={handlePrint}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
                Print PDF
              </button>
              <button className="btn-cancel" onClick={() => setViewingPatient(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* ADD / EDIT MODAL */}
      {showModal && (
        <div className="modal-overlay" onClick={() => { setShowModal(false); resetForm(); }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingId ? `Edit Record — ${editingId}` : 'Add Patient Record'}</h2>
              <button className="modal-close" onClick={() => { setShowModal(false); resetForm(); }}>&times;</button>
            </div>

            <div className="modal-body">
              <div className="form-section">
                <h3 className="form-section-title">Personal Information</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>Last Name <span className="required">*</span></label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Given Name <span className="required">*</span></label>
                    <input type="text" name="givenName" value={formData.givenName} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Middle Name <span className="required">*</span></label>
                    <input type="text" name="middleName" value={formData.middleName} onChange={handleChange} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Suffix</label>
                    <input type="text" name="suffix" value={formData.suffix} onChange={handleChange} placeholder="e.g. Jr., Sr., III" />
                  </div>
                  <div className="form-group">
                    <label>Maiden Name <span className="label-note">(For Married Woman)</span></label>
                    <input type="text" name="maidenName" value={formData.maidenName} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Sex <span className="required">*</span></label>
                    <select name="sex" value={formData.sex} onChange={handleChange}>
                      <option value="">-- Select --</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Blood Type <span className="required">*</span></label>
                    <select name="bloodType" value={formData.bloodType} onChange={handleChange}>
                      <option value="">-- Select --</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Birthdate <span className="required">*</span></label>
                    <input type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Age <span className="required">*</span></label>
                    <input type="text" name="age" value={formData.age} readOnly className="field-readonly" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Place of Birth</label>
                    <input type="text" name="placeOfBirth" value={formData.placeOfBirth} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Civil Status</label>
                    <select name="civilStatus" value={formData.civilStatus} onChange={handleChange}>
                      <option value="">-- Select --</option>
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                      <option value="Divorced">Divorced</option>
                      <option value="Widowed">Widowed</option>
                      <option value="Separated">Separated</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Religion</label>
                    <select name="religion" value={formData.religion} onChange={handleChange}>
                      <option value="">-- Select --</option>
                      <option value="Roman Catholic">Roman Catholic</option>
                      <option value="Islam">Islam</option>
                      <option value="Iglesia Ni Cristo">Iglesia Ni Cristo</option>
                      <option value="Born Again">Born Again</option>
                      <option value="Seventh-day Adventist">Seventh-day Adventist</option>
                      <option value="Bible Baptist">Bible Baptist</option>
                      <option value="Jehovah's Witnesses">Jehovah's Witnesses</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Contact Number</label>
                    <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} placeholder="09XXXXXXXXX" />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3 className="form-section-title">Father's Name</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>Last Name <span className="required">*</span></label>
                    <input type="text" name="fatherLastName" value={formData.fatherLastName} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Given Name <span className="required">*</span></label>
                    <input type="text" name="fatherGivenName" value={formData.fatherGivenName} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Middle Name <span className="required">*</span></label>
                    <input type="text" name="fatherMiddleName" value={formData.fatherMiddleName} onChange={handleChange} />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3 className="form-section-title">Mother's Maiden Name</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>Last Name <span className="required">*</span></label>
                    <input type="text" name="motherLastName" value={formData.motherLastName} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Given Name <span className="required">*</span></label>
                    <input type="text" name="motherGivenName" value={formData.motherGivenName} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Middle Name <span className="required">*</span></label>
                    <input type="text" name="motherMiddleName" value={formData.motherMiddleName} onChange={handleChange} />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3 className="form-section-title">Address</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>Region</label>
                    <input type="text" name="region" value={formData.region} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Province</label>
                    <input type="text" name="province" value={formData.province} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>City / Municipality</label>
                    <input type="text" name="city" value={formData.city} onChange={handleChange} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Barangay</label>
                    <input type="text" name="barangay" value={formData.barangay} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Street / Purok</label>
                    <select name="street" value={formData.street} onChange={handleChange}>
                      <option value="">-- Select Purok --</option>
                      {puroks.map((p) => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Postal Code</label>
                    <input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h3 className="form-section-title">PhilHealth Information</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>PhilHealth Number <span className="required">*</span></label>
                    <input type="text" name="philHealthNo" value={formData.philHealthNo} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Member's Name <span className="required">*</span></label>
                    <input type="text" name="memberName" value={formData.memberName} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Name of Spouse <span className="required">*</span></label>
                    <input type="text" name="spouseName" value={formData.spouseName} onChange={handleChange} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Member's Birthdate</label>
                    <input type="date" name="memberBirthdate" value={formData.memberBirthdate} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Complete Residential Address <span className="required">*</span></label>
                    <input type="text" name="completeAddress" value={formData.completeAddress} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label>Member Dependent <span className="required">*</span></label>
                    <div className="radio-group">
                      <label className="radio-label">
                        <input type="radio" name="memberDependent" value="Yes" checked={formData.memberDependent === 'Yes'} onChange={handleChange} />
                        Yes
                      </label>
                      <label className="radio-label">
                        <input type="radio" name="memberDependent" value="No" checked={formData.memberDependent === 'No'} onChange={handleChange} />
                        No
                      </label>
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Family Member Role</label>
                    <select name="familyMemberRole" value={formData.familyMemberRole} onChange={handleChange}>
                      <option value="">-- Select --</option>
                      <option value="Spouse">Spouse</option>
                      <option value="Child">Child</option>
                      <option value="Parent">Parent</option>
                      <option value="Sibling">Sibling</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Educational Attainment</label>
                    <select name="educationalAttainment" value={formData.educationalAttainment} onChange={handleChange}>
                      <option value="">-- Select --</option>
                      <option value="No Formal Education">No Formal Education</option>
                      <option value="Elementary Level">Elementary Level</option>
                      <option value="Elementary Graduate">Elementary Graduate</option>
                      <option value="High School Level">High School Level</option>
                      <option value="High School Graduate">High School Graduate</option>
                      <option value="College Level">College Level</option>
                      <option value="College Graduate">College Graduate</option>
                      <option value="Post Graduate">Post Graduate</option>
                      <option value="Vocational">Vocational</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <div className="form-section-header">
                  <h3 className="form-section-title">Immunization</h3>
                  <button type="button" className="btn-add-record" onClick={addImmunizationRecord}>+ Add New Record</button>
                </div>
                {immunizationRecords.length === 0 && (
                  <p className="no-records">No immunization records added yet.</p>
                )}
                {immunizationRecords.map((rec, idx) => (
                  <div key={idx} className="sub-record">
                    <div className="sub-record-header">
                      <span>Immunization Record #{idx + 1}</span>
                      <button type="button" className="btn-remove-record" onClick={() => {
                        setImmunizationRecords((prev) => prev.filter((_, i) => i !== idx));
                      }}>&times;</button>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>BCG</label>
                        <input type="date" value={rec.bcg} onChange={(e) => handleImmunizationChange(idx, 'bcg', e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label>HEPA B WITHIN 24 HOURS</label>
                        <input type="date" value={rec.hepaB24} onChange={(e) => handleImmunizationChange(idx, 'hepaB24', e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label>HEPA B LESS THAN 24 HOURS</label>
                        <input type="date" value={rec.hepaBLess24} onChange={(e) => handleImmunizationChange(idx, 'hepaBLess24', e.target.value)} />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>PENTAVALENT 1</label>
                        <input type="date" value={rec.pentavalent1} onChange={(e) => handleImmunizationChange(idx, 'pentavalent1', e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label>MCV 1 (AMV)</label>
                        <input type="date" value={rec.mcv1} onChange={(e) => handleImmunizationChange(idx, 'mcv1', e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label>OPV 1</label>
                        <input type="date" value={rec.opv1} onChange={(e) => handleImmunizationChange(idx, 'opv1', e.target.value)} />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>ROTA 1</label>
                        <input type="date" value={rec.rota1} onChange={(e) => handleImmunizationChange(idx, 'rota1', e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label>PCV 1</label>
                        <input type="date" value={rec.pcv1} onChange={(e) => handleImmunizationChange(idx, 'pcv1', e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label>HEPA B2</label>
                        <input type="date" value={rec.hepaB2} onChange={(e) => handleImmunizationChange(idx, 'hepaB2', e.target.value)} />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>PNEUMONIA</label>
                        <input type="date" value={rec.pneumonia} onChange={(e) => handleImmunizationChange(idx, 'pneumonia', e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label>INFLUENZA</label>
                        <input type="date" value={rec.influenza} onChange={(e) => handleImmunizationChange(idx, 'influenza', e.target.value)} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="form-section">
                <div className="form-section-header">
                  <h3 className="form-section-title">Medical Information</h3>
                  <div className="form-section-actions">
                    <button type="button" className="btn-add-record" onClick={addMedicalRecord}>+ Add New Record</button>
                  </div>
                </div>
                {medicalRecords.length === 0 && (
                  <p className="no-records">No medical records added yet.</p>
                )}
                {medicalRecords.map((rec, idx) => (
                  <div key={idx} className="sub-record">
                    <div className="sub-record-header">
                      <span>Medical Record #{idx + 1}</span>
                      <button type="button" className="btn-remove-record" onClick={() => {
                        setMedicalRecords((prev) => prev.filter((_, i) => i !== idx));
                      }}>&times;</button>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Date</label>
                        <input type="date" value={rec.date} onChange={(e) => handleMedicalChange(idx, 'date', e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label>Blood Pressure (BP) <span className="required">*</span></label>
                        <input type="text" value={rec.bp} onChange={(e) => handleMedicalChange(idx, 'bp', e.target.value)} placeholder="e.g. 120/80" />
                      </div>
                      <div className="form-group">
                        <label>Heart Rate (HR) <span className="required">*</span></label>
                        <input type="text" value={rec.hr} onChange={(e) => handleMedicalChange(idx, 'hr', e.target.value)} placeholder="bpm" />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Respiratory Rate (RR) <span className="required">*</span></label>
                        <input type="text" value={rec.rr} onChange={(e) => handleMedicalChange(idx, 'rr', e.target.value)} placeholder="breaths/min" />
                      </div>
                      <div className="form-group">
                        <label>Weight (kg) <span className="required">*</span></label>
                        <input type="text" value={rec.weight} onChange={(e) => handleMedicalChange(idx, 'weight', e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label>Height (ft) <span className="required">*</span></label>
                        <input type="text" value={rec.height} onChange={(e) => handleMedicalChange(idx, 'height', e.target.value)} />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Temperature <span className="required">*</span></label>
                        <input type="text" value={rec.temperature} onChange={(e) => handleMedicalChange(idx, 'temperature', e.target.value)} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="form-section">
                <h3 className="form-section-title">Chief Complaints</h3>
                <textarea name="chiefComplaints" value={formData.chiefComplaints} onChange={handleChange} rows="4" placeholder="Enter patient's chief complaints..." />
              </div>

              <div className="form-section">
                <h3 className="form-section-title">Diagnosis</h3>
                <textarea name="diagnosis" value={formData.diagnosis} onChange={handleChange} rows="4" placeholder="Enter diagnosis..." />
              </div>

              <div className="form-section">
                <h3 className="form-section-title">Medications / Treatment</h3>
                <textarea name="medications" value={formData.medications} onChange={handleChange} rows="4" placeholder="Enter medications or treatment..." />
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => { setShowModal(false); resetForm(); }}>Cancel</button>
              <button className="btn-save" onClick={handleSave}>
                {editingId ? 'Update Record' : 'Save Patient Record'}
              </button>
            </div>
          </div>
        </div>
      )}

      </>
  );
}

export default PatientRecord;
