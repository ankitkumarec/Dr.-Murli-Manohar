import { ContactSection } from "../components/sections/ContactSection";
import { LocationSection } from "../components/sections/LocationSection";
import { FAQ } from "../components/sections/FAQ";

export function Contact() {
  return (
    <div className="pt-20">
      <div className="bg-navy py-16 text-center text-white">
        <h1 className="font-heading text-4xl font-bold sm:text-5xl">Contact & Location</h1>
        <p className="mt-4 text-lg text-teal-light">Get in touch with our clinic in Saharsa</p>
      </div>
      
      <ContactSection />
      <LocationSection />
      <FAQ />
    </div>
  );
}
