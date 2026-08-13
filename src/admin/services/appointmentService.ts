import type { Appointment, AppointmentStatus } from '../mock/demoData';
import { mockAppointments } from '../mock/demoData';

// BACKEND INTEGRATION REQUIRED
// These functions currently use mock data and simulated latency.
// Replace with actual fetch/axios calls to PHP API (e.g., /api/appointments)

export const appointmentService = {
  getAppointments: async (): Promise<Appointment[]> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return [...mockAppointments];
  },

  getAppointmentById: async (id: string): Promise<Appointment | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return mockAppointments.find(apt => apt.id === id);
  },

  updateAppointmentStatus: async (id: string, status: AppointmentStatus, notes?: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    const index = mockAppointments.findIndex(apt => apt.id === id);
    if (index !== -1) {
      mockAppointments[index] = { ...mockAppointments[index], status };
      if (notes) {
        mockAppointments[index].notes = notes;
      }
      return true;
    }
    return false;
  }
};
