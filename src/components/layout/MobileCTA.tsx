import { Link } from "react-router-dom";
import { CalendarDays, Phone, MessageCircle } from "lucide-react";
import { siteConfig } from "../../config/site";

export function MobileCTA() {
  const { phone, whatsapp } = siteConfig.clinic;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white p-2 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] md:hidden">
      <div className="mx-auto flex max-w-md items-center justify-between gap-2">
        <Link
          to="/appointment"
          className="flex flex-1 flex-col items-center justify-center gap-1 rounded-lg bg-navy py-2 text-white transition-colors hover:bg-navy-light"
        >
          <CalendarDays size={20} />
          <span className="text-xs font-medium">Book</span>
        </Link>
        
        {phone && (
          <a
            href={`tel:${phone}`}
            className="flex flex-1 flex-col items-center justify-center gap-1 rounded-lg bg-gray-50 py-2 text-navy transition-colors hover:bg-gray-100"
          >
            <Phone size={20} />
            <span className="text-xs font-medium">Call</span>
          </a>
        )}

        {whatsapp && (
          <a
            href={`https://wa.me/${whatsapp}?text=Hello ${encodeURIComponent(siteConfig.doctor.name)}, I would like to book a dental consultation.`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 flex-col items-center justify-center gap-1 rounded-lg bg-[#25D366] py-2 text-white transition-colors hover:bg-[#20bd5a]"
          >
            <MessageCircle size={20} />
            <span className="text-xs font-medium">WhatsApp</span>
          </a>
        )}
      </div>
    </div>
  );
}
