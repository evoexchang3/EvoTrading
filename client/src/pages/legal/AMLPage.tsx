import { LandingLayout } from "@/components/LandingLayout";
import { SEO } from "@/components/SEO";

export default function AMLPage() {
  return (
    <LandingLayout>
      <SEO
        title="AML / KYC Policy"
        description="Our Anti-Money Laundering and Know Your Customer policy. Learn about our compliance procedures and verification requirements."
        keywords="AML policy, KYC policy, anti-money laundering, compliance, identity verification"
      />
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8" data-testid="text-aml-title">
              AML / KYC Policy
            </h1>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-lg text-muted-foreground mb-8">
                Last updated: January 2025
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
                <p className="text-muted-foreground mb-4">
                  Our Anti-Money Laundering (AML) and Know Your Customer (KYC) Policy outlines our commitment 
                  to preventing financial crime and ensuring compliance with international regulations.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">2. Regulatory Compliance</h2>
                <p className="text-muted-foreground mb-4">
                  We comply with:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>Financial Action Task Force (FATF) recommendations</li>
                  <li>EU Anti-Money Laundering Directives</li>
                  <li>Local financial regulations in operating jurisdictions</li>
                  <li>International sanctions and embargo requirements</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">3. Know Your Customer (KYC)</h2>
                <h3 className="text-xl font-semibold mb-3">Identity Verification</h3>
                <p className="text-muted-foreground mb-4">
                  All clients must provide:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>Government-issued photo ID (passport, driver's license, or national ID)</li>
                  <li>Proof of residential address (utility bill, bank statement, or government document)</li>
                  <li>Selfie verification for enhanced security</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">Enhanced Due Diligence</h3>
                <p className="text-muted-foreground mb-4">
                  Additional verification may be required for:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>High-value transactions</li>
                  <li>Politically Exposed Persons (PEPs)</li>
                  <li>High-risk jurisdictions</li>
                  <li>Corporate or institutional accounts</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">4. Transaction Monitoring</h2>
                <p className="text-muted-foreground mb-4">
                  We monitor all transactions for suspicious activity including:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>Unusual transaction patterns</li>
                  <li>Structuring or splitting of transactions</li>
                  <li>Transactions involving high-risk jurisdictions</li>
                  <li>Rapid movement of funds</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">5. Suspicious Activity Reporting</h2>
                <p className="text-muted-foreground mb-4">
                  We are required to report suspicious activities to relevant authorities. We maintain 
                  confidentiality of such reports as required by law.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">6. Source of Funds</h2>
                <p className="text-muted-foreground mb-4">
                  We may request documentation to verify the source of funds for:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>Large deposits or withdrawals</li>
                  <li>First-time deposits above certain thresholds</li>
                  <li>Unusual account activity</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">7. Sanctions Screening</h2>
                <p className="text-muted-foreground mb-4">
                  All clients are screened against:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>UN, EU, US, and UK sanctions lists</li>
                  <li>PEP databases</li>
                  <li>Adverse media screening</li>
                  <li>Watchlists and enforcement lists</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">8. Record Keeping</h2>
                <p className="text-muted-foreground mb-4">
                  We maintain records of:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>Client identification documents for 7 years after relationship ends</li>
                  <li>Transaction records for 7 years</li>
                  <li>Correspondence and due diligence records</li>
                  <li>AML/CFT training and policy updates</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">9. Prohibited Jurisdictions</h2>
                <p className="text-muted-foreground mb-4">
                  We do not accept clients from jurisdictions subject to comprehensive sanctions or 
                  identified as high-risk for money laundering.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">10. Staff Training</h2>
                <p className="text-muted-foreground mb-4">
                  All staff receive regular AML/KYC training to ensure compliance and effective 
                  implementation of our policies.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">11. Contact</h2>
                <p className="text-muted-foreground mb-4">
                  For AML/KYC related questions, contact our compliance team at:
                  <br />
                  <strong>compliance@tradingplatform.com</strong>
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
}
