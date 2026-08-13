import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Video, 
  Settings, 
  LogOut,
  Bell,
  Stethoscope,
  Clock,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { cn } from '../../lib/utils';

export function AdminSidebar({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (v: boolean) => void }) {
  const { logout, currentUser } = useAuth();
  const location = useLocation();

  const navGroups = [
    {
      title: 'Main',
      items: [
        { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
        { name: 'Appointments', path: '/admin/appointments', icon: Calendar },
        { name: 'Patients', path: '/admin/patients', icon: Users },
        { name: 'Video Consultations', path: '/admin/video-consultations', icon: Video },
      ]
    },
    {
      title: 'Clinic',
      items: [
        { name: 'Availability', path: '/admin/availability', icon: Clock },
        { name: 'Settings', path: '/admin/settings', icon: Settings },
      ]
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-navy/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 transform flex-col bg-white border-r border-gray-100 transition-transform duration-200 ease-in-out lg:static lg:flex lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-16 items-center justify-between border-b border-gray-100 px-6">
          <Link to="/admin" className="flex items-center gap-2">
            <Stethoscope className="h-6 w-6 text-dental-blue" />
            <span className="font-heading text-lg font-bold text-navy">Admin Panel</span>
          </Link>
          <button onClick={() => setIsOpen(false)} className="lg:hidden text-gray-400 hover:text-navy">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4">
          {navGroups.map((group, idx) => (
            <div key={idx} className="mb-8">
              <h3 className="mb-4 px-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                {group.title}
              </h3>
              <ul className="space-y-1">
                {group.items.map((item) => {
                  const isActive = location.pathname === item.path || 
                                  (item.path !== '/admin' && location.pathname.startsWith(item.path));
                  return (
                    <li key={item.name}>
                      <Link
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                          isActive 
                            ? "bg-dental-light/50 text-dental-blue" 
                            : "text-gray-600 hover:bg-gray-50 hover:text-navy"
                        )}
                      >
                        <item.icon className={cn("h-5 w-5", isActive ? "text-dental-blue" : "text-gray-400")} />
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-100 p-4">
          <div className="mb-4 flex items-center gap-3 px-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-light text-teal font-bold">
              {currentUser?.name.charAt(0)}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-navy">{currentUser?.name}</span>
              <span className="text-xs text-gray-500">{currentUser?.role}</span>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
          >
            <LogOut className="h-5 w-5" />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}
