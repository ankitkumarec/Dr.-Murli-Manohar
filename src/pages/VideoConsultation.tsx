import { AppointmentForm } from "../components/sections/AppointmentForm";
import { SectionHeading } from "../components/ui/SectionHeading";
import { MonitorSmartphone, Clock, CheckCircle } from "lucide-react";

export function VideoConsultation() {
  return (
    <div className="pt-20 bg-gray-50 min-h-screen pb-20">
      <div className="bg-navy py-16 text-center text-white">
        <h1 className="font-heading text-4xl font-bold sm:text-5xl">Video Consultation</h1>
        <p className="mt-4 text-lg text-teal-light">Consult from the comfort of your home</p>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid gap-12 md:grid-cols-3">
          <div className="md:col-span-1 space-y-8">
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <MonitorSmartphone className="h-10 w-10 text-dental-blue mb-4" />
              <h3 className="font-heading text-xl font-bold text-navy mb-2">How it works</h3>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-teal shrink-0 mt-0.5" />
                  <span>Submit the video consultation request form.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-teal shrink-0 mt-0.5" />
                  <span>The clinic will contact you to confirm timing and payment.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-teal shrink-0 mt-0.5" />
                  <span>Receive a secure video link for your session.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-teal shrink-0 mt-0.5" />
                  <span>Join the video call at the scheduled time.</span>
                </li>
              </ul>
            </div>

            <div className="bg-teal-light/30 p-6 rounded-xl border border-teal-light">
              <Clock className="h-8 w-8 text-teal mb-3" />
              <h3 className="font-heading text-lg font-bold text-navy mb-2">Save Time</h3>
              <p className="text-gray-600 text-sm">
                Video consultation allows you to discuss your dental concerns remotely before deciding if an in-clinic procedure is required.
              </p>
            </div>
          </div>

          <div className="md:col-span-2 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8 md:p-12">
            <SectionHeading
              title="Request Video Consultation"
              subtitle="Fill out the details and we will arrange a virtual session."
            />
            <AppointmentForm initialType="Video Consultation" />
          </div>
        </div>
      </div>
    </div>
  );
}
