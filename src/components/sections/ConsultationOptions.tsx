import { Link } from "react-router-dom";
import { SectionHeading } from "../ui/SectionHeading";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Building2, MonitorSmartphone } from "lucide-react";

export function ConsultationOptions() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Consultation Options"
          subtitle="Choose the most convenient way to discuss your dental health."
          center
        />

        <div className="mt-12 grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          {/* In Clinic */}
          <Card className="flex flex-col p-8 transition-transform hover:-translate-y-1 hover:shadow-md">
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-teal-light">
              <Building2 className="h-7 w-7 text-teal" />
            </div>
            <h3 className="mb-4 font-heading text-2xl font-bold text-navy">In-Clinic Consultation</h3>
            <p className="mb-8 text-gray-600 flex-1 text-lg">
              Visit the clinic in Saharsa for a comprehensive in-person dental examination and personalized treatment planning.
            </p>
            <Link to="/appointment">
              <Button size="lg" className="w-full">Book Clinic Appointment</Button>
            </Link>
          </Card>

          {/* Video */}
          <Card className="flex flex-col p-8 transition-transform hover:-translate-y-1 hover:shadow-md">
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-dental-light">
              <MonitorSmartphone className="h-7 w-7 text-dental-blue" />
            </div>
            <h3 className="mb-4 font-heading text-2xl font-bold text-navy">Video Consultation</h3>
            <p className="mb-8 text-gray-600 flex-1 text-lg">
              Discuss your dental concerns remotely from the comfort of your home before deciding on an in-clinic visit.
            </p>
            <Link to="/video-consultation">
              <Button variant="outline" size="lg" className="w-full">Request Video Consultation</Button>
            </Link>
          </Card>
        </div>
      </div>
    </section>
  );
}
