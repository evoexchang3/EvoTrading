import { LandingLayout } from "@/components/LandingLayout";
import { SEO } from "@/components/SEO";

export default function CookiesPage() {
  return (
    <LandingLayout>
      <SEO
        title="Cookie Policy"
        description="Learn about how we use cookies on our platform. Manage your cookie preferences and understand what data we collect."
        keywords="cookie policy, cookies, tracking, website cookies, cookie consent"
      />
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8" data-testid="text-cookies-title">
              Cookie Policy
            </h1>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-lg text-muted-foreground mb-8">
                Last updated: January 2025
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">1. What Are Cookies</h2>
                <p className="text-muted-foreground mb-4">
                  Cookies are small text files stored on your device when you visit our website. They help 
                  us provide you with a better experience by remembering your preferences and understanding 
                  how you use our platform.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">2. Types of Cookies We Use</h2>
                
                <h3 className="text-xl font-semibold mb-3">Essential Cookies</h3>
                <p className="text-muted-foreground mb-4">
                  These cookies are necessary for the website to function properly. They enable core 
                  functionality such as:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>User authentication and security</li>
                  <li>Session management</li>
                  <li>Load balancing</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">Functional Cookies</h3>
                <p className="text-muted-foreground mb-4">
                  These cookies allow us to remember your preferences and provide enhanced features:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>Language preferences</li>
                  <li>Theme settings (dark/light mode)</li>
                  <li>Layout preferences</li>
                  <li>Chart settings and customizations</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">Analytics Cookies</h3>
                <p className="text-muted-foreground mb-4">
                  These cookies help us understand how visitors interact with our website:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>Page views and navigation patterns</li>
                  <li>Time spent on pages</li>
                  <li>Error messages encountered</li>
                  <li>Device and browser information</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">Marketing Cookies</h3>
                <p className="text-muted-foreground mb-4">
                  These cookies track your online activity to help deliver more relevant advertising:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>Advertising effectiveness</li>
                  <li>Personalized content</li>
                  <li>Social media integration</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">3. Third-Party Cookies</h2>
                <p className="text-muted-foreground mb-4">
                  We use services from third parties that may set their own cookies:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li><strong>Analytics:</strong> Google Analytics, Mixpanel</li>
                  <li><strong>Security:</strong> Cloudflare</li>
                  <li><strong>Support:</strong> Zendesk, Intercom</li>
                  <li><strong>Payments:</strong> Stripe, PayPal</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">4. Cookie Duration</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Session Cookies</h3>
                    <p className="text-muted-foreground">
                      Temporary cookies that are deleted when you close your browser.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Persistent Cookies</h3>
                    <p className="text-muted-foreground">
                      Remain on your device for a set period or until manually deleted. Typical duration: 
                      30 days to 2 years depending on the cookie type.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">5. How to Manage Cookies</h2>
                <h3 className="text-xl font-semibold mb-3">Browser Settings</h3>
                <p className="text-muted-foreground mb-4">
                  You can control and manage cookies through your browser settings:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies</li>
                  <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies</li>
                  <li><strong>Safari:</strong> Preferences → Privacy → Cookies</li>
                  <li><strong>Edge:</strong> Settings → Privacy → Cookies</li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 mt-6">Cookie Consent</h3>
                <p className="text-muted-foreground mb-4">
                  When you first visit our website, we'll ask for your consent to use non-essential cookies. 
                  You can update your preferences at any time using the cookie settings in the footer.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">6. Impact of Disabling Cookies</h2>
                <p className="text-muted-foreground mb-4">
                  If you disable cookies, some features may not work properly:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>You may need to log in repeatedly</li>
                  <li>Preferences won't be saved</li>
                  <li>Some features may be unavailable</li>
                  <li>Website performance may be affected</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">7. Do Not Track</h2>
                <p className="text-muted-foreground mb-4">
                  Some browsers have a "Do Not Track" feature. When enabled, we respect this preference 
                  and will not use tracking cookies for analytics or marketing purposes.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">8. Updates to This Policy</h2>
                <p className="text-muted-foreground mb-4">
                  We may update this Cookie Policy from time to time to reflect changes in technology 
                  or legal requirements. We'll notify you of significant changes.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
                <p className="text-muted-foreground mb-4">
                  For questions about our use of cookies, contact us at:
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
