import { Link } from "react-router-dom";
import { siteConfig } from "../../config/site";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy pt-16 text-white pb-24 md:pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-3 lg:grid-cols-4">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <h3 className="font-heading text-2xl font-bold">
              {siteConfig.doctor.name}
            </h3>
            <p className="mt-2 text-teal-light">
              {siteConfig.doctor.specialization}
            </p>
            <p className="mt-2 text-sm text-gray-300">
              {siteConfig.doctor.experience} of Experience
            </p>
            <p className="mt-4 max-w-sm text-sm text-gray-400">
              {siteConfig.clinic.address}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-6 font-heading text-lg font-semibold text-white">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-3 text-sm text-gray-400">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">About Doctor</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">Dental Services</Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          {/* Consultation */}
          <div>
            <h4 className="mb-6 font-heading text-lg font-semibold text-white">
              Consultation
            </h4>
            <ul className="flex flex-col gap-3 text-sm text-gray-400">
              <li>
                <Link to="/appointment" className="hover:text-white transition-colors">Book Appointment</Link>
              </li>
              <li>
                <Link to="/video-consultation" className="hover:text-white transition-colors">Video Consultation</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">Contact Clinic</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
          <p>© {currentYear} {siteConfig.website.name}. All rights reserved.</p>
          <p className="mt-2 text-xs">
            Information provided on this website is for general informational purposes and does not replace professional medical evaluation. Please consult the doctor for personalized advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
