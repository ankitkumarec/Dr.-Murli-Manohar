import { Link } from "react-router-dom";
import { Button } from "../ui/Button";
import { siteConfig } from "../../config/site";
import { Phone } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gray-50 pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          {/* Content */}
          <div className="max-w-2xl text-center md:text-left lg:max-w-none">
            <span className="inline-block rounded-full bg-teal-light px-3 py-1 text-sm font-medium text-teal mb-6">
              Trusted Dental Care in Saharsa
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-navy sm:text-5xl lg:text-6xl text-balance">
              Expert Dental Care with a Personal Touch
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              {siteConfig.doctor.name} — {siteConfig.doctor.specialization} with {siteConfig.doctor.experience} of experience, providing professional dental consultation and care in Saharsa, Bihar.
            </p>
            
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Link to="/appointment">
                <Button size="lg" className="w-full sm:w-auto">
                  Book an Appointment
                </Button>
              </Link>
              {siteConfig.clinic.phone && (
                <a href={`tel:${siteConfig.clinic.phone}`}>
                  <Button variant="outline" size="lg" className="w-full sm:w-auto flex items-center gap-2">
                    <Phone size={20} />
                    Call Clinic
                  </Button>
                </a>
              )}
              <Link to="/video-consultation">
                <Button variant="ghost" size="lg" className="w-full sm:w-auto">
                  Video Consultation
                </Button>
              </Link>
            </div>
          </div>

          {/* Image Area - Placeholder for future Doctor Photo */}
          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <div className="relative aspect-[4/3] w-full rounded-2xl bg-white shadow-xl overflow-hidden md:aspect-[3/4] lg:aspect-square">
              {/* Elegant abstract dental visual placeholder */}
              <div className="absolute inset-0 bg-gradient-to-br from-dental-light to-white flex items-center justify-center p-8">
                <div className="text-center opacity-80">
                  <div className="mx-auto mb-4 h-24 w-24 rounded-full bg-dental-blue/10 flex items-center justify-center">
                    <svg className="h-12 w-12 text-dental-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6c-2 0-3 2-3 4 0 2 1.5 3 3 5 1.5-2 3-3 3-5 0-2-1-4-3-4z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 10c0 1.5-1.5 3-3 5-1.5-2-3-3.5-3-5 0-2 1.5-4 3-4s3 2 3 4z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10c0 1.5 1.5 3 3 5 1.5-2 3-3.5 3-5 0-2-1.5-4-3-4s-3 2-3 4z" />
                    </svg>
                  </div>
                  <p className="font-heading font-medium text-navy text-lg">{siteConfig.doctor.name}</p>
                  <p className="text-sm text-gray-500">Premium Dental Clinic</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
