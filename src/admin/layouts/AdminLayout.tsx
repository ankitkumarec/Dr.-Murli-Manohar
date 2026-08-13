import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AdminSidebar } from '../components/AdminSidebar';
import { AdminTopbar } from '../components/AdminTopbar';

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/admin') return 'Dashboard';
    if (path.includes('appointments')) return 'Appointments';
    if (path.includes('patients')) return 'Patients';
    if (path.includes('video')) return 'Video Consultations';
    if (path.includes('availability')) return 'Availability';
    if (path.includes('settings')) return 'Settings';
    return 'Admin Panel';
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 font-sans text-navy">
      <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminTopbar onMenuClick={() => setSidebarOpen(true)} title={getPageTitle()} />
        
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
