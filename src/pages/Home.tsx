import { Hero } from "../components/sections/Hero";
import { TrustStats } from "../components/sections/TrustStats";
import { ServicesGrid } from "../components/sections/ServicesGrid";
import { WhyChooseUs } from "../components/sections/WhyChooseUs";
import { SectionHeading } from "../components/ui/SectionHeading";
import { AppointmentForm } from "../components/sections/AppointmentForm";

export function Home() {
  return (
    <>
      <Hero />
      <TrustStats />
      <ServicesGrid />
      <WhyChooseUs />
      
      <section className="bg-white py-20 border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Book an Appointment"
            subtitle="Request an in-clinic or video consultation with Dr. Murli Manohar."
            center
          />
          <div className="mx-auto max-w-3xl mt-12 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8 md:p-12">
            <AppointmentForm />
          </div>
        </div>
      </section>
    </>
  );
}
