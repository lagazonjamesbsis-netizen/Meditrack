'use client'

import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { useDarkMode } from '../DarkModeContext'

const puroks = ['Purok 1A', 'Purok 1B', 'Purok 2A & 2B', 'Purok 3A', 'Purok 3B', 'Purok 4', 'Purok 5A', 'Purok 5B', 'Purok 6', 'Purok 7', 'Purok 8']

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
}

const emptyImmunization = { bcg: '', hepaB24: '', hepaBLess24: '', pentavalent1: '', mcv1: '', opv1: '', rota1: '', pcv1: '', hepaB2: '', pneumonia: '', influenza: '' }
const emptyMedical = { date: '', bp: '', hr: '', rr: '', weight: '', height: '', temperature: '' }

interface PatientRecord {
  id: string; purok: string; date: string
  form: Record<string, string>
  immunizationRecords: Record<string, string>[]
  medicalRecords: Record<string, string>[]
}

const initialRecords: PatientRecord[] = [
  { id: 'PTN-2610204', purok: 'Purok 1A', date: '03-27-2026', form: { ...emptyForm, lastName: 'Richards', givenName: 'Alden', middleName: 'P.', sex: 'Male', bloodType: 'O+', birthdate: '1990-05-15', age: '36', placeOfBirth: 'Manila', civilStatus: 'Married', religion: 'Roman Catholic', contactNumber: '09171234567', fatherLastName: 'Richards', fatherGivenName: 'Michael', fatherMiddleName: 'D.', motherLastName: 'Santos', motherGivenName: 'Maria', motherMiddleName: 'L.', street: 'Purok 1A', philHealthNo: 'PHN-123456789', memberName: 'Alden P. Richards', spouseName: 'Sarah R. Richards', memberBirthdate: '1990-05-15', completeAddress: '123 Rizal Street, Poblacion, Manila', memberDependent: 'No', educationalAttainment: 'College Graduate', chiefComplaints: 'Patient complains of persistent headache and dizziness for the past 3 days.', diagnosis: 'Hypertension - Stage 1. Patient advised to monitor blood pressure regularly.', medications: 'Prescribed Losartan 50mg once daily. Follow-up in 2 weeks.' }, immunizationRecords: [{ bcg: '2026-01-15', hepaB24: '2026-01-15', pentavalent1: '2026-02-15', mcv1: '2026-03-15', opv1: '2026-02-15', rota1: '2026-02-15', pcv1: '2026-02-15', hepaB2: '2026-03-15', influenza: '2026-06-01' }], medicalRecords: [{ date: '2026-03-27', bp: '140/90', hr: '78', rr: '16', weight: '75', height: '5.8', temperature: '36.8' }] },
  { id: 'PTN-2610215', purok: 'Purok 1B', date: '03-27-2026', form: { ...emptyForm, lastName: 'Cruz', givenName: 'Dodong', middleName: 'C.', sex: 'Male', street: 'Purok 1B' }, immunizationRecords: [], medicalRecords: [] },
  { id: 'PTN-2610205', purok: 'Purok 2A & 2B', date: '03-27-2026', form: { ...emptyForm, lastName: 'Santos', givenName: 'Judith', middleName: 'A.', sex: 'Female', street: 'Purok 2A & 2B' }, immunizationRecords: [], medicalRecords: [] },
  { id: 'PTN-2610206', purok: 'Purok 3A', date: '03-26-2026', form: { ...emptyForm, lastName: 'Reyes', givenName: 'Maria', middleName: 'L.', sex: 'Female', street: 'Purok 3A' }, immunizationRecords: [], medicalRecords: [] },
  { id: 'PTN-2610207', purok: 'Purok 3B', date: '03-26-2026', form: { ...emptyForm, lastName: 'Gonzales', givenName: 'Pedro', middleName: 'M.', sex: 'Male', street: 'Purok 3B' }, immunizationRecords: [], medicalRecords: [] },
  { id: 'PTN-2610208', purok: 'Purok 4', date: '03-25-2026', form: { ...emptyForm, lastName: 'Flores', givenName: 'Ana', middleName: 'B.', sex: 'Female', street: 'Purok 4' }, immunizationRecords: [], medicalRecords: [] },
  { id: 'PTN-2610209', purok: 'Purok 5A', date: '03-25-2026', form: { ...emptyForm, lastName: 'Dela Cruz', givenName: 'Juan', middleName: 'T.', sex: 'Male', street: 'Purok 5A' }, immunizationRecords: [], medicalRecords: [] },
  { id: 'PTN-2610210', purok: 'Purok 5B', date: '03-24-2026', form: { ...emptyForm, lastName: 'Villanueva', givenName: 'Sofia', middleName: 'D.', sex: 'Female', street: 'Purok 5B' }, immunizationRecords: [], medicalRecords: [] },
  { id: 'PTN-2610211', purok: 'Purok 6', date: '03-24-2026', form: { ...emptyForm, lastName: 'Ramos', givenName: 'Carlos', middleName: 'S.', sex: 'Male', street: 'Purok 6' }, immunizationRecords: [], medicalRecords: [] },
  { id: 'PTN-2610212', purok: 'Purok 7', date: '03-23-2026', form: { ...emptyForm, lastName: 'Mendoza', givenName: 'Lisa', middleName: 'G.', sex: 'Female', street: 'Purok 7' }, immunizationRecords: [], medicalRecords: [] },
]

