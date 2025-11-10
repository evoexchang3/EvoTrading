import { LandingLayout } from "@/components/LandingLayout";
import { SEO } from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Check, ArrowRight, HelpCircle } from "lucide-react";
import { useVariant } from "@/layouts/shared/useVariant";
import { HeroRenderer } from "@/components/variant-rendering";

export default function CustomerInfoPage() {
  const variant = useVariant();
  const customerInfoConfig = variant.pages.customerInfo;

  const accountTypes = [
    { name: "Standard Account", minDeposit: "$100", spread: "From 1.2 pips", leverage: "1:100", commission: "No" },
    { name: "Pro Account", minDeposit: "$1,000", spread: "From 0.8 pips", leverage: "1:200", commission: "No" },
    { name: "VIP Account", minDeposit: "$10,000", spread: "From 0.3 pips", leverage: "1:500", commission: "From $3/lot" },
  ];

  const benefits = [
    "24/7 customer support", "Advanced trading tools", "Educational resources",
    "Multiple payment methods", "Mobile trading apps", "Risk management tools"
  ];

  const steps = [
    { title: "Register", description: "Create your account in 2 minutes" },
    { title: "Verify", description: "Complete KYC verification" },
    { title: "Deposit", description: "Fund your account securely" },
    { title: "Trade", description: "Start trading instantly" },
  ];

  const faqs = [
    { q: "What is the minimum deposit?", a: "Minimum deposit starts at $100 for Standard accounts." },
    { q: "How long does verification take?", a: "Verification typically completes within 24 hours." },
    { q: "Can I withdraw anytime?", a: "Yes, withdrawals are processed within 1-3 business days." },
  ];

  const heroProps = {
    headline: "Account Information",
    subheadline: "Choose the right account for your trading goals",
    cta: "Get Started",
    style: 'standard' as const,
  };

  // Comparison Table Layout
  const ComparisonTableLayout = () => (
    <div className="container mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Compare Account Types</h2>
        <p className="text-lg text-muted-foreground">Find the perfect account for your needs</p>
      </div>
      <div className="max-w-6xl mx-auto overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="p-4 text-left">Feature</th>
              {accountTypes.map((type, idx) => (
                <th key={idx} className="p-4 text-center">
                  <div className="font-bold text-lg">{type.name}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-4 font-medium">Min. Deposit</td>
              {accountTypes.map((type, idx) => (
                <td key={idx} className="p-4 text-center">{type.minDeposit}</td>
              ))}
            </tr>
            <tr className="border-b">
              <td className="p-4 font-medium">Spread</td>
              {accountTypes.map((type, idx) => (
                <td key={idx} className="p-4 text-center">{type.spread}</td>
              ))}
            </tr>
            <tr className="border-b">
              <td className="p-4 font-medium">Leverage</td>
              {accountTypes.map((type, idx) => (
                <td key={idx} className="p-4 text-center">{type.leverage}</td>
              ))}
            </tr>
            <tr className="border-b">
              <td className="p-4 font-medium">Commission</td>
              {accountTypes.map((type, idx) => (
                <td key={idx} className="p-4 text-center">{type.commission}</td>
              ))}
            </tr>
            <tr>
              <td className="p-4"></td>
              {accountTypes.map((type, idx) => (
                <td key={idx} className="p-4 text-center">
                  <Link href="/register">
                    <Button data-testid={`button-open-account-${idx}`}>Open Account</Button>
                  </Link>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  // Step by Step Layout
  const StepByStepLayout = () => (
    <div className="container mx-auto py-16 px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">How to Get Started</h2>
        <p className="text-xl text-muted-foreground">Simple steps to begin trading</p>
      </div>
      <div className="max-w-4xl mx-auto space-y-8">
        {steps.map((step, idx) => (
          <div key={idx} className="flex gap-6" data-testid={`step-${idx}`}>
            <div className="flex-shrink-0 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                {idx + 1}
              </div>
              {idx < steps.length - 1 && (
                <div className="w-0.5 flex-1 bg-border my-2" style={{ minHeight: '40px' }} />
              )}
            </div>
            <Card className="flex-1">
              <CardHeader>
                <CardTitle>{step.title}</CardTitle>
                <CardDescription>{step.description}</CardDescription>
              </CardHeader>
            </Card>
          </div>
        ))}
      </div>
      <div className="text-center mt-12">
        <Link href="/register">
          <Button size="lg" data-testid="button-start-now">Start Now <ArrowRight className="ml-2 w-4 h-4" /></Button>
        </Link>
      </div>
    </div>
  );

  // FAQ-Led Layout
  const FaqLedLayout = () => (
    <div className="container mx-auto py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <HelpCircle className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-muted-foreground">Everything you need to know</p>
        </div>
        <div className="space-y-6 mb-12">
          {faqs.map((faq, idx) => (
            <Card key={idx} data-testid={`faq-${idx}`}>
              <CardHeader>
                <CardTitle className="text-lg">{faq.q}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{faq.a}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle>Ready to Start Trading?</CardTitle>
            <CardDescription>Open your account today and access global markets</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/register">
              <Button size="lg" data-testid="button-faq-led-open-account">Open Account</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // FAQ Hybrid Layout
  const FaqHybridLayout = () => (
    <div className="container mx-auto py-16 px-4">
      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-3xl font-bold mb-6">Account Benefits</h2>
          <div className="space-y-3 mb-8">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <Check className="w-5 h-5 text-primary" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
          <Link href="/register">
            <Button size="lg" data-testid="button-faq-hybrid-get-started">Get Started</Button>
          </Link>
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-6">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <CardTitle className="text-base">{faq.q}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Benefit Cards Layout
  const BenefitCardsLayout = () => (
    <div className="container mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
        <p className="text-lg text-muted-foreground">Comprehensive benefits for all traders</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {benefits.map((benefit, idx) => (
          <Card key={idx} className="hover-elevate" data-testid={`benefit-${idx}`}>
            <CardHeader>
              <Check className="w-8 h-8 text-primary mb-2" />
              <CardTitle className="text-lg">{benefit}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Professional tools and support to help you succeed in trading.</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold mb-6 text-center">Choose Your Account</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {accountTypes.map((type, idx) => (
            <Card key={idx} data-testid={`account-${idx}`}>
              <CardHeader>
                <CardTitle>{type.name}</CardTitle>
                <div className="text-2xl font-bold text-primary">{type.minDeposit}</div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="text-sm"><strong>Spread:</strong> {type.spread}</div>
                  <div className="text-sm"><strong>Leverage:</strong> {type.leverage}</div>
                </div>
                <Link href="/register">
                  <Button className="w-full" data-testid={`button-benefit-open-account-${idx}`}>Open Account</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  // Layout dispatcher
  const renderContent = () => {
    switch (customerInfoConfig.layout) {
      case 'comparison-table':
        return <ComparisonTableLayout />;
      
      case 'step-by-step':
        return <StepByStepLayout />;
      
      case 'faq-led':
        return <FaqLedLayout />;
      
      case 'faq-hybrid':
        return <FaqHybridLayout />;
      
      case 'benefit-cards':
        return <BenefitCardsLayout />;
      
      default:
        return <ComparisonTableLayout />;
    }
  };

  return (
    <LandingLayout>
      <SEO
        title="Account Information"
        description="Learn about our account types and benefits"
      />
      <div className="min-h-screen">
        <HeroRenderer {...heroProps} />
        {renderContent()}
      </div>
    </LandingLayout>
  );
}
