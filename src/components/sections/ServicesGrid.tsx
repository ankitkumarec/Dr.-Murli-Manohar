import { SectionHeading } from "../ui/SectionHeading";
import { Card } from "../ui/Card";
import { Stethoscope, ShieldCheck, Activity, Search, Shield, Info, Smile } from "lucide-react";

export function ServicesGrid() {
  const services = [
    {
      title: "Dental Consultation",
      description: "Professional examination and consultation for dental concerns.",
      icon: <Stethoscope className="h-6 w-6 text-dental-blue" />,
    },
    {
      title: "Oral Health Check-up",
      description: "Routine evaluation of oral and dental health.",
      icon: <Search className="h-6 w-6 text-dental-blue" />,
    },
    {
      title: "Tooth Pain Consultation",
      description: "Assessment and treatment planning for tooth pain and sensitivity.",
      icon: <Activity className="h-6 w-6 text-dental-blue" />,
    },
    {
      title: "Gum Care",
      description: "Consultation for gum-related concerns and oral hygiene.",
      icon: <ShieldCheck className="h-6 w-6 text-dental-blue" />,
    },
    {
      title: "Dental Cleaning",
      description: "Professional dental cleaning consultation/service where available.",
      icon: <Smile className="h-6 w-6 text-dental-blue" />,
    },
    {
      title: "General Dental Care",
      description: "Personalized guidance for maintaining healthy teeth and gums.",
      icon: <Shield className="h-6 w-6 text-dental-blue" />,
    },
  ];

  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Our Dental Services"
          subtitle="Comprehensive dental care tailored to your specific needs."
          center
        />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-12">
          {services.map((service, index) => (
            <Card key={index} className="p-8 transition-transform hover:-translate-y-1 hover:shadow-md">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-dental-light">
                {service.icon}
              </div>
              <h3 className="mb-3 font-heading text-xl font-bold text-navy">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
            </Card>
          ))}
        </div>

        <div className="mt-12 flex items-center justify-center gap-2 text-sm text-gray-500 bg-white p-4 rounded-lg shadow-sm border border-gray-100 max-w-2xl mx-auto">
          <Info size={18} className="text-teal" />
          <p>Services may vary. Please contact the clinic to confirm availability for specific procedures.</p>
        </div>
      </div>
    </section>
  );
}
