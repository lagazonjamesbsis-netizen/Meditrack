export type AccountInfo = {
  patientNo: string
  displayName: string
  fullName: string
  email: string
  contactNumber: string
  emergencyContactName: string
  emergencyContactNumber: string
  password: string
}

export const initialAccount: AccountInfo = {
  patientNo: 'PTN-2610201',
  displayName: 'Carla Mae',
  fullName: 'Carla Mae Villanueva',
  email: 'carla.villanueva@email.com',
  contactNumber: '+63 912 345 6789',
  emergencyContactName: 'Mrs. Liza Villanueva',
  emergencyContactNumber: '0918 555 9876',
  password: 'MediTrack@2024',
}
