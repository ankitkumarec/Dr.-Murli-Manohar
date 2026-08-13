export interface AppointmentData {
  fullName: string;
  mobile: string;
  email?: string;
  date: string;
  time: string;
  type: "In-Clinic" | "Video Consultation";
  reason: string;
  message?: string;
}

export const submitAppointment = async (data: AppointmentData): Promise<{ success: boolean; message: string }> => {
  // Simulate network request
  return new Promise((resolve) => {
    setTimeout(() => {
      // Here you would typically make an API call to your backend
      // e.g., fetch('/api/appointments', { method: 'POST', body: JSON.stringify(data) })
      
      console.log("Appointment Request Data:", data);
      
      resolve({
        success: true,
        message: "Your appointment request has been received. The clinic will contact you to confirm your appointment.",
      });
    }, 1500);
  });
};
