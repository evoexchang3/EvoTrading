import { LandingLayout } from "@/components/LandingLayout";
import { SEO } from "@/components/SEO";

export default function PrivacyPage() {
  return (
    <LandingLayout>
      <SEO
        title="Privacy Policy"
        description="Our privacy policy explains how we collect, use, and protect your personal information. GDPR compliant and transparent."
        keywords="privacy policy, data protection, GDPR, privacy rights, personal data"
      />
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8" data-testid="text-privacy-title">
              Privacy Policy
            </h1>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-lg text-muted-foreground mb-8">
                Last updated: January 2025
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
                <p className="text-muted-foreground mb-4">
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                  when you use our trading platform and services.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
                <h3 className="text-xl font-semibold mb-3">Personal Information</h3>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>Name, email address, phone number</li>
                  <li>Date of birth and nationality</li>
                  <li>Government-issued ID and proof of address</li>
                  <li>Financial information</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">Usage Information</h3>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>Trading activity and transaction history</li>
                  <li>Device information and IP address</li>
                  <li>Browser type and operating system</li>
                  <li>Pages visited and features used</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
                <p className="text-muted-foreground mb-4">
                  We use your information to:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>Provide and maintain our trading services</li>
                  <li>Process transactions and manage your account</li>
                  <li>Comply with legal and regulatory requirements</li>
                  <li>Detect and prevent fraud and abuse</li>
                  <li>Improve our services and user experience</li>
                  <li>Send important updates and notifications</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">4. Information Sharing</h2>
                <p className="text-muted-foreground mb-4">
                  We may share your information with:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>Service providers who assist in operating our platform</li>
                  <li>Regulatory authorities and law enforcement when required</li>
                  <li>Payment processors for transaction processing</li>
                  <li>Legal advisors and auditors as necessary</li>
                </ul>
                <p className="text-muted-foreground mb-4">
                  We never sell your personal information to third parties.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
                <p className="text-muted-foreground mb-4">
                  We implement industry-standard security measures including:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>SSL/TLS encryption for data transmission</li>
                  <li>Encrypted storage of sensitive information</li>
                  <li>Regular security audits and updates</li>
                  <li>Access controls and authentication</li>
                  <li>24/7 security monitoring</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">6. Your Rights (GDPR)</h2>
                <p className="text-muted-foreground mb-4">
                  Under GDPR, you have the right to:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>Access your personal data</li>
                  <li>Rectify inaccurate data</li>
                  <li>Request erasure of your data</li>
                  <li>Restrict processing of your data</li>
                  <li>Data portability</li>
                  <li>Object to processing</li>
                  <li>Withdraw consent at any time</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">7. Cookies</h2>
                <p className="text-muted-foreground mb-4">
                  We use cookies and similar technologies to enhance your experience. You can control 
                  cookie preferences through your browser settings. See our Cookie Policy for details.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">8. Data Retention</h2>
                <p className="text-muted-foreground mb-4">
                  We retain your information for as long as necessary to provide services and comply with 
                  legal obligations, typically 7 years after account closure as required by financial regulations.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">9. International Transfers</h2>
                <p className="text-muted-foreground mb-4">
                  Your data may be transferred to and processed in countries outside your residence. 
                  We ensure appropriate safeguards are in place for such transfers.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">10. Contact Us</h2>
                <p className="text-muted-foreground mb-4">
                  For privacy-related questions or to exercise your rights, contact our Data Protection Officer at:
                  <br />
                  <strong>privacy@tradingplatform.com</strong>
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
}