export default function PatientRecordPage() {
  const { darkMode } = useDarkMode()
  const [patientRecords, setPatientRecords] = useState<PatientRecord[]>(initialRecords)
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [viewingPatient, setViewingPatient] = useState<PatientRecord | null>(null)
  const [selectedPatient, setSelectedPatient] = useState<{ name: string; id: string } | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<{ name: string; id: string } | null>(null)

  const [formData, setFormData] = useState<Record<string, string>>({ ...emptyForm })
  const [immunizationRecords, setImmunizationRecords] = useState<Record<string, string>[]>([])
  const [medicalRecords, setMedicalRecords] = useState<Record<string, string>[]>([])

  useEffect(() => {
    if (formData.birthdate) {
      const birth = new Date(formData.birthdate)
      const today2 = new Date()
      let age = today2.getFullYear() - birth.getFullYear()
      const m = today2.getMonth() - birth.getMonth()
      if (m < 0 || (m === 0 && today2.getDate() < birth.getDate())) age--
      setFormData(prev => ({ ...prev, age: isNaN(age) ? '' : String(age) }))
    }
  }, [formData.birthdate])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const resetForm = () => { setFormData({ ...emptyForm }); setImmunizationRecords([]); setMedicalRecords([]); setEditingId(null) }

  const openEditModal = (record: PatientRecord) => {
    setFormData({ ...record.form })
    setImmunizationRecords(record.immunizationRecords ? [...record.immunizationRecords] : [])
    setMedicalRecords(record.medicalRecords ? [...record.medicalRecords] : [])
    setEditingId(record.id)
    setShowModal(true)
  }

  const handleSave = () => {
    if (editingId) {
      setPatientRecords(prev => prev.map(r => r.id === editingId ? { ...r, form: { ...formData }, immunizationRecords: [...immunizationRecords], medicalRecords: [...medicalRecords] } : r))
      toast.success('Patient record updated successfully')
    } else {
      const newId = 'PTN-' + String(Date.now()).slice(-7)
      setPatientRecords(prev => [...prev, { id: newId, purok: '', date: new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }).replace(/\//g, '-'), form: { ...formData }, immunizationRecords: [...immunizationRecords], medicalRecords: [...medicalRecords] }])
      toast.success('New patient record added successfully')
    }
    setShowModal(false)
    resetForm()
  }

  const handlePrint = () => {
    if (!viewingPatient) return
    const p = viewingPatient
    const win = window.open('', '_blank')
    if (!win) return
    const f = p.form
    const esc = (s: string | undefined) => s || ''
    const row = (l: string, v: string) => '<tr><td>' + l + '</td><td>' + v + '</td></tr>'
    let html = '<html><head><title>Patient Record - ' + esc(p.id) + '</title><style>'
      + 'body{font-family:"Segoe UI",Arial,sans-serif;padding:40px;color:#333}'
      + 'h1{font-size:22px;margin-bottom:4px}.sub{color:#666;font-size:13px;margin-bottom:24px}'
      + 'h2{font-size:15px;border-bottom:2px solid #4E69D3;padding-bottom:4px;margin:20px 0 12px;color:#2A2E43}'
      + 'table{width:100%;border-collapse:collapse;margin-bottom:8px}'
      + 'td{padding:4px 12px 4px 0;font-size:13px;vertical-align:top}'
      + 'td:first-child{font-weight:600;color:#555;white-space:nowrap;width:180px}'
      + '.section{margin-bottom:16px}.no-data{color:#999;font-style:italic;font-size:13px}'
      + '@media print{body{padding:20px}}'
      + '</style></head><body>'
      + '<h1>MediTrack - Patient Record</h1><div class="sub">Record ID: ' + esc(p.id) + '</div>'

    const addSection = (title: string, fields: [string, string][]) => {
      html += '<h2>' + title + '</h2><table>' + fields.map(([l, v]) => row(l, esc(v))).join('') + '</table>'
    }

    const addSubRecords = (title: string, recs: Record<string, string>[], fields: [string, string][]) => {
      html += '<h2>' + title + '</h2>'
      if (!recs || recs.length === 0) { html += '<div class="no-data">No ' + title.toLowerCase() + '.</div>'; return }
      html += recs.map((rec, i) => '<div class="section"><strong>Record #' + (i + 1) + '</strong><table>' + fields.map(([l, field]) => row(l, esc(rec[field]) || '\u2014')).join('') + '</table></div>').join('')
    }

    addSection('Personal Information', [['Name', (esc(f.lastName) + ', ' + esc(f.givenName) + ' ' + esc(f.middleName)).trim()], ['Suffix', f.suffix || 'N/A'], ['Maiden Name', f.maidenName || 'N/A'], ['Sex', f.sex || 'N/A'], ['Blood Type', f.bloodType || 'N/A'], ['Birthdate', f.birthdate || 'N/A'], ['Age', f.age || 'N/A'], ['Place of Birth', f.placeOfBirth || 'N/A'], ['Civil Status', f.civilStatus || 'N/A'], ['Religion', f.religion || 'N/A'], ['Contact', f.contactNumber || 'N/A']])
    addSection("Father's Name", [['Name', (esc(f.fatherLastName) || 'N/A') + ', ' + esc(f.fatherGivenName) + ' ' + esc(f.fatherMiddleName)]])
    addSection("Mother's Maiden Name", [['Name', (esc(f.motherLastName) || 'N/A') + ', ' + esc(f.motherGivenName) + ' ' + esc(f.motherMiddleName)]])
    addSection('Address', [['Region', f.region || 'N/A'], ['Province', f.province || 'N/A'], ['City/Municipality', f.city || 'N/A'], ['Barangay', f.barangay || 'N/A'], ['Street/Purok', f.street || 'N/A'], ['Postal Code', f.postalCode || 'N/A']])
    addSection('PhilHealth Information', [['PhilHealth No.', f.philHealthNo || 'N/A'], ['Member Name', f.memberName || 'N/A'], ['Spouse', f.spouseName || 'N/A'], ['Member Birthdate', f.memberBirthdate || 'N/A'], ['Address', f.completeAddress || 'N/A'], ['Dependent', f.memberDependent || 'N/A'], ['Family Role', f.familyMemberRole || 'N/A'], ['Education', f.educationalAttainment || 'N/A']])
    addSubRecords('Immunization Records', p.immunizationRecords, [['BCG', 'bcg'], ['HEPA B (24h)', 'hepaB24'], ['HEPA B (<24h)', 'hepaBLess24'], ['PENTAVALENT 1', 'pentavalent1'], ['MCV 1 (AMV)', 'mcv1'], ['OPV 1', 'opv1'], ['ROTA 1', 'rota1'], ['PCV 1', 'pcv1'], ['HEPA B2', 'hepaB2'], ['PNEUMONIA', 'pneumonia'], ['INFLUENZA', 'influenza']])
    addSubRecords('Medical Records', p.medicalRecords, [['Date', 'date'], ['BP', 'bp'], ['HR', 'hr'], ['RR', 'rr'], ['Weight', 'weight'], ['Height', 'height'], ['Temperature', 'temperature']])
    html += '<h2>Chief Complaints</h2><p>' + esc(f.chiefComplaints || 'None') + '</p>'
      + '<h2>Diagnosis</h2><p>' + esc(f.diagnosis || 'None') + '</p>'
      + '<h2>Medications / Treatment</h2><p>' + esc(f.medications || 'None') + '</p>'
      + '</body></html>'
    win.document.write(html)
    win.document.close()
    win.print()
  }

  const formatName = (r: PatientRecord) => {
    const f = r.form
    const last = f.lastName || ''
    const given = f.givenName || ''
    const mid = f.middleName ? ' ' + f.middleName.charAt(0) + '.' : ''
    return last + ', ' + given + mid
  }

  const patients = patientRecords.map(r => ({ name: formatName(r), id: r.id, purok: r.purok, date: r.date }))

  return (
    <div className={`${darkMode ? 'bg-[#2d1b4e]' : 'bg-white'} rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)]`}>
      <h1 className={`font-poppins text-[37px] font-bold ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'} text-center m-0 mb-6`}>PATIENT RECORD LIST</h1>

      <div className="flex justify-between items-center gap-4 mb-5 flex-wrap">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex items-center">
            <svg className={`absolute left-3 w-4 h-4 ${darkMode ? 'text-[#F9FAFB]' : 'text-gray-400'} pointer-events-none`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            <input type="text" placeholder="Search by patient name or ID" className={`w-[280px] pl-9 pr-3.5 py-2.5 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-200'} rounded-lg text-[15px] font-poppins ${darkMode ? 'text-[#F9FAFB] bg-[#2d1b4e]' : 'text-gray-800 bg-white'} outline-none focus:border-[#4E69D3] ${darkMode ? 'placeholder-gray-500' : 'placeholder-gray-400'}`} />
          </div>
          <div className="relative flex items-center ml-13">
            <select className={`py-2.5 pl-3 pr-9 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-200'} rounded-lg text-[15px] font-poppins ${darkMode ? 'text-[#F9FAFB] bg-[#2d1b4e]' : 'text-gray-800 bg-white'} outline-none focus:border-[#4E69D3] appearance-none cursor-pointer min-w-[120px]`}>
              <option>All Puroks</option>
              {puroks.map(p => <option key={p}>{p}</option>)}
            </select>
            <svg className={`absolute right-2.5 w-3.5 h-3.5 ${darkMode ? 'text-[#F9FAFB]' : 'text-gray-400'} pointer-events-none`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <button className="inline-flex items-center gap-1.5 px-[18px] py-2.5 bg-[#4E69D3] text-white border-none rounded-lg text-[13px] font-semibold font-poppins cursor-pointer hover:bg-[#4A6BC4] transition-colors" onClick={() => { resetForm(); setShowModal(true) }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg>
            Add Patient
          </button>
          <button className="inline-flex items-center gap-1.5 px-[18px] py-2.5 bg-red-500 text-white border-none rounded-lg text-[13px] font-semibold font-poppins cursor-pointer hover:bg-red-600 transition-colors" onClick={() => { if (selectedPatient) setDeleteTarget(selectedPatient); else alert('Please select a patient row first.') }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
            Delete Record
          </button>
        </div>
      </div>

      <div className={`overflow-x-auto ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-200'} rounded-xl`}>
        <table className="w-full border-collapse text-[15px]">
          <thead>
            <tr className={`${darkMode ? 'bg-[#0f1438]' : 'bg-[#ddd6fe]'}`}>
              <th className={`px-4 py-3 text-left font-bold ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'} text-[15px] uppercase tracking-[0.5px] font-poppins ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-[rgba(255,255,255,0.20)]'} border-b`}>Name</th>
              <th className={`px-4 py-3 text-left font-bold ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'} text-[15px] uppercase tracking-[0.5px] font-poppins ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-[rgba(255,255,255,0.20)]'} border-b`}>ID</th>
              <th className={`px-4 py-3 text-left font-bold ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'} text-[15px] uppercase tracking-[0.5px] font-poppins ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-[rgba(255,255,255,0.20)]'} border-b`}>Purok</th>
              <th className={`px-4 py-3 text-left font-bold ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'} text-[15px] uppercase tracking-[0.5px] font-poppins ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-[rgba(255,255,255,0.20)]'} border-b`}>Date Recorded</th>
              <th className={`px-4 py-3 text-left font-bold ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'} text-[15px] uppercase tracking-[0.5px] font-poppins ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-[rgba(255,255,255,0.20)]'} border-b`}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map(p => (
              <tr key={p.id} className={`cursor-pointer ${darkMode ? 'hover:bg-[#0f1438]' : 'hover:bg-[#E8EAF6]'} ${selectedPatient?.id === p.id ? `${darkMode ? 'bg-[#0f1438]' : 'bg-[#E8EAF6]'} outline outline-2 outline-offset-[-2px] outline-[#4E69D3]` : ''}`} onClick={() => setSelectedPatient(p)}>
                <td className={`px-4 py-3 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-[#E2E8F0]'} border-b ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'}`}>
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-full ${darkMode ? 'bg-[#0f1438] text-blue-300' : 'bg-[#E8EAF6] text-[#4E69D3]'} flex items-center justify-center font-bold text-sm flex-shrink-0`}>{p.name.charAt(0)}</div>
                    <span>{p.name}</span>
                  </div>
                </td>
                <td className={`px-4 py-3 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-[#E2E8F0]'} border-b text-sm ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'}`}>{p.id}</td>
                <td className={`px-4 py-3 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-[#E2E8F0]'} border-b ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'}`}>{p.purok}</td>
                <td className={`px-4 py-3 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-[#E2E8F0]'} border-b ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'}`}>{p.date}</td>
                <td className={`px-4 py-3 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-[#E2E8F0]'} border-b`}>
                  <div className="flex items-center gap-1.5">
                    <button className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[13px] font-semibold font-poppins cursor-pointer ${darkMode ? 'bg-[#2d1b4e]' : 'bg-white'} text-[#4E69D3] ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-[#4E69D3]'} border ${darkMode ? 'hover:bg-[#0f1438]' : 'hover:bg-[#E8EAF6]'} transition-all`} onClick={(e) => { e.stopPropagation(); const record = patientRecords.find(r => r.id === p.id); if (record) setViewingPatient(record) }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                      View
                    </button>
                    <button className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[13px] font-semibold font-poppins cursor-pointer ${darkMode ? 'bg-[#2d1b4e]' : 'bg-white'} text-[#4E69D3] ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-[#4E69D3]'} border ${darkMode ? 'hover:bg-[#0f1438]' : 'hover:bg-[#E8EAF6]'} transition-all`} onClick={(e) => { e.stopPropagation(); const record = patientRecords.find(r => r.id === p.id); if (record) openEditModal(record) }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center pt-4 pb-1">
        <span className={`text-xs ${darkMode ? 'text-[#F9FAFB]' : 'text-gray-400'}`}>{patients.length} of {patients.length}</span>
        <span className="text-[13px] text-[#4E69D3] cursor-pointer font-semibold hover:text-[#4A6BC4] hover:underline">Show all</span>
      </div>

      {viewingPatient && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-start z-[1000] p-10 overflow-y-auto" onClick={() => setViewingPatient(null)}>
          <div className={`${darkMode ? 'bg-[#2d1b4e]' : 'bg-white'} rounded-2xl w-full max-w-[960px] shadow-[0_20px_60px_rgba(0,0,0,0.2)] flex flex-col max-h-[90vh]`} onClick={e => e.stopPropagation()}>
            <div className={`flex justify-between items-center px-7 py-5 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-200'} border-b sticky top-0 ${darkMode ? 'bg-[#2d1b4e]' : 'bg-white'} rounded-t-2xl z-10`}>
              <h2 className={`font-poppins text-2xl font-bold ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'} m-0`}>Patient Record &mdash; {viewingPatient.id}</h2>
              <button className={`w-9 h-9 border-none ${darkMode ? 'bg-[#0f1438]' : 'bg-gray-100'} rounded-full text-xl ${darkMode ? 'text-[#F9FAFB]' : 'text-gray-500'} cursor-pointer flex items-center justify-center hover:bg-red-500 hover:text-white transition-all`} onClick={() => setViewingPatient(null)}>&times;</button>
            </div>
            <div className="px-7 py-6 overflow-y-auto flex-1 max-h-[70vh]">
              <ViewSection darkMode={darkMode} title="Personal Information" fields={[['Name', (viewingPatient.form.lastName || '') + ', ' + (viewingPatient.form.givenName || '') + ' ' + (viewingPatient.form.middleName || '')], ['Suffix', viewingPatient.form.suffix || 'N/A'], ['Maiden Name', viewingPatient.form.maidenName || 'N/A'], ['Sex', viewingPatient.form.sex || ''], ['Blood Type', viewingPatient.form.bloodType || ''], ['Birthdate', viewingPatient.form.birthdate || ''], ['Age', viewingPatient.form.age || ''], ['Place of Birth', viewingPatient.form.placeOfBirth || 'N/A'], ['Civil Status', viewingPatient.form.civilStatus || 'N/A'], ['Religion', viewingPatient.form.religion || 'N/A'], ['Contact', viewingPatient.form.contactNumber || 'N/A']]} />
              <ViewSection darkMode={darkMode} title="Father's Name" fields={[['Name', (viewingPatient.form.fatherLastName || 'N/A') + ', ' + (viewingPatient.form.fatherGivenName || '') + ' ' + (viewingPatient.form.fatherMiddleName || '')]]} />
              <ViewSection darkMode={darkMode} title="Mother's Maiden Name" fields={[['Name', (viewingPatient.form.motherLastName || 'N/A') + ', ' + (viewingPatient.form.motherGivenName || '') + ' ' + (viewingPatient.form.motherMiddleName || '')]]} />
              <ViewSection darkMode={darkMode} title="Address" fields={[['Region', viewingPatient.form.region || 'N/A'], ['Province', viewingPatient.form.province || 'N/A'], ['City / Municipality', viewingPatient.form.city || 'N/A'], ['Barangay', viewingPatient.form.barangay || 'N/A'], ['Street / Purok', viewingPatient.form.street || 'N/A'], ['Postal Code', viewingPatient.form.postalCode || 'N/A']]} />
              <ViewSection darkMode={darkMode} title="PhilHealth Information" fields={[['PhilHealth No.', viewingPatient.form.philHealthNo || 'N/A'], ['Member Name', viewingPatient.form.memberName || 'N/A'], ['Spouse', viewingPatient.form.spouseName || 'N/A'], ['Member Birthdate', viewingPatient.form.memberBirthdate || 'N/A'], ['Residential Address', viewingPatient.form.completeAddress || 'N/A'], ['Member Dependent', viewingPatient.form.memberDependent || 'N/A'], ['Family Role', viewingPatient.form.familyMemberRole || 'N/A'], ['Education', viewingPatient.form.educationalAttainment || 'N/A']]} />
              <ViewSubRecords darkMode={darkMode} title="Immunization Records" records={viewingPatient.immunizationRecords} fields={[['BCG', 'bcg'], ['HEPA B (24h)', 'hepaB24'], ['HEPA B (<24h)', 'hepaBLess24'], ['PENTAVALENT 1', 'pentavalent1'], ['MCV 1 (AMV)', 'mcv1'], ['OPV 1', 'opv1'], ['ROTA 1', 'rota1'], ['PCV 1', 'pcv1'], ['HEPA B2', 'hepaB2'], ['PNEUMONIA', 'pneumonia'], ['INFLUENZA', 'influenza']]} />
              <ViewSubRecords darkMode={darkMode} title="Medical Records" records={viewingPatient.medicalRecords} fields={[['Date', 'date'], ['BP', 'bp'], ['HR', 'hr'], ['RR', 'rr'], ['Weight', 'weight'], ['Height', 'height'], ['Temperature', 'temperature']]} />
              <ViewTextSection darkMode={darkMode} title="Chief Complaints" content={viewingPatient.form.chiefComplaints} />
              <ViewTextSection darkMode={darkMode} title="Diagnosis" content={viewingPatient.form.diagnosis} />
              <ViewTextSection darkMode={darkMode} title="Medications / Treatment" content={viewingPatient.form.medications} />
            </div>
            <div className={`flex justify-between gap-3 px-7 py-4.5 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-200'} border-t sticky bottom-0 ${darkMode ? 'bg-[#2d1b4e]' : 'bg-white'} rounded-b-2xl`}>
              <button className="inline-flex items-center gap-2 px-6 py-3 border-none rounded-lg bg-[#c4b5fd] text-gray-800 text-sm font-bold font-poppins cursor-pointer hover:bg-[#a78bfa] transition-colors" onClick={handlePrint}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
                Print PDF
              </button>
              <button className={`px-6 py-3 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-200'} rounded-lg ${darkMode ? 'bg-[#2d1b4e]' : 'bg-white'} ${darkMode ? 'text-[#F9FAFB]' : 'text-gray-500'} text-sm font-semibold font-poppins cursor-pointer ${darkMode ? 'hover:text-[#F9FAFB]' : 'hover:text-gray-800'} transition-colors`} onClick={() => setViewingPatient(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-start z-[1000] p-10 overflow-y-auto" onClick={() => { setShowModal(false); resetForm() }}>
          <div className={`${darkMode ? 'bg-[#2d1b4e]' : 'bg-white'} rounded-2xl w-full max-w-[960px] shadow-[0_20px_60px_rgba(0,0,0,0.2)] flex flex-col max-h-[90vh]`} onClick={e => e.stopPropagation()}>
            <div className={`flex justify-between items-center px-7 py-5 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-200'} border-b sticky top-0 ${darkMode ? 'bg-[#2d1b4e]' : 'bg-white'} rounded-t-2xl z-10`}>
              <h2 className={`font-poppins text-2xl font-bold ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'} m-0`}>{editingId ? 'Edit Record \u2014 ' + editingId : 'Add Patient Record'}</h2>
              <button className={`w-9 h-9 border-none ${darkMode ? 'bg-[#0f1438]' : 'bg-gray-100'} rounded-full text-xl ${darkMode ? 'text-[#F9FAFB]' : 'text-gray-500'} cursor-pointer flex items-center justify-center hover:bg-red-500 hover:text-white transition-all`} onClick={() => { setShowModal(false); resetForm() }}>&times;</button>
            </div>
            <div className="px-7 py-6 overflow-y-auto flex-1">
              <FormSection darkMode={darkMode} title="Personal Information">
                <div className="grid grid-cols-3 gap-3.5 mb-3.5 max-[768px]:grid-cols-1">
                  <FormGroup darkMode={darkMode} label="Last Name" required><input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className={`w-full px-3 py-2.5 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-200'} rounded-lg text-[13px] font-poppins ${darkMode ? 'text-[#F9FAFB] bg-[#2d1b4e]' : 'text-gray-800 bg-white'} outline-none focus:border-[#4E69D3] ${darkMode ? 'placeholder-gray-500' : 'placeholder-gray-400'} box-border`} /></FormGroup>
                  <FormGroup darkMode={darkMode} label="Given Name" required><input type="text" name="givenName" value={formData.givenName} onChange={handleChange} className={`w-full px-3 py-2.5 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-200'} rounded-lg text-[13px] font-poppins ${darkMode ? 'text-[#F9FAFB] bg-[#2d1b4e]' : 'text-gray-800 bg-white'} outline-none focus:border-[#4E69D3] ${darkMode ? 'placeholder-gray-500' : 'placeholder-gray-400'} box-border`} /></FormGroup>
                  <FormGroup darkMode={darkMode} label="Middle Name" required><input type="text" name="middleName" value={formData.middleName} onChange={handleChange} className={`w-full px-3 py-2.5 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-200'} rounded-lg text-[13px] font-poppins ${darkMode ? 'text-[#F9FAFB] bg-[#2d1b4e]' : 'text-gray-800 bg-white'} outline-none focus:border-[#4E69D3] ${darkMode ? 'placeholder-gray-500' : 'placeholder-gray-400'} box-border`} /></FormGroup>
                </div>
                <div className="grid grid-cols-3 gap-3.5 mb-3.5 max-[768px]:grid-cols-1">
                  <FormGroup darkMode={darkMode} label="Suffix"><input type="text" name="suffix" value={formData.suffix} onChange={handleChange} placeholder="e.g. Jr., Sr., III" className={`w-full px-3 py-2.5 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-200'} rounded-lg text-[13px] font-poppins ${darkMode ? 'text-[#F9FAFB] bg-[#2d1b4e]' : 'text-gray-800 bg-white'} outline-none focus:border-[#4E69D3] ${darkMode ? 'placeholder-gray-500' : 'placeholder-gray-400'} box-border`} /></FormGroup>
                  <FormGroup darkMode={darkMode} label="Maiden Name" note="(For Married Woman)"><input type="text" name="maidenName" value={formData.maidenName} onChange={handleChange} className={`w-full px-3 py-2.5 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-200'} rounded-lg text-[13px] font-poppins ${darkMode ? 'text-[#F9FAFB] bg-[#2d1b4e]' : 'text-gray-800 bg-white'} outline-none focus:border-[#4E69D3] ${darkMode ? 'placeholder-gray-500' : 'placeholder-gray-400'} box-border`} /></FormGroup>
                  <FormGroup darkMode={darkMode} label="Sex" required>
                    <select name="sex" value={formData.sex} onChange={handleChange} className={`w-full px-3 py-2.5 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-200'} rounded-lg text-[13px] font-poppins ${darkMode ? 'text-[#F9FAFB] bg-[#2d1b4e]' : 'text-gray-800 bg-white'} outline-none focus:border-[#4E69D3] appearance-none cursor-pointer box-border`}>
                      <option value="">-- Select --</option><option value="Male">Male</option><option value="Female">Female</option>
                    </select>
                  </FormGroup>
                </div>
                <div className="grid grid-cols-3 gap-3.5 mb-3.5 max-[768px]:grid-cols-1">
                  <FormGroup darkMode={darkMode} label="Blood Type" required>
                    <select name="bloodType" value={formData.bloodType} onChange={handleChange} className={`w-full px-3 py-2.5 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-200'} rounded-lg text-[13px] font-poppins ${darkMode ? 'text-[#F9FAFB] bg-[#2d1b4e]' : 'text-gray-800 bg-white'} outline-none focus:border-[#4E69D3] appearance-none cursor-pointer box-border`}>
                      <option value="">-- Select --</option>
                      {['A+','A-','B+','B-','AB+','AB-','O+','O-'].map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </FormGroup>
                  <FormGroup darkMode={darkMode} label="Birthdate" required><input type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} className={`w-full px-3 py-2.5 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-200'} rounded-lg text-[13px] font-poppins ${darkMode ? 'text-[#F9FAFB] bg-[#2d1b4e]' : 'text-gray-800 bg-white'} outline-none focus:border-[#4E69D3] box-border`} /></FormGroup>
                  <FormGroup darkMode={darkMode} label="Age" required><input type="text" name="age" value={formData.age} readOnly className={`w-full px-3 py-2.5 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-200'} rounded-lg text-[13px] font-poppins ${darkMode ? 'text-gray-400' : 'text-gray-500'} ${darkMode ? 'bg-[#0f1438]' : 'bg-gray-50'} outline-none cursor-not-allowed box-border`} /></FormGroup>
                </div>
                <div className="grid grid-cols-3 gap-3.5 mb-3.5 max-[768px]:grid-cols-1">
                  <FormGroup darkMode={darkMode} label="Place of Birth"><input type="text" name="placeOfBirth" value={formData.placeOfBirth} onChange={handleChange} className={`w-full px-3 py-2.5 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-200'} rounded-lg text-[13px] font-poppins ${darkMode ? 'text-[#F9FAFB] bg-[#2d1b4e]' : 'text-gray-800 bg-white'} outline-none focus:border-[#4E69D3] ${darkMode ? 'placeholder-gray-500' : 'placeholder-gray-400'} box-border`} /></FormGroup>
                  <FormGroup darkMode={darkMode} label="Civil Status">
                    <select name="civilStatus" value={formData.civilStatus} onChange={handleChange} className={`w-full px-3 py-2.5 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-200'} rounded-lg text-[13px] font-poppins ${darkMode ? 'text-[#F9FAFB] bg-[#2d1b4e]' : 'text-gray-800 bg-white'} outline-none focus:border-[#4E69D3] appearance-none cursor-pointer box-border`}>
                      <option value="">-- Select --</option>
                      {['Single','Married','Divorced','Widowed','Separated'].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </FormGroup>
                  <FormGroup darkMode={darkMode} label="Religion">
                    <select name="religion" value={formData.religion} onChange={handleChange} className={`w-full px-3 py-2.5 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-200'} rounded-lg text-[13px] font-poppins ${darkMode ? 'text-[#F9FAFB] bg-[#2d1b4e]' : 'text-gray-800 bg-white'} outline-none focus:border-[#4E69D3] appearance-none cursor-pointer box-border`}>
                      <option value="">-- Select --</option>
                      {['Roman Catholic','Islam','Iglesia Ni Cristo','Born Again','Seventh-day Adventist','Bible Baptist',"Jehovah's Witnesses",'Other'].map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </FormGroup>
                </div>
                <div className="grid grid-cols-3 gap-3.5 max-[768px]:grid-cols-1">
                  <FormGroup darkMode={darkMode} label="Contact Number"><input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} placeholder="09XXXXXXXXX" className={`w-full px-3 py-2.5 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-200'} rounded-lg text-[13px] font-poppins ${darkMode ? 'text-[#F9FAFB] bg-[#2d1b4e]' : 'text-gray-800 bg-white'} outline-none focus:border-[#4E69D3] ${darkMode ? 'placeholder-gray-500' : 'placeholder-gray-400'} box-border`} /></FormGroup>
                </div>
              </FormSection>

              <FormSection darkMode={darkMode} title="Father's Name">
                <div className="grid grid-cols-3 gap-3.5 mb-3.5 max-[768px]:grid-cols-1">
                  <FormGroup darkMode={darkMode} label="Last Name" required><input type="text" name="fatherLastName" value={formData.fatherLastName} onChange={handleChange} className={`w-full px-3 py-2.5 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-200'} rounded-lg text-[13px] font-poppins ${darkMode ? 'text-[#F9FAFB] bg-[#2d1b4e]' : 'text-gray-800 bg-white'} outline-none focus:border-[#4E69D3] ${darkMode ? 'placeholder-gray-500' : 'placeholder-gray-400'} box-border`} /></FormGroup>
                  <FormGroup darkMode={darkMode} label="Given Name" required><input type="text" name="fatherGivenName" value={formData.fatherGivenName} onChange={handleChange} className={`w-full px-3 py-2.5 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-200'} rounded-lg text-[13px] font-poppins ${darkMode ? 'text-[#F9FAFB] bg-[#2d1b4e]' : 'text-gray-800 bg-white'} outline-none focus:border-[#4E69D3] ${darkMode ? 'placeholder-gray-500' : 'placeholder-gray-400'} box-border`} /></FormGroup>
                  <FormGroup darkMode={darkMode} label="Middle Name" required><input type="text" name="fatherMiddleName" value={formData.fatherMiddleName} onChange={handleChange} className={`w-full px-3 py-2.5 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-200'} rounded-lg text-[13px] font-poppins ${darkMode ? 'text-[#F9FAFB] bg-[#2d1b4e]' : 'text-gray-800 bg-white'} outline-none focus:border-[#4E69D3] ${darkMode ? 'placeholder-gray-500' : 'placeholder-gray-400'} box-border`} /></FormGroup>
                </div>
              </FormSection>

              <FormSection darkMode={darkMode} title="Mother's Maiden Name">
                <div className="grid grid-cols-3 gap-3.5 mb-3.5 max-[768px]:grid-cols-1">
                  <FormGroup darkMode={darkMode} label="Last Name" required><input type="text" name="motherLastName" value={formData.motherLastName} onChange={handleChange} className={`w-full px-3 py-2.5 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-200'} rounded-lg text-[13px] font-poppins ${darkMode ? 'text-[#F9FAFB] bg-[#2d1b4e]' : 'text-gray-800 bg-white'} outline-none focus:border-[#4E69D3] ${darkMode ? 'placeholder-gray-500' : 'placeholder-gray-400'} box-border`} /></FormGroup>
                  <FormGroup darkMode={darkMode} label="Given Name" required><input type="text" name="motherGivenName" value={formData.motherGivenName} onChange={handleChange} className={`w-full px-3 py-2.5 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-200'} rounded-lg text-[13px] font-poppins ${darkMode ? 'text-[#F9FAFB] bg-[#2d1b4e]' : 'text-gray-800 bg-white'} outline-none focus:border-[#4E69D3] ${darkMode ? 'placeholder-gray-500' : 'placeholder-gray-400'} box-border`} /></FormGroup>
                  <FormGroup darkMode={darkMode} label="Middle Name" required><input type="text" name="motherMiddleName" value={formData.motherMiddleName} onChange={handleChange} className={`w-full px-3 py-2.5 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-200'} rounded-lg text-[13px] font-poppins ${darkMode ? 'text-[#F9FAFB] bg-[#2d1b4e]' : 'text-gray-800 bg-white'} outline-none focus:border-[#4E69D3] ${darkMode ? 'placeholder-gray-500' : 'placeholder-gray-400'} box-border`} /></FormGroup>
                </div>
              </FormSection>

              <FormSection darkMode={darkMode} title="Address">
                <div className="grid grid-cols-3 gap-3.5 mb-3.5 max-[768px]:grid-cols-1">
                  <FormGroup darkMode={darkMode} label="Region"><input type="text" name="region" value={formData.region} onChange={handleChange} className={`w-full px-3 py-2.5 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-200'} rounded-lg text-[13px] font-poppins ${darkMode ? 'text-[#F9FAFB] bg-[#2d1b4e]' : 'text-gray-800 bg-white'} outline-none focus:border-[#4E69D3] ${darkMode ? 'placeholder-gray-500' : 'placeholder-gray-400'} box-border`} /></FormGroup>
                  <FormGroup darkMode={darkMode} label="Province"><input type="text" name="province" value={formData.province} onChange={handleChange} className={`w-full px-3 py-2.5 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-200'} rounded-lg text-[13px] font-poppins ${darkMode ? 'text-[#F9FAFB] bg-[#2d1b4e]' : 'text-gray-800 bg-white'} outline-none focus:border-[#4E69D3] ${darkMode ? 'placeholder-gray-500' : 'placeholder-gray-400'} box-border`} /></FormGroup>
                  <FormGroup darkMode={darkMode} label="City / Municipality"><input type="text" name="city" value={formData.city} onChange={handleChange} className={`w-full px-3 py-2.5 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-200'} rounded-lg text-[13px] font-poppins ${darkMode ? 'text-[#F9FAFB] bg-[#2d1b4e]' : 'text-gray-800 bg-white'} outline-none focus:border-[#4E69D3] ${darkMode ? 'placeholder-gray-500' : 'placeholder-gray-400'} box-border`} /></FormGroup>
                </div>
                <div className="grid grid-cols-3 gap-3.5 max-[768px]:grid-cols-1">
                  <FormGroup darkMode={darkMode} label="Barangay"><input type="text" name="barangay" value={formData.barangay} onChange={handleChange} className={`w-full px-3 py-2.5 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-200'} rounded-lg text-[13px] font-poppins ${darkMode ? 'text-[#F9FAFB] bg-[#2d1b4e]' : 'text-gray-800 bg-white'} outline-none focus:border-[#4E69D3] ${darkMode ? 'placeholder-gray-500' : 'placeholder-gray-400'} box-border`} /></FormGroup>
                  <FormGroup darkMode={darkMode} label="Street / Purok">
                    <select name="street" value={formData.street} onChange={handleChange} className={`w-full px-3 py-2.5 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-200'} rounded-lg text-[13px] font-poppins ${darkMode ? 'text-[#F9FAFB] bg-[#2d1b4e]' : 'text-gray-800 bg-white'} outline-none focus:border-[#4E69D3] appearance-none cursor-pointer box-border`}>
                      <option value="">-- Select Purok --</option>
                      {puroks.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </FormGroup>
                  <FormGroup darkMode={darkMode} label="Postal Code"><input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} className={`w-full px-3 py-2.5 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-200'} rounded-lg text-[13px] font-poppins ${darkMode ? 'text-[#F9FAFB] bg-[#2d1b4e]' : 'text-gray-800 bg-white'} outline-none focus:border-[#4E69D3] ${darkMode ? 'placeholder-gray-500' : 'placeholder-gray-400'} box-border`} /></FormGroup>
                </div>
              </FormSection>

              <FormSection darkMode={darkMode} title="PhilHealth Information">
                <div className="grid grid-cols-3 gap-3.5 mb-3.5 max-[768px]:grid-cols-1">
                  <FormGroup darkMode={darkMode} label="PhilHealth Number" required><input type="text" name="philHealthNo" value={formData.philHealthNo} onChange={handleChange} className={`w-full px-3 py-2.5 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-200'} rounded-lg text-[13px] font-poppins ${darkMode ? 'text-[#F9FAFB] bg-[#2d1b4e]' : 'text-gray-800 bg-white'} outline-none focus:border-[#4E69D3] ${darkMode ? 'placeholder-gray-500' : 'placeholder-gray-400'} box-border`} /></FormGroup>
                  <FormGroup darkMode={darkMode} label="Member's Name" required><input type="text" name="memberName" value={formData.memberName} onChange={handleChange} className={`w-full px-3 py-2.5 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-200'} rounded-lg text-[13px] font-poppins ${darkMode ? 'text-[#F9FAFB] bg-[#2d1b4e]' : 'text-gray-800 bg-white'} outline-none focus:border-[#4E69D3] ${darkMode ? 'placeholder-gray-500' : 'placeholder-gray-400'} box-border`} /></FormGroup>
                  <FormGroup darkMode={darkMode} label="Name of Spouse" required><input type="text" name="spouseName" value={formData.spouseName} onChange={handleChange} className={`w-full px-3 py-2.5 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-200'} rounded-lg text-[13px] font-poppins ${darkMode ? 'text-[#F9FAFB] bg-[#2d1b4e]' : 'text-gray-800 bg-white'} outline-none focus:border-[#4E69D3] ${darkMode ? 'placeholder-gray-500' : 'placeholder-gray-400'} box-border`} /></FormGroup>
                </div>
                <div className="grid grid-cols-3 gap-3.5 mb-3.5 max-[768px]:grid-cols-1">
                  <FormGroup darkMode={darkMode} label="Member's Birthdate"><input type="date" name="memberBirthdate" value={formData.memberBirthdate} onChange={handleChange} className={`w-full px-3 py-2.5 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-200'} rounded-lg text-[13px] font-poppins ${darkMode ? 'text-[#F9FAFB] bg-[#2d1b4e]' : 'text-gray-800 bg-white'} outline-none focus:border-[#4E69D3] box-border`} /></FormGroup>
                  <FormGroup darkMode={darkMode} label="Complete Residential Address" required><input type="text" name="completeAddress" value={formData.completeAddress} onChange={handleChange} className={`w-full px-3 py-2.5 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-200'} rounded-lg text-[13px] font-poppins ${darkMode ? 'text-[#F9FAFB] bg-[#2d1b4e]' : 'text-gray-800 bg-white'} outline-none focus:border-[#4E69D3] ${darkMode ? 'placeholder-gray-500' : 'placeholder-gray-400'} box-border`} /></FormGroup>
                  <FormGroup darkMode={darkMode} label="Member Dependent" required>
                    <div className="flex gap-5 items-center h-full pt-1">
                      <label className={`flex items-center gap-1.5 text-[13px] font-semibold ${darkMode ? 'text-[#F9FAFB]' : 'text-gray-600'} cursor-pointer`}><input type="radio" name="memberDependent" value="Yes" checked={formData.memberDependent === 'Yes'} onChange={handleChange} className="w-auto m-0 cursor-pointer" /> Yes</label>
                      <label className={`flex items-center gap-1.5 text-[13px] font-semibold ${darkMode ? 'text-[#F9FAFB]' : 'text-gray-600'} cursor-pointer`}><input type="radio" name="memberDependent" value="No" checked={formData.memberDependent === 'No'} onChange={handleChange} className="w-auto m-0 cursor-pointer" /> No</label>
                    </div>
                  </FormGroup>
                </div>
                <div className="grid grid-cols-2 gap-3.5 max-[768px]:grid-cols-1">
                  <FormGroup darkMode={darkMode} label="Family Member Role">
                    <select name="familyMemberRole" value={formData.familyMemberRole} onChange={handleChange} className={`w-full px-3 py-2.5 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-200'} rounded-lg text-[13px] font-poppins ${darkMode ? 'text-[#F9FAFB] bg-[#2d1b4e]' : 'text-gray-800 bg-white'} outline-none focus:border-[#4E69D3] appearance-none cursor-pointer box-border`}>
                      <option value="">-- Select --</option>
                      {['Spouse','Child','Parent','Sibling','Other'].map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </FormGroup>
                  <FormGroup darkMode={darkMode} label="Educational Attainment">
                    <select name="educationalAttainment" value={formData.educationalAttainment} onChange={handleChange} className={`w-full px-3 py-2.5 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-200'} rounded-lg text-[13px] font-poppins ${darkMode ? 'text-[#F9FAFB] bg-[#2d1b4e]' : 'text-gray-800 bg-white'} outline-none focus:border-[#4E69D3] appearance-none cursor-pointer box-border`}>
                      <option value="">-- Select --</option>
                      {['No Formal Education','Elementary Level','Elementary Graduate','High School Level','High School Graduate','College Level','College Graduate','Post Graduate','Vocational'].map(e => <option key={e} value={e}>{e}</option>)}
                    </select>
                  </FormGroup>
                </div>
              </FormSection>

              <div className={`mb-7 pb-6 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-100'} border-b last:border-none last:mb-0 last:pb-0`}>
                <div className="flex justify-between items-center mb-3">
                  <h3 className={`font-poppins text-lg font-bold ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'} m-0 pb-2 border-b-2 border-[#4E69D3] inline-block`}>Immunization</h3>
                  <button type="button" className="px-4 py-2 border-none rounded-lg bg-[#4E69D3] text-white text-xs font-semibold font-poppins cursor-pointer hover:bg-[#4A6BC4] transition-colors" onClick={() => setImmunizationRecords(prev => [...prev, { ...emptyImmunization }])}>+ Add New Record</button>
                </div>
                {immunizationRecords.length === 0 && <p className={`text-[13px] ${darkMode ? 'text-gray-400' : 'text-gray-400'} italic py-2`}>No immunization records added yet.</p>}
                {immunizationRecords.map((rec, idx) => (
                  <div key={idx} className={`${darkMode ? 'bg-[#0f1438]' : 'bg-gray-50'} ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-200'} rounded-xl p-[18px] mb-3.5`}>
                    <div className="flex justify-between items-center mb-3.5 text-sm font-bold ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'}">
                      <span className={`${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'}`}>Immunization Record #{idx + 1}</span>
                      <button type="button" className={`w-7 h-7 border-none ${darkMode ? 'bg-[#0f1438]' : 'bg-red-100'} ${darkMode ? 'text-red-400' : 'text-red-500'} rounded-full text-base cursor-pointer inline-flex items-center justify-center hover:bg-red-500 hover:text-white transition-all`} onClick={() => setImmunizationRecords(prev => prev.filter((_, i) => i !== idx))}>&times;</button>
                    </div>
                    <div className="grid grid-cols-3 gap-3.5 mb-3.5 max-[768px]:grid-cols-1">
                      <FormGroup darkMode={darkMode} label="BCG"><input type="date" value={rec.bcg} onChange={e => { const u = [...immunizationRecords]; u[idx] = { ...u[idx], bcg: e.target.value }; setImmunizationRecords(u) }} className={`w-full px-3 py-2.5 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-200'} rounded-lg text-[13px] font-poppins ${darkMode ? 'text-[#F9FAFB] bg-[#2d1b4e]' : 'text-gray-800 bg-white'} outline-none focus:border-[#4E69D3] box-border`} /></FormGroup>
                      <FormGroup darkMode={darkMode} label="HEPA B WITHIN 24 HOURS"><input type="date" value={rec.hepaB24} onChange={e => { const u = [...immunizationRecords]; u[idx] = { ...u[idx], hepaB24: e.target.value }; setImmunizationRecords(u) }} className={`w-full px-3 py-2.5 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-200'} rounded-lg text-[13px] font-poppins ${darkMode ? 'text-[#F9FAFB] bg-[#2d1b4e]' : 'text-gray-800 bg-white'} outline-none focus:border-[#4E69D3] box-border`} /></FormGroup>
                      <FormGroup darkMode={darkMode} label="HEPA B LESS THAN 24 HOURS"><input type="date" value={rec.hepaBLess24} onChange={e => { const u = [...immunizationRecords]; u[idx] = { ...u[idx], hepaBLess24: e.target.value }; setImmunizationRecords(u) }} className={`w-full px-3 py-2.5 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-200'} rounded-lg text-[13px] font-poppins ${darkMode ? 'text-[#F9FAFB] bg-[#2d1b4e]' : 'text-gray-800 bg-white'} outline-none focus:border-[#4E69D3] box-border`} /></FormGroup>
                    </div>
                    <div className="grid grid-cols-3 gap-3.5 mb-3.5 max-[768px]:grid-cols-1">
                      <FormGroup darkMode={darkMode} label="PENTAVALENT 1"><input type="date" value={rec.pentavalent1} onChange={e => { const u = [...immunizationRecords]; u[idx] = { ...u[idx], pentavalent1: e.target.value }; setImmunizationRecords(u) }} className={`w-full px-3 py-2.5 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-200'} rounded-lg text-[13px] font-poppins ${darkMode ? 'text-[#F9FAFB] bg-[#2d1b4e]' : 'text-gray-800 bg-white'} outline-none focus:border-[#4E69D3] box-border`} /></FormGroup>
                      <FormGroup darkMode={darkMode} label="MCV 1 (AMV)"><input type="date" value={rec.mcv1} onChange={e => { const u = [...immunizationRecords]; u[idx] = { ...u[idx], mcv1: e.target.value }; setImmunizationRecords(u) }} className={`w-full px-3 py-2.5 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-200'} rounded-lg text-[13px] font-poppins ${darkMode ? 'text-[#F9FAFB] bg-[#2d1b4e]' : 'text-gray-800 bg-white'} outline-none focus:border-[#4E69D3] box-border`} /></FormGroup>
                      <FormGroup darkMode={darkMode} label="OPV 1"><input type="date" value={rec.opv1} onChange={e => { const u = [...immunizationRecords]; u[idx] = { ...u[idx], opv1: e.target.value }; setImmunizationRecords(u) }} className={`w-full px-3 py-2.5 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-200'} rounded-lg text-[13px] font-poppins ${darkMode ? 'text-[#F9FAFB] bg-[#2d1b4e]' : 'text-gray-800 bg-white'} outline-none focus:border-[#4E69D3] box-border`} /></FormGroup>
                    </div>
                    <div className="grid grid-cols-3 gap-3.5 mb-3.5 max-[768px]:grid-cols-1">
                      <FormGroup darkMode={darkMode} label="ROTA 1"><input type="date" value={rec.rota1} onChange={e => { const u = [...immunizationRecords]; u[idx] = { ...u[idx], rota1: e.target.value }; setImmunizationRecords(u) }} className={`w-full px-3 py-2.5 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-200'} rounded-lg text-[13px] font-poppins ${darkMode ? 'text-[#F9FAFB] bg-[#2d1b4e]' : 'text-gray-800 bg-white'} outline-none focus:border-[#4E69D3] box-border`} /></FormGroup>
                      <FormGroup darkMode={darkMode} label="PCV 1"><input type="date" value={rec.pcv1} onChange={e => { const u = [...immunizationRecords]; u[idx] = { ...u[idx], pcv1: e.target.value }; setImmunizationRecords(u) }} className={`w-full px-3 py-2.5 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-200'} rounded-lg text-[13px] font-poppins ${darkMode ? 'text-[#F9FAFB] bg-[#2d1b4e]' : 'text-gray-800 bg-white'} outline-none focus:border-[#4E69D3] box-border`} /></FormGroup>
                      <FormGroup darkMode={darkMode} label="HEPA B2"><input type="date" value={rec.hepaB2} onChange={e => { const u = [...immunizationRecords]; u[idx] = { ...u[idx], hepaB2: e.target.value }; setImmunizationRecords(u) }} className={`w-full px-3 py-2.5 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-200'} rounded-lg text-[13px] font-poppins ${darkMode ? 'text-[#F9FAFB] bg-[#2d1b4e]' : 'text-gray-800 bg-white'} outline-none focus:border-[#4E69D3] box-border`} /></FormGroup>
                    </div>
                    <div className="grid grid-cols-2 gap-3.5 max-[768px]:grid-cols-1">
                      <FormGroup darkMode={darkMode} label="PNEUMONIA"><input type="date" value={rec.pneumonia} onChange={e => { const u = [...immunizationRecords]; u[idx] = { ...u[idx], pneumonia: e.target.value }; setImmunizationRecords(u) }} className={`w-full px-3 py-2.5 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-200'} rounded-lg text-[13px] font-poppins ${darkMode ? 'text-[#F9FAFB] bg-[#2d1b4e]' : 'text-gray-800 bg-white'} outline-none focus:border-[#4E69D3] box-border`} /></FormGroup>
                      <FormGroup darkMode={darkMode} label="INFLUENZA"><input type="date" value={rec.influenza} onChange={e => { const u = [...immunizationRecords]; u[idx] = { ...u[idx], influenza: e.target.value }; setImmunizationRecords(u) }} className={`w-full px-3 py-2.5 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-200'} rounded-lg text-[13px] font-poppins ${darkMode ? 'text-[#F9FAFB] bg-[#2d1b4e]' : 'text-gray-800 bg-white'} outline-none focus:border-[#4E69D3] box-border`} /></FormGroup>
                    </div>
                  </div>
                ))}
              </div>

              <div className={`mb-7 pb-6 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-100'} border-b last:border-none last:mb-0 last:pb-0`}>
                <div className="flex justify-between items-center mb-3">
                  <h3 className={`font-poppins text-lg font-bold ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'} m-0 pb-2 border-b-2 border-[#4E69D3] inline-block`}>Medical Information</h3>
                  <button type="button" className="px-4 py-2 border-none rounded-lg bg-[#4E69D3] text-white text-xs font-semibold font-poppins cursor-pointer hover:bg-[#4A6BC4] transition-colors" onClick={() => setMedicalRecords(prev => [...prev, { ...emptyMedical }])}>+ Add New Record</button>
                </div>
                {medicalRecords.length === 0 && <p className={`text-[13px] ${darkMode ? 'text-gray-400' : 'text-gray-400'} italic py-2`}>No medical records added yet.</p>}
                {medicalRecords.map((rec, idx) => (
                  <div key={idx} className={`${darkMode ? 'bg-[#0f1438]' : 'bg-gray-50'} ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-200'} rounded-xl p-[18px] mb-3.5`}>
                    <div className="flex justify-between items-center mb-3.5 text-sm font-bold ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'}">
                      <span className={`${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'}`}>Medical Record #{idx + 1}</span>
                      <button type="button" className={`w-7 h-7 border-none ${darkMode ? 'bg-[#0f1438]' : 'bg-red-100'} ${darkMode ? 'text-red-400' : 'text-red-500'} rounded-full text-base cursor-pointer inline-flex items-center justify-center hover:bg-red-500 hover:text-white transition-all`} onClick={() => setMedicalRecords(prev => prev.filter((_, i) => i !== idx))}>&times;</button>
                    </div>
                    <div className="grid grid-cols-3 gap-3.5 mb-3.5 max-[768px]:grid-cols-1">
                      <FormGroup darkMode={darkMode} label="Date"><input type="date" value={rec.date} onChange={e => { const u = [...medicalRecords]; u[idx] = { ...u[idx], date: e.target.value }; setMedicalRecords(u) }} className={`w-full px-3 py-2.5 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-200'} rounded-lg text-[13px] font-poppins ${darkMode ? 'text-[#F9FAFB] bg-[#2d1b4e]' : 'text-gray-800 bg-white'} outline-none focus:border-[#4E69D3] box-border`} /></FormGroup>
                      <FormGroup darkMode={darkMode} label="Blood Pressure (BP)" required><input type="text" value={rec.bp} onChange={e => { const u = [...medicalRecords]; u[idx] = { ...u[idx], bp: e.target.value }; setMedicalRecords(u) }} placeholder="e.g. 120/80" className={`w-full px-3 py-2.5 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-200'} rounded-lg text-[13px] font-poppins ${darkMode ? 'text-[#F9FAFB] bg-[#2d1b4e]' : 'text-gray-800 bg-white'} outline-none focus:border-[#4E69D3] ${darkMode ? 'placeholder-gray-500' : 'placeholder-gray-400'} box-border`} /></FormGroup>
                      <FormGroup darkMode={darkMode} label="Heart Rate (HR)" required><input type="text" value={rec.hr} onChange={e => { const u = [...medicalRecords]; u[idx] = { ...u[idx], hr: e.target.value }; setMedicalRecords(u) }} placeholder="bpm" className={`w-full px-3 py-2.5 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-200'} rounded-lg text-[13px] font-poppins ${darkMode ? 'text-[#F9FAFB] bg-[#2d1b4e]' : 'text-gray-800 bg-white'} outline-none focus:border-[#4E69D3] ${darkMode ? 'placeholder-gray-500' : 'placeholder-gray-400'} box-border`} /></FormGroup>
                    </div>
                    <div className="grid grid-cols-3 gap-3.5 mb-3.5 max-[768px]:grid-cols-1">
                      <FormGroup darkMode={darkMode} label="Respiratory Rate (RR)" required><input type="text" value={rec.rr} onChange={e => { const u = [...medicalRecords]; u[idx] = { ...u[idx], rr: e.target.value }; setMedicalRecords(u) }} placeholder="breaths/min" className={`w-full px-3 py-2.5 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-200'} rounded-lg text-[13px] font-poppins ${darkMode ? 'text-[#F9FAFB] bg-[#2d1b4e]' : 'text-gray-800 bg-white'} outline-none focus:border-[#4E69D3] ${darkMode ? 'placeholder-gray-500' : 'placeholder-gray-400'} box-border`} /></FormGroup>
                      <FormGroup darkMode={darkMode} label="Weight (kg)" required><input type="text" value={rec.weight} onChange={e => { const u = [...medicalRecords]; u[idx] = { ...u[idx], weight: e.target.value }; setMedicalRecords(u) }} className={`w-full px-3 py-2.5 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-200'} rounded-lg text-[13px] font-poppins ${darkMode ? 'text-[#F9FAFB] bg-[#2d1b4e]' : 'text-gray-800 bg-white'} outline-none focus:border-[#4E69D3] ${darkMode ? 'placeholder-gray-500' : 'placeholder-gray-400'} box-border`} /></FormGroup>
                      <FormGroup darkMode={darkMode} label="Height (ft)" required><input type="text" value={rec.height} onChange={e => { const u = [...medicalRecords]; u[idx] = { ...u[idx], height: e.target.value }; setMedicalRecords(u) }} className={`w-full px-3 py-2.5 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-200'} rounded-lg text-[13px] font-poppins ${darkMode ? 'text-[#F9FAFB] bg-[#2d1b4e]' : 'text-gray-800 bg-white'} outline-none focus:border-[#4E69D3] ${darkMode ? 'placeholder-gray-500' : 'placeholder-gray-400'} box-border`} /></FormGroup>
                    </div>
                    <div className="grid grid-cols-3 gap-3.5 max-[768px]:grid-cols-1">
                      <FormGroup darkMode={darkMode} label="Temperature" required><input type="text" value={rec.temperature} onChange={e => { const u = [...medicalRecords]; u[idx] = { ...u[idx], temperature: e.target.value }; setMedicalRecords(u) }} className={`w-full px-3 py-2.5 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-200'} rounded-lg text-[13px] font-poppins ${darkMode ? 'text-[#F9FAFB] bg-[#2d1b4e]' : 'text-gray-800 bg-white'} outline-none focus:border-[#4E69D3] ${darkMode ? 'placeholder-gray-500' : 'placeholder-gray-400'} box-border`} /></FormGroup>
                    </div>
                  </div>
                ))}
              </div>

              <FormSection darkMode={darkMode} title="Chief Complaints">
                <textarea name="chiefComplaints" value={formData.chiefComplaints} onChange={handleChange} rows={4} placeholder="Enter patient's chief complaints..." className={`w-full px-3 py-2.5 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-200'} rounded-lg text-[13px] font-poppins ${darkMode ? 'text-[#F9FAFB] bg-[#2d1b4e]' : 'text-gray-800 bg-white'} outline-none focus:border-[#4E69D3] ${darkMode ? 'placeholder-gray-500' : 'placeholder-gray-400'} resize-y box-border`} />
              </FormSection>

              <FormSection darkMode={darkMode} title="Diagnosis">
                <textarea name="diagnosis" value={formData.diagnosis} onChange={handleChange} rows={4} placeholder="Enter diagnosis..." className={`w-full px-3 py-2.5 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-200'} rounded-lg text-[13px] font-poppins ${darkMode ? 'text-[#F9FAFB] bg-[#2d1b4e]' : 'text-gray-800 bg-white'} outline-none focus:border-[#4E69D3] ${darkMode ? 'placeholder-gray-500' : 'placeholder-gray-400'} resize-y box-border`} />
              </FormSection>

              <FormSection darkMode={darkMode} title="Medications / Treatment">
                <textarea name="medications" value={formData.medications} onChange={handleChange} rows={4} placeholder="Enter medications or treatment..." className={`w-full px-3 py-2.5 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-200'} rounded-lg text-[13px] font-poppins ${darkMode ? 'text-[#F9FAFB] bg-[#2d1b4e]' : 'text-gray-800 bg-white'} outline-none focus:border-[#4E69D3] ${darkMode ? 'placeholder-gray-500' : 'placeholder-gray-400'} resize-y box-border`} />
              </FormSection>
            </div>
            <div className={`flex justify-between gap-3 px-7 py-4.5 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-200'} border-t sticky bottom-0 ${darkMode ? 'bg-[#2d1b4e]' : 'bg-white'} rounded-b-2xl`}>
              <button className={`px-6 py-3 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-200'} rounded-lg ${darkMode ? 'bg-[#2d1b4e]' : 'bg-white'} ${darkMode ? 'text-[#F9FAFB]' : 'text-gray-500'} text-sm font-semibold font-poppins cursor-pointer ${darkMode ? 'hover:text-[#F9FAFB]' : 'hover:text-gray-800'} transition-colors`} onClick={() => { setShowModal(false); resetForm() }}>Cancel</button>
              <button className="px-7 py-3 border-none rounded-lg bg-[#4E69D3] text-white text-sm font-bold font-poppins cursor-pointer hover:bg-[#4A6BC4] transition-colors" onClick={handleSave}>{editingId ? 'Update Record' : 'Save Patient Record'}</button>
            </div>
          </div>
        </div>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-start z-[1000] p-10" onClick={() => setDeleteTarget(null)}>
          <div className={`${darkMode ? 'bg-[#2d1b4e]' : 'bg-white'} rounded-2xl px-8 py-9 w-full max-w-[400px] shadow-[0_20px_60px_rgba(0,0,0,0.2)] text-center`} onClick={e => e.stopPropagation()}>
            <div className="mb-4">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#E53E3E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            </div>
            <h3 className={`font-poppins text-[22px] font-bold ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'} m-0 mb-3`}>Delete Record</h3>
            <p className={`text-sm ${darkMode ? 'text-[#F9FAFB]' : 'text-gray-500'} m-0 mb-7 leading-relaxed`}>Are you sure that you want to delete <strong className={`${darkMode ? 'text-[#F9FAFB]' : 'text-gray-800'}`}>{deleteTarget.id}</strong>?</p>
            <div className="flex gap-3 justify-center">
              <button className={`px-6 py-3 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-200'} rounded-lg ${darkMode ? 'bg-[#2d1b4e]' : 'bg-white'} ${darkMode ? 'text-[#F9FAFB]' : 'text-gray-500'} text-sm font-semibold font-poppins cursor-pointer ${darkMode ? 'hover:text-[#F9FAFB]' : 'hover:text-gray-800'} transition-colors`} onClick={() => setDeleteTarget(null)}>Cancel</button>
              <button className="px-7 py-3 border-none rounded-lg bg-red-500 text-white text-sm font-bold font-poppins cursor-pointer hover:bg-red-600 transition-colors" onClick={() => { setPatientRecords(prev => prev.filter(r => r.id !== deleteTarget.id)); toast.success('Patient record deleted'); setDeleteTarget(null); setSelectedPatient(null) }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function ViewSection({ darkMode, title, fields }: { darkMode: boolean; title: string; fields: [string, string][] }) {
  return (
    <div className={`mb-6 pb-5 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-100'} border-b last:border-none last:mb-0 last:pb-0`}>
      <h3 className={`font-poppins text-base font-bold ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'} m-0 pb-1.5 mb-3 border-b-2 border-[#4E69D3] inline-block`}>{title}</h3>
      <div className="grid grid-cols-3 gap-[10px_20px] max-[768px]:grid-cols-1">
        {fields.map(([label, value]) => (
          <div key={label} className={`text-[13px] ${darkMode ? 'text-[#F9FAFB]' : 'text-gray-600'} leading-relaxed`}><span className={`font-bold ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'}`}>{label}:</span> {value || '\u2014'}</div>
        ))}
      </div>
    </div>
  )
}

function ViewTextSection({ darkMode, title, content }: { darkMode: boolean; title: string; content?: string }) {
  return (
    <div className={`mb-6 pb-5 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-100'} border-b last:border-none last:mb-0 last:pb-0`}>
      <h3 className={`font-poppins text-base font-bold ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'} m-0 pb-1.5 mb-3 border-b-2 border-[#4E69D3] inline-block`}>{title}</h3>
      <p className={`text-sm ${darkMode ? 'text-[#F9FAFB]' : 'text-gray-600'} leading-relaxed whitespace-pre-wrap`}>{content || 'None'}</p>
    </div>
  )
}

function ViewSubRecords({ darkMode, title, records, fields }: { darkMode: boolean; title: string; records: Record<string, string>[]; fields: [string, string][] }) {
  return (
    <div className={`mb-6 pb-5 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-100'} border-b last:border-none last:mb-0 last:pb-0`}>
      <h3 className={`font-poppins text-base font-bold ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'} m-0 pb-1.5 mb-3 border-b-2 border-[#4E69D3] inline-block`}>{title}</h3>
      {(!records || records.length === 0) ? (
        <p className={`text-[13px] ${darkMode ? 'text-gray-400' : 'text-gray-400'} italic`}>No {title.toLowerCase()}.</p>
      ) : records.map((rec, i) => (
        <div key={i} className="mb-4">
          <div className={`text-sm font-bold ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'} mb-2.5`}>Record #{i + 1}</div>
          <div className="grid grid-cols-3 gap-[10px_20px] max-[768px]:grid-cols-1">
            {fields.map(([label, field]) => (
              <div key={label} className={`text-[13px] ${darkMode ? 'text-[#F9FAFB]' : 'text-gray-600'} leading-relaxed`}><span className={`font-bold ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'}`}>{label}:</span> {rec[field] || '\u2014'}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function FormSection({ darkMode, title, children }: { darkMode: boolean; title: string; children: React.ReactNode }) {
  return (
    <div className={`mb-7 pb-6 ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-100'} border-b last:border-none last:mb-0 last:pb-0`}>
      <h3 className={`font-poppins text-lg font-bold ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'} m-0 pb-2 mb-4 border-b-2 border-[#4E69D3] inline-block`}>{title}</h3>
      {children}
    </div>
  )
}

function FormGroup({ darkMode, label, required, note, children }: { darkMode: boolean; label: string; required?: boolean; note?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <label className={`text-[13px] font-semibold ${darkMode ? 'text-[#F9FAFB]' : 'text-gray-600'} font-poppins`}>
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
        {note && <span className={`font-normal text-[11px] ${darkMode ? 'text-gray-400' : 'text-gray-400'} ml-1`}>{note}</span>}
      </label>
      {children}
    </div>
  )
}
