import { Metadata } from 'next';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

export const metadata: Metadata = {
  title: 'Terms of Service | CarVault UAE',
  description: 'Terms of Service for CarVault UAE - Premium car buyout service with instant transfer payments.',
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-carbon">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-neutral-300 mb-6">
              <strong>Last updated:</strong> January 2025
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
              <p className="text-neutral-300 mb-4">
                By accessing and using CarVault UAE services, you accept and agree to be bound by the 
                terms and provision of this agreement. If you do not agree to abide by the above, 
                please do not use this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">2. Service Description</h2>
              <p className="text-neutral-300 mb-4">
                CarVault UAE provides premium car buyout services in the United Arab Emirates. 
                Our services include:
              </p>
              <ul className="text-neutral-300 list-disc list-inside space-y-2">
                <li>Online car valuation and inspection</li>
                <li>Direct car purchase at market value</li>
                <li>Same-day payment processing</li>
                <li>Vehicle pickup and paperwork handling</li>
                <li>Deregistration assistance</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">3. Eligibility</h2>
              <p className="text-neutral-300 mb-4">
                To use our services, you must:
              </p>
              <ul className="text-neutral-300 list-disc list-inside space-y-2">
                <li>Be at least 18 years old</li>
                <li>Be a legal resident of the UAE</li>
                <li>Own the vehicle you wish to sell</li>
                <li>Have valid identification documents</li>
                <li>Provide accurate and complete information</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">4. Vehicle Requirements</h2>
              <p className="text-neutral-300 mb-4">
                We accept vehicles that meet the following criteria:
              </p>
              <ul className="text-neutral-300 list-disc list-inside space-y-2">
                <li>All makes and models of cars</li>
                <li>Vehicles with clear ownership title</li>
                <li>No outstanding loans or liens</li>
                <li>Valid UAE registration</li>
                <li>Reasonable condition (as assessed by our team)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">5. Valuation and Offers</h2>
              <p className="text-neutral-300 mb-4">
                Our valuation process:
              </p>
              <ul className="text-neutral-300 list-disc list-inside space-y-2">
                <li>Offers are based on current UAE market values</li>
                <li>Valuations are valid for 7 days from the offer date</li>
                <li>Final price may be adjusted based on physical inspection</li>
                <li>All offers are subject to vehicle condition verification</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">6. Payment Terms</h2>
              <p className="text-neutral-300 mb-4">
                Payment will be processed:
              </p>
              <ul className="text-neutral-300 list-disc list-inside space-y-2">
                <li>Upon successful vehicle inspection and acceptance</li>
                <li>Same day via instant transfer to your designated account</li>
                <li>After completion of all required paperwork</li>
                <li>Subject to UAE banking regulations and compliance</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">7. User Responsibilities</h2>
              <p className="text-neutral-300 mb-4">
                You agree to:
              </p>
              <ul className="text-neutral-300 list-disc list-inside space-y-2">
                <li>Provide accurate and truthful information</li>
                <li>Maintain the vehicle in the condition described</li>
                <li>Provide all necessary documentation</li>
                <li>Cooperate with the inspection and pickup process</li>
                <li>Comply with all applicable UAE laws and regulations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">8. Limitation of Liability</h2>
              <p className="text-neutral-300 mb-4">
                CarVault UAE shall not be liable for any indirect, incidental, special, consequential, 
                or punitive damages, including without limitation, loss of profits, data, use, goodwill, 
                or other intangible losses, resulting from your use of our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">9. Governing Law</h2>
              <p className="text-neutral-300 mb-4">
                These terms shall be governed by and construed in accordance with the laws of the 
                United Arab Emirates. Any disputes arising from these terms shall be subject to the 
                exclusive jurisdiction of the courts of the UAE.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">10. Contact Information</h2>
              <p className="text-neutral-300 mb-4">
                For questions about these Terms of Service, please contact us at:
              </p>
              <div className="text-neutral-300">
                <p>Email: info@carvault.ae</p>
                <p>Phone: +971 4 XXX XXXX</p>
                <p>Address: Business Bay, Dubai, UAE</p>
                <p>Office: Level 15, Business Bay Tower, Dubai, UAE</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
