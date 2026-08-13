import { SectionHeading } from "../ui/SectionHeading";
import { siteConfig } from "../../config/site";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { MapPin, Stethoscope, Clock } from "lucide-react";
import { Link } from "react-router-dom";

export function DoctorProfile() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title={`Meet ${siteConfig.doctor.name}`} />

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center mt-12">
          {/* Doctor Info */}
          <div>
            <p className="text-lg text-gray-600 leading-relaxed">
              {siteConfig.doctor.name} is a {siteConfig.doctor.specialization} with {siteConfig.doctor.experience} of professional experience. He provides dental consultation and treatment with a focus on professional, patient-friendly care.
            </p>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              Currently practicing in Saharsa, Bihar, he is dedicated to offering reliable dental solutions to help you maintain optimal oral health.
            </p>
            
            <div className="mt-8">
              <Link to="/appointment">
                <Button size="lg">Book Consultation</Button>
              </Link>
            </div>
          </div>

          {/* Profile Card */}
          <div className="relative mx-auto w-full max-w-md lg:ml-auto lg:mr-0">
            <Card className="overflow-hidden bg-gray-50 p-1">
              <div className="aspect-[4/5] w-full bg-white rounded-t-lg relative">
                {/* Image Placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center p-8">
                   <div className="text-center opacity-60">
                      <Stethoscope className="mx-auto mb-4 h-16 w-16 text-navy" />
                      <p className="font-heading font-medium text-navy">Professional Profile</p>
                   </div>
                </div>
              </div>
              <div className="p-6 bg-white border-t border-gray-100 rounded-b-lg">
                <h3 className="font-heading text-xl font-bold text-navy">{siteConfig.doctor.name}</h3>
                <p className="text-dental-blue font-medium mt-1">{siteConfig.doctor.specialization}</p>
                
                <div className="mt-6 flex flex-col gap-3 text-sm text-gray-600">
                  <div className="flex items-center gap-3">
                    <Clock size={18} className="text-gray-400" />
                    <span>{siteConfig.doctor.experience} Experience</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin size={18} className="text-gray-400" />
                    <span>Saharsa, Bihar</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
