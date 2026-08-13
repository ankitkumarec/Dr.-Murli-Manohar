import { SectionHeading } from "../ui/SectionHeading";
import { Card } from "../ui/Card";
import { CheckCircle2 } from "lucide-react";

export function WhyChooseUs() {
  const reasons = [
    {
      title: "Experienced Care",
      description: "9 years of professional dental experience.",
    },
    {
      title: "Patient-Focused Approach",
      description: "Clear communication and personalized consultation.",
    },
    {
      title: "Convenient Location",
      description: "Centrally located clinic in Saharsa, Bihar.",
    },
    {
      title: "Flexible Consultation",
      description: "Both in-clinic visits and video consultation options available.",
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Why Patients Choose Dr. Murli Manohar"
          subtitle="Committed to providing reliable and high-quality dental care."
          center
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, index) => (
            <Card key={index} className="p-6 transition-colors hover:border-teal-light hover:bg-gray-50">
              <CheckCircle2 className="mb-4 h-8 w-8 text-teal" />
              <h3 className="mb-2 font-heading text-lg font-semibold text-navy">
                {reason.title}
              </h3>
              <p className="text-sm text-gray-600">
                {reason.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
