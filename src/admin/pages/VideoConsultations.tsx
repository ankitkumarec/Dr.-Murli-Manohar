import { useEffect, useState } from 'react';
import { Video, Search, CheckCircle2, Clock } from 'lucide-react';
import type { Appointment, AppointmentStatus } from '../mock/demoData';
import { mockAppointments } from '../mock/demoData';
import { appointmentService } from '../services/appointmentService';
import { useNavigate } from 'react-router-dom';

export function VideoConsultations() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await appointmentService.getAppointments();
        // Filter only video consultations
        setAppointments(data.filter(a => a.type === 'Video Consultation'));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-navy">Video Consultations</h2>
        <p className="text-gray-600">Manage and join your secure telehealth sessions.</p>
      </div>

      <div className="rounded-xl border border-gray-100 bg-white shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-teal border-t-transparent"></div>
          </div>
        ) : appointments.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <Video className="mx-auto h-12 w-12 text-gray-300 mb-4" />
            <p className="text-lg font-medium text-gray-900">No video consultations scheduled</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-6 py-4 font-medium">Patient</th>
                  <th className="px-6 py-4 font-medium">Date & Time</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {appointments.map((apt) => (
                  <tr key={apt.id} className="hover:bg-gray-50/50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-navy">{apt.patientName}</div>
                      <div className="text-xs text-gray-500">{apt.id}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-navy">{apt.date}</div>
                      <div className="text-xs text-gray-500">{apt.time}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        apt.status === 'Confirmed' ? 'bg-teal-100 text-teal-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {apt.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {apt.status === 'Confirmed' ? (
                        <button 
                          onClick={() => navigate(`/admin/video-room/${apt.id.replace('APT-', 'ROOM-')}`)}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-purple-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-purple-700"
                        >
                          <Video className="h-3.5 w-3.5" /> Join Room
                        </button>
                      ) : (
                        <button onClick={() => navigate(`/admin/appointments/${apt.id}`)} className="text-dental-blue hover:underline">
                          View Details
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
