import { useState } from "react";
import { SectionHeading } from "../ui/SectionHeading";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "../../lib/utils";
import { siteConfig } from "../../config/site";

export function FAQ() {
  const faqs = [
    {
      question: "How can I book an appointment?",
      answer: "You can submit the appointment request form on our website or contact the clinic directly by phone or WhatsApp.",
    },
    {
      question: "Does the clinic offer video consultation?",
      answer: "Video consultation can be requested and is subject to clinic confirmation. You can use the 'Video Consultation' form to initiate a request.",
    },
    {
      question: "Where is the clinic located?",
      answer: `The clinic is located at: ${siteConfig.clinic.address}.`,
    },
    {
      question: "Can I consult from home?",
      answer: "Yes, you can request a video consultation from the comfort of your home.",
    },
    {
      question: "Should I confirm availability before visiting?",
      answer: "Yes. Patients are encouraged to contact the clinic before visiting to confirm consultation availability and timing.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Frequently Asked Questions"
          center
        />

        <div className="mt-8 space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="border border-gray-200 bg-white rounded-lg overflow-hidden transition-all duration-200"
            >
              <button
                className="flex w-full items-center justify-between p-5 text-left focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-heading font-semibold text-navy pr-4">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                )}
              </button>
              <div 
                className={cn(
                  "px-5 overflow-hidden transition-all duration-300 ease-in-out",
                  openIndex === index ? "max-h-40 pb-5 opacity-100" : "max-h-0 opacity-0"
                )}
              >
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
