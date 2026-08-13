import { BrowserRouter, Routes, Route } from "react-router-dom";

// Public Imports
import { PublicLayout } from "./admin/layouts/PublicLayout";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Services } from "./pages/Services";
import { Appointment } from "./pages/Appointment";
import { VideoConsultation } from "./pages/VideoConsultation";
import { Contact } from "./pages/Contact";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { NotFound } from "./pages/NotFound";

// Admin Imports
import { AuthProvider } from "./admin/context/AuthContext";
import { ProtectedRoute } from "./admin/components/ProtectedRoute";
import { AdminLayout } from "./admin/layouts/AdminLayout";
import { AdminLogin } from "./admin/pages/Login";
import { Dashboard } from "./admin/pages/Dashboard";
import { Appointments } from "./admin/pages/Appointments";
import { AppointmentDetails } from "./admin/pages/AppointmentDetails";
import { Patients } from "./admin/pages/Patients";
import { PatientProfile } from "./admin/pages/PatientProfile";
import { Availability } from "./admin/pages/Availability";
import { VideoConsultations } from "./admin/pages/VideoConsultations";
import { VideoRoom } from "./admin/pages/VideoRoom";
import { Settings } from "./admin/pages/Settings";

const getBasename = () => {
  if (window.location.pathname.startsWith('/Dr. Murli Manohar')) {
    return '/Dr. Murli Manohar';
  }
  return '/';
};

function App() {
  return (
    <BrowserRouter basename={getBasename()}>
      <AuthProvider>
        <Routes>
          {/* Public Website Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/appointment" element={<Appointment />} />
            <Route path="/video-consultation" element={<VideoConsultation />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="appointments/:id" element={<AppointmentDetails />} />
            <Route path="patients" element={<Patients />} />
            <Route path="patients/:id" element={<PatientProfile />} />
            {/* Stubbed routes for the rest of the phases */}
            <Route path="video-consultations" element={<VideoConsultations />} />
            <Route path="video-room/:id" element={<VideoRoom />} />
            <Route path="availability" element={<Availability />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
