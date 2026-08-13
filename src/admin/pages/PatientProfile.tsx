import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Calendar as CalendarIcon, Phone, 
  Mail, User, FileText, Activity, AlertCircle
} from 'lucide-react';
import type { Patient } from '../mock/demoData';
import { mockPatients } from '../mock/demoData';
import { patientService } from '../services/patientService';

export function PatientProfile() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatient = async () => {
      if (!id) return;
      try {
        const data = await patientService.getPatientById(id);
        if (data) {
          setPatient(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPatient();
  }, [id]);

  if (loading) {
    return <div className="flex justify-center py-20"><div className="h-8 w-8 animate-spin rounded-full border-4 border-teal border-t-transparent"></div></div>;
  }

  if (!patient) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold text-navy">Patient not found</h2>
        <button onClick={() => navigate('/admin/patients')} className="mt-4 text-teal hover:underline">Return to list</button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate('/admin/patients')} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="h-5 w-5 text-gray-600" />
        </button>
        <h2 className="text-2xl font-bold text-navy">Patient Profile</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Left Column - Basics */}
        <div className="md:col-span-1 space-y-6">
          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm flex flex-col items-center text-center">
            <div className="h-20 w-20 rounded-full bg-teal-light flex items-center justify-center text-teal font-heading text-3xl font-bold mb-4">
              {patient.name.charAt(0)}
            </div>
            <h3 className="font-heading text-xl font-bold text-navy">{patient.name}</h3>
            <p className="text-sm text-gray-500 mb-4">{patient.id}</p>
            
            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium mb-6 ${
              patient.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
            }`}>
              {patient.status}
            </span>

            <div className="w-full space-y-3 text-left">
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-gray-700">{patient.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-gray-700">{patient.email}</span>
              </div>
            </div>
          </div>
          
          <button className="w-full rounded-lg bg-teal px-4 py-2 font-medium text-white hover:bg-teal-light flex justify-center items-center gap-2">
            <CalendarIcon className="h-4 w-4" /> New Appointment
          </button>
        </div>

        {/* Right Column - History */}
        <div className="md:col-span-2 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <Activity className="h-5 w-5 text-dental-blue" />
                <h4 className="font-medium text-gray-500 text-sm">Total Visits</h4>
              </div>
              <p className="text-2xl font-bold text-navy">{patient.totalAppointments}</p>
            </div>
            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <CalendarIcon className="h-5 w-5 text-teal" />
                <h4 className="font-medium text-gray-500 text-sm">Last Visit</h4>
              </div>
              <p className="text-xl font-bold text-navy">{patient.lastVisit}</p>
            </div>
          </div>

          {/* History */}
          <div className="rounded-xl border border-gray-100 bg-white shadow-sm overflow-hidden">
            <div className="border-b border-gray-100 p-6 flex justify-between items-center">
              <h3 className="font-heading text-lg font-bold text-navy">Appointment History</h3>
            </div>
            <div className="p-6 text-center text-gray-500">
              <FileText className="h-10 w-10 text-gray-300 mx-auto mb-3" />
              <p>History records will be fetched from the backend.</p>
            </div>
          </div>

          <div className="rounded-xl border border-gray-100 bg-amber-50 shadow-sm overflow-hidden p-6">
            <h3 className="font-heading text-lg font-bold text-amber-900 flex items-center gap-2 mb-2">
              <AlertCircle className="h-5 w-5" /> Private Medical Notes
            </h3>
            <p className="text-sm text-amber-800">
              This section is highly sensitive and restricted to authenticated doctors only.
            </p>
            <div className="mt-4 p-4 bg-white rounded border border-amber-200 text-sm text-gray-600 italic">
              "No specific allergies noted. Complains of mild sensitivity on cold water."
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
