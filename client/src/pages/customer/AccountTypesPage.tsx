import { LandingLayout } from "@/components/LandingLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, HelpCircle, ArrowRight, Shield, Zap, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

export default function AccountTypesPage() {
  const accountTypes = [
    {
      name: "Standard Account",
      description: "Perfect for beginners and retail traders",
      minDeposit: "$100",
      leverage: "1:100",
      spreads: "1.2 pips",
      features: [
        "Minimum deposit: $100",
        "Leverage up to 1:100",
        "Access to all instruments",
        "Standard spreads from 1.2 pips",
        "24/5 customer support",
        "Free educational resources",
        "No commission on forex trades",
        "Mobile and web trading platforms"
      ],
      ideal: ["New traders", "Small capital investors", "Learning to trade"],
      popular: false,
      color: "blue"
    },
    {
      name: "Professional Account",
      description: "For experienced traders with higher volume",
      minDeposit: "$5,000",
      leverage: "1:500",
      spreads: "0.8 pips",
      features: [
        "Minimum deposit: $5,000",
        "Leverage up to 1:500",
        "Reduced spreads from 0.8 pips",
        "Priority customer support",
        "Advanced trading tools",
        "Dedicated account manager",
        "Premium market analysis",
        "Faster withdrawal processing",
        "Access to trading signals"
      ],
      ideal: ["Experienced traders", "Active day traders", "Medium capital investors"],
      popular: true,
      color: "primary"
    },
    {
      name: "VIP Account",
      description: "Premium service for institutional clients",
      minDeposit: "$50,000",
      leverage: "1:500",
      spreads: "0.3 pips",
      features: [
        "Minimum deposit: $50,000",
        "Leverage up to 1:500",
        "Tightest spreads from 0.3 pips",
        "24/7 priority support",
        "Custom trading solutions",
        "Personal relationship manager",
        "Exclusive market insights",
        "Institutional-grade execution",
        "Custom leverage options",
        "Bespoke trading strategies",
        "Direct market access options"
      ],
      ideal: ["High net worth individuals", "Institutional traders", "Fund managers"],
      popular: false,
      color: "amber"
    }
  ];

  const faqs = [
    {
      question: "Can I upgrade my account type later?",
      answer: "Yes, you can upgrade your account type at any time by meeting the minimum deposit requirement of the higher tier. Contact our support team to initiate an upgrade, and your account will be transitioned within 24 hours."
    },
    {
      question: "What's the difference in execution speed between account types?",
      answer: "All account types benefit from the same ultra-fast execution speeds (average 0.05 seconds). However, Professional and VIP accounts receive priority order routing during high volatility periods, ensuring optimal fills even in fast-moving markets."
    },
    {
      question: "Are there any hidden fees or commissions?",
      answer: "No hidden fees. Standard accounts have no commission on forex trades (spreads only). Professional accounts have a small commission structure ($3.50 per lot) but tighter spreads. VIP accounts have custom fee structures based on volume. All fees are disclosed upfront."
    },
    {
      question: "Can I have multiple account types?",
      answer: "Yes, you can open multiple trading accounts under the same client profile. Many traders maintain a Standard account for testing strategies and a Professional or VIP account for active trading. Each account operates independently with separate balances."
    },
    {
      question: "What happens if my balance falls below the minimum deposit?",
      answer: "Your account remains active even if your balance falls below the minimum deposit due to trading losses. However, if you withdraw funds that bring your balance below the minimum, your account may be downgraded to a lower tier. You can upgrade again by depositing the required amount."
    },
    {
      question: "Do Professional and VIP accounts require trading experience verification?",
      answer: "Professional accounts require at least 12 months of trading experience or equivalent financial market experience. VIP accounts require demonstrated trading experience and undergo an enhanced due diligence process. Both require additional documentation during the application process."
    }
  ];

  return (
    <LandingLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <Badge className="mb-4" data-testid="badge-account-types">Customer Information</Badge>
            <h1 className="text-4xl font-bold mb-4">Choose Your Account Type</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Select the account that matches your trading experience and goals. All accounts include access to our full range of instruments, trading platforms, and educational resources. Upgrade anytime as your trading evolves.
            </p>
          </div>

          {/* Who This Is For */}
          <div className="bg-muted rounded-lg p-6 mb-12">
            <h2 className="text-xl font-semibold mb-4">👥 Who This Page Is For</h2>
            <div className="grid sm:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="font-medium mb-1">New Traders</p>
                <p className="text-muted-foreground">Learn which account to start with</p>
              </div>
              <div>
                <p className="font-medium mb-1">Existing Clients</p>
                <p className="text-muted-foreground">Evaluate upgrade opportunities</p>
              </div>
              <div>
                <p className="font-medium mb-1">Institutional Investors</p>
                <p className="text-muted-foreground">Explore premium account features</p>
              </div>
            </div>
          </div>

          {/* Account Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {accountTypes.map((account) => (
              <Card 
                key={account.name} 
                className={account.popular ? "border-primary shadow-lg relative" : ""}
                data-testid={`card-account-${account.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {account.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{account.name}</CardTitle>
                  <CardDescription className="text-base">{account.description}</CardDescription>
                  <div className="pt-4">
                    <div className="text-3xl font-bold">{account.minDeposit}</div>
                    <p className="text-sm text-muted-foreground">minimum deposit</p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm">Key Features</h4>
                    <ul className="space-y-2">
                      {account.features.slice(0, 6).map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-sm mb-2">Ideal For</h4>
                    <div className="flex flex-wrap gap-2">
                      {account.ideal.map((type, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full" variant={account.popular ? "default" : "outline"} data-testid={`button-open-${account.name.toLowerCase().replace(/\s+/g, '-')}`}>
                    Open {account.name}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Detailed Comparison Table */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Complete Feature Comparison</CardTitle>
              <CardDescription>See all features and limits across account types</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold">Feature</th>
                      <th className="text-center py-3 px-4 font-semibold">Standard</th>
                      <th className="text-center py-3 px-4 font-semibold">Professional</th>
                      <th className="text-center py-3 px-4 font-semibold">VIP</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">Minimum Deposit</td>
                      <td className="text-center py-3 px-4">$100</td>
                      <td className="text-center py-3 px-4">$5,000</td>
                      <td className="text-center py-3 px-4">$50,000</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">Maximum Leverage</td>
                      <td className="text-center py-3 px-4">1:100</td>
                      <td className="text-center py-3 px-4">1:500</td>
                      <td className="text-center py-3 px-4">1:500</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">EUR/USD Spreads From</td>
                      <td className="text-center py-3 px-4">1.2 pips</td>
                      <td className="text-center py-3 px-4">0.8 pips</td>
                      <td className="text-center py-3 px-4">0.3 pips</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">Commission (per lot)</td>
                      <td className="text-center py-3 px-4">$0</td>
                      <td className="text-center py-3 px-4">$3.50</td>
                      <td className="text-center py-3 px-4">Custom</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">Execution Speed (avg)</td>
                      <td className="text-center py-3 px-4">0.05s</td>
                      <td className="text-center py-3 px-4">0.05s</td>
                      <td className="text-center py-3 px-4">0.05s</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">Account Manager</td>
                      <td className="text-center py-3 px-4">-</td>
                      <td className="text-center py-3 px-4"><Check className="w-5 h-5 mx-auto text-primary" /></td>
                      <td className="text-center py-3 px-4"><Check className="w-5 h-5 mx-auto text-primary" /></td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">Trading Signals</td>
                      <td className="text-center py-3 px-4">Basic</td>
                      <td className="text-center py-3 px-4"><Check className="w-5 h-5 mx-auto text-primary" /></td>
                      <td className="text-center py-3 px-4"><Check className="w-5 h-5 mx-auto text-primary" /></td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">Withdrawal Processing</td>
                      <td className="text-center py-3 px-4">24-48 hours</td>
                      <td className="text-center py-3 px-4">12-24 hours</td>
                      <td className="text-center py-3 px-4">Same day</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">Market Research</td>
                      <td className="text-center py-3 px-4">Daily</td>
                      <td className="text-center py-3 px-4">Daily + Weekly</td>
                      <td className="text-center py-3 px-4">Premium + Exclusive</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium">Customer Support</td>
                      <td className="text-center py-3 px-4">24/5</td>
                      <td className="text-center py-3 px-4">24/5 Priority</td>
                      <td className="text-center py-3 px-4">24/7 Dedicated</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Account Selector Guide */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>🎯 Quick Account Selector</CardTitle>
              <CardDescription>Answer these questions to find your ideal account type</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-4 border rounded-lg">
                  <Shield className="w-8 h-8 text-blue-500 mb-3" />
                  <h3 className="font-semibold mb-2">Starting Capital</h3>
                  <p className="text-sm text-muted-foreground mb-3">How much can you deposit?</p>
                  <div className="space-y-2 text-sm">
                    <p>• $100-$4,999 → <strong>Standard</strong></p>
                    <p>• $5,000-$49,999 → <strong>Professional</strong></p>
                    <p>• $50,000+ → <strong>VIP</strong></p>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <Zap className="w-8 h-8 text-amber-500 mb-3" />
                  <h3 className="font-semibold mb-2">Trading Experience</h3>
                  <p className="text-sm text-muted-foreground mb-3">How long have you traded?</p>
                  <div className="space-y-2 text-sm">
                    <p>• Beginner → <strong>Standard</strong></p>
                    <p>• 1+ years → <strong>Professional</strong></p>
                    <p>• 5+ years → <strong>VIP</strong></p>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <TrendingUp className="w-8 h-8 text-primary mb-3" />
                  <h3 className="font-semibold mb-2">Trading Volume</h3>
                  <p className="text-sm text-muted-foreground mb-3">Monthly trading volume?</p>
                  <div className="space-y-2 text-sm">
                    <p>• &lt;10 lots → <strong>Standard</strong></p>
                    <p>• 10-100 lots → <strong>Professional</strong></p>
                    <p>• 100+ lots → <strong>VIP</strong></p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card className="mb-12">
            <CardHeader>
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-primary" />
                <CardTitle>Frequently Asked Questions</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} data-testid={`faq-item-${index}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Next Steps CTA */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Open your account in minutes. All account types require identity verification for security and regulatory compliance.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" data-testid="button-open-account">
                Open Account Now
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button size="lg" variant="outline" data-testid="button-verification-guide">
                View Verification Guide
              </Button>
            </div>
            <div className="mt-6 flex flex-wrap gap-6 justify-center text-sm text-muted-foreground">
              <span>✓ Account opens in 5 minutes</span>
              <span>✓ No hidden fees</span>
              <span>✓ Free to upgrade anytime</span>
            </div>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
}
