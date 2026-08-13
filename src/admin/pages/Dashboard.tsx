import { 
  Users, 
  Calendar as CalendarIcon, 
  Video, 
  CheckCircle2, 
  Clock, 
  XCircle,
  Activity
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export function Dashboard() {
  const { currentUser } = useAuth();

  const stats = [
    { name: "Today's Appointments", value: '8', icon: CalendarIcon, color: 'text-blue-600', bg: 'bg-blue-100' },
    { name: 'Pending Requests', value: '3', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-100' },
    { name: 'Video Consultations', value: '2', icon: Video, color: 'text-purple-600', bg: 'bg-purple-100' },
    { name: 'Total Patients', value: '1,248', icon: Users, color: 'text-teal-600', bg: 'bg-teal-100' },
    { name: 'Completed Today', value: '5', icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-100' },
    { name: 'Cancelled Today', value: '0', icon: XCircle, color: 'text-red-600', bg: 'bg-red-100' },
  ];

  // Mock data for today's schedule
  const todaySchedule = [
    { id: 'APT-101', patient: 'Rahul Kumar', time: '09:30 AM', type: 'In-Clinic', status: 'Completed' },
    { id: 'APT-102', patient: 'Priya Singh', time: '10:00 AM', type: 'In-Clinic', status: 'In Consultation' },
    { id: 'APT-103', patient: 'Amit Verma', time: '11:30 AM', type: 'Video Consultation', status: 'Confirmed' },
    { id: 'APT-104', patient: 'Sneha Sharma', time: '02:00 PM', type: 'In-Clinic', status: 'Pending' },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-700';
      case 'In Consultation': return 'bg-blue-100 text-blue-700';
      case 'Confirmed': return 'bg-teal-100 text-teal-700';
      case 'Pending': return 'bg-amber-100 text-amber-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-navy">Welcome back, {currentUser?.name}</h2>
          <p className="text-gray-600">Here's what's happening at your clinic today.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/admin/appointments" className="rounded-lg bg-teal px-4 py-2 text-sm font-medium text-white hover:bg-teal-light">
            + New Appointment
          </Link>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.name} className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${stat.bg}`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.name}</p>
              <p className="text-2xl font-bold text-navy">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-gray-100 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-100 p-6">
          <h3 className="text-lg font-bold text-navy flex items-center gap-2">
            <Activity className="h-5 w-5 text-dental-blue" />
            Today's Schedule
          </h3>
          <Link to="/admin/appointments" className="text-sm font-medium text-teal hover:text-teal-dark">
            View full calendar &rarr;
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-6 py-4 font-medium">Time</th>
                <th className="px-6 py-4 font-medium">Patient</th>
                <th className="px-6 py-4 font-medium">Consultation Type</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {todaySchedule.map((apt) => (
                <tr key={apt.id} className="hover:bg-gray-50/50">
                  <td className="whitespace-nowrap px-6 py-4 font-medium text-navy">{apt.time}</td>
                  <td className="px-6 py-4">{apt.patient}</td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1.5">
                      {apt.type === 'Video Consultation' ? <Video className="h-4 w-4 text-purple-500" /> : <Users className="h-4 w-4 text-blue-500" />}
                      {apt.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusBadge(apt.status)}`}>
                      {apt.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="font-medium text-dental-blue hover:text-dental-light">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
