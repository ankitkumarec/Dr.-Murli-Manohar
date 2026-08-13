import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Calendar as CalendarIcon, Clock, Phone, 
  Mail, User, Video, CheckCircle2, XCircle, AlertCircle
} from 'lucide-react';
import type { Appointment, AppointmentStatus } from '../mock/demoData';
import { mockAppointments } from '../mock/demoData';
import { appointmentService } from '../services/appointmentService';

export function AppointmentDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [internalNotes, setInternalNotes] = useState('');

  useEffect(() => {
    const fetchApt = async () => {
      if (!id) return;
      try {
        const data = await appointmentService.getAppointmentById(id);
        if (data) {
          setAppointment(data);
          setInternalNotes(data.notes || '');
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchApt();
  }, [id]);

  const handleStatusChange = async (newStatus: AppointmentStatus) => {
    if (!appointment) return;
    setUpdating(true);
    try {
      const success = await appointmentService.updateAppointmentStatus(appointment.id, newStatus, internalNotes);
      if (success) {
        setAppointment({ ...appointment, status: newStatus, notes: internalNotes });
      }
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center py-20"><div className="h-8 w-8 animate-spin rounded-full border-4 border-teal border-t-transparent"></div></div>;
  }

  if (!appointment) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold text-navy">Appointment not found</h2>
        <button onClick={() => navigate('/admin/appointments')} className="mt-4 text-teal hover:underline">Return to list</button>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
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

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate('/admin/appointments')} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="h-5 w-5 text-gray-600" />
        </button>
        <h2 className="text-2xl font-bold text-navy">Appointment Details</h2>
        <span className={`ml-auto px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
          {appointment.status}
        </span>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Left Column - Details */}
        <div className="md:col-span-2 space-y-6">
          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="font-heading text-lg font-bold text-navy mb-4 border-b border-gray-100 pb-2">Patient Information</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex gap-3">
                <User className="h-5 w-5 text-gray-400 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Full Name</p>
                  <p className="font-medium text-navy">{appointment.patientName}</p>
                  <button className="text-xs text-teal hover:underline mt-1">View Full Profile</button>
                </div>
              </div>
              <div className="flex gap-3">
                <Phone className="h-5 w-5 text-gray-400 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Phone Number</p>
                  <p className="font-medium text-navy">{appointment.patientPhone}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="font-heading text-lg font-bold text-navy mb-4 border-b border-gray-100 pb-2">Consultation Details</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex gap-3">
                <CalendarIcon className="h-5 w-5 text-gray-400 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Date</p>
                  <p className="font-medium text-navy">{appointment.date}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Clock className="h-5 w-5 text-gray-400 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Time</p>
                  <p className="font-medium text-navy">{appointment.time}</p>
                </div>
              </div>
              <div className="flex gap-3">
                {appointment.type === 'Video Consultation' ? (
                  <Video className="h-5 w-5 text-purple-400 shrink-0" />
                ) : (
                  <User className="h-5 w-5 text-blue-400 shrink-0" />
                )}
                <div>
                  <p className="text-sm font-medium text-gray-500">Type</p>
                  <p className="font-medium text-navy">{appointment.type}</p>
                </div>
              </div>
              <div className="sm:col-span-2 mt-2">
                <p className="text-sm font-medium text-gray-500 mb-1">Reason for Visit</p>
                <div className="rounded-lg bg-gray-50 p-3 text-sm text-gray-700">
                  {appointment.reason}
                </div>
              </div>
            </div>
          </div>
          
          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="font-heading text-lg font-bold text-navy mb-4 border-b border-gray-100 pb-2">Internal Notes (Private)</h3>
            <textarea
              className="w-full rounded-lg border border-gray-200 p-3 text-sm outline-none focus:border-teal min-h-[120px]"
              placeholder="Add private clinical notes, follow-up reminders, or staff instructions here..."
              value={internalNotes}
              onChange={(e) => setInternalNotes(e.target.value)}
            />
            {internalNotes !== (appointment.notes || '') && (
              <button 
                onClick={() => handleStatusChange(appointment.status)}
                disabled={updating}
                className="mt-2 text-sm bg-teal text-white px-4 py-1.5 rounded-lg hover:bg-teal-light"
              >
                {updating ? 'Saving...' : 'Save Notes'}
              </button>
            )}
          </div>
        </div>

        {/* Right Column - Actions */}
        <div className="space-y-4">
          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="font-heading text-lg font-bold text-navy mb-4 border-b border-gray-100 pb-2">Actions</h3>
            
            <div className="space-y-3">
              {appointment.status === 'Pending' && (
                <>
                  <button 
                    onClick={() => handleStatusChange('Confirmed')}
                    disabled={updating}
                    className="w-full flex items-center justify-center gap-2 rounded-lg bg-teal px-4 py-2 font-medium text-white hover:bg-teal-light disabled:opacity-50"
                  >
                    <CheckCircle2 className="h-4 w-4" /> Confirm Appointment
                  </button>
                  <button 
                    onClick={() => handleStatusChange('Rejected')}
                    disabled={updating}
                    className="w-full flex items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2 font-medium text-red-600 hover:bg-red-100 disabled:opacity-50"
                  >
                    <XCircle className="h-4 w-4" /> Reject Request
                  </button>
                </>
              )}

              {appointment.status === 'Confirmed' && (
                <>
                  {appointment.type === 'Video Consultation' && (
                    <button 
                      onClick={() => navigate(`/admin/video-room/${appointment.id}`)}
                      className="w-full flex items-center justify-center gap-2 rounded-lg bg-purple-600 px-4 py-3 font-medium text-white hover:bg-purple-700 shadow-sm"
                    >
                      <Video className="h-5 w-5" /> Start Video Call
                    </button>
                  )}
                  <button 
                    onClick={() => handleStatusChange('In Consultation')}
                    disabled={updating}
                    className="w-full flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                  >
                    Patient Arrived / Started
                  </button>
                  <button 
                    onClick={() => handleStatusChange('Cancelled')}
                    disabled={updating}
                    className="w-full flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2 font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Cancel Appointment
                  </button>
                  <button 
                    onClick={() => handleStatusChange('No Show')}
                    disabled={updating}
                    className="w-full flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2 font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Mark No Show
                  </button>
                </>
              )}

              {appointment.status === 'In Consultation' && (
                <button 
                  onClick={() => handleStatusChange('Completed')}
                  disabled={updating}
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700 disabled:opacity-50"
                >
                  <CheckCircle2 className="h-4 w-4" /> Mark Completed
                </button>
              )}
              
              {['Completed', 'Cancelled', 'No Show', 'Rejected'].includes(appointment.status) && (
                <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 p-3 rounded-lg border border-gray-100">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  This appointment has concluded and cannot be modified.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
