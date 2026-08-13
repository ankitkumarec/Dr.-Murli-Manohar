import { useState } from "react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { submitAppointment, type AppointmentData } from "../../services/appointmentService";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "../../lib/utils";

interface AppointmentFormProps {
  initialType?: "In-Clinic" | "Video Consultation";
}

export function AppointmentForm({ initialType = "In-Clinic" }: AppointmentFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<AppointmentData>({
    fullName: "",
    mobile: "",
    email: "",
    date: "",
    time: "",
    type: initialType,
    reason: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await submitAppointment(formData);
      if (response.success) {
        setSuccess(true);
        // Reset form
        setFormData({
          fullName: "",
          mobile: "",
          email: "",
          date: "",
          time: "",
          type: initialType,
          reason: "",
          message: "",
        });
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl bg-teal-light/50 p-12 text-center border border-teal-light">
        <CheckCircle2 className="mb-4 h-16 w-16 text-teal" />
        <h3 className="mb-2 font-heading text-2xl font-bold text-navy">Request Received</h3>
        <p className="text-gray-600 max-w-md">
          Thank you. Your appointment request has been received. The clinic will contact you shortly to confirm your appointment.
        </p>
        <Button className="mt-8" onClick={() => setSuccess(false)} variant="outline">
          Book Another Appointment
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="flex items-center gap-3 rounded-lg bg-red-50 p-4 text-red-600 border border-red-100">
          <AlertCircle size={20} />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <Input
          label="Full Name *"
          name="fullName"
          required
          value={formData.fullName}
          onChange={handleChange}
          placeholder="John Doe"
        />
        <Input
          label="Mobile Number *"
          name="mobile"
          type="tel"
          required
          value={formData.mobile}
          onChange={handleChange}
          placeholder="e.g. 9876543210"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Input
          label="Email Address (Optional)"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="john@example.com"
        />
        <div className="w-full">
          <label className="mb-2 block text-sm font-medium text-navy-light">Consultation Type *</label>
          <select
            name="type"
            required
            value={formData.type}
            onChange={handleChange}
            className="flex h-11 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-navy focus:outline-none focus:ring-1 focus:ring-navy"
          >
            <option value="In-Clinic">In-Clinic Consultation</option>
            <option value="Video Consultation">Video Consultation</option>
          </select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Input
          label="Preferred Date *"
          name="date"
          type="date"
          required
          value={formData.date}
          onChange={handleChange}
        />
        <div className="w-full">
          <label className="mb-2 block text-sm font-medium text-navy-light">Preferred Time *</label>
          <select
            name="time"
            required
            value={formData.time}
            onChange={handleChange}
            className="flex h-11 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-navy focus:outline-none focus:ring-1 focus:ring-navy"
          >
            <option value="">Select a time</option>
            <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
            <option value="Afternoon (1 PM - 5 PM)">Afternoon (1 PM - 5 PM)</option>
            <option value="Evening (5 PM - 8 PM)">Evening (5 PM - 8 PM)</option>
          </select>
        </div>
      </div>

      <div className="w-full">
        <label className="mb-2 block text-sm font-medium text-navy-light">Reason for Visit *</label>
        <select
          name="reason"
          required
          value={formData.reason}
          onChange={handleChange}
          className="flex h-11 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-navy focus:outline-none focus:ring-1 focus:ring-navy"
        >
          <option value="">Select a reason</option>
          <option value="Routine Check-up">Routine Check-up</option>
          <option value="Tooth Pain">Tooth Pain</option>
          <option value="Dental Cleaning">Dental Cleaning</option>
          <option value="Gum Problem">Gum Problem</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="w-full">
        <label className="mb-2 block text-sm font-medium text-navy-light">Additional Message (Optional)</label>
        <textarea
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className="flex w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-navy focus:outline-none focus:ring-1 focus:ring-navy"
          placeholder="Any specific concerns you want the doctor to know?"
        ></textarea>
      </div>

      <div className="pt-4">
        <Button 
          type="submit" 
          size="lg" 
          className={cn("w-full md:w-auto", isSubmitting && "opacity-80")} 
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Submitting your request...
            </>
          ) : (
            "Request Appointment"
          )}
        </Button>
        <p className="mt-4 text-xs text-gray-500">
          * This is an appointment request. The clinic will contact you to confirm the exact time and availability.
        </p>
      </div>
    </form>
  );
}
