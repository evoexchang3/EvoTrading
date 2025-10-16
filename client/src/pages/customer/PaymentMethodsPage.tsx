import { LandingLayout } from "@/components/LandingLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Building2, Smartphone, Bitcoin } from "lucide-react";

export default function PaymentMethodsPage() {
  const paymentMethods = [
    {
      category: "Bank Transfer",
      icon: Building2,
      description: "Direct bank transfers for deposits and withdrawals",
      methods: [
        {
          name: "Wire Transfer",
          processingTime: "1-3 business days",
          minDeposit: "$100",
          fees: "Free deposits, $25 withdrawal fee",
          currencies: "USD, EUR, GBP"
        },
        {
          name: "Local Bank Transfer",
          processingTime: "Same day - 1 business day",
          minDeposit: "$50",
          fees: "Free",
          currencies: "Multiple local currencies"
        }
      ]
    },
    {
      category: "Credit/Debit Cards",
      icon: CreditCard,
      description: "Instant deposits with major credit and debit cards",
      methods: [
        {
          name: "Visa/Mastercard",
          processingTime: "Instant deposit, 3-5 days withdrawal",
          minDeposit: "$10",
          fees: "Free",
          currencies: "USD, EUR, GBP"
        }
      ]
    },
    {
      category: "E-Wallets",
      icon: Smartphone,
      description: "Fast and secure digital wallet payments",
      methods: [
        {
          name: "Skrill",
          processingTime: "Instant",
          minDeposit: "$10",
          fees: "Free deposits, 1% withdrawal fee",
          currencies: "Multiple currencies"
        },
        {
          name: "Neteller",
          processingTime: "Instant",
          minDeposit: "$10",
          fees: "Free deposits, 1% withdrawal fee",
          currencies: "Multiple currencies"
        },
        {
          name: "PayPal",
          processingTime: "Instant",
          minDeposit: "$25",
          fees: "Free",
          currencies: "USD, EUR, GBP"
        }
      ]
    },
    {
      category: "Cryptocurrency",
      icon: Bitcoin,
      description: "Secure deposits using popular cryptocurrencies",
      methods: [
        {
          name: "Bitcoin (BTC)",
          processingTime: "1-2 confirmations",
          minDeposit: "$50 equivalent",
          fees: "Network fees only",
          currencies: "BTC"
        },
        {
          name: "Ethereum (ETH)",
          processingTime: "12-20 confirmations",
          minDeposit: "$50 equivalent",
          fees: "Network fees only",
          currencies: "ETH"
        },
        {
          name: "USDT (Tether)",
          processingTime: "1-2 confirmations",
          minDeposit: "$50",
          fees: "Network fees only",
          currencies: "USDT (ERC-20, TRC-20)"
        }
      ]
    }
  ];

  return (
    <LandingLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Payment Methods</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We support a wide range of payment methods to make deposits and withdrawals convenient and secure for traders worldwide.
            </p>
          </div>

          <div className="space-y-8">
            {paymentMethods.map((category) => {
              const Icon = category.icon;
              return (
                <Card key={category.category} data-testid={`card-payment-${category.category.toLowerCase().replace(/\s+/g, '-')}`}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle>{category.category}</CardTitle>
                        <CardDescription>{category.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {category.methods.map((method) => (
                        <div key={method.name} className="border-l-4 border-primary/30 pl-4">
                          <h3 className="font-semibold mb-3">{method.name}</h3>
                          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground mb-1">Processing Time</p>
                              <p className="font-medium">{method.processingTime}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground mb-1">Min. Deposit</p>
                              <p className="font-medium">{method.minDeposit}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground mb-1">Fees</p>
                              <p className="font-medium">{method.fees}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground mb-1">Currencies</p>
                              <p className="font-medium">{method.currencies}</p>
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

          <div className="mt-12 bg-muted rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Important Information</h2>
            <ul className="space-y-2 text-sm">
              <li>• Withdrawal requests are processed within 24 hours on business days</li>
              <li>• Withdrawals are returned to the same method used for deposit (except crypto)</li>
              <li>• Identity verification (KYC) may be required before first withdrawal</li>
              <li>• Processing times may vary depending on your bank or payment provider</li>
              <li>• Cryptocurrency deposits require network confirmations before crediting</li>
            </ul>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
}
