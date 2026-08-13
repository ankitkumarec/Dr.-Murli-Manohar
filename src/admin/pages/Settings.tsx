import { useEffect, useState } from 'react';
import { Save, Building2, Phone, Mail, Clock, MapPin } from 'lucide-react';
import { cmsService } from '../services/cmsService';

export function Settings() {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await cmsService.getSettings();
        setSettings(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await cmsService.updateSettings(settings);
      alert('Settings saved successfully!');
    } catch (err) {
      alert('Failed to save settings.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center py-20"><div className="h-8 w-8 animate-spin rounded-full border-4 border-teal border-t-transparent"></div></div>;
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-navy">Clinic Settings</h2>
          <p className="text-gray-600">Manage public contact details and system defaults.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 rounded-lg bg-teal px-4 py-2 text-sm font-medium text-white hover:bg-teal-light disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <h3 className="font-heading text-lg font-bold text-navy mb-4 border-b border-gray-100 pb-2 flex items-center gap-2">
            <Building2 className="h-5 w-5 text-teal" /> General Information
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Clinic Name</label>
              <input 
                type="text" 
                value={settings.clinicName}
                onChange={(e) => setSettings({...settings, clinicName: e.target.value})}
                className="w-full rounded-lg border border-gray-200 px-4 py-2 outline-none focus:border-teal"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Public Address</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  value={settings.address}
                  onChange={(e) => setSettings({...settings, address: e.target.value})}
                  className="w-full rounded-lg border border-gray-200 pl-10 pr-4 py-2 outline-none focus:border-teal"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <h3 className="font-heading text-lg font-bold text-navy mb-4 border-b border-gray-100 pb-2 flex items-center gap-2">
            <Phone className="h-5 w-5 text-teal" /> Contact Details
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Primary Phone</label>
              <input 
                type="text" 
                value={settings.phone}
                onChange={(e) => setSettings({...settings, phone: e.target.value})}
                className="w-full rounded-lg border border-gray-200 px-4 py-2 outline-none focus:border-teal"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number</label>
              <input 
                type="text" 
                value={settings.whatsapp}
                onChange={(e) => setSettings({...settings, whatsapp: e.target.value})}
                className="w-full rounded-lg border border-gray-200 px-4 py-2 outline-none focus:border-teal"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Public Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input 
                  type="email" 
                  value={settings.email}
                  onChange={(e) => setSettings({...settings, email: e.target.value})}
                  className="w-full rounded-lg border border-gray-200 pl-10 pr-4 py-2 outline-none focus:border-teal"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm md:col-span-2">
          <h3 className="font-heading text-lg font-bold text-navy mb-4 border-b border-gray-100 pb-2 flex items-center gap-2">
            <Clock className="h-5 w-5 text-teal" /> Appointment Defaults
          </h3>
          
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Default Duration (Minutes)</label>
              <input 
                type="number" 
                value={settings.appointmentDurationMinutes}
                onChange={(e) => setSettings({...settings, appointmentDurationMinutes: parseInt(e.target.value) || 30})}
                className="w-full rounded-lg border border-gray-200 px-4 py-2 outline-none focus:border-teal"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
