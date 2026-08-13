// DEMO DATA ONLY — DO NOT USE IN PRODUCTION

export interface Patient {
  id: string;
  name: string;
  phone: string;
  email: string;
  lastVisit: string;
  totalAppointments: number;
  status: 'Active' | 'Inactive';
}

export type AppointmentStatus = 'Pending' | 'Confirmed' | 'In Consultation' | 'Completed' | 'Cancelled' | 'No Show' | 'Rejected';

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  patientPhone: string;
  date: string;
  time: string;
  type: 'In-Clinic' | 'Video Consultation';
  status: AppointmentStatus;
  reason: string;
  createdAt: string;
  notes?: string;
}

export const mockPatients: Patient[] = [
  { id: 'PAT-001', name: 'Rahul Kumar', phone: '9876543210', email: 'rahul@example.com', lastVisit: '2023-10-15', totalAppointments: 3, status: 'Active' },
  { id: 'PAT-002', name: 'Priya Singh', phone: '9876543211', email: 'priya@example.com', lastVisit: '2023-10-10', totalAppointments: 1, status: 'Active' },
  { id: 'PAT-003', name: 'Amit Verma', phone: '9876543212', email: 'amit@example.com', lastVisit: '2023-09-05', totalAppointments: 5, status: 'Active' },
  { id: 'PAT-004', name: 'Sneha Sharma', phone: '9876543213', email: 'sneha@example.com', lastVisit: '2023-10-16', totalAppointments: 2, status: 'Active' },
];

export const mockAppointments: Appointment[] = [
  { id: 'APT-101', patientId: 'PAT-001', patientName: 'Rahul Kumar', patientPhone: '9876543210', date: new Date().toISOString().split('T')[0], time: '09:30 AM', type: 'In-Clinic', status: 'Completed', reason: 'Routine Checkup', createdAt: '2023-10-01T10:00:00Z', notes: 'Patient has mild sensitivity.' },
  { id: 'APT-102', patientId: 'PAT-002', patientName: 'Priya Singh', patientPhone: '9876543211', date: new Date().toISOString().split('T')[0], time: '10:00 AM', type: 'In-Clinic', status: 'In Consultation', reason: 'Toothache', createdAt: '2023-10-05T14:30:00Z' },
  { id: 'APT-103', patientId: 'PAT-003', patientName: 'Amit Verma', patientPhone: '9876543212', date: new Date().toISOString().split('T')[0], time: '11:30 AM', type: 'Video Consultation', status: 'Confirmed', reason: 'Follow up', createdAt: '2023-10-10T09:15:00Z' },
  { id: 'APT-104', patientId: 'PAT-004', patientName: 'Sneha Sharma', patientPhone: '9876543213', date: new Date().toISOString().split('T')[0], time: '02:00 PM', type: 'In-Clinic', status: 'Pending', reason: 'Cleaning', createdAt: '2023-10-15T11:45:00Z' },
];
