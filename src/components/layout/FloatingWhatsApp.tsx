import { MessageCircle } from "lucide-react";
import { siteConfig } from "../../config/site";

export function FloatingWhatsApp() {
  const { whatsapp } = siteConfig.clinic;

  if (!whatsapp) return null;

  return (
    <a
      href={`https://wa.me/${whatsapp}?text=Hello ${encodeURIComponent(siteConfig.doctor.name)}, I would like to book a dental consultation.`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-[#25D366]/50 md:bottom-6 md:right-6"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={28} />
    </a>
  );
}
