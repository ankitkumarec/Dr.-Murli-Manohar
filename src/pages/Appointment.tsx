import { AppointmentForm } from "../components/sections/AppointmentForm";
import { SectionHeading } from "../components/ui/SectionHeading";

export function Appointment() {
  return (
    <div className="pt-20 bg-gray-50 min-h-screen pb-20">
      <div className="bg-navy py-16 text-center text-white">
        <h1 className="font-heading text-4xl font-bold sm:text-5xl">Book an Appointment</h1>
        <p className="mt-4 text-lg text-teal-light">Request a consultation with Dr. Murli Manohar</p>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-16">
        <div className="mx-auto max-w-3xl bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8 md:p-12">
          <SectionHeading
            title="Appointment Request Form"
            subtitle="Please fill out the details below and our team will get back to you to confirm."
            center
          />
          <AppointmentForm initialType="In-Clinic" />
        </div>
      </div>
    </div>
  );
}
