import { LandingLayout } from "@/components/LandingLayout";
import { SEO } from "@/components/SEO";

export default function TermsPage() {
  return (
    <LandingLayout>
      <SEO
        title="Terms & Conditions"
        description="Read our terms and conditions for using the trading platform. Understand your rights and responsibilities when trading with us."
        keywords="terms and conditions, trading terms, broker terms, user agreement"
      />
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8" data-testid="text-terms-title">
              Terms & Conditions
            </h1>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-lg text-muted-foreground mb-8">
                Last updated: January 2025
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
                <p className="text-muted-foreground mb-4">
                  These Terms and Conditions ("Terms") govern your use of our trading platform and services. 
                  By accessing or using our platform, you agree to be bound by these Terms.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">2. Account Registration</h2>
                <p className="text-muted-foreground mb-4">
                  To use our trading services, you must:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>Be at least 18 years of age</li>
                  <li>Provide accurate and complete information</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Complete the KYC verification process</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">3. Trading Services</h2>
                <p className="text-muted-foreground mb-4">
                  Our platform provides access to trading in various financial instruments including 
                  forex, cryptocurrencies, and commodities. All trading carries risk of loss.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">4. Fees and Charges</h2>
                <p className="text-muted-foreground mb-4">
                  We charge fees for certain services including:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>Trading spreads and commissions</li>
                  <li>Overnight financing charges</li>
                  <li>Withdrawal fees (where applicable)</li>
                </ul>
                <p className="text-muted-foreground mb-4">
                  All fees are disclosed transparently before transactions.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">5. Risk Disclosure</h2>
                <p className="text-muted-foreground mb-4">
                  Trading involves significant risk of loss. You should only trade with money you can afford to lose. 
                  Past performance does not guarantee future results.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">6. Account Security</h2>
                <p className="text-muted-foreground mb-4">
                  You are responsible for maintaining the confidentiality of your account credentials and 
                  for all activities under your account.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">7. Prohibited Activities</h2>
                <p className="text-muted-foreground mb-4">
                  You may not:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>Use the platform for illegal activities</li>
                  <li>Attempt to manipulate markets</li>
                  <li>Engage in abusive trading practices</li>
                  <li>Share your account with others</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">8. Limitation of Liability</h2>
                <p className="text-muted-foreground mb-4">
                  We are not liable for losses arising from market movements, system failures, or circumstances 
                  beyond our control. Our liability is limited to the maximum extent permitted by law.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">9. Termination</h2>
                <p className="text-muted-foreground mb-4">
                  We reserve the right to suspend or terminate your account for violation of these Terms or 
                  for any other reason at our discretion.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">10. Changes to Terms</h2>
                <p className="text-muted-foreground mb-4">
                  We may update these Terms from time to time. Continued use of the platform constitutes 
                  acceptance of updated Terms.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">11. Contact Information</h2>
                <p className="text-muted-foreground mb-4">
                  For questions about these Terms, please contact us at legal@tradingplatform.com
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
}
