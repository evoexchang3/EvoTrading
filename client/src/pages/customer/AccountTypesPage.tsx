import { LandingLayout } from "@/components/LandingLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

export default function AccountTypesPage() {
  const accountTypes = [
    {
      name: "Standard Account",
      description: "Perfect for beginners and retail traders",
      features: [
        "Minimum deposit: $100",
        "Leverage up to 1:100",
        "Access to all instruments",
        "Standard spreads from 1.2 pips",
        "24/5 customer support",
        "Free educational resources"
      ],
      popular: false
    },
    {
      name: "Professional Account",
      description: "For experienced traders with higher volume",
      features: [
        "Minimum deposit: $5,000",
        "Leverage up to 1:500",
        "Reduced spreads from 0.8 pips",
        "Priority customer support",
        "Advanced trading tools",
        "Dedicated account manager"
      ],
      popular: true
    },
    {
      name: "VIP Account",
      description: "Premium service for institutional clients",
      features: [
        "Minimum deposit: $50,000",
        "Leverage up to 1:500",
        "Tightest spreads from 0.3 pips",
        "24/7 priority support",
        "Custom trading solutions",
        "Personal relationship manager",
        "Exclusive market insights"
      ],
      popular: false
    }
  ];

  return (
    <LandingLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Account Types</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the account that best fits your trading needs. All accounts include access to our full range of instruments and trading platforms.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {accountTypes.map((account) => (
              <Card 
                key={account.name} 
                className={account.popular ? "border-primary shadow-lg" : ""}
                data-testid={`card-account-${account.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {account.popular && (
                  <div className="bg-primary text-primary-foreground text-center py-2 rounded-t-lg font-semibold">
                    Most Popular
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{account.name}</CardTitle>
                  <CardDescription>{account.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {account.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 bg-muted rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Account Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Feature</th>
                    <th className="text-center py-3 px-4">Standard</th>
                    <th className="text-center py-3 px-4">Professional</th>
                    <th className="text-center py-3 px-4">VIP</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4">Minimum Deposit</td>
                    <td className="text-center py-3 px-4">$100</td>
                    <td className="text-center py-3 px-4">$5,000</td>
                    <td className="text-center py-3 px-4">$50,000</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">Maximum Leverage</td>
                    <td className="text-center py-3 px-4">1:100</td>
                    <td className="text-center py-3 px-4">1:500</td>
                    <td className="text-center py-3 px-4">1:500</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">Spreads From</td>
                    <td className="text-center py-3 px-4">1.2 pips</td>
                    <td className="text-center py-3 px-4">0.8 pips</td>
                    <td className="text-center py-3 px-4">0.3 pips</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">Account Manager</td>
                    <td className="text-center py-3 px-4">-</td>
                    <td className="text-center py-3 px-4"><Check className="w-5 h-5 mx-auto text-primary" /></td>
                    <td className="text-center py-3 px-4"><Check className="w-5 h-5 mx-auto text-primary" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
}
