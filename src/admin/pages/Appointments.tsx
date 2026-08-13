import { useEffect, useState } from 'react';
import { Search, Filter, Calendar as CalendarIcon, Video, CheckCircle, XCircle, Clock } from 'lucide-react';
import type { Appointment, AppointmentStatus } from '../mock/demoData';
import { mockAppointments } from '../mock/demoData';
import { appointmentService } from '../services/appointmentService';
import { Link } from 'react-router-dom';

export function Appointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await appointmentService.getAppointments();
        setAppointments(data);
      } catch (error) {
        console.error("Failed to fetch appointments", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-700';
      case 'In Consultation': return 'bg-blue-100 text-blue-700';
      case 'Confirmed': return 'bg-teal-100 text-teal-700';
      case 'Pending': return 'bg-amber-100 text-amber-700';
      case 'Cancelled': 
      case 'No Show':
      case 'Rejected':
        return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredAppointments = appointments.filter(apt => 
    apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    apt.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    apt.patientPhone.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-navy">Appointments</h2>
          <p className="text-gray-600">Manage all clinic and video consultations.</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by patient name, phone, or ID..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-gray-200 py-2 pl-10 pr-4 outline-none focus:border-teal focus:ring-1 focus:ring-teal"
          />
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 font-medium text-gray-700 hover:bg-gray-50">
          <Filter className="h-4 w-4" />
          Filters
        </button>
      </div>

      <div className="rounded-xl border border-gray-100 bg-white shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-teal border-t-transparent"></div>
          </div>
        ) : filteredAppointments.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <CalendarIcon className="mx-auto h-12 w-12 text-gray-300 mb-4" />
            <p className="text-lg font-medium text-gray-900">No appointments found</p>
            <p className="mt-1">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-6 py-4 font-medium">ID</th>
                  <th className="px-6 py-4 font-medium">Patient</th>
                  <th className="px-6 py-4 font-medium">Date & Time</th>
                  <th className="px-6 py-4 font-medium">Type</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredAppointments.map((apt) => (
                  <tr key={apt.id} className="hover:bg-gray-50/50">
                    <td className="whitespace-nowrap px-6 py-4 font-medium text-navy">{apt.id}</td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-navy">{apt.patientName}</div>
                      <div className="text-xs text-gray-500">{apt.patientPhone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-navy">{apt.date}</div>
                      <div className="text-xs text-gray-500">{apt.time}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-1.5 whitespace-nowrap">
                        {apt.type === 'Video Consultation' ? <Video className="h-4 w-4 text-purple-500" /> : <CalendarIcon className="h-4 w-4 text-blue-500" />}
                        {apt.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex whitespace-nowrap items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusBadge(apt.status)}`}>
                        {apt.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link to={`/admin/appointments/${apt.id}`} className="font-medium text-dental-blue hover:text-dental-light">
                        Details
                      </Link>
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
