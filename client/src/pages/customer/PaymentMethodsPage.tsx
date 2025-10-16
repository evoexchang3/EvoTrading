import { LandingLayout } from "@/components/LandingLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Building2, Smartphone, Bitcoin, HelpCircle, ArrowRight, Clock, DollarSign, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function PaymentMethodsPage() {
  const paymentMethods = [
    {
      category: "Bank Transfer",
      icon: Building2,
      description: "Direct bank transfers for deposits and withdrawals",
      recommended: true,
      methods: [
        {
          name: "International Wire Transfer",
          processingTime: "1-3 business days",
          minDeposit: "$100",
          maxDeposit: "Unlimited",
          fees: "Free deposits, $25 withdrawal fee",
          currencies: "USD, EUR, GBP",
          limits: "Daily: $100,000 | Monthly: Unlimited",
          security: "Bank-grade encryption"
        },
        {
          name: "Local Bank Transfer (SEPA/ACH)",
          processingTime: "Same day - 1 business day",
          minDeposit: "$50",
          maxDeposit: "$50,000",
          fees: "Free",
          currencies: "EUR (SEPA), USD (ACH)",
          limits: "Daily: $50,000 | Monthly: Unlimited",
          security: "Bank-grade encryption"
        }
      ]
    },
    {
      category: "Credit/Debit Cards",
      icon: CreditCard,
      description: "Instant deposits with major credit and debit cards",
      recommended: false,
      methods: [
        {
          name: "Visa/Mastercard",
          processingTime: "Instant deposit, 3-5 days withdrawal",
          minDeposit: "$10",
          maxDeposit: "$10,000 per transaction",
          fees: "Free deposits, Free withdrawals",
          currencies: "USD, EUR, GBP, AUD, CAD",
          limits: "Daily: $25,000 | Monthly: $100,000",
          security: "3D Secure & PCI DSS compliant"
        },
        {
          name: "Debit Cards Only",
          processingTime: "Instant deposit, 3-5 days withdrawal",
          minDeposit: "$10",
          maxDeposit: "$5,000 per transaction",
          fees: "Free",
          currencies: "Multiple currencies",
          limits: "Daily: $15,000 | Monthly: $50,000",
          security: "3D Secure enabled"
        }
      ]
    },
    {
      category: "E-Wallets",
      icon: Smartphone,
      description: "Fast and secure digital wallet payments",
      recommended: false,
      methods: [
        {
          name: "Skrill",
          processingTime: "Instant both ways",
          minDeposit: "$10",
          maxDeposit: "$10,000",
          fees: "Free deposits, 1% withdrawal fee (min $5)",
          currencies: "40+ currencies",
          limits: "Daily: $25,000 | Monthly: Unlimited",
          security: "Two-factor authentication"
        },
        {
          name: "Neteller",
          processingTime: "Instant both ways",
          minDeposit: "$10",
          maxDeposit: "$10,000",
          fees: "Free deposits, 1% withdrawal fee (min $5)",
          currencies: "25+ currencies",
          limits: "Daily: $25,000 | Monthly: Unlimited",
          security: "Two-factor authentication"
        },
        {
          name: "PayPal",
          processingTime: "Instant both ways",
          minDeposit: "$25",
          maxDeposit: "$5,000",
          fees: "Free both ways",
          currencies: "USD, EUR, GBP",
          limits: "Daily: $10,000 | Monthly: $50,000",
          security: "Buyer protection"
        }
      ]
    },
    {
      category: "Cryptocurrency",
      icon: Bitcoin,
      description: "Secure deposits using popular cryptocurrencies",
      recommended: false,
      methods: [
        {
          name: "Bitcoin (BTC)",
          processingTime: "1-2 confirmations (~20 min)",
          minDeposit: "$50 equivalent",
          maxDeposit: "Unlimited",
          fees: "Network fees only (~$2-10)",
          currencies: "BTC → USD conversion",
          limits: "No limits",
          security: "Cold wallet storage"
        },
        {
          name: "Ethereum (ETH)",
          processingTime: "12-20 confirmations (~5 min)",
          minDeposit: "$50 equivalent",
          maxDeposit: "Unlimited",
          fees: "Network fees only (~$1-5)",
          currencies: "ETH → USD conversion",
          limits: "No limits",
          security: "Cold wallet storage"
        },
        {
          name: "USDT (Tether)",
          processingTime: "1-2 confirmations (~10 min)",
          minDeposit: "$50",
          maxDeposit: "Unlimited",
          fees: "Network fees (ERC-20: ~$1-10, TRC-20: ~$1)",
          currencies: "USDT (1:1 USD)",
          limits: "No limits",
          security: "Multi-sig wallets"
        }
      ]
    }
  ];

  const faqs = [
    {
      question: "How long does it take for my deposit to appear in my account?",
      answer: "Deposit times vary by method: Credit/debit cards and e-wallets are instant (within seconds). Bank transfers take 1-3 business days. Cryptocurrency deposits are credited after required network confirmations (typically 5-20 minutes). Your funds appear immediately as 'pending' and become available for trading once cleared."
    },
    {
      question: "Are there any deposit or withdrawal fees?",
      answer: "Most deposit methods are free. Bank wire withdrawals have a $25 fee. E-wallet withdrawals (Skrill, Neteller) have a 1% fee with a $5 minimum. Cryptocurrency transactions only pay network fees. Credit/debit card deposits and withdrawals are completely free. See the detailed table above for specific fees per method."
    },
    {
      question: "Can I withdraw to a different method than I deposited with?",
      answer: "For security and anti-money laundering compliance, withdrawals must be returned to the same method used for deposit up to the deposited amount. Profits can be withdrawn to any verified payment method. For example: if you deposit $1,000 via card, you must withdraw at least the first $1,000 back to that card. Any profits above $1,000 can go to bank transfer, e-wallet, etc."
    },
    {
      question: "What are the withdrawal limits and processing times?",
      answer: "Standard accounts: $100 min, $10,000 daily max. Professional accounts: $500 min, $50,000 daily max. VIP accounts: $1,000 min, unlimited daily. Processing times: Card withdrawals 3-5 business days, Bank transfers 1-3 business days, E-wallets instant to 24 hours, Crypto 1-2 hours after approval. VIP accounts receive same-day processing."
    },
    {
      question: "Do I need to verify my identity before making a withdrawal?",
      answer: "Yes, identity verification (KYC) is required before your first withdrawal. You can deposit without verification, but withdrawals require a verified account. The KYC process takes 24-48 hours and requires a government ID and proof of address. This protects your account and complies with financial regulations."
    },
    {
      question: "Are my funds safe? How are client deposits protected?",
      answer: "Yes, all client funds are held in segregated bank accounts separate from company operating funds. We maintain Tier 1 bank relationships and carry professional indemnity insurance. Your deposits are not used for company operations and are available for immediate withdrawal. Additionally, we comply with regulatory capital requirements to ensure solvency."
    }
  ];

  return (
    <LandingLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <Badge className="mb-4" data-testid="badge-payment-methods">Customer Information</Badge>
            <h1 className="text-4xl font-bold mb-4">Payment Methods</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Fast, secure, and convenient funding options for traders worldwide. We support bank transfers, cards, e-wallets, and cryptocurrency with competitive fees and rapid processing times.
            </p>
          </div>

          {/* Quick Summary Stats */}
          <div className="grid sm:grid-cols-4 gap-4 mb-12">
            <Card data-testid="card-stat-methods">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-1">12+</div>
                <p className="text-sm text-muted-foreground">Payment Methods</p>
              </CardContent>
            </Card>
            <Card data-testid="card-stat-currencies">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-1">40+</div>
                <p className="text-sm text-muted-foreground">Supported Currencies</p>
              </CardContent>
            </Card>
            <Card data-testid="card-stat-processing">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-1">&lt;1hr</div>
                <p className="text-sm text-muted-foreground">Avg Deposit Time</p>
              </CardContent>
            </Card>
            <Card data-testid="card-stat-minimum">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-1">$10</div>
                <p className="text-sm text-muted-foreground">Minimum Deposit</p>
              </CardContent>
            </Card>
          </div>

          {/* Payment Methods Details */}
          <div className="space-y-8 mb-12">
            {paymentMethods.map((category) => {
              const Icon = category.icon;
              return (
                <Card key={category.category} data-testid={`card-payment-${category.category.toLowerCase().replace(/\s+/g, '-')}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle>{category.category}</CardTitle>
                          <CardDescription>{category.description}</CardDescription>
                        </div>
                      </div>
                      {category.recommended && (
                        <Badge variant="default">Recommended</Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {category.methods.map((method) => (
                        <div key={method.name} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between mb-4">
                            <h3 className="font-semibold text-lg">{method.name}</h3>
                            <Badge variant="outline" className="ml-2">
                              <Clock className="w-3 h-3 mr-1" />
                              {method.processingTime}
                            </Badge>
                          </div>
                          
                          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                            <div className="space-y-1">
                              <p className="text-muted-foreground flex items-center gap-1">
                                <DollarSign className="w-3 h-3" /> Min/Max Deposit
                              </p>
                              <p className="font-medium">{method.minDeposit} / {method.maxDeposit}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-muted-foreground">Fees</p>
                              <p className="font-medium">{method.fees}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-muted-foreground">Currencies</p>
                              <p className="font-medium">{method.currencies}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-muted-foreground">Transaction Limits</p>
                              <p className="font-medium">{method.limits}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-muted-foreground flex items-center gap-1">
                                <Shield className="w-3 h-3" /> Security
                              </p>
                              <p className="font-medium">{method.security}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Step by Step Guide */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>📝 How to Make a Deposit (Step-by-Step)</CardTitle>
              <CardDescription>Follow these simple steps to fund your account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
                  <div>
                    <h4 className="font-semibold mb-1">Log in to Your Account</h4>
                    <p className="text-sm text-muted-foreground">Access your dashboard and navigate to the "Deposit" section in the main menu.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
                  <div>
                    <h4 className="font-semibold mb-1">Select Payment Method</h4>
                    <p className="text-sm text-muted-foreground">Choose your preferred payment method from the available options. Consider processing time and fees.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
                  <div>
                    <h4 className="font-semibold mb-1">Enter Deposit Amount</h4>
                    <p className="text-sm text-muted-foreground">Enter the amount you wish to deposit. Ensure it meets the minimum requirement for your chosen method.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">4</div>
                  <div>
                    <h4 className="font-semibold mb-1">Complete Payment</h4>
                    <p className="text-sm text-muted-foreground">Follow the payment provider's instructions. You may be redirected to your bank or payment processor.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">5</div>
                  <div>
                    <h4 className="font-semibold mb-1">Funds Appear in Account</h4>
                    <p className="text-sm text-muted-foreground">Your balance updates automatically once payment is processed. Check your account balance or transaction history.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Important Notices */}
          <div className="space-y-4 mb-12">
            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>
                <strong>Security First:</strong> All payment transactions are encrypted with bank-grade SSL/TLS security. We never store your full card details on our servers. Payment processing is handled by PCI DSS Level 1 certified partners.
              </AlertDescription>
            </Alert>

            <Alert>
              <Clock className="h-4 w-4" />
              <AlertDescription>
                <strong>Processing Times:</strong> Stated processing times are estimates and may vary based on your bank, payment provider, and local regulations. Deposits during weekends or holidays may take longer. Cryptocurrency transactions depend on network congestion.
              </AlertDescription>
            </Alert>
          </div>

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

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Fund Your Account?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Choose from 12+ payment methods with competitive fees. Most deposits are instant, so you can start trading right away.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" data-testid="button-make-deposit">
                Make a Deposit
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button size="lg" variant="outline" data-testid="button-view-account-types">
                View Account Types
              </Button>
            </div>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
}
