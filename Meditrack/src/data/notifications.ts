export type NotificationCategory =
  | 'Appointment Confirmation'
  | 'Appointment Reminder'
  | 'Consultation Results'
  | 'Medical Record Update'
  | 'Health Event'
  | 'Community Program'
  | 'Verification Status'

export type AppNotification = {
  id: string
  category: NotificationCategory
  title: string
  description: string
  createdAt: Date
  read: boolean
}

export type CategoryStyle = {
  bar: string
  text: string
  tint: string
}

export const categoryStyles: Record<NotificationCategory, CategoryStyle> = {
  'Appointment Confirmation': {
    bar: 'bg-red-500',
    text: 'text-red-600',
    tint: 'bg-red-50',
  },
  'Appointment Reminder': {
    bar: 'bg-red-500',
    text: 'text-red-600',
    tint: 'bg-red-50',
  },
  'Consultation Results': {
    bar: 'bg-blue-500',
    text: 'text-blue-600',
    tint: 'bg-blue-50',
  },
  'Medical Record Update': {
    bar: 'bg-blue-500',
    text: 'text-blue-600',
    tint: 'bg-blue-50',
  },
  'Health Event': {
    bar: 'bg-emerald-500',
    text: 'text-emerald-600',
    tint: 'bg-emerald-50',
  },
  'Community Program': {
    bar: 'bg-emerald-500',
    text: 'text-emerald-600',
    tint: 'bg-emerald-50',
  },
  'Verification Status': {
    bar: 'bg-orange-500',
    text: 'text-orange-600',
    tint: 'bg-orange-50',
  },
}

function hoursAgo(hours: number, minutes = 0): Date {
  const date = new Date()
  date.setHours(date.getHours() - hours, date.getMinutes() - minutes, 0, 0)
  return date
}

function daysAgo(days: number, hour = 10, minute = 0): Date {
  const date = new Date()
  date.setDate(date.getDate() - days)
  date.setHours(hour, minute, 0, 0)
  return date
}

export const mockNotifications: AppNotification[] = [
  {
    id: 'n-1',
    category: 'Health Event',
    title: 'Medical Mission this Monday',
    description:
      'Free check-ups and medicines will be available at the health center on Monday, 1:00 PM to 4:00 PM.',
    createdAt: hoursAgo(1, 30),
    read: false,
  },
  {
    id: 'n-2',
    category: 'Appointment Confirmation',
    title: 'Appointment Confirmed',
    description:
      'Your general consultation with Dr. Juan Dela Cruz on August 10 at 2:00 PM has been confirmed.',
    createdAt: hoursAgo(2),
    read: false,
  },
  {
    id: 'n-3',
    category: 'Consultation Results',
    title: 'Consultation Results Ready',
    description:
      'Your latest check-up results are available. View them in your medical records.',
    createdAt: hoursAgo(5),
    read: false,
  },
  {
    id: 'n-4',
    category: 'Appointment Reminder',
    title: 'Reminder: Vaccination tomorrow',
    description:
      'Your vaccination appointment is scheduled tomorrow at 8:00 AM. Please arrive 15 minutes early.',
    createdAt: hoursAgo(8),
    read: true,
  },
  {
    id: 'n-5',
    category: 'Verification Status',
    title: 'Account Verified',
    description:
      'Your patient verification was approved. You can now book appointments and view records.',
    createdAt: daysAgo(1, 9, 15),
    read: false,
  },
  {
    id: 'n-6',
    category: 'Medical Record Update',
    title: 'New Medical Record',
    description:
      'Dr. Maria Santos added a new medical record to your health timeline after your recent visit.',
    createdAt: daysAgo(1, 14, 40),
    read: true,
  },
  {
    id: 'n-7',
    category: 'Community Program',
    title: 'Blood Donation Drive',
    description:
      'Join the blood donation program on March 30, 3:00 PM to 5:00 PM at the health center.',
    createdAt: daysAgo(1, 16, 5),
    read: true,
  },
  {
    id: 'n-8',
    category: 'Appointment Confirmation',
    title: 'Appointment Approved',
    description:
      'The health center approved your request to reschedule your check-up to August 12.',
    createdAt: daysAgo(3, 11, 20),
    read: true,
  },
  {
    id: 'n-9',
    category: 'Medical Record Update',
    title: 'Prescription Refill Notice',
    description:
      'Your prescription for Amoxicillin is ready for pickup at the health center pharmacy.',
    createdAt: daysAgo(5, 13, 45),
    read: true,
  },
]

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

export function formatNotificationTime(date: Date): string {
  const now = new Date()
  const yesterday = new Date(now)
  yesterday.setDate(yesterday.getDate() - 1)

  const time = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  })

  if (isSameDay(date, now)) return `Today, ${time}`
  if (isSameDay(date, yesterday)) return `Yesterday, ${time}`
  return `${date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })}, ${time}`
}
