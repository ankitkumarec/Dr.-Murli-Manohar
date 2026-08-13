import { Award, HeartPulse, MapPin, Video } from "lucide-react";

export function TrustStats() {
  const stats = [
    {
      icon: <Award className="h-6 w-6 text-dental-blue" />,
      title: "9+ Years",
      subtitle: "Dental Experience",
    },
    {
      icon: <HeartPulse className="h-6 w-6 text-dental-blue" />,
      title: "Dental Surgeon",
      subtitle: "Professional Care",
    },
    {
      icon: <MapPin className="h-6 w-6 text-dental-blue" />,
      title: "Saharsa",
      subtitle: "Local Clinic",
    },
    {
      icon: <Video className="h-6 w-6 text-dental-blue" />,
      title: "Video Consultation",
      subtitle: "Consult From Home",
    },
  ];

  return (
    <section className="bg-white py-12 border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-dental-light">
                {stat.icon}
              </div>
              <h3 className="font-heading text-xl font-bold text-navy">{stat.title}</h3>
              <p className="mt-1 text-sm font-medium text-gray-500">{stat.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
