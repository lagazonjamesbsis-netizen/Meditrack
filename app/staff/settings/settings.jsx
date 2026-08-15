'use client'

import { useState } from 'react'
import { toast } from 'sonner'

const sections = [
  { id: 'account', label: 'Account Management' },
  { id: 'notifications', label: 'Notifications' },
  { id: 'darkmode', label: 'Dark Mode' },
  { id: 'privacy', label: 'Privacy and Security' },
  { id: 'display', label: 'Display Settings' },
  { id: 'contact', label: 'Contact' },
  { id: 'feedback', label: 'Feedback' },
  { id: 'terms', label: 'Terms and Conditions' },
  { id: 'help', label: 'Help and Support' },
  { id: 'about', label: 'About Us' },
]

export default function Settings({ darkMode, setDarkMode, onLogout }) {
  const [active, setActive] = useState('account')
  const [toggles, setToggles] = useState({
    notifications: true,
    darkmode: darkMode,
    display: false,
  })
  const handleToggle = (id) => {
    if (id === 'darkmode') {
      const next = !toggles.darkmode
      setToggles(prev => ({ ...prev, darkmode: next }))
      setDarkMode(next)
      return
    }
    setToggles(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const rowClass = `flex items-center justify-between py-3 border-b ${darkMode ? 'border-[rgba(255,255,255,0.08)]' : 'border-[rgba(15,60,95,0.08)]'}`

  const renderContent = () => {
    switch (active) {
      case 'account':
        return <AccountSection darkMode={darkMode} />
      case 'notifications':
        return (
          <>
            <h2 className={`text-[22px] font-bold m-0 mb-4 ${darkMode ? 'text-[#F9FAFB]' : 'text-[#1d4662]'}`}>Notifications</h2>
            {[
              ['Push Notifications', 'Receive notifications about appointments and updates', toggles.notifications, () => handleToggle('notifications')],
              ['Email Notifications', 'Get email alerts for important updates', true, () => {}],
              ['SMS Notifications', 'Receive text messages for appointment reminders', false, () => {}],
            ].map(([label, desc, checked, onChange]) => (
              <div key={label} className={rowClass}>
                <div className="flex flex-col gap-0.5">
                  <span className={`text-[16px] font-semibold ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'}`}>{label}</span>
                  <span className={`text-[13px] ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{desc}</span>
                </div>
                <Toggle checked={checked} onChange={onChange} />
              </div>
            ))}
          </>
        )
      case 'darkmode':
        return (
          <>
            <h2 className={`text-[22px] font-bold m-0 mb-4 ${darkMode ? 'text-[#F9FAFB]' : 'text-[#1d4662]'}`}>Dark Mode</h2>
            <div className={rowClass}>
              <div className="flex flex-col gap-0.5">
                <span className={`text-[16px] font-semibold ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'}`}>Enable Dark Mode</span>
                <span className={`text-[13px] ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Switch between light and dark appearance</span>
              </div>
              <Toggle checked={toggles.darkmode} onChange={() => handleToggle('darkmode')} />
            </div>
            <p className={`text-[15px] leading-relaxed mt-4 ${darkMode ? 'text-[#F9FAFB]' : 'text-[#555]'}`}>Dark mode reduces eye strain in low-light environments and can help save battery life on some devices.</p>
          </>
        )
      case 'privacy':
        return (
          <>
            <h2 className={`text-[22px] font-bold m-0 mb-4 ${darkMode ? 'text-[#F9FAFB]' : 'text-[#1d4662]'}`}>Privacy and Security</h2>
            <p className={`text-[15px] leading-relaxed m-0 mb-3 ${darkMode ? 'text-[#F9FAFB]' : 'text-[#555]'}`}>Your privacy and data security are important to us. We use industry-standard encryption to protect your personal information.</p>
            {[
              ['Two-Factor Authentication', 'Enhance your account security by enabling two-factor authentication.'],
              ['Data Encryption', 'All data transmitted through this platform is encrypted using SSL/TLS protocols.'],
              ['Session Management', 'You can review and manage active sessions from your account settings.'],
            ].map(([title, desc]) => (
              <div key={title} className="mb-3">
                <p className={`text-[15px] font-semibold m-0 ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'}`}>{title}</p>
                <p className={`text-[14px] m-0 leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{desc}</p>
              </div>
            ))}
          </>
        )
      case 'display':
        return (
          <>
            <h2 className={`text-[22px] font-bold m-0 mb-4 ${darkMode ? 'text-[#F9FAFB]' : 'text-[#1d4662]'}`}>Display Settings</h2>
            <div className={rowClass}>
              <div className="flex flex-col gap-0.5">
                <span className={`text-[16px] font-semibold ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'}`}>Compact View</span>
                <span className={`text-[13px] ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Reduce spacing for a more condensed layout</span>
              </div>
              <Toggle checked={toggles.display} onChange={() => handleToggle('display')} />
            </div>

          </>
        )
      case 'contact':
        return (
          <>
            <h2 className={`text-[22px] font-bold m-0 mb-4 ${darkMode ? 'text-[#F9FAFB]' : 'text-[#1d4662]'}`}>Contact</h2>
            <p className={`text-[15px] leading-relaxed m-0 mb-4 ${darkMode ? 'text-[#F9FAFB]' : 'text-[#555]'}`}>Get in touch with the MediTrack team for any inquiries or support needs.</p>
            <div className="grid grid-cols-2 gap-4 max-[600px]:grid-cols-1">
              {[
                ['Email', 'support@meditrack.com'],
                ['Phone', '+63 2 1234 5678'],
                ['Address', '123 Health Street, Barangay San Isidro, Manila'],
                ['Office Hours', 'Monday to Friday, 8:00 AM - 5:00 PM'],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className={`text-[11px] font-bold uppercase tracking-[0.5px] m-0 mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{label}</p>
                  <p className={`text-[16px] font-semibold m-0 ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'}`}>{value}</p>
                </div>
              ))}
            </div>
          </>
        )
      case 'feedback':
        return (
          <>
            <h2 className={`text-[22px] font-bold m-0 mb-4 ${darkMode ? 'text-[#F9FAFB]' : 'text-[#1d4662]'}`}>Feedback</h2>
            <p className={`text-[15px] leading-relaxed m-0 mb-3 ${darkMode ? 'text-[#F9FAFB]' : 'text-[#555]'}`}>We value your feedback! Help us improve MediTrack by sharing your thoughts and suggestions.</p>
            <p className={`text-[15px] leading-relaxed m-0 ${darkMode ? 'text-[#F9FAFB]' : 'text-[#555]'}`}>Please send your feedback to <span className="font-semibold">feedback@meditrack.com</span> or use the feedback form available in your dashboard.</p>
          </>
        )
      case 'terms':
        return (
          <>
            <h2 className={`text-[22px] font-bold m-0 mb-4 ${darkMode ? 'text-[#F9FAFB]' : 'text-[#1d4662]'}`}>Terms and Conditions</h2>
            <p className={`text-[15px] leading-relaxed m-0 mb-3 ${darkMode ? 'text-[#F9FAFB]' : 'text-[#555]'}`}>By using MediTrack, you agree to the following terms and conditions. Please read them carefully.</p>
            <p className={`text-[15px] leading-relaxed m-0 mb-3 ${darkMode ? 'text-[#F9FAFB]' : 'text-[#555]'}`}>All patient data must be handled in accordance with applicable data protection laws. Unauthorized access or disclosure of patient information is strictly prohibited.</p>
            <p className={`text-[15px] leading-relaxed m-0 ${darkMode ? 'text-[#F9FAFB]' : 'text-[#555]'}`}>MediTrack reserves the right to update these terms at any time. Users will be notified of any material changes via email or in-app notification.</p>
          </>
        )
      case 'help':
        return (
          <>
            <h2 className={`text-[22px] font-bold m-0 mb-4 ${darkMode ? 'text-[#F9FAFB]' : 'text-[#1d4662]'}`}>Help and Support</h2>
            <p className={`text-[15px] leading-relaxed m-0 mb-4 ${darkMode ? 'text-[#F9FAFB]' : 'text-[#555]'}`}>Need assistance? Browse our help resources or contact our support team.</p>
            {[
              ['FAQ', 'Visit our FAQ page for answers to common questions.'],
              ['Documentation', 'Access user guides and tutorials.'],
              ['Support Ticket', 'Submit a ticket for personalized assistance.'],
            ].map(([title, desc]) => (
              <div key={title} className="mb-3">
                <p className={`text-[15px] font-semibold m-0 ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'}`}>{title}</p>
                <p className={`text-[14px] m-0 leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{desc}</p>
              </div>
            ))}
            <p className={`text-[15px] leading-relaxed m-0 mt-2 ${darkMode ? 'text-[#F9FAFB]' : 'text-[#555]'}`}>Email: <span className="font-semibold">support@meditrack.com</span></p>
          </>
        )
      case 'about':
        return (
          <>
            <h2 className={`text-[22px] font-bold m-0 mb-4 ${darkMode ? 'text-[#F9FAFB]' : 'text-[#1d4662]'}`}>About Us</h2>
            <p className={`text-[15px] leading-relaxed m-0 mb-4 ${darkMode ? 'text-[#F9FAFB]' : 'text-[#555]'}`}>MediTrack is a comprehensive healthcare management system designed to streamline patient record keeping, appointment scheduling, and event management for healthcare professionals.</p>
            <div className="grid grid-cols-2 gap-4 max-[600px]:grid-cols-1">
              {[
                ['Version', '1.0.0'],
                ['Platform', 'Web & Mobile'],
                ['Developer', 'MediTrack Development Team'],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className={`text-[11px] font-bold uppercase tracking-[0.5px] m-0 mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{label}</p>
                  <p className={`text-[16px] font-semibold m-0 ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'}`}>{value}</p>
                </div>
              ))}
            </div>
            <p className={`text-[15px] leading-relaxed mt-4 ${darkMode ? 'text-[#F9FAFB]' : 'text-[#555]'}`}>Our mission is to empower healthcare providers with intuitive tools that improve patient care and operational efficiency.</p>
          </>
        )
      default:
        return null
    }
  }

  return (
    <div>
      <h1 className={`text-[32px] ${darkMode ? 'text-[#F9FAFB]' : 'text-[#1d4662]'} my-[14px] text-left`}>Account Settings</h1>
      <div className="flex gap-[22px] items-start max-[900px]:flex-col">
        <div className={`w-[260px] flex-shrink-0 ${darkMode ? 'bg-[#3d2266] border-[rgba(255,255,255,0.10)]' : 'bg-white border-[rgba(15,60,95,0.10)]'} border rounded-[18px] py-2 overflow-hidden shadow-[0_4px_6px_-1px_rgba(0,0,0,0.06)] max-[900px]:w-full max-[900px]:flex max-[900px]:overflow-x-auto`}>
          {sections.map(s => (
            <button
              key={s.id}
              className={`w-full flex items-center gap-3 px-5 py-2.5 border-none bg-transparent text-[15px] font-semibold font-poppins cursor-pointer text-left transition-colors whitespace-nowrap max-[900px]:flex-shrink-0 ${
                active === s.id
                  ? darkMode ? 'bg-[#0f1438] text-[#4E69D3]' : 'bg-[#E8EAF6] text-[#4E69D3]'
                  : darkMode ? 'text-[#F9FAFB] hover:bg-[#0f1438]' : 'text-[#2A2E43] hover:bg-gray-50'
              }`}
              onClick={() => setActive(s.id)}
            >
              {s.label}
            </button>
          ))}
          <div className={`h-px mx-5 my-1.5 ${darkMode ? 'bg-[rgba(255,255,255,0.10)]' : 'bg-gray-200'}`} />
          <button
            className={`w-full flex items-center gap-3 px-5 py-2.5 border-none bg-transparent text-[15px] font-semibold font-poppins cursor-pointer text-left transition-colors whitespace-nowrap max-[900px]:flex-shrink-0 text-red-500 ${darkMode ? 'hover:bg-[#0f1438]' : 'hover:bg-red-50'}`}
            onClick={onLogout}
          >
            Log Out
          </button>
        </div>
        <div className={`flex-1 ${darkMode ? 'bg-[#3d2266] border-[rgba(255,255,255,0.10)] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3)]' : 'bg-white border-[rgba(15,60,95,0.10)] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]'} p-[22px] rounded-[18px] border`}>
          {renderContent()}
        </div>
      </div>
    </div>
  )
}

function Toggle({ checked, onChange }) {
  return (
    <label className="relative inline-block w-[38px] h-5 cursor-pointer flex-shrink-0">
      <input type="checkbox" className="opacity-0 w-0 h-0 peer" checked={checked} onChange={onChange} />
      <span className="absolute inset-0 bg-gray-300 rounded-full transition-colors peer-checked:bg-[#4E69D3] after:content-[''] after:absolute after:h-4 after:w-4 after:left-[2px] after:bottom-[2px] after:bg-white after:rounded-full after:transition-transform peer-checked:after:translate-x-[18px]" />
    </label>
  )
}

function AccountSection({ darkMode }) {
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({
    name: 'Vivianne Hernandez',
    email: 'vhernandez@meditrack.com',
    role: 'Midwife',
    employeeId: 'MW-0001',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [passwordForm, setPasswordForm] = useState({ current: '', newPass: '', confirm: '' })

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    setEditing(false)
    toast.success('Account settings updated successfully')
  }
  const handleCancel = () => {
    setForm({ name: 'Vivianne Hernandez', email: 'vhernandez@meditrack.com', role: 'Midwife', employeeId: 'MW-0001' })
    setEditing(false)
  }

  const handlePasswordSave = () => {
    if (!passwordForm.current || !passwordForm.newPass || !passwordForm.confirm) {
      toast.error('Please fill in all password fields')
      return
    }
    if (passwordForm.newPass !== passwordForm.confirm) {
      toast.error('New password and confirm password do not match')
      return
    }
    if (passwordForm.newPass.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }
    toast.success('Password changed successfully')
    setPasswordForm({ current: '', newPass: '', confirm: '' })
    setShowPassword(false)
  }

  const fieldClass = `w-full px-3 py-2 rounded-lg text-[16px] font-semibold outline-none border ${
    darkMode
      ? 'bg-[#0f1438] text-[#F9FAFB] border-[rgba(255,255,255,0.10)] focus:border-[#4E69D3]'
      : 'bg-white text-[#2A2E43] border-gray-200 focus:border-[#4E69D3]'
  } transition-colors`

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className={`text-[22px] font-bold m-0 ${darkMode ? 'text-[#F9FAFB]' : 'text-[#1d4662]'}`}>Account Management</h2>
        {!editing ? (
          <button
            className="flex items-center gap-2 bg-[#4E69D3] text-white px-4 py-2 rounded-md text-sm font-semibold border-none cursor-pointer hover:bg-[#3D56B8] transition-colors"
            onClick={() => setEditing(true)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            Edit
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              className="bg-transparent text-[#4E69D3] border border-[#4E69D3] px-4 py-2 rounded-md text-sm font-semibold cursor-pointer hover:bg-[#EEF0FB] transition-colors"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className="bg-[#4E69D3] text-white px-4 py-2 rounded-md text-sm font-semibold border-none cursor-pointer hover:bg-[#3D56B8] transition-colors"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        )}
      </div>
      <p className={`text-[15px] leading-relaxed m-0 mb-4 ${darkMode ? 'text-[#F9FAFB]' : 'text-[#555]'}`}>Manage your account details including your name, email, and role.</p>
      <div className="grid grid-cols-2 gap-4 max-[600px]:grid-cols-1">
        {[
          ['Name', 'name', form.name],
          ['Email', 'email', form.email],
          ['Role', 'role', form.role],
          ['Employee ID', 'employeeId', form.employeeId],
        ].map(([label, field, value]) => (
          <div key={field}>
            <p className={`text-[11px] font-bold uppercase tracking-[0.5px] m-0 mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{label}</p>
            {editing ? (
              <input type="text" value={value} onChange={e => handleChange(field, e.target.value)} className={fieldClass} />
            ) : (
              <p className={`text-[16px] font-semibold m-0 ${darkMode ? 'text-[#F9FAFB]' : 'text-[#2A2E43]'}`}>{value}</p>
            )}
          </div>
        ))}
      </div>

      <div className={`mt-6 pt-5 border-t ${darkMode ? 'border-[rgba(255,255,255,0.10)]' : 'border-gray-200'}`}>
        <div className="flex items-center justify-between mb-3">
          <h3 className={`text-[17px] font-bold m-0 ${darkMode ? 'text-[#F9FAFB]' : 'text-[#1d4662]'}`}>Change Password</h3>
          <button
            className="flex items-center gap-2 bg-transparent text-[#4E69D3] border border-[#4E69D3] px-4 py-2 rounded-md text-sm font-semibold cursor-pointer hover:bg-[#EEF0FB] transition-colors"
            onClick={() => setShowPassword(!showPassword)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
            {showPassword ? 'Cancel' : 'Change Password'}
          </button>
        </div>
        {showPassword && (
          <div className="grid grid-cols-3 gap-4 max-[600px]:grid-cols-1">
            <div>
              <p className={`text-[11px] font-bold uppercase tracking-[0.5px] m-0 mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Current Password</p>
              <input type="password" value={passwordForm.current} onChange={e => setPasswordForm(prev => ({ ...prev, current: e.target.value }))} className={fieldClass} placeholder="Enter current password" />
            </div>
            <div>
              <p className={`text-[11px] font-bold uppercase tracking-[0.5px] m-0 mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>New Password</p>
              <input type="password" value={passwordForm.newPass} onChange={e => setPasswordForm(prev => ({ ...prev, newPass: e.target.value }))} className={fieldClass} placeholder="Enter new password" />
            </div>
            <div>
              <p className={`text-[11px] font-bold uppercase tracking-[0.5px] m-0 mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Confirm Password</p>
              <div className="flex gap-2 items-end">
                <input type="password" value={passwordForm.confirm} onChange={e => setPasswordForm(prev => ({ ...prev, confirm: e.target.value }))} className={fieldClass} placeholder="Confirm new password" />
                <button
                  className="bg-[#4E69D3] text-white px-4 py-2 rounded-md text-sm font-semibold border-none cursor-pointer hover:bg-[#3D56B8] transition-colors whitespace-nowrap"
                  onClick={handlePasswordSave}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
