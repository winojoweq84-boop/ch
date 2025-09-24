import { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import Footer from '@/components/layout/footer';

export const metadata: Metadata = {
  title: 'Privacy Policy | CarVault UAE',
  description: 'Privacy Policy for CarVault UAE - Premium car buyout service with instant transfer payments.',
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-carbon">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-neutral-300 mb-6">
              <strong>Last updated:</strong> January 2025
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">1. Information We Collect</h2>
              <p className="text-neutral-300 mb-4">
                We collect information you provide directly to us, such as when you create an account, 
                submit a car valuation request, or contact us for support.
              </p>
              <ul className="text-neutral-300 list-disc list-inside space-y-2">
                <li>Personal information (name, email, phone number)</li>
                <li>Vehicle information (make, model, year, mileage, condition)</li>
                <li>Identity verification documents (as required by UAE regulations)</li>
                <li>Payment and banking information</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">2. How We Use Your Information</h2>
              <p className="text-neutral-300 mb-4">
                We use the information we collect to:
              </p>
              <ul className="text-neutral-300 list-disc list-inside space-y-2">
                <li>Provide our car buyout services</li>
                <li>Process valuations and offers</li>
                <li>Facilitate payments and transfers</li>
                <li>Comply with UAE regulatory requirements (KYC/AML)</li>
                <li>Communicate with you about our services</li>
                <li>Improve our platform and services</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">3. Information Sharing</h2>
              <p className="text-neutral-300 mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties, 
                except in the following circumstances:
              </p>
              <ul className="text-neutral-300 list-disc list-inside space-y-2">
                <li>With your explicit consent</li>
                <li>To comply with legal obligations</li>
                <li>To protect our rights and prevent fraud</li>
                <li>With service providers who assist in our operations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">4. Data Security</h2>
              <p className="text-neutral-300 mb-4">
                We implement appropriate security measures to protect your personal information against 
                unauthorized access, alteration, disclosure, or destruction. This includes encryption, 
                secure servers, and regular security audits.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">5. Your Rights</h2>
              <p className="text-neutral-300 mb-4">
                Under UAE data protection laws, you have the right to:
              </p>
              <ul className="text-neutral-300 list-disc list-inside space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Object to processing of your information</li>
                <li>Data portability</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">6. Contact Us</h2>
              <p className="text-neutral-300 mb-4">
                If you have any questions about this Privacy Policy, please contact us at:
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
