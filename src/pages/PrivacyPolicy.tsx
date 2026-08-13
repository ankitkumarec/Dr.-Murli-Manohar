import { siteConfig } from "../config/site";

export function PrivacyPolicy() {
  return (
    <div className="pt-20 bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
          <h1 className="font-heading text-3xl font-bold text-navy mb-8">Privacy Policy</h1>
          
          <div className="prose prose-navy max-w-none space-y-6 text-gray-600">
            <p>
              Welcome to the {siteConfig.website.name} privacy notice. We respect your privacy and are committed to protecting your personal data.
            </p>

            <h2 className="font-heading text-xl font-semibold text-navy mt-8">1. Information We Collect</h2>
            <p>
              When you use our appointment request forms, we may collect the following personal information:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Full Name</li>
              <li>Mobile Number</li>
              <li>Email Address</li>
              <li>Consultation Preference</li>
              <li>Messages or concerns provided by you</li>
            </ul>

            <h2 className="font-heading text-xl font-semibold text-navy mt-8">2. How We Use Your Information</h2>
            <p>
              The information collected through our appointment forms is used exclusively for:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Contacting you to confirm appointment timings.</li>
              <li>Providing you with the requested dental consultation services.</li>
              <li>Sending necessary communications regarding your health or clinic visits.</li>
            </ul>

            <h2 className="font-heading text-xl font-semibold text-navy mt-8">3. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to ensure your personal information is kept secure and protected against unauthorized access. We do not sell or share your personal data with third parties for marketing purposes.
            </p>

            <h2 className="font-heading text-xl font-semibold text-navy mt-8">4. Medical Disclaimer</h2>
            <p>
              The content provided on this website is for general informational purposes only and does not replace professional medical evaluation, diagnosis, or treatment. Always seek the advice of your dentist or other qualified health provider with any questions you may have regarding a medical condition.
            </p>

            <h2 className="font-heading text-xl font-semibold text-navy mt-8">5. Contact Us</h2>
            <p>
              If you have any questions about this privacy policy or our privacy practices, please contact us at our clinic in Saharsa, Bihar.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
