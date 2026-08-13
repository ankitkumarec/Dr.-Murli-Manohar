// BACKEND INTEGRATION REQUIRED

export interface WeeklySchedule {
  dayOfWeek: string;
  isAvailable: boolean;
  slots: { start: string, end: string }[];
}

export interface BlockedSlot {
  id: string;
  date: string;
  start: string;
  end: string;
  reason: string;
}

export const mockSchedule: WeeklySchedule[] = [
  { dayOfWeek: 'Monday', isAvailable: true, slots: [{ start: '09:00', end: '13:00' }, { start: '17:00', end: '20:00' }] },
  { dayOfWeek: 'Tuesday', isAvailable: true, slots: [{ start: '09:00', end: '13:00' }, { start: '17:00', end: '20:00' }] },
  { dayOfWeek: 'Wednesday', isAvailable: true, slots: [{ start: '09:00', end: '13:00' }, { start: '17:00', end: '20:00' }] },
  { dayOfWeek: 'Thursday', isAvailable: true, slots: [{ start: '09:00', end: '13:00' }, { start: '17:00', end: '20:00' }] },
  { dayOfWeek: 'Friday', isAvailable: true, slots: [{ start: '09:00', end: '13:00' }, { start: '17:00', end: '20:00' }] },
  { dayOfWeek: 'Saturday', isAvailable: true, slots: [{ start: '09:00', end: '14:00' }] },
  { dayOfWeek: 'Sunday', isAvailable: false, slots: [] },
];

export const availabilityService = {
  getWeeklySchedule: async (): Promise<WeeklySchedule[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...mockSchedule];
  },
  
  updateWeeklySchedule: async (schedule: WeeklySchedule[]): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return true;
  },

  getBlockedSlots: async (): Promise<BlockedSlot[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [
      { id: 'BLK-1', date: '2023-11-01', start: '09:00', end: '13:00', reason: 'Personal Leave' }
    ];
  }
};
