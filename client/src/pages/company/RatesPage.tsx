import { LandingLayout } from "@/components/LandingLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

export default function RatesPage() {
  const forexSpreads = [
    { pair: "EUR/USD", typical: "0.8", account: "Standard" },
    { pair: "EUR/USD", typical: "0.5", account: "Professional" },
    { pair: "EUR/USD", typical: "0.3", account: "VIP" },
    { pair: "GBP/USD", typical: "1.2", account: "Standard" },
    { pair: "GBP/USD", typical: "0.9", account: "Professional" },
    { pair: "GBP/USD", typical: "0.6", account: "VIP" },
    { pair: "USD/JPY", typical: "0.9", account: "Standard" },
    { pair: "USD/JPY", typical: "0.6", account: "Professional" },
    { pair: "USD/JPY", typical: "0.4", account: "VIP" },
  ];

  const cryptoSpreads = [
    { pair: "BTC/USD", typical: "25", account: "All" },
    { pair: "ETH/USD", typical: "1.5", account: "All" },
    { pair: "XRP/USD", typical: "0.002", account: "All" },
  ];

  const commoditySpreads = [
    { pair: "Gold (XAU/USD)", typical: "0.30", account: "All" },
    { pair: "Silver (XAG/USD)", typical: "0.025", account: "All" },
    { pair: "Oil (WTI)", typical: "0.04", account: "All" },
  ];

  return (
    <LandingLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Spreads & Commissions</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Transparent pricing across all instruments. Spreads shown are typical during normal market conditions.
            </p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <DollarSign className="w-6 h-6 text-primary" />
                  <div>
                    <CardTitle>Forex Spreads</CardTitle>
                    <CardDescription>Spreads in pips for major currency pairs</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Currency Pair</th>
                        <th className="text-center py-3 px-4">Typical Spread</th>
                        <th className="text-center py-3 px-4">Account Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {forexSpreads.map((item, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-3 px-4 font-semibold">{item.pair}</td>
                          <td className="text-center py-3 px-4">{item.typical} pips</td>
                          <td className="text-center py-3 px-4">{item.account}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cryptocurrency Spreads</CardTitle>
                <CardDescription>Spreads for popular crypto pairs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Cryptocurrency</th>
                        <th className="text-center py-3 px-4">Typical Spread</th>
                        <th className="text-center py-3 px-4">Account Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cryptoSpreads.map((item, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-3 px-4 font-semibold">{item.pair}</td>
                          <td className="text-center py-3 px-4">${item.typical}</td>
                          <td className="text-center py-3 px-4">{item.account}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Commodity Spreads</CardTitle>
                <CardDescription>Spreads for metals and energy</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Commodity</th>
                        <th className="text-center py-3 px-4">Typical Spread</th>
                        <th className="text-center py-3 px-4">Account Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {commoditySpreads.map((item, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-3 px-4 font-semibold">{item.pair}</td>
                          <td className="text-center py-3 px-4">${item.typical}</td>
                          <td className="text-center py-3 px-4">{item.account}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Other Fees & Charges</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <h3 className="font-semibold mb-2">Commission</h3>
                    <p className="text-sm text-muted-foreground">Zero commission on all accounts. Our revenue comes from spreads only.</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <h3 className="font-semibold mb-2">Swap Rates</h3>
                    <p className="text-sm text-muted-foreground">Overnight financing charges vary by instrument. View current swap rates in the trading platform.</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <h3 className="font-semibold mb-2">Deposit Fees</h3>
                    <p className="text-sm text-muted-foreground">Free for all deposit methods. We cover all processing fees.</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <h3 className="font-semibold mb-2">Withdrawal Fees</h3>
                    <p className="text-sm text-muted-foreground">Free for e-wallets and crypto. $25 fee for wire transfers.</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <h3 className="font-semibold mb-2">Inactivity Fee</h3>
                    <p className="text-sm text-muted-foreground">$15/month after 6 months of no trading activity.</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <h3 className="font-semibold mb-2">Account Maintenance</h3>
                    <p className="text-sm text-muted-foreground">No monthly fees or platform charges. Keep 100% of your profits.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 bg-muted rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Important Notes</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Spreads shown are typical during normal market conditions and may widen during high volatility or news events</li>
              <li>• Professional and VIP accounts receive preferential spreads based on trading volume</li>
              <li>• All prices are subject to change. Current live spreads are displayed in the trading platform</li>
              <li>• Swap rates (overnight financing) are updated daily based on interbank rates</li>
              <li>• Cryptocurrency spreads can vary significantly during periods of high market volatility</li>
            </ul>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
}
