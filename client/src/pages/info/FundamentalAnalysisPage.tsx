import { LandingLayout } from "@/components/LandingLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, TrendingUp, Globe, DollarSign } from "lucide-react";

export default function FundamentalAnalysisPage() {
  const factors = [
    {
      title: "Economic Indicators",
      icon: TrendingUp,
      description: "Key data releases that drive currency valuations",
      indicators: [
        {
          name: "Interest Rates",
          impact: "Higher rates attract foreign investment, strengthening currency"
        },
        {
          name: "GDP Growth",
          impact: "Strong growth signals healthy economy, supporting currency strength"
        },
        {
          name: "Employment Data",
          impact: "Low unemployment indicates economic strength, positive for currency"
        },
        {
          name: "Inflation (CPI)",
          impact: "Moderate inflation shows healthy economy; too high forces rate hikes"
        }
      ]
    },
    {
      title: "Central Bank Policy",
      icon: Building2,
      description: "Monetary policy decisions that directly impact currencies",
      indicators: [
        {
          name: "Interest Rate Decisions",
          impact: "Rate hikes strengthen currency; cuts weaken it"
        },
        {
          name: "Quantitative Easing (QE)",
          impact: "Increases money supply, typically weakening currency"
        },
        {
          name: "Forward Guidance",
          impact: "Central bank hints about future policy direction"
        },
        {
          name: "Meeting Minutes",
          impact: "Reveal central bank thinking and future policy bias"
        }
      ]
    },
    {
      title: "Geopolitical Events",
      icon: Globe,
      description: "Political and global events affecting market sentiment",
      indicators: [
        {
          name: "Elections",
          impact: "Political uncertainty can weaken currency; stable government strengthens it"
        },
        {
          name: "Trade Relations",
          impact: "Trade wars weaken both currencies; agreements strengthen them"
        },
        {
          name: "Military Conflicts",
          impact: "Wars drive safe-haven flows (USD, JPY, CHF gain)"
        },
        {
          name: "Brexit-style Events",
          impact: "Major policy shifts create volatility and trend changes"
        }
      ]
    },
    {
      title: "Market Sentiment",
      icon: DollarSign,
      description: "Collective trader psychology and risk appetite",
      indicators: [
        {
          name: "Risk-On Sentiment",
          impact: "Investors favor higher-yielding currencies (AUD, NZD, emerging markets)"
        },
        {
          name: "Risk-Off Sentiment",
          impact: "Flight to safety strengthens USD, JPY, CHF"
        },
        {
          name: "Commodity Prices",
          impact: "Oil affects CAD; gold affects AUD; affects commodity currencies"
        },
        {
          name: "Stock Market Performance",
          impact: "Strong equities often correlate with risk currencies gaining"
        }
      ]
    }
  ];

  return (
    <LandingLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Fundamental Analysis</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Understand the economic factors, central bank policies, and market sentiment that drive long-term currency movements and trading opportunities.
            </p>
          </div>

          <div className="space-y-8">
            {factors.map((factor) => {
              const Icon = factor.icon;
              return (
                <Card key={factor.title} data-testid={`card-factor-${factor.title.toLowerCase().replace(/\s+/g, '-')}`}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle>{factor.title}</CardTitle>
                        <CardDescription>{factor.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {factor.indicators.map((indicator, index) => (
                        <div key={index} className="flex gap-4 p-4 bg-muted rounded-lg">
                          <div className="flex-1">
                            <h3 className="font-semibold mb-1">{indicator.name}</h3>
                            <p className="text-sm text-muted-foreground">{indicator.impact}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Trading the News</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <h3 className="font-semibold mb-2">Before the Release</h3>
                  <ul className="space-y-1 text-muted-foreground ml-4">
                    <li>• Check economic calendar for high-impact events</li>
                    <li>• Note consensus forecast and previous value</li>
                    <li>• Identify key support/resistance levels</li>
                    <li>• Reduce position size or stay flat during major releases</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">After the Release</h3>
                  <ul className="space-y-1 text-muted-foreground ml-4">
                    <li>• Compare actual vs forecast (deviation drives movement)</li>
                    <li>• Wait for initial volatility to settle (2-5 minutes)</li>
                    <li>• Look for direction confirmation on 5m/15m charts</li>
                    <li>• Enter trades in the direction of the breakout</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Currency Correlations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="p-3 bg-muted rounded-lg">
                  <p className="font-semibold mb-1">Commodity Currencies</p>
                  <p className="text-muted-foreground">AUD, NZD, CAD strengthen when commodity prices rise</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="font-semibold mb-1">Safe Haven Currencies</p>
                  <p className="text-muted-foreground">USD, JPY, CHF strengthen during risk-off periods</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="font-semibold mb-1">Interest Rate Differentials</p>
                  <p className="text-muted-foreground">Higher yielding currencies attract carry trade flows</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="font-semibold mb-1">Oil & CAD</p>
                  <p className="text-muted-foreground">Canadian dollar moves with crude oil prices</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 bg-muted rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Combining Fundamental & Technical Analysis</h2>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div>
                <h3 className="font-semibold mb-2">1. Fundamental Sets Direction</h3>
                <p className="text-muted-foreground">
                  Use economic data and central bank policy to determine which currency is likely to strengthen/weaken over coming days or weeks.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">2. Technical Times Entry</h3>
                <p className="text-muted-foreground">
                  Once fundamental bias is clear, use technical analysis to find optimal entry points with good risk/reward ratios.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">3. Manage Risk Wisely</h3>
                <p className="text-muted-foreground">
                  Even with strong fundamental catalyst, use stop losses and position sizing to protect capital from unexpected reversals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
}
