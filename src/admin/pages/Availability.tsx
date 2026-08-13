import { useEffect, useState } from 'react';
import { Save, Plus, Trash2, Clock, CalendarIcon } from 'lucide-react';
import type { WeeklySchedule } from '../services/availabilityService';
import { availabilityService } from '../services/availabilityService';

export function Availability() {
  const [schedule, setSchedule] = useState<WeeklySchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'weekly' | 'blocked'>('weekly');

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const data = await availabilityService.getWeeklySchedule();
        setSchedule(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSchedule();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await availabilityService.updateWeeklySchedule(schedule);
      alert('Availability saved successfully!');
    } finally {
      setSaving(false);
    }
  };

  const toggleDayAvailability = (index: number) => {
    const newSchedule = [...schedule];
    newSchedule[index].isAvailable = !newSchedule[index].isAvailable;
    setSchedule(newSchedule);
  };

  if (loading) {
    return <div className="flex justify-center py-20"><div className="h-8 w-8 animate-spin rounded-full border-4 border-teal border-t-transparent"></div></div>;
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-navy">Availability Management</h2>
          <p className="text-gray-600">Configure your weekly schedule and blocked dates.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 rounded-lg bg-teal px-4 py-2 text-sm font-medium text-white hover:bg-teal-light disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="flex gap-4 border-b border-gray-200">
        <button 
          onClick={() => setActiveTab('weekly')}
          className={`pb-3 text-sm font-medium px-2 ${activeTab === 'weekly' ? 'border-b-2 border-teal text-teal' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Weekly Schedule
        </button>
        <button 
          onClick={() => setActiveTab('blocked')}
          className={`pb-3 text-sm font-medium px-2 ${activeTab === 'blocked' ? 'border-b-2 border-teal text-teal' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Blocked Dates & Holidays
        </button>
      </div>

      {activeTab === 'weekly' && (
        <div className="rounded-xl border border-gray-100 bg-white shadow-sm p-6 space-y-6">
          {schedule.map((day, dayIndex) => (
            <div key={day.dayOfWeek} className="flex flex-col sm:flex-row sm:items-start gap-4 p-4 border rounded-lg border-gray-100 bg-gray-50/50">
              <div className="w-48 flex items-center gap-3">
                <input 
                  type="checkbox" 
                  checked={day.isAvailable}
                  onChange={() => toggleDayAvailability(dayIndex)}
                  className="h-4 w-4 rounded border-gray-300 text-teal focus:ring-teal"
                />
                <span className={`font-medium ${day.isAvailable ? 'text-navy' : 'text-gray-400'}`}>
                  {day.dayOfWeek}
                </span>
              </div>

              <div className="flex-1 space-y-3">
                {day.isAvailable ? (
                  <>
                    {day.slots.map((slot, slotIndex) => (
                      <div key={slotIndex} className="flex items-center gap-3">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <input 
                          type="time" 
                          value={slot.start} 
                          className="rounded-md border border-gray-200 px-3 py-1.5 text-sm outline-none focus:border-teal"
                          readOnly
                        />
                        <span className="text-gray-400">to</span>
                        <input 
                          type="time" 
                          value={slot.end} 
                          className="rounded-md border border-gray-200 px-3 py-1.5 text-sm outline-none focus:border-teal"
                          readOnly
                        />
                        <button className="p-1.5 text-red-500 hover:bg-red-50 rounded-md">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    <button className="flex items-center gap-1.5 text-sm font-medium text-teal hover:text-teal-dark mt-2">
                      <Plus className="h-4 w-4" /> Add Slot
                    </button>
                  </>
                ) : (
                  <span className="text-sm text-gray-500 italic">Unavailable</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'blocked' && (
        <div className="rounded-xl border border-gray-100 bg-white shadow-sm p-6 text-center text-gray-500 py-16">
          <CalendarIcon className="mx-auto h-12 w-12 text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900">Manage Blocked Slots & Holidays</h3>
          <p className="mt-1">Backend integration required to manage specific date exceptions.</p>
          <button className="mt-6 flex mx-auto items-center gap-2 rounded-lg bg-teal px-4 py-2 text-sm font-medium text-white hover:bg-teal-light">
            <Plus className="h-4 w-4" /> Block Date
          </button>
        </div>
      )}
    </div>
  );
}
