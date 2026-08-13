import { DoctorProfile } from "../components/sections/DoctorProfile";
import { WhyChooseUs } from "../components/sections/WhyChooseUs";
import { TrustStats } from "../components/sections/TrustStats";

export function About() {
  return (
    <div className="pt-20">
      <div className="bg-navy py-16 text-center text-white">
        <h1 className="font-heading text-4xl font-bold sm:text-5xl">About Us</h1>
        <p className="mt-4 text-lg text-teal-light">Get to know Dr. Murli Manohar</p>
      </div>
      <DoctorProfile />
      <TrustStats />
      <WhyChooseUs />
    </div>
  );
}
