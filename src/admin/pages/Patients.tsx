import { useEffect, useState } from 'react';
import { Search, Filter, Users, UserPlus } from 'lucide-react';
import type { Patient } from '../mock/demoData';
import { mockPatients } from '../mock/demoData';
import { patientService } from '../services/patientService';
import { Link } from 'react-router-dom';

export function Patients() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await patientService.getPatients();
        setPatients(data);
      } catch (error) {
        console.error("Failed to fetch patients", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, []);

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-navy">Patients Directory</h2>
          <p className="text-gray-600">View and manage all registered clinic patients.</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-teal px-4 py-2 text-sm font-medium text-white hover:bg-teal-light">
          <UserPlus className="h-4 w-4" />
          Add Patient
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by name, phone, or patient ID..." 
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
        ) : filteredPatients.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <Users className="mx-auto h-12 w-12 text-gray-300 mb-4" />
            <p className="text-lg font-medium text-gray-900">No patients found</p>
            <p className="mt-1">Try adjusting your search criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-6 py-4 font-medium">Patient ID</th>
                  <th className="px-6 py-4 font-medium">Name</th>
                  <th className="px-6 py-4 font-medium">Contact</th>
                  <th className="px-6 py-4 font-medium">Last Visit</th>
                  <th className="px-6 py-4 font-medium">Total Visits</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredPatients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-gray-50/50">
                    <td className="whitespace-nowrap px-6 py-4 font-medium text-navy">{patient.id}</td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-navy">{patient.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-navy">{patient.phone}</div>
                      <div className="text-xs text-gray-500">{patient.email}</div>
                    </td>
                    <td className="px-6 py-4">{patient.lastVisit}</td>
                    <td className="px-6 py-4 text-center">{patient.totalAppointments}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        patient.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {patient.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link to={`/admin/patients/${patient.id}`} className="font-medium text-dental-blue hover:text-dental-light">
                        Profile
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
