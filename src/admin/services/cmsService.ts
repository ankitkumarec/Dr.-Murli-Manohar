// BACKEND INTEGRATION REQUIRED
// Replace with actual fetch/axios calls to PHP API

export const notificationService = {
  getNotifications: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [
      { id: 1, type: 'appointment', message: 'New appointment booked by Rahul Kumar', time: '10 mins ago', read: false },
      { id: 2, type: 'video', message: 'Video consultation starts in 15 mins', time: '1 hour ago', read: false },
      { id: 3, type: 'system', message: 'Weekly backup completed successfully', time: '2 days ago', read: true },
    ];
  },
  
  markAsRead: async (id: number) => {
    // API Call
    return true;
  }
};

export const cmsService = {
  getSettings: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return {
      clinicName: 'Dr. Murli Manohar Dental Clinic',
      phone: '+91 98765 43210',
      whatsapp: '+91 98765 43210',
      email: 'contact@drmurli.com',
      address: 'West of TVS Showroom, Saharsa, Bihar, India',
      appointmentDurationMinutes: 30,
    };
  },
  
  updateSettings: async (settings: any) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return true;
  }
};
