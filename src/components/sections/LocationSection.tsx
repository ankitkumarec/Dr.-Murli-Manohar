import { SectionHeading } from "../ui/SectionHeading";
import { siteConfig } from "../../config/site";
import { MapPin, Navigation } from "lucide-react";
import { Button } from "../ui/Button";

export function LocationSection() {
  const { mapsUrl, address } = siteConfig.clinic;

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Visit Our Clinic"
          subtitle="We are conveniently located in Saharsa."
          center
        />

        <div className="mx-auto max-w-3xl mt-12 text-center">
          <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="h-16 w-16 bg-dental-light rounded-full flex items-center justify-center mb-6">
              <MapPin className="h-8 w-8 text-dental-blue" />
            </div>
            <h3 className="font-heading text-2xl font-bold text-navy mb-2">Clinic Location</h3>
            <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
              {address}
            </p>

            {mapsUrl && (
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="flex items-center gap-2">
                  <Navigation size={20} />
                  Get Directions
                </Button>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
