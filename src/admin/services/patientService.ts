import type { Patient } from '../mock/demoData';
import { mockPatients } from '../mock/demoData';

// BACKEND INTEGRATION REQUIRED
// Replace with actual fetch/axios calls to PHP API (e.g., /api/patients)

export const patientService = {
  getPatients: async (): Promise<Patient[]> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return [...mockPatients];
  },

  getPatientById: async (id: string): Promise<Patient | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return mockPatients.find(p => p.id === id);
  }
};
