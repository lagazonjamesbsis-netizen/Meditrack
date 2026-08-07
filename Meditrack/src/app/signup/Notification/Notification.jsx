import { useState } from 'react';
import './Notification.css';

const categoryColors = {
  All: '#5B7FD6',
  Appointment: '#4CAF50',
  'Record Management': '#FF9800',
  Events: '#9C27B0',
};

const notifications = [
  { id: 1, category: 'Appointment', title: 'New Appointment Booked', description: 'Juan Dela Cruz booked an appointment for July 20, 2026 at 10:00 AM.', time: '2 min ago', unread: true },
  { id: 2, category: 'Appointment', title: 'Appointment Rescheduled', description: 'Maria Santos rescheduled her appointment to July 22, 2026.', time: '15 min ago', unread: true },
  { id: 3, category: 'Record Management', title: 'Patient Record Updated', description: 'Pedro Gonzales\' medical record has been updated.', time: '1 hr ago', unread: true },
  { id: 4, category: 'Events', title: 'New Event Created', description: 'Health & Wellness Seminar has been scheduled for August 5.', time: '2 hr ago', unread: false },
  { id: 5, category: 'Record Management', title: 'Lab Results Uploaded', description: 'New lab results for Ana Lopez are now available.', time: '3 hr ago', unread: false },
  { id: 6, category: 'Events', title: 'Event Reminder', description: 'Team Meeting starts in 30 minutes.', time: '5 hr ago', unread: false },
  { id: 7, category: 'Appointment', title: 'Appointment Completed', description: 'Check-up for Jose Rizal has been marked as completed.', time: '1 day ago', unread: false },
];

function Notification({ isOpen, onClose }) {
  const [activeCategory, setActiveCategory] = useState('All');
const [notifList, setNotifList] = useState(notifications);

const markAllAsRead = () => {
  setNotifList(prev => prev.map(n => ({ ...n, unread: false })));
};

  const filteredNotifications = activeCategory === 'All'
    ? notifList
    : notifList.filter(n => n.category === activeCategory);

  const categories = ['All', 'Appointment', 'Record Management', 'Events'];

  return (
    isOpen ? (
      <>
        <div className="notification-overlay" onClick={onClose} />
        <div className="notification-dropdown">
          <div className="notification-header">
            <h3 className="notification-title">Notifications</h3>
            <div className="notification-header-actions">
              <button className="mark-all-read" onClick={markAllAsRead}>Mark all as read</button>
              <button className="notification-close" onClick={onClose}>&times;</button>
            </div>
          </div>

          <div className="notification-categories">
            {categories.map(cat => (
              <button
                key={cat}
                className={`category-tab ${activeCategory === cat ? 'active' : ''}`}
                style={{
                  '--category-color': categoryColors[cat],
                  ...(activeCategory === cat ? { background: categoryColors[cat], color: '#fff' } : {})
                }}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="notification-list">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map(n => (
                <div key={n.id} className={`notification-item ${n.unread ? 'unread' : ''}`}
                  style={{ borderLeftColor: categoryColors[n.category] }}
                >
                  <div className="notification-item-header">
                    <span className="notification-category-badge" style={{ background: categoryColors[n.category] }}>
                      {n.category}
                    </span>
                    {n.unread && <span className="notification-unread-dot" />}
                  </div>
                  <p className="notification-item-title">{n.title}</p>
                  <p className="notification-item-desc">{n.description}</p>
                  <span className="notification-item-time">{n.time}</span>
                </div>
              ))
            ) : (
              <div className="notification-empty">No notifications</div>
            )}
          </div>
        </div>
      </>
    ) : null
  );
}

export default Notification;
