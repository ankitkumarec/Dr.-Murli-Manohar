import { ServicesGrid } from "../components/sections/ServicesGrid";
import { ConsultationOptions } from "../components/sections/ConsultationOptions";

export function Services() {
  return (
    <div className="pt-20">
      <div className="bg-navy py-16 text-center text-white">
        <h1 className="font-heading text-4xl font-bold sm:text-5xl">Dental Services</h1>
        <p className="mt-4 text-lg text-teal-light">Comprehensive care for a healthy smile</p>
      </div>
      <ServicesGrid />
      <ConsultationOptions />
    </div>
  );
}
