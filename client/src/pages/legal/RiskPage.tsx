import { LandingLayout } from "@/components/LandingLayout";
import { AlertTriangle } from "lucide-react";
import { SEO } from "@/components/SEO";

export default function RiskPage() {
  return (
    <LandingLayout>
      <SEO
        title="Risk Disclosure"
        description="Important risk disclosure about trading forex, cryptocurrencies, and commodities. Understand the risks before you trade."
        keywords="trading risks, risk disclosure, forex risks, crypto risks, trading warning"
      />
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 mb-8">
              <AlertTriangle className="h-10 w-10 text-destructive flex-shrink-0" />
              <div>
                <h1 className="text-4xl font-bold mb-2" data-testid="text-risk-title">
                  Risk Disclosure
                </h1>
                <p className="text-lg text-muted-foreground">
                  Important information about trading risks
                </p>
              </div>
            </div>

            <div className="prose prose-slate dark:prose-invert max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">General Risk Warning</h2>
                <p className="text-muted-foreground mb-4">
                  Trading in financial instruments carries a high level of risk to your capital with the 
                  possibility of losing more than your initial investment. Trading may not be suitable for 
                  all investors, and you should ensure that you understand the risks involved.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">1. Leverage Risk</h2>
                <p className="text-muted-foreground mb-4">
                  Leverage allows you to trade positions larger than your account balance. While this can 
                  magnify profits, it equally magnifies losses. A small market movement can lead to 
                  proportionately larger losses, potentially exceeding your initial deposit.
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>Higher leverage = Higher risk</li>
                  <li>Margin calls can occur if your account balance falls below required levels</li>
                  <li>Positions may be automatically closed if margin requirements are not met</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">2. Market Volatility</h2>
                <p className="text-muted-foreground mb-4">
                  Financial markets can be extremely volatile. Prices can move rapidly against you due to:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>Economic news and data releases</li>
                  <li>Political events and announcements</li>
                  <li>Market sentiment changes</li>
                  <li>Low liquidity conditions</li>
                  <li>Unexpected global events</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">3. Cryptocurrency Risks</h2>
                <p className="text-muted-foreground mb-4">
                  Cryptocurrency trading carries additional risks:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>Extreme price volatility and rapid value changes</li>
                  <li>24/7 markets with no trading halts</li>
                  <li>Regulatory uncertainty and potential restrictions</li>
                  <li>Technology and cybersecurity risks</li>
                  <li>Market manipulation concerns</li>
                  <li>Irreversible transactions</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">4. Forex Trading Risks</h2>
                <p className="text-muted-foreground mb-4">
                  Foreign exchange trading involves specific risks:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>Currency value fluctuations</li>
                  <li>Interest rate changes</li>
                  <li>Central bank interventions</li>
                  <li>Political and economic instability</li>
                  <li>Slippage during volatile periods</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">5. Commodity Risks</h2>
                <p className="text-muted-foreground mb-4">
                  Commodity trading carries unique risks:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>Supply and demand imbalances</li>
                  <li>Weather and natural disaster impacts</li>
                  <li>Geopolitical tensions affecting supply</li>
                  <li>Storage and transportation costs</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">6. Technology Risks</h2>
                <p className="text-muted-foreground mb-4">
                  Electronic trading platforms carry technical risks:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>System failures or downtime</li>
                  <li>Internet connectivity issues</li>
                  <li>Software bugs or errors</li>
                  <li>Cybersecurity threats</li>
                  <li>Order execution delays</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">7. Overnight and Weekend Risk</h2>
                <p className="text-muted-foreground mb-4">
                  Holding positions overnight or over weekends exposes you to:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>Gap risk when markets reopen</li>
                  <li>Overnight financing charges</li>
                  <li>News events outside trading hours</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">8. Past Performance</h2>
                <p className="text-muted-foreground mb-4">
                  Past performance is not indicative of future results. Historical returns, backtests, 
                  and analysis do not guarantee similar performance in the future.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">9. Risk Management Recommendations</h2>
                <p className="text-muted-foreground mb-4">
                  To manage your risk:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>Never invest more than you can afford to lose</li>
                  <li>Use stop-loss orders to limit potential losses</li>
                  <li>Maintain appropriate position sizes relative to your capital</li>
                  <li>Diversify your trading portfolio</li>
                  <li>Continuously educate yourself about markets</li>
                  <li>Consider using lower leverage</li>
                  <li>Keep adequate reserves for margin requirements</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">10. Professional Advice</h2>
                <p className="text-muted-foreground mb-4">
                  If you are uncertain about trading:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                  <li>Seek independent financial advice</li>
                  <li>Start with a demo account to practice</li>
                  <li>Invest time in education before trading real money</li>
                  <li>Understand all features and risks of products you trade</li>
                </ul>
              </section>

              <section className="mb-8 p-6 bg-destructive/10 border border-destructive/20 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">Important Notice</h2>
                <p className="text-muted-foreground mb-4">
                  By using our platform, you acknowledge that you have read, understood, and accepted this 
                  Risk Disclosure. You confirm that you are aware of the risks and that you are solely 
                  responsible for your trading decisions and any resulting losses.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
}
