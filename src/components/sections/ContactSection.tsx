import { SectionHeading } from "../ui/SectionHeading";
import { Card } from "../ui/Card";
import { siteConfig } from "../../config/site";
import { Phone, MessageCircle, MapPin } from "lucide-react";
import { Button } from "../ui/Button";

export function ContactSection() {
  const { phone, whatsapp, address, mapsUrl } = siteConfig.clinic;

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Contact the Clinic"
          subtitle="We're here to answer any questions and assist you with scheduling."
          center
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          {/* Phone */}
          <Card className="flex flex-col items-center p-8 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-50">
              <Phone className="h-6 w-6 text-navy" />
            </div>
            <h3 className="mb-2 font-heading text-lg font-bold text-navy">Call Us</h3>
            <p className="text-gray-600 mb-6 flex-1 text-sm">
              Speak directly with our clinic staff.
            </p>
            {phone ? (
              <a href={`tel:${phone}`} className="w-full">
                <Button className="w-full">Call Now</Button>
              </a>
            ) : (
              <Button disabled className="w-full">Coming Soon</Button>
            )}
          </Card>

          {/* WhatsApp */}
          <Card className="flex flex-col items-center p-8 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-50">
              <MessageCircle className="h-6 w-6 text-navy" />
            </div>
            <h3 className="mb-2 font-heading text-lg font-bold text-navy">WhatsApp</h3>
            <p className="text-gray-600 mb-6 flex-1 text-sm">
              Send us a message for quick responses.
            </p>
            {whatsapp ? (
              <a 
                href={`https://wa.me/${whatsapp}?text=Hello ${encodeURIComponent(siteConfig.doctor.name)}, I would like to book a dental consultation.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white">WhatsApp</Button>
              </a>
            ) : (
              <Button disabled className="w-full">Coming Soon</Button>
            )}
          </Card>

          {/* Address */}
          <Card className="flex flex-col items-center p-8 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-50">
              <MapPin className="h-6 w-6 text-navy" />
            </div>
            <h3 className="mb-2 font-heading text-lg font-bold text-navy">Visit Us</h3>
            <p className="text-gray-600 mb-6 flex-1 text-sm">
              {address}
            </p>
            {mapsUrl ? (
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="w-full">
                <Button variant="outline" className="w-full">Get Directions</Button>
              </a>
            ) : (
              <Button disabled variant="outline" className="w-full">Coming Soon</Button>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
}
